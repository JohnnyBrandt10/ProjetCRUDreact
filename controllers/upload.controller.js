import UserModel from "../models/user.model.js";
import { uploadErrors } from "../utils/errors.utils.js";

export const uploadProfil = async (req, res) => {
  try {
    // Vérification fichier
    if (!req.file) {
      throw Error("no file");
    }

    if (
      req.file.mimetype !== "image/jpg" &&
      req.file.mimetype !== "image/png" &&
      req.file.mimetype !== "image/jpeg"
    ) {
      throw Error("invalid file");
    }

    if (req.file.size > 500000) {
      throw Error("max size");
    }

    //  Mise à jour user
    const user = await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          picture: `/uploads/profil/${req.body.filename}`,
        },
      },
      { new: true }
    );

    return res.status(200).json(user);

  } catch (err) {
    const errors = uploadErrors(err);
    return res.status(400).json({ errors });
  }
};
