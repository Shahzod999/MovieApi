import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";
import { Movie } from "@/types/allMovieTypes";

export const getMovies = createAsyncThunk("search/getMovies", async (_, { getState }) => {
  const state = getState() as RootState;
  const category = state.search.value;
  const page = state.search.page;

  let url = `https://www.omdbapi.com/?apikey=fd2c751&s=${category}&page=${page}`;
  try {
    const response = await axios.get(url);
    console.log(response.data);

    if (response.data.Error) {
      throw new Error(response.data.Error);
    }
    return response.data.Search as Movie[];
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export interface SearchState {
  value: string;
  movies: Movie[];
  hasError: boolean;
  page: number;
}

const initialState: SearchState = {
  value: "batman",
  movies: [],
  hasError: false,
  page: 1,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchAction: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      console.log(state.value);
      state.movies = [];

      state.hasError = false;
      state.page = 1;
    },
    pageCounter: (state) => {
      state.page++;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.movies = [...state.movies, ...action.payload];
        state.hasError = false;
        console.log(state.movies);
      })
      .addCase(getMovies.rejected, (state) => {
        state.hasError = true;
        console.log(state.movies, "reject");
      });
  },
});

export const selectedValue = (state: RootState) => state.search.value;
export const selectedMovie = (state: RootState) => state.search.movies;
export const selectedError = (state: RootState) => state.search.hasError;

export const { searchAction, pageCounter } = searchSlice.actions;
export default searchSlice.reducer;
