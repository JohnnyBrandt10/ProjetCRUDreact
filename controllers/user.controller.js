import mongoose from 'mongoose';
import UserModel from '../models/user.model.js';

const ObjectID = mongoose.Types.ObjectId;

//affichage de tout les Users
export const getAllUsers = async (req, res) => {
  const user = await UserModel.find().select('-password');
  res.status(200).json(user);
};

//selection user par ID
export const getUser = async (req, res) => {
  const { id } = req.params;

  // Vérification ObjectId
  if (!ObjectID.isValid(id)) {
    return res.status(400).send('ID unknown : ' + id);
  }

  try {
    const getUser = await UserModel.findById(id).select('-password');

    if (!getUser) {
      return res.status(404).send('Utilisateur introuvable');
    }

    res.status(200).json(getUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

//update users
export const updateUser = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send('ID unknown : ' + id);
  }

  try {
    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      { $set: { bio: req.body.bio } },
      { new: true, runValidators: true }
    );

    if (!updateUser) {
      return res.status(404).send('User not found');
    }

    return res.status(200).json(updateUser);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//delete user
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  if (!ObjectID.isValid(id)) {
    return res.status(400).send('ID unknown : ' + id);
  }

  try {
    const deleteUser = await UserModel.findByIdAndDelete(id);

    if (!deleteUser) {
      return res.status(404).send('User not found');
    }

    return res.status(200).json({ message: 'Delete successful' });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//follow
export const follow = async (req, res) => {
  const { id } = req.params;
  const { idToFollow } = req.body;

  // Vérification des IDs
  if (!ObjectID.isValid(id) || !ObjectID.isValid(idToFollow)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    // Ajout dans "following"
    const user = await UserModel.findByIdAndUpdate(
      id,
      { $addToSet: { following: idToFollow } },
      { new: true }
    );

    // Ajout dans "followers"
    await UserModel.findByIdAndUpdate(idToFollow, {
      $addToSet: { followers: id }
    });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//unfollow
export const unfollow = async (req, res) => {
  const { id } = req.params;
  const { idToUnFollow } = req.body;

  // Vérification des IDs
  if (!ObjectID.isValid(id) || !ObjectID.isValid(idToUnFollow)) {
    return res.status(400).json({ message: 'ID invalide' });
  }

  try {
    // retire dans "following"
    const user = await UserModel.findByIdAndUpdate(
      id,
      { $pull: { following: idToUnFollow } },
      { new: true }
    );

    // retire dans "followers"
    await UserModel.findByIdAndUpdate(idToUnFollow, {
      $pull: { followers: id }
    });

    return res.status(200).json(user);
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};
