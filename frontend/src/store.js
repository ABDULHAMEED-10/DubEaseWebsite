import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";

const middleware = [thunk];

const reducer = {
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
};

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
