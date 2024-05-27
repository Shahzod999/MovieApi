import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./SearchSlice";
import getMovieIdReducer from "@/atrash/getMovieIdSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    movieId: getMovieIdReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
