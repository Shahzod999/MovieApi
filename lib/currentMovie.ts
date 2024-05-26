"use server";
import { MovieId } from "@/types/types";

export const fetchMovieId = async ({ id }: { id: string }) => {
  let url = `https://www.omdbapi.com/?apikey=fd2c751&i=${id}`;
  const response = await fetch(url);
  const data = await response.json();

  console.log(data);
  return data as MovieId;
};
