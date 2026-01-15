import UserModel from "../models/user.model.js";
import jwt from 'jsonwebtoken'
import { signInErrors, signUpErrors } from "../utils/errors.utils.js";

const maxAge = 3 * 24 * 60 * 60 *1000
const createToken = (id) => {
    return jwt.sign({id}, process.env.TOKEN_SECRET, {
        expiresIn: maxAge
    })
}


//S’inscrire
export const signup = async (req, res) => {

  try {
    const user = new UserModel(req.body);
    await user.save();

    res.status(201).json({ id: user._id });
  } catch (err) {
    const errors = signUpErrors(err)
    res.status(400).json({errors});
  }
};

//Se connecter
export const signin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);

    const token = createToken(user._id);

    res.cookie('jwt', token, {
      httpOnly: true,
      maxAge,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict"
    });

    res.status(200).json({ user: user._id });

  } catch (err) {
    const errors = signInErrors(err)
    res.status(401).json({ errors });
  }
};

//Se deconnecter
export const logout = async (req, res) => {
    res.cookie('jwt', '', { maxAge: 1 })
    res.redirect('/')
}