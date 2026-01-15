import jwt from 'jsonwebtoken';
import UserModel from '../models/user.model.js';

//checkUser
export const checkUser = async (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    res.locals.user = null;
    return next();
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);

    const user = await UserModel.findById(decodedToken.id).select('-password');

    res.locals.user = user;
    return next();
  } catch (err) {
    res.locals.user = null;
    res.cookie('jwt', '', {
      maxAge: 1,
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    });
    return next();
  }
};

//requireAuth
export const requireAuth = (req, res, next) => {
  const token = req.cookies?.jwt;

  if (!token) {
    return res
      .status(401)
      .json({ message: 'Accès refusé, veuillez vous connecter' });
  }

  try {
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    req.userId = decodedToken.id;
    console.log(decodedToken.id)
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ message: 'Token invalide, veuillez vous reconnecter' });
  }
};
