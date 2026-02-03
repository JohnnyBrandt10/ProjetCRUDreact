import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

// GET POSTS
export const getPosts = createAsyncThunk('post/getPosts', async (num) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}api/post/`);
  return {
    posts: res.data.slice(0, num),
    allPosts: res.data
  };
});

// LIKE
export const likePost = createAsyncThunk(
  'post/likePost',
  async ({ postId, userId }) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}api/post/like-post/${postId}`,
      { id: userId }
    );
    return { postId, userId };
  }
);

// UNLIKE
export const unlikePost = createAsyncThunk(
  'post/unlikePost',
  async ({ postId, userId }) => {
    await axios.patch(
      `${import.meta.env.VITE_API_URL}api/post/unlike-post/${postId}`,
      { id: userId }
    );
    return { postId, userId };
  }
);

// UPDATE-POST
export const updatePost = createAsyncThunk(
  'post/updatePost',
  async ({ postId, message }) => {
    await axios.put(`${import.meta.env.VITE_API_URL}api/post/${postId}`, {
      id: message
    });
    return { postId, message };
  }
);

// DELETE-POST
export const deletePost = createAsyncThunk(
  'post/deletePost',
  async ({ postId }) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}api/post/${postId}`);
    return { postId };
  }
);

// ADD-COMMENT
export const addComment = createAsyncThunk(
  'post/addComment',
  async ({ postId, commenterID, commenterPseudo, text }) => {
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}api/post/comment-post/${postId}`,
      { commenterID, commenterPseudo, text }
    );
    return res.data;
  }
);

// EDIT-COMMENT
export const editComment = createAsyncThunk(
  'post/editComment',
  async ({ postId, commentId, text }) => {
    const res = await axios.patch(
      `${import.meta.env.VITE_API_URL}api/post/edit-comment-post/${postId}`,
      { text, commentId }
    );
    return res.data;
  }
);

// =======================================SLICE============================================= //

// SLICE/Reducer
const postSlice = createSlice({
  name: 'post',
  initialState: {
    posts: [],
    allPosts: [],
    loading: false,
    errors: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder

      // GET POSTS
      .addCase(getPosts.pending, (state) => {
        state.loading = true;
      })
      .addCase(getPosts.fulfilled, (state, action) => {
        state.loading = false;
        state.posts = action.payload.posts;
        state.allPosts = action.payload.allPosts;
      })

      // LIKE
      .addCase(likePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                likers: [action.payload.userId, ...post.likers]
              }
            : post
        );
      })

      // UNLIKE
      .addCase(unlikePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                likers: post.likers.filter((id) => id !== action.payload.userId)
              }
            : post
        );
      })

      // UPDATEPOST
      .addCase(updatePost.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload.postId
            ? {
                ...post,
                message: action.payload.message
              }
            : post
        );
      })

      // DELETEPOST
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter(
          (post) => post._id !== action.payload.postId
        );
      })

      // ADD-COMMENT
      .addCase(addComment.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
      })

      // EDIT-COMMENT
      .addCase(editComment.fulfilled, (state, action) => {
        const { postId, commentId, text } = action.payload;
        state.posts = state.posts.map((post) => {
          if (post._id === postId) {
            return {
              ...post,
              comments: post.comments.map((comment) =>
                comment._id === commentId
                  ? { ...comment, text } 
                  : comment
              )
            };
          }
          return post;
        });
      });
  }
});

export default postSlice.reducer;
