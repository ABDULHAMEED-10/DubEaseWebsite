import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import { forgotPasswordReducer, profileReducer, userReducer } from "./reducers/userReducer";
import { dubbingReducer } from "./reducers/dubbingReducer";


const middleware = [thunk];

const reducer = {
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  generateDub:dubbingReducer,


};

const store = configureStore({
  reducer,
  middleware,
  devTools: process.env.NODE_ENV !== "production",
});

export default store;
