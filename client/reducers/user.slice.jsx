import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// Actions
export const getUser = createAsyncThunk('user/getUser', async (uid) => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}api/user/${uid}`);
  return res.data;
});

export const uploadPicture = createAsyncThunk(
  'user/uploadPicture',
  async ({ data, id }, thunkAPI) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}api/user/upload`,
        data
      );

      if (res.data.errors) {
        return thunkAPI.rejectWithValue(res.data.errors);
      }

      const userRes = await axios.get(
        `${import.meta.env.VITE_API_URL}api/user/${id}`
      );

      return userRes.data.picture;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response?.data?.errors || err.response?.data || "Erreur serveur");
    }
  }
);

export const updateBio = createAsyncThunk(
  'user/updateBio',
  async ({ userId, bio }, thunkAPI) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}api/user/${userId}`,
        { bio }
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const getUsers = createAsyncThunk('user/getUsers', async () => {
  const res = await axios.get(`${import.meta.env.VITE_API_URL}api/user`);
  return res.data;
});

export const followUser = createAsyncThunk(
  'user/followUser',
  async ({ followerId, idToFollow }, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}api/user/follow/${followerId}`,
        { idToFollow }
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

export const unfollowUser = createAsyncThunk(
  'user/unfollowUser',
  async ({ followerId, idToUnFollow }, thunkAPI) => {
    try {
      const res = await axios.patch(
        `${import.meta.env.VITE_API_URL}api/user/unfollow/${followerId}`,
        { idToUnFollow }
      );

      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);



//==================================SLICE======================================//

// Slice/Reducers
const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: null,
    loading: false,
    errors: null
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // GET USER
      .addCase(getUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });

    builder
      // UPLOAD
      .addCase(uploadPicture.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadPicture.fulfilled, (state, action) => {
        state.loading = false;
        state.user.picture = action.payload;
      })
      .addCase(uploadPicture.rejected, (state) => {
        state.loading = false;
      });

    builder
      // UPDATE BIO
      .addCase(updateBio.pending, (state) => {
        state.loading = true;
      })
      .addCase(updateBio.fulfilled, (state, action) => {
        state.loading = false;
        state.user.bio = action.payload.bio;
      })
      .addCase(updateBio.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });

    builder
      // GET USERS
      .addCase(getUsers.pending, (state) => {
        state.loading = true;
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.loading = false;
        state.users = action.payload;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });

    builder
      // FOLLOWUSER
      .addCase(followUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });

    builder
      // UNFOLLOWUSER
      .addCase(unfollowUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
      });

  }
});

export default userSlice.reducer;
