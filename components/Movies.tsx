"use client";
import { RootState } from "@/lib/store";
import React from "react";
import { useSelector } from "react-redux";
import AnimeCard from "./AnimeCard";

const Movies = () => {
  const movies = useSelector((state: RootState) => state.search.movies);

  return (
    <>
      {movies?.map((movie, index) => (
        <AnimeCard key={movie.imdbID} movie={movie} index={index} />
      ))}
    </>
  );
};

export default Movies;
