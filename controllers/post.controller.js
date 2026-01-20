import mongoose from 'mongoose';
import PostModel from '../models/post.model.js';
import UserModel from '../models/user.model.js';
import { uploadErrors } from '../utils/errors.utils.js';
const ObjectID = mongoose.Types.ObjectId;

//affichage de tout les posts
export const getPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().sort({ createdAt: -1 });
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      message: 'Erreur lors de la récupération des posts',
      error: err.message
    });
  }
};

//creation post
export const createPost = async (req, res) => {
  const { posterID, message, video } = req.body;

  // Champs obligatoires
  if (!posterID || !message) {
    return res.status(400).json({
      message: "posterID et message sont obligatoires"
    });
  }

  let picture = "";

  // Image optionnelle
  if (req.file) {
    // vérifications
    if (
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpeg"
    ) {
      return res.status(400).json({
        message: "Format image non autorisé"
      });
    }

    if (req.file.size > 500000) {
      return res.status(400).json({
        message: "Image trop volumineuse (max 500Ko)"
      });
    }

    picture = `/uploads/posts/${req.file.filename}`;
  }

  // Création du post
  try {
    const newPost = new PostModel({
      posterID,
      message,
      picture,        // "" ou chemin image
      video: video || "",
      likes: [],
      comments: []
    });

    const post = await newPost.save();
    return res.status(201).json(post);

  } catch (err) {
    console.error("Erreur création post :", err);
    return res.status(500).json({
      message: "Erreur serveur",
      error: err.message
    });
  }
};

export const updatePost = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send('ID unknown : ' + id);
  }

  try {
    const updatedPost = await PostModel.findByIdAndUpdate(
      id,
      { $set: { message: req.body.message } },
      { new: true, runValidators: true }
    );

    if (!updatedPost) {
      return res.status(404).send('Post not found');
    }
    return res.status(200).json(updatedPost);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deletePost = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send('ID unknown : ' + id);
  }

  try {
    const deletePost = await PostModel.findByIdAndDelete(id);

    if (!deletePost) {
      return res.status(404).send('Post not found');
    }
    return res.status(200).json(deletePost);
  } catch (err) {
    return res.status(401).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.body.id;

  if (!ObjectID.isValid(id) || !ObjectID.isValid(userId)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    // Mise à jour du post
    const post = await PostModel.findByIdAndUpdate(
      id,
      { $addToSet: { likers: userId } },
      { new: true }
    );

    // Mise à jour de l'utilisateur
    await UserModel.findByIdAndUpdate(
      userId,
      { $addToSet: { likers: id } },
      { new: true }
    );

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const unlikePost = async (req, res) => {
  const { id } = req.params;
  const userId = req.body.id;

  if (!ObjectID.isValid(id) || !ObjectID.isValid(userId)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    // Mise à jour du post
    const post = await PostModel.findByIdAndUpdate(
      id,
      { $pull: { likers: userId } },
      { new: true }
    );

    // Mise à jour de l'utilisateur
    await UserModel.findByIdAndUpdate(
      userId,
      { $pull: { likers: id } },
      { new: true }
    );

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const commentPost = async (req, res) => {
  const { id } = req.params;
  const { commenterID, commenterPseudo, text } = req.body;

  if (!ObjectID.isValid(id) || !ObjectID.isValid(commenterID)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  if (!text) {
    return res.status(400).json({ message: 'Le commentaire est vide' });
  }

  try {
    const post = await PostModel.findByIdAndUpdate(
      id,
      {
        $push: {
          comments: {
            commenterID,
            commenterPseudo,
            text,
            timestamp: Date.now()
          }
        }
      },
      { new: true }
    );

    res.status(200).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const editcommentPost = async (req, res) => {
  const { id } = req.params;
  const { commentId, text } = req.body;

  if (!ObjectID.isValid(id) || !ObjectID.isValid(commentId)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  if (!text) {
    return res.status(400).json({ message: 'Le texte est vide' });
  }

  try {
    const post = await PostModel.findById(id);

    if (!post) {
      return res.status(404).json({ message: 'Post introuvable' });
    }

    const comment = post.comments.find((c) => c._id.equals(commentId));

    if (!comment) {
      return res.status(404).json({ message: 'Commentaire introuvable' });
    }

    comment.text = text;
    await post.save();

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

export const deletecommentPost = async (req, res) => {
  const { id } = req.params;
  const { commentId } = req.body;

  if (!ObjectID.isValid(id) || !ObjectID.isValid(commentId)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    const post = await PostModel.findByIdAndUpdate(
      id,
      {
        $pull: {
          comments: { _id: commentId }
        }
      },
      { new: true }
    );

    if (!post) {
      return res.status(404).json({ message: 'Post introuvable' });
    }

    return res.status(200).json(post);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
