// src/store/index.ts
import { configureStore } from "@reduxjs/toolkit";
import { libraryApi } from "./apis/library-api";

export const store = configureStore({
  reducer: {
    [libraryApi.reducerPath]: libraryApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(libraryApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
