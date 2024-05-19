"use server";

import type { Metadata } from "next";
import MoviesPage from "./MoviesPage";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Movies",
    description: "Do or do not. There is no try",
  };
}

const getData = async (searchParams: any) => {
  try {
    const url =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US" +
      (searchParams.page ? "&page=" + searchParams.page : "") +
      (searchParams.primary_release_year
        ? "&primary_release_year=" + searchParams.primary_release_year
        : "") +
      (searchParams.sort_by ? "&sort_by=" + searchParams.sort_by : "") +
      (searchParams.vote_average_gte
        ? "&vote_average.gte=" + searchParams.vote_average_gte
        : "") +
      (searchParams.vote_average_lte
        ? "&vote_average.lte=" + searchParams.vote_average_lte
        : "") +
      (searchParams.with_genres
        ? "&with_genres=" + searchParams.with_genres
        : "");

    const res = await fetch(url, {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: "Bearer " + process.env.TMDB_API_KEY,
      },
      next: { revalidate: 5 * 60 }, // 5 minutes
    });
    let data = await res.json();
    if (data.success === false) {
      data = null;
    }
    return data;
  } catch (error: any) {
    console.error(error);
    return null;
  }
};

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

export default async function Movies({ searchParams }: any) {
  const data = await getData(searchParams);
  const genres = await getGenres();
  return <MoviesPage data={data} genres={genres} />;
}
