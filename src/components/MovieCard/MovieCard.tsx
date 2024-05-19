import { Loader } from "@mantine/core";
import { useState } from "react";
import NoPosterSVG from "../SVG/NoPosterSVG";
import StarIcon from "../SVG/StarIcon";
import UserRating from "../UserRating/UserRating";
import styles from "./MovieCard.module.css";
import Image from "next/image";
import Link from "next/link";
import numberToCount from "@/utils/numberToCount";
import generateGenresString from "@/utils/generateGenresString";

export default function MovieCard({ prop, genres, isLoading }: any) {
  const [imageLoader, setImageLoader] = useState({ zIndex: "7" });

  const genresData = prop.genre_ids || prop.genres;

  return (
    <div className={styles.movieCard}>
      {isLoading ? (
        <Loader color="#9854F6" className={styles.loader} />
      ) : (
        <>
          <div className={styles.frame}>
            <Link
              href={"/movies/" + prop.id}
              style={{ textDecoration: "none" }}
            >
              <div className={styles.image}>
                {prop.poster_path ? (
                  <>
                    <div className={styles.loaderBackgrond} />
                    <Loader color="#9854F6" className={styles.loader} />
                    <Image
                      src={"https://image.tmdb.org/t/p/w185" + prop.poster_path}
                      alt={prop.original_title}
                      priority={true}
                      fill={true}
                      sizes="(max-width: 120px) 100vw"
                      style={imageLoader}
                      onLoad={() => {
                        setImageLoader({ zIndex: "10" });
                      }}
                    />
                  </>
                ) : (
                  <div className={styles.noPoster}>
                    <NoPosterSVG />
                    <p className={styles.noPosterP}>{"No Poster"}</p>
                  </div>
                )}
              </div>
            </Link>
            <div className={styles.movieDescription}>
              <div className={styles.nameDateRating}>
                <Link
                  href={"/movies/" + prop.id}
                  style={{ textDecoration: "none" }}
                >
                  <p className={styles.name}>{prop.original_title}</p>
                </Link>
                <p className={styles.date}>
                  {prop.release_date
                    ? prop.release_date.substring(0, 4)
                    : "no data"}
                </p>
                <div className={styles.ratingFull}>
                  <div className={styles.ratingFrame}>
                    <StarIcon color={"#FAB005"} />
                    <p className={styles.ratingStar}>
                      {prop.vote_average ? prop.vote_average.toFixed(1) : 0}
                    </p>
                  </div>
                  <p className={styles.ratingCount}>
                    {numberToCount(prop.vote_count)}
                  </p>
                </div>
              </div>
              <div className={styles.genresFrame}>
                <p className={styles.genres}>{"Genres"}</p>
                <p className={styles.genresData}>
                  {generateGenresString(genresData, genres)}
                </p>
              </div>
            </div>
          </div>
          <UserRating prop={prop} />
        </>
      )}
    </div>
  );
}
