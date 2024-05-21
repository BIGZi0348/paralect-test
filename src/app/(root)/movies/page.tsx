"use server";

import type { Metadata } from "next";
import MoviesPage from "./MoviesPage";
import { z } from "zod";
import generateGenresString from "@/utils/generateGenresString";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Movies",
    description: "Bee movie 2 is coming.",
  };
}

const getData = async (searchParams: any, genres: any[]) => {
  try {
    // if validation fails - throws an error
    const schemaForValidationPage = z.number().int().nonnegative().max(500);

    let pageSearch = "";
    if (searchParams.page) {
      const pageParse = parseInt(searchParams.page);
      const pageSafe = schemaForValidationPage.parse(pageParse);
      pageSearch = "&page=" + pageSafe.toString();
    }

    const schemaForValidationYear = z
      .number()
      .int()
      .nonnegative()
      .min(1874)
      .max(2031);

    let primary_release_yearSearch = "";
    if (searchParams.primary_release_year) {
      const primary_release_yearParse = parseInt(
        searchParams.primary_release_year
      );
      const primary_release_yearSafe = schemaForValidationYear.parse(
        primary_release_yearParse
      );
      primary_release_yearSearch =
        "&primary_release_year=" + primary_release_yearSafe.toString();
    }

    const schemaForValidationSort = z.string().toLowerCase().min(11).max(25);

    let sort_bySearch = "";
    if (searchParams.sort_by) {
      const sort_bySafe = schemaForValidationSort.parse(searchParams.sort_by);

      const sortInputs = [
        { label: "Most Popular", value: "popularity.desc" },
        { label: "Least Popular", value: "popularity.asc" },
        { label: "Most Rated", value: "vote_average.desc" },
        { label: "Least Rated", value: "vote_average.asc" },
        { label: "Most Voted", value: "vote_count.desc" },
        { label: "Least Voted", value: "vote_count.asc" },
        { label: "Most Profitable", value: "revenue.desc" },
        { label: "Least Profitable", value: "revenue.asc" },
        { label: "A-Z", value: "original_title.desc" },
        { label: "Z-A", value: "original_title.asc" },
        { label: "Oldest", value: "primary_release_date.asc" },
        { label: "Newest", value: "primary_release_date.desc" },
      ];

      if (
        sortInputs.some((element: { label: string; value: string }) => {
          return element.value === sort_bySafe;
        })
      ) {
        sort_bySearch = "&sort_by=" + sort_bySafe;
      }
    }

    const schemaForValidationVote = z.number().int().nonnegative().max(10);

    let vote_average_gteSearch = "";
    let vote_average_gteSafe;
    if (searchParams.vote_average_gte) {
      const vote_average_gteParse = parseInt(searchParams.vote_average_gte);
      vote_average_gteSafe = schemaForValidationVote.parse(
        vote_average_gteParse
      );
      vote_average_gteSearch =
        "&vote_average.gte=" + vote_average_gteSafe.toString();
    }

    let vote_average_lteSearch = "";
    let vote_average_lteSafe;
    if (searchParams.vote_average_lte) {
      const vote_average_lteParse = parseInt(searchParams.vote_average_lte);
      vote_average_lteSafe = schemaForValidationVote.parse(
        vote_average_lteParse
      );
      vote_average_lteSearch =
        "&vote_average.lte=" + vote_average_lteSafe.toString();
    }

    if (
      vote_average_gteSafe &&
      vote_average_lteSafe &&
      vote_average_gteSafe > vote_average_lteSafe
    ) {
      return null;
    }

    const schemaForValidationGenres = z
      .array(z.number().int().nonnegative().max(100000))
      .max(19);

    let with_genresSearch = "";
    if (searchParams.with_genres) {
      const with_genresParse = JSON.parse("[" + searchParams.with_genres + "]");
      const with_genresSafe = schemaForValidationGenres.parse(with_genresParse);
      if (generateGenresString(with_genresSafe, genres) === "no data") {
        return null;
      }
      with_genresSearch = "&with_genres=" + searchParams.with_genres;
    }

    // end of validation

    const url =
      "https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US" +
      pageSearch +
      primary_release_yearSearch +
      sort_bySearch +
      vote_average_gteSearch +
      vote_average_lteSearch +
      with_genresSearch;

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
    return [
      {
        id: 28,
        name: "Action",
      },
      {
        id: 12,
        name: "Adventure",
      },
      {
        id: 16,
        name: "Animation",
      },
      {
        id: 35,
        name: "Comedy",
      },
      {
        id: 80,
        name: "Crime",
      },
      {
        id: 99,
        name: "Documentary",
      },
      {
        id: 18,
        name: "Drama",
      },
      {
        id: 10751,
        name: "Family",
      },
      {
        id: 14,
        name: "Fantasy",
      },
      {
        id: 36,
        name: "History",
      },
      {
        id: 27,
        name: "Horror",
      },
      {
        id: 10402,
        name: "Music",
      },
      {
        id: 9648,
        name: "Mystery",
      },
      {
        id: 10749,
        name: "Romance",
      },
      {
        id: 878,
        name: "Science Fiction",
      },
      {
        id: 10770,
        name: "TV Movie",
      },
      {
        id: 53,
        name: "Thriller",
      },
      {
        id: 10752,
        name: "War",
      },
      {
        id: 37,
        name: "Western",
      },
    ];
  }
};

export default async function Movies({ searchParams }: any) {
  const genres = await getGenres();
  const data = await getData(searchParams, genres);
  return <MoviesPage data={data} genres={genres} />;
}
