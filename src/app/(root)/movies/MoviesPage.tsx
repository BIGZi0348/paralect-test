"use client";

import React, { Suspense, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./MoviesPage.module.css";
import MoviesNotFound from "@/components/MoviesNotFound/MoviesNotFound";
import SearchInputs from "@/components/SearchInputs/SearchInputs";
import PaginationMovies from "@/components/PaginationMovies/PaginationMovies";
import { Container, Grid, Loader } from "@mantine/core";
import MovieCard from "@/components/MovieCard/MovieCard";
import { useMediaQuery } from "@mantine/hooks";
import MobileSearchButton from "@/components/MobileSearchButton/MobileSearchButton";

export default function MoviesPage({ data, genres }: any) {
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, []);
  const isMediumScreen = useMediaQuery("(max-width: 1250px)");
  const isMobile = useMediaQuery("(max-width: 740px)");
  const [isPending, startTransition] = useTransition();
  const router = useRouter();

  const reFetchData = () => {
    setTimeout(() => {
      startTransition(() => {
        router.refresh();
      });
    });
  };

  return (
    <>
      {isServer ? (
        <Loader color="#9854F6" className={styles.loader} />
      ) : (
        <div className={styles.frameMain}>
          {isMobile ? (
            <></>
          ) : (
            <div className={styles.frame1}>
              <p className={styles.p}>{"Movies"}</p>
            </div>
          )}
          <div className={styles.frame2}>
            {isMobile ? (
              <div className={styles.frame1}>
                <p className={styles.p}>{"Movies"}</p>
                <MobileSearchButton reFetchData={reFetchData} genres={genres} />
              </div>
            ) : (
              <Suspense>
                <SearchInputs reFetchData={reFetchData} genres={genres} />
              </Suspense>
            )}

            {data === null || data.results.length === 0 ? (
              <MoviesNotFound />
            ) : (
              <>
                <Container fluid className={styles.movies}>
                  <Grid classNames={{ root: styles.gridRoot }}>
                    {data.results.map((item: any) => (
                      <Grid.Col
                        span={isMediumScreen ? 12 : 6}
                        key={item.id.toString()}
                        style={{ overflowAnchor: "none" }}
                      >
                        <MovieCard
                          isLoading={isPending}
                          prop={item}
                          genres={genres}
                        />
                      </Grid.Col>
                    ))}
                  </Grid>
                </Container>
                <Suspense>
                  <PaginationMovies
                    reFetchData={reFetchData}
                    total_pages={data.total_pages}
                  />
                </Suspense>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
