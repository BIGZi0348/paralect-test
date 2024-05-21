"use client";

import React, { useState, useEffect } from "react";
import { TextInput, Button, Grid, Container, Loader } from "@mantine/core";
import styles from "./page.module.css";
import MovieCard from "@/components/MovieCard/MovieCard";
import IconSearch from "@/components/SVG/IconSearch";
import PaginationRatedMovies from "@/components/PaginationRatedMovies/PaginationRatedMovies";
import RatedMoviesNotFound from "@/components/RatedMoviesNotFound/RatedMoviesNotFound";
import MoviesNotFound from "@/components/MoviesNotFound/MoviesNotFound";
import { readLocalStorageValue } from "@mantine/hooks";
import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { useMediaQuery } from "@mantine/hooks";

const chunk = (array: any[], size: number): any[] => {
  if (array.length === 0) {
    return [];
  }
  const head = array.slice(0, size);
  const tail = array.slice(size);
  return [head, ...chunk(tail, size)];
};

const getData = (indexStorage: any[]) => {
  let data = [];
  try {
    for (let index = 0; index < indexStorage.length; index++) {
      const prop = localStorage.getItem("JSON" + indexStorage[index]);
      data.push(JSON.parse(prop!));
    }
  } catch (error: any) {
    data = [];
  }
  return data;
};

export default function HomePage({ genres }: any) {
  const [indexStorage, setIndexStorage] = useLocalStorage({
    key: "indexStorage",
    defaultValue: [],
  });
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, []);
  const isMediumScreen = useMediaQuery("(max-width: 1250px)");
  const isMobile = useMediaQuery("(max-width: 740px)");
  const [page, setPage] = useState(1);
  const [value, setValue] = useState("");
  const [searching, setSearching] = useState(false);
  const [dataSliced, setDataSliced] = useState<any[]>([]);

  const onClick = () => {
    if (value === "") {
      setSearching(false);
    } else {
      setSearching(true);
    }

    setDataSliced(
      chunk(
        getData(indexStorage).filter((item: any) => {
          return item.original_title
            .toLowerCase()
            .includes(value.toLowerCase());
        }),
        20
      )
    );
  };

  useEffect(() => {
    const tempIndexStorage = readLocalStorageValue<any[]>({
      key: "indexStorage",
    });
    setDataSliced(chunk(getData(tempIndexStorage), 20));
  }, [indexStorage]);

  const getDataRevalidated = async (dataToRevalidate: number[]) => {
    try {
      const res = await axios.post(
        "/api/revalidateRatedMovies",
        dataToRevalidate
      );
      for (let index = 0; index < res.data.length; index++) {
        const element = res.data[index];
        switch (element.responseCode) {
          case 200:
            delete element.responseCode;
            element.timeOfCreation = Date.now();
            localStorage.setItem("JSON" + element.id, JSON.stringify(element));
            break;
          case 429:
            delete element.responseCode;
            const temp = JSON.parse(
              localStorage.getItem("JSON" + element.id) || "{}"
            );
            temp.timeOfCreation = Date.now() - 5 * 60 * 1000; // 5 minutes
            localStorage.setItem("JSON" + element.id, JSON.stringify(temp));
            break;
          default:
            localStorage.removeItem("JSON" + element.id);
            localStorage.removeItem("UserRating" + element.id);
            break;
        }
      }
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    type element = { id: number; timeOfCreation: number };
    const tempIndexStorage = readLocalStorageValue<any[]>({
      key: "indexStorage",
    });
    const data = chunk(getData(tempIndexStorage), 20);
    if (data.length !== 0) {
      const temp: element[] = [];
      data[page - 1].map((element: element) => {
        temp.push({ id: element.id, timeOfCreation: element.timeOfCreation });
      });
      const dataToRevalidate = temp
        .filter((element: element) => {
          return Date.now() - element.timeOfCreation > 6 * 60 * 60 * 1000; // 6 hours
        })
        .map((element: element) => {
          return element.id;
        });

      if (dataToRevalidate.length !== 0) {
        getDataRevalidated(dataToRevalidate);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [page]);

  const items = () => {
    let result = [];
    for (let index = 0; index < dataSliced[page - 1].length; index++) {
      const element = dataSliced[page - 1][index];
      result.push(
        <Grid.Col
          span={isMediumScreen ? 12 : 6}
          key={element.id.toString()}
          style={{ overflowAnchor: "none" }}
        >
          <MovieCard isLoading={false} prop={element} genres={genres} />
        </Grid.Col>
      );
    }
    return result;
  };

  return (
    <>
      {!searching && dataSliced.length === 0 ? (
        isServer ? (
          <Loader color="#9854F6" className={styles.loader} />
        ) : (
          <div className={styles.ratedMoviesNotFound}>
            <RatedMoviesNotFound />
          </div>
        )
      ) : (
        <div className={styles.test}>
          <div id="top" className={styles.frame1}>
            <div className={styles.divTop}>
              <p className={styles.p}>{"Rated movies"}</p>
              <TextInput
                size={"48px"}
                radius="8px"
                placeholder="Search movie title"
                value={value}
                onChange={(event) => setValue(event.currentTarget.value)}
                leftSectionWidth={35}
                leftSection={<IconSearch />}
                rightSectionWidth={100}
                rightSection={
                  <Button onClick={onClick} className={styles.buttonSearch}>
                    <p className={styles.p1}>{"Search"}</p>
                  </Button>
                }
                classNames={{ input: styles.TextInputSearch }}
              />
            </div>
          </div>
          <div className={styles.frame2RatedMovies}>
            {dataSliced.length === 0 ? (
              <MoviesNotFound />
            ) : (
              <Container fluid className={styles.movies}>
                <Grid>{items()}</Grid>
              </Container>
            )}
            <PaginationRatedMovies
              page={page}
              setPage={setPage}
              total_pages={dataSliced.length}
            />
          </div>
        </div>
      )}
    </>
  );
}
