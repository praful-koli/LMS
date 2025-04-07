import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; // Adjust the path as necessary
import { authApi } from "@/features/api/authApi";

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(authApi.middleware),
});