import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { RootState } from "../lib/store";
import { MovieId } from "@/types/types";

export interface Rating {
  Source: string;
  Value: string;
}

export const getMovieId = createAsyncThunk("movieId/getMovieId", async ({ id }: { id: string }) => {
  let url = `https://www.omdbapi.com/?apikey=fd2c751&i=${id}`;

  try {
    const response = await axios.get(url);
    return response.data as MovieId[];
  } catch (err) {
    throw err;
  }
});

export interface MovieIdState {
  currentMovie: MovieId[];
  isLoading: boolean;
  hasError: boolean;
}

const initialState: MovieIdState = {
  currentMovie: [],
  isLoading: false,
  hasError: false,
};

export const getMovieIdSlice = createSlice({
  name: "movieId",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getMovieId.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getMovieId.fulfilled, (state, action: PayloadAction<MovieId[]>) => {
        state.currentMovie = action.payload;
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getMovieId.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export const selectedMovieId = (state: RootState) => state.movieId.currentMovie;
export default getMovieIdSlice.reducer;
