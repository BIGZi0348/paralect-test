"use server";

import MoviePage from "./MoviePage";
import { Metadata } from "next";
import { notFound } from "next/navigation";
import { z } from "zod";

const schemaForValidation = z.number().int().nonnegative().max(10000000);

const getData = async (movieId: string) => {
  try {
    // if validation fails - throws an error
    const movieIdNumber = schemaForValidation.parse(parseInt(movieId));
    const res = await fetch(
      "https://api.themoviedb.org/3/movie/" +
        movieIdNumber +
        "?append_to_response=videos&language=en-US",
      {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization: "Bearer " + process.env.TMDB_API_KEY,
        },
        next: { revalidate: 6 * 60 * 60 }, // 6 hours
      }
    );
    let data = await res.json();
    if (data.success === false) {
      data = null;
    }
    return data;
  } catch (error: any) {
    return null;
  }
};

export async function generateMetadata({ params }: any): Promise<Metadata> {
  const data = await getData(params.id);
  if (data === null) {
    return {
      title: "404",
      description: "Page not found",
    };
  }
  return {
    title: data.original_title,
    description: data.overview,
  };
}

export default async function Movie({ params }: any) {
  const data = await getData(params.id);
  if (data === null) {
    return notFound();
  }

  return <MoviePage prop={data} />;
}
