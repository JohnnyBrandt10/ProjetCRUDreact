// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user.reducer";
import postReducer from "../reducers/post.reducer";

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
  },
  devTools: true 
});
