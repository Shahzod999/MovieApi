import { configureStore } from "@reduxjs/toolkit";
import searchReducer from "./SearchSlice";
import getMovieIdReducer from "@/atrash/getMovieIdSlice";
import authReducer from "./authSlice";

export const store = configureStore({
  reducer: {
    search: searchReducer,
    movieId: getMovieIdReducer,
    auth: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
