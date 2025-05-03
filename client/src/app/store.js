import { configureStore } from "@reduxjs/toolkit";
import rootReducer from "./rootReducer"; // Adjust the path as necessary
import { authApi } from "@/features/api/authApi";
import { courseApi } from "@/features/api/courseApi";
import { purchaseApi } from "@/features/api/purchaseApi";
import { courseProgressApi } from "@/features/api/courseProgressApi";
import { certificateApi } from "@/features/api/certificateApi"; // 🟢 IMPORT MISSING API

export const appStore = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      authApi.middleware,
      courseApi.middleware,
      purchaseApi.middleware,
      courseProgressApi.middleware,
      certificateApi.middleware // 🟢 ADD MISSING MIDDLEWARE HERE
    ),
});

const initializeApp = async () => {
  await appStore.dispatch(
    authApi.endpoints.loadUser.initiate({}, { forceRefetch: true })
  );
};
initializeApp();
