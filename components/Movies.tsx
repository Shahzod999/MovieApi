"use client";
import { getMovies } from "@/lib/SearchSlice";
import { AppDispatch, RootState } from "@/lib/store";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import AnimeCard from "./AnimeCard";

const Movies = () => {
  const dispatch = useDispatch<AppDispatch>();
  const movies = useSelector((state: RootState) => state.search.movies);

  useEffect(() => {
    dispatch(getMovies());
  }, [dispatch]);

  return (
    <>
      {movies?.map((movie, index) => (
        <AnimeCard key={movie.imdbID} movie={movie} index={index} />
      ))}
    </>
  );
};

export default Movies;
