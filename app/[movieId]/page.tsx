import AnimeCard from "@/components/AnimeCard";
import { fetchMovieId } from "@/lib/currentMovie";
import Link from "next/link";
import React from "react";

interface CurrentMovieProps {
  params: {
    movieId: string;
  };
}

async function CurrentMovie({ params }: CurrentMovieProps) {
  const currentMovie = await fetchMovieId({ id: params.movieId });

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold">
        <Link href="/">Home / </Link>
        <Link href="#">{currentMovie.Title}</Link>
      </h2>
      <section className="grid grid-cols-2 place-items-center">
        <AnimeCard movie={currentMovie} index={1} />
        <div>{currentMovie.Rated}</div>
      </section>
    </main>
  );
}

export default CurrentMovie;
