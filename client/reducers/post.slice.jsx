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

// UPDATEPOST
export const updatePost = createAsyncThunk(
  'post/updatePost',
  async ({ postId, message }) => {
    await axios.put(`${import.meta.env.VITE_API_URL}api/post/${postId}`, {
      id: message
    });
    return { postId, message };
  }
);

// DELETEPOST
export const deletePost = createAsyncThunk(
  'post/deletePost',
  async ({ postId }) => {
    await axios.delete(`${import.meta.env.VITE_API_URL}api/post/${postId}`);
    return { postId };
  }
);

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
      });
  }
});

export default postSlice.reducer;
