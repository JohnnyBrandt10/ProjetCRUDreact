import { Router } from 'express';
import { logout, signin, signup } from '../controllers/auth.controller.js';
import {
  deleteUser,
  follow,
  getAllUsers,
  getUser,
  unfollow,
  updateUser
} from '../controllers/user.controller.js';

const router = Router();

//auth
router.post('/register', signup);
router.post('/login', signin);
router.get('/logout', logout);

//users
router.get('/', getAllUsers);
router.get('/:id', getUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);
router.patch('/follow/:id', follow);
router.patch('/unfollow/:id', unfollow);

export default router;
