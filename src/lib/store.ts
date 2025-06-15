import { configureStore } from "@reduxjs/toolkit";
import markerReducer from "@/lib/slices/markerSlice";
import polygonReducer from "./slices/polygonSlice";

export const store = configureStore({
  reducer: {
    marker: markerReducer,
    polygon: polygonReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});

// Infer the types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
