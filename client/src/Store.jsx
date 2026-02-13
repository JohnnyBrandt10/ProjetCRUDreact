// store.js
import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../reducers/user.slice";
import postReducer from "../reducers/post.slice"
import errorReducer from "../reducers/errors.slice"

export const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    error: errorReducer
  },
  devTools: true 
});
