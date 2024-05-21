"use server";

import AnimeCard, { AnimeProp } from "@/components/AnimeCard";

export const fetchMovie = async (page: number, category: string) => {
  const response = await fetch(`https://www.omdbapi.com/?apikey=fd2c751&s=${category}&page=${page}`);
  const data = await response.json();

  return data.Search.map((item: AnimeProp, index: number) => <AnimeCard key={item.imdbID} anime={item} index={index} />);
};
