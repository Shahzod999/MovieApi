"use server";
import { MovieId } from "@/types/types";

export const fetchMovieId = async ({ id }: { id: string }) => {
  let url = `https://www.omdbapi.com/?apikey=fd2c751&i=${id}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    if (data.Response === "False") {
      throw new Error(data.Error || "Invalid request");
    }
    return data as MovieId;
  } catch (err) {
    throw err;
  }
};

// { Response: 'False', Error: 'Incorrect IMDb ID.' } redsss
