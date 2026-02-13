import { createSlice } from "@reduxjs/toolkit";
import { addPost } from "../reducers/post.slice";
import { uploadPicture } from "./user.slice";

const initialState = {
  userError: [],
  postError: []
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    clearErrors: (state) => {
      state.userError = [];
      state.postError = [];
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(addPost.rejected, (state, action) => {
        state.postError = action.payload;
      })
      .addCase(addPost.fulfilled, (state) => {
        state.postError = [];
      })

      .addCase(uploadPicture.rejected, (state, action) => {
        state.userError = action.payload;
      })
      .addCase(uploadPicture.fulfilled, (state) => {
        state.userError = [];
      });
  }
});

export const { clearErrors } = errorSlice.actions;
export default errorSlice.reducer;
