"use server";

import NoPosterSVG from "../SVG/NoPosterSVG";
import StarIcon from "../SVG/StarIcon";
import UserRating from "../UserRating/UserRating";
import styles from "./MovieCardBig.module.css";
import dateFormat from "dateformat";
import numberToDuration from "@/utils/numberToDuration";
import numberToCost from "@/utils/numberToCost";
import numberToCount from "@/utils/numberToCount";
import { Loader } from "@mantine/core";
import Image from "next/image";
import generateGenresString from "@/utils/generateGenresString";

export default async function MovieCardBig({ prop }: any) {
  return (
    <div className={styles.movieCard}>
      <div className={styles.nameDateRatingMobile}>
        <div className={styles.nameDateRating}>
          <p className={styles.name}>{prop.original_title}</p>
          <p className={styles.date}>
            {prop.release_date ? prop.release_date.substring(0, 4) : "no data"}
          </p>
          <div className={styles.ratingFull}>
            <div className={styles.ratingFrame}>
              <StarIcon color={"#FAB005"} />
              <p className={styles.ratingStar}>
                {prop.vote_average.toFixed(1)}
              </p>
            </div>
            <p className={styles.ratingCount}>
              {numberToCount(prop.vote_count)}
            </p>
          </div>
        </div>
        <UserRating prop={prop} />
      </div>
      <div className={styles.frame}>
        <div className={styles.imageFrame}>
          {prop.poster_path ? (
            <>
              <Loader color="#9854F6" className={styles.loader} />
              <Image
                className={styles.image}
                fill
                style={{ zIndex: "10" }}
                src={"https://image.tmdb.org/t/p/original" + prop.poster_path}
                alt={prop.original_title}
                priority={true}
                sizes="(max-width: 250px) 100vw"
              />
            </>
          ) : (
            <div className={styles.noPoster}>
              <NoPosterSVG />
              <p className={styles.noPosterP}>{"No Poster"}</p>
            </div>
          )}
        </div>
        <div className={styles.movieDescription}>
          <div className={styles.nameDateRating}>
            <p className={styles.name}>{prop.original_title}</p>
            <p className={styles.date}>
              {prop.release_date
                ? prop.release_date.substring(0, 4)
                : "no data"}
            </p>
            <div className={styles.ratingFull}>
              <div className={styles.ratingFrame}>
                <StarIcon color={"#FAB005"} />
                <p className={styles.ratingStar}>
                  {prop.vote_average.toFixed(1)}
                </p>
              </div>
              <p className={styles.ratingCount}>
                {numberToCount(prop.vote_count)}
              </p>
            </div>
          </div>
          <div className={styles.stats}>
            <div className={styles.statsFrame}>
              <p className={styles.statsName}>{"Duration"}</p>
              <p className={styles.statsData}>
                {numberToDuration(prop.runtime)}
              </p>
            </div>
            <div className={styles.statsFrame}>
              <p className={styles.statsName}>{"Premiere"}</p>
              <p className={styles.statsData}>
                {prop.release_date
                  ? dateFormat(Date.parse(prop.release_date), "mmmm d, yyyy")
                  : "no data"}
              </p>
            </div>
            <div className={styles.statsFrame}>
              <p className={styles.statsName}>{"Budget"}</p>
              <p className={styles.statsData}>{numberToCost(prop.budget)}</p>
            </div>
            <div className={styles.statsFrame}>
              <p className={styles.statsName}>{"Gross worldwide"}</p>
              <p className={styles.statsData}>{numberToCost(prop.revenue)}</p>
            </div>
            <div className={styles.statsFrame}>
              <p className={styles.statsName}>{"Genres"}</p>
              <p className={styles.statsData}>
                {generateGenresString(prop.genres)}
              </p>
            </div>
          </div>
        </div>
        <div className={styles.userRating}>
          <UserRating prop={prop} />
        </div>
      </div>
      <div className={styles.statsMobile}>
        <div className={styles.statsFrame}>
          <p className={styles.statsName}>{"Duration"}</p>
          <p className={styles.statsData}>{numberToDuration(prop.runtime)}</p>
        </div>
        <div className={styles.statsFrame}>
          <p className={styles.statsName}>{"Premiere"}</p>
          <p className={styles.statsData}>
            {prop.release_date
              ? dateFormat(Date.parse(prop.release_date), "mmmm d, yyyy")
              : "no data"}
          </p>
        </div>
        <div className={styles.statsFrame}>
          <p className={styles.statsName}>{"Budget"}</p>
          <p className={styles.statsData}>{numberToCost(prop.budget)}</p>
        </div>
        <div className={styles.statsFrame}>
          <p className={styles.statsName}>{"Gross worldwide"}</p>
          <p className={styles.statsData}>{numberToCost(prop.revenue)}</p>
        </div>
        <div className={styles.statsFrame}>
          <p className={styles.statsName}>{"Genres"}</p>
          <p className={styles.statsData}>
            {generateGenresString(prop.genres)}
          </p>
        </div>
      </div>
    </div>
  );
}
