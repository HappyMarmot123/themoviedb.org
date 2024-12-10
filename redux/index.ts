import { configureStore } from "@reduxjs/toolkit";
import MovieSlice from "./movieSlice";
import IdSlice from "./idSlice";

export const store = configureStore({
  reducer: {
    movie: MovieSlice,
    id: IdSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
