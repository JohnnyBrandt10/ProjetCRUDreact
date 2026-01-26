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
      return thunkAPI.rejectWithValue(err.message);
    }
  }
);

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
      })

      // UPLOAD
      .addCase(uploadPicture.pending, (state) => {
        state.loading = true;
      })
      .addCase(uploadPicture.fulfilled, (state, action) => {
        state.loading = false;
        state.user.picture = action.payload;
      })
      .addCase(uploadPicture.rejected, (state, action) => {
        state.loading = false;
        state.errors = action.payload;
      });
  }
});

export default userSlice.reducer;
