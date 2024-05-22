import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import type { PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "./store";

export interface Movie {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export const getMovies = createAsyncThunk("search/getMovies", async (_, { getState }) => {
  const state = getState() as RootState;
  const category = state.search.value;
  const page = state.search.page;
  let url = `https://www.omdbapi.com/?apikey=fd2c751&s=${category}&page=${page}`;
  try {
    const response = await axios.get(url);
    return response.data.Search as Movie[];
  } catch (err) {
    console.log(err);
    throw err;
  }
});

export interface CounterState {
  value: string;
  movies: Movie[];
  isLoading: boolean;
  hasError: boolean;
  page: number;
}

const initialState: CounterState = {
  value: "batman",
  movies: [],
  isLoading: false,
  hasError: false,
  page: 1,
};

export const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    searchAction: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
      state.movies = [];
      state.page = 1;
    },
    incrementPage: (state) => {
      state.page += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getMovies.pending, (state) => {
        state.isLoading = true;
        state.hasError = false;
      })
      .addCase(getMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
        state.movies = [...state.movies, ...action.payload];
        state.isLoading = false;
        state.hasError = false;
      })
      .addCase(getMovies.rejected, (state) => {
        state.hasError = true;
        state.isLoading = false;
      });
  },
});

export const selectedValue = (state: RootState) => state.search.value;
export const selectedMovie = (state: RootState) => state.search.movies;
export const { searchAction, incrementPage } = searchSlice.actions;
export default searchSlice.reducer;
