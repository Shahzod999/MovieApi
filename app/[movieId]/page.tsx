import MovieCard from "@/components/MovieCard";
import LoadMore from "@/components/LoadMore";
import SliderMovie from "@/components/SliderMovie";
import { fetchMovieId } from "@/lib/currentMovie";
import Link from "next/link";
import React from "react";

interface CurrentMovieProps {
  params: {
    movieId: string;
  };
}

async function CurrentMovie({ params }: CurrentMovieProps) {
  let currentMovie;

  try {
    currentMovie = await fetchMovieId({ id: params.movieId });
  } catch (error) {
    return (
      <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
        <h1 className="text-3xl text-white font-bold">404 - Movie Not Found</h1>
        <Link href="/" className="text-gray-500 underline">
          Go back to Home
        </Link>
      </main>
    );
  }

  return (
    <main className="sm:p-16 py-16 px-8 flex flex-col gap-10">
      <h2 className="text-3xl text-white font-bold">
        <Link href="/">Home / </Link>
        <Link href="#">{currentMovie.Title}</Link>
      </h2>
      <section className="grid gap-20 grid-cols-3 items-center">
        <MovieCard movie={currentMovie} index={1} />

        <div className="col-span-2">
          {/* Object.entries для преобразования объекта currentMovie в массив пар [ключ, значение], который затем используется в map для генерации JSX: */}
          {Object.entries(currentMovie).map(([key, value], index) => {
            // проверяем, является ли value массивом.  например у нас Rating отдельный массив
            // Если значение это массив (например, Ratings), обрабатываем отдельно
            if (Array.isArray(value)) {
              return value.map((item, subIndex) => (
                <p key={`${index}-${subIndex}`}>
                  {item.Source} -<span> {item.Value}</span>
                </p>
              ));
            }
            // Игнорируем поля с картинками (например, Poster)
            if (key === "Poster") {
              return null;
            }
            // выдаваемый продукт бро
            return (
              <div key={index} className="flex gap-2 leading-relaxed">
                <p className="text-gray-400">{key}</p>
                <span>-</span>
                <span className="font-semibold">{value}</span>
              </div>
            );
          })}
        </div>
      </section>
      <SliderMovie />
      <LoadMore />
    </main>
  );
}

export default CurrentMovie;
