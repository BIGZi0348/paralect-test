"use server";

import styles from "./MoviePage.module.css";
import React from "react";
import Image from "next/image";
import { Breadcrumbs, Divider, Loader } from "@mantine/core";
import Link from "next/link";
import IconClapperboard from "@/components/SVG/IconClapperboard";
import MovieCardBig from "@/components/MovieCardBig/MovieCardBig";
import YoutubeComponent from "@/components/YoutubeComponent/YoutubeComponent";

export default async function MoviePage({ prop }: any) {
  const breadcrumbs = (
    <>
      <Link href={"/movies"} key={0} className={styles.link0}>
        {"Movies"}
      </Link>
      <Link href={"/movies/" + prop.id} key={1} className={styles.link1}>
        {prop.original_title}
      </Link>
    </>
  );

  const getYoutubeVideoURL = () => {
    const result = prop.videos.results.find(
      (element: any) => element.type === "Trailer"
    );

    if (result === undefined) {
      return null;
    }

    return result.key;
  };

  const youtubeVideoURL = getYoutubeVideoURL();

  return (
    <div className={styles.frame}>
      <Breadcrumbs classNames={{ root: styles.breadcrumbsRoot }}>
        {breadcrumbs}
      </Breadcrumbs>
      <MovieCardBig prop={prop} />
      {youtubeVideoURL === null &&
      prop.overview === "" &&
      prop.production_companies.length === 0 ? (
        <></>
      ) : (
        <div className={styles.trailerDescriptionProduction}>
          {youtubeVideoURL === null ? (
            <></>
          ) : (
            <>
              <div className={styles.trailer}>
                <p className={styles.p1}>{"Trailer"}</p>
                <div className={styles.youtubeBackground}>
                  <Loader color="#9854F6" className={styles.loader} />
                  <div className={styles.youtubeWrapper}>
                    <YoutubeComponent
                      className={styles.youtube}
                      youtubeVideoURL={youtubeVideoURL}
                    />
                  </div>
                </div>
              </div>
              <Divider
                style={{
                  width: "100%",
                  marginTop: "20px",
                  marginBottom: "20px",
                }}
              />
            </>
          )}
          {prop.overview === "" ? (
            <></>
          ) : (
            <div className={styles.description}>
              <p className={styles.p1}>{"Description"}</p>
              <p className={styles.p2}>{prop.overview}</p>
            </div>
          )}
          {prop.production_companies.length === 0 ? (
            <></>
          ) : (
            <>
              {prop.overview === "" && youtubeVideoURL === null ? (
                <></>
              ) : (
                <Divider
                  style={{
                    width: "100%",
                    marginTop: "20px",
                    marginBottom: "20px",
                  }}
                />
              )}
              <div className={styles.production}>
                <p className={styles.productionP}>{"Production"}</p>
                <div className={styles.producers}>
                  {prop.production_companies.map((item: any) => (
                    <div key={item.id.toString()} className={styles.producer}>
                      <div className={styles.producerIcon}>
                        <div className={styles.circle}>
                          {item.logo_path ? (
                            <Image
                              src={
                                "https://image.tmdb.org/t/p/w154" +
                                item.logo_path
                              }
                              alt={item.name}
                              priority={true}
                              fill={true}
                              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                              style={{ objectFit: "contain" }}
                            />
                          ) : (
                            <div className={styles.producerNoIconHolder}>
                              <IconClapperboard />
                            </div>
                          )}
                        </div>
                      </div>
                      <p className={styles.p3}>{item.name}</p>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
