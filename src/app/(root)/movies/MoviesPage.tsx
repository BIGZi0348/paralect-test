"use client";

import React, { Suspense, useTransition } from "react";
import { useRouter } from "next/navigation";
import styles from "./page.module.css";
import MoviesNotFound from "@/components/MoviesNotFound/MoviesNotFound";
import SearchInputs from "@/components/SearchInputs/SearchInputs";
import PaginationMovies from "@/components/PaginationMovies/PaginationMovies";
import { Container, Grid } from "@mantine/core";
import MovieCard from "@/components/MovieCard/MovieCard";

export default function MoviesPage({ data, genres }: any) {
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
    <div className={styles.test}>
      <div id="top" className={styles.frame1}>
        <div className={styles.divTop}>
          <p className={styles.p}>{"Movies"}</p>
        </div>
      </div>
      <div className={styles.frame2Movies}>
        <Suspense>
          <SearchInputs reFetchData={reFetchData} genres={genres} />
        </Suspense>

        {data === null || data.results.length === 0 ? (
          <MoviesNotFound />
        ) : (
          <>
            <Container fluid className={styles.movies}>
              <Grid>
                {data.results.map((item: any) => (
                  <Grid.Col
                    span={6}
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
  );
}
