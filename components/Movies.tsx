"use client";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { selectedMovie } from "@/lib/SearchSlice";

const Movies = () => {
  const movies = useSelector(selectedMovie);

  return (
    <>
      {movies?.map((movie, index) => (
        <MovieCard key={movie.imdbID} movie={movie} index={index} />
      ))}
    </>
  );
};

export default Movies;
