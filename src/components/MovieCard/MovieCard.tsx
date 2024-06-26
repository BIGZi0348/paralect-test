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
import { useMediaQuery } from "@mantine/hooks";
import truncateString from "@/utils/truncateString";

export default function MovieCard({ prop, genres, isLoading }: any) {
  const isMobile = useMediaQuery("(max-width: 560px)");
  const [imageLoader, setImageLoader] = useState({ zIndex: "7" });
  const genresData = prop.genre_ids || prop.genres;

  return (
    <div className={styles.movieCard}>
      {isLoading ? (
        <Loader color="#9854F6" className={styles.loader} />
      ) : (
        <>
          {isMobile ? (
            <>
              <div className={styles.frameMobile}>
                <div className={styles.topMobile}>
                  <Link href={"/movies/" + prop.id} className={styles.link}>
                    <p className={styles.name}>
                      {truncateString(prop.original_title, 80)}
                    </p>
                  </Link>
                  <UserRating prop={prop} />
                </div>
                <div className={styles.bottomMobile}>
                  <Link href={"/movies/" + prop.id} className={styles.link}>
                    <div className={styles.image}>
                      {prop.poster_path ? (
                        <>
                          <div className={styles.loaderBackgrond} />
                          <Loader color="#9854F6" className={styles.loader} />
                          <Image
                            src={
                              "https://image.tmdb.org/t/p/w500" +
                              prop.poster_path
                            }
                            alt={prop.original_title}
                            priority={true}
                            fill={true}
                            sizes="(max-width: 768px) 50vw, 33vw"
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
                  <div className={styles.movieDescriptionMobile}>
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
            </>
          ) : (
            <>
              <div className={styles.frame}>
                <Link href={"/movies/" + prop.id} className={styles.link}>
                  <div className={styles.image}>
                    {prop.poster_path ? (
                      <>
                        <div className={styles.loaderBackgrond} />
                        <Loader color="#9854F6" className={styles.loader} />
                        <Image
                          src={
                            "https://image.tmdb.org/t/p/w500" + prop.poster_path
                          }
                          alt={prop.original_title}
                          priority={true}
                          fill={true}
                          sizes="(max-width: 768px) 50vw, 33vw"
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
                    <Link href={"/movies/" + prop.id} className={styles.link}>
                      <p className={styles.name}>
                        {truncateString(prop.original_title, 80)}
                      </p>
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
        </>
      )}
    </div>
  );
}
