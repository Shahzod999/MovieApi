"use client";
import React from "react";
import { useSelector } from "react-redux";
import AnimeCard from "./AnimeCard";
import { selectedError, selectedMovie } from "@/lib/SearchSlice";

const Movies = () => {
  const movies = useSelector(selectedMovie);
  const error = useSelector(selectedError);

  if (error) {
    return <div>...404 not found</div>;
  }
  return (
    <>
      {movies?.map((movie, index) => (
        <AnimeCard key={movie.imdbID} movie={movie} index={index} />
      ))}
    </>
  );
};

export default Movies;
