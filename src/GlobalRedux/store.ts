"use client";
import { configureStore } from "@reduxjs/toolkit";
import { barbecueSlice } from "./Features";

export const store = configureStore({
  reducer: {
    barbecue: barbecueSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
