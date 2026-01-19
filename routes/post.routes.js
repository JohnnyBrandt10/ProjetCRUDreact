import { Router } from 'express';
import {
  commentPost,
  createPost,
  deletecommentPost,
  deletePost,
  editcommentPost,
  getPosts,
  likePost,
  unlikePost,
  updatePost
} from '../controllers/post.controller.js';
import upload from '../middleware/upload.middleware.js';
import { uploadProfil } from '../controllers/upload.controller.js';
const router = Router();

//routes posts
router.get('/', getPosts);
router.post('/', createPost);
router.put('/:id', updatePost);
router.delete('/:id', deletePost);
router.patch('/like-post/:id', likePost);
router.patch('/unlike-post/:id', unlikePost);

//routes comments
router.patch('/comment-post/:id', commentPost);
router.patch('/edit-comment-post/:id', editcommentPost);
router.patch('/delete-comment-post/:id', deletecommentPost);

//upload
router.post('/upload', upload.single('file'), uploadProfil);

export default router;
