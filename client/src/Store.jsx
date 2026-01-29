// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user.slice";
import postReducer from "../reducers/post.slice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer
  },
  devTools: true 
});
