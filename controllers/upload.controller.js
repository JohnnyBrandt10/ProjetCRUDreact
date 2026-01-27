import UserModel from "../models/user.model.js";
import { uploadErrors } from "../utils/errors.utils.js";

export const uploadProfil = async (req, res) => {
  try {
    if (!req.file) throw Error("no file");

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

    const user = await UserModel.findByIdAndUpdate(
      req.body.userId,
      {
        $set: {
          picture: `/uploads/profil/${req.file.filename}`,
        },
      },
      { new: true }
    );

    res.status(200).json(user);
  } catch (err) {
    const errors = uploadErrors(err);
    res.status(400).json({ errors });
  }
};
