"use server";

import type { Metadata } from "next";
import RatedMoviesPage from "./RatedMoviesPage";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Rated movies",
    description: "Do or do not. There is no try",
  };
}

const getGenres = async () => {
  try {
    const res = await fetch(
      "https://api.themoviedb.org/3/genre/movie/list?language=en",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + process.env.TMDB_API_KEY,
        },
        next: { revalidate: 24 * 60 * 60 }, // 1 day
      }
    );
    const data = await res.json();
    return data.genres;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

export default async function RatedMovies() {
  const genres = await getGenres();
  return <RatedMoviesPage genres={genres} />;
}
