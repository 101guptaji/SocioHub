import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import userReducer from "./slices/userSlice";
import friendsReducer from './slices/friendsSlice';
import postReducer from './slices/postSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        user: userReducer,
        friends: friendsReducer,
        post: postReducer
    },
});

export default store;
