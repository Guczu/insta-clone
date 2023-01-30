import { configureStore } from "@reduxjs/toolkit";
import userReducer from '../reducers/userSlice'
import themeReducer from '../reducers/themeSlice'

export const store = configureStore({
    reducer: {
        user: userReducer,
        theme: themeReducer,
    }
})