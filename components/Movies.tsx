"use client";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
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
        <MovieCard key={movie.imdbID} movie={movie} index={index} />
      ))}
    </>
  );
};

export default Movies;
