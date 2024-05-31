"use client";
import { useSelector } from "react-redux";
import MovieCard from "./MovieCard";
import { selectedMovie } from "@/lib/SearchSlice";

const Movies = () => {
  const movies = useSelector(selectedMovie);

  return (
    <section className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
      {movies?.map((movie, index) => (
        <MovieCard key={movie.imdbID} movie={movie} index={index} />
      ))}
    </section>
  );
};

export default Movies;
