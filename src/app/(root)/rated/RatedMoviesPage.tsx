"use client";

import React, { useState, useEffect } from "react";
import { TextInput, Button, Grid, Container, Loader } from "@mantine/core";
import styles from "./RatedMoviesPage.module.css";
import MovieCard from "@/components/MovieCard/MovieCard";
import IconSearch from "@/components/SVG/IconSearch";
import PaginationRatedMovies from "@/components/PaginationRatedMovies/PaginationRatedMovies";
import RatedMoviesNotFound from "@/components/RatedMoviesNotFound/RatedMoviesNotFound";
import MoviesNotFound from "@/components/MoviesNotFound/MoviesNotFound";
import { readLocalStorageValue } from "@mantine/hooks";
import { useLocalStorage } from "@mantine/hooks";
import axios from "axios";
import { useMediaQuery } from "@mantine/hooks";

// creates array to paginate
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

export default function RatedMoviesPage({ genres }: any) {
  const [indexStorage, setIndexStorage] = useLocalStorage({
    key: "indexStorage",
    defaultValue: [],
  });
  const [isServer, setIsServer] = useState(true);
  useEffect(() => {
    setIsServer(false);
  }, []);
  const isMediumScreen = useMediaQuery("(max-width: 1250px)");
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
            // fetch completed, replacing data with a fresh one
            delete element.responseCode;
            element.timeOfCreation = Date.now();
            localStorage.setItem("JSON" + element.id, JSON.stringify(element));
            break;
          case 429:
            // fetch failed due to rate limit, try again in 5 minutes
            delete element.responseCode;
            const temp = JSON.parse(
              localStorage.getItem("JSON" + element.id) || "{}"
            );
            temp.timeOfCreation = Date.now() - 5 * 60 * 1000; // 5 minutes
            localStorage.setItem("JSON" + element.id, JSON.stringify(temp));
            break;
          case 404:
            // fetch faild due to absence of movie with such id,
            // deleting corresponding element in local storage
            localStorage.removeItem("JSON" + element.id);
            localStorage.removeItem("UserRating" + element.id);
            break;
          default:
            // on unknown response code, try again in 1 hour
            delete element.responseCode;
            const tempDefault = JSON.parse(
              localStorage.getItem("JSON" + element.id) || "{}"
            );
            tempDefault.timeOfCreation = Date.now() - 60 * 60 * 1000; // 1 hour
            localStorage.setItem(
              "JSON" + element.id,
              JSON.stringify(tempDefault)
            );
            break;
        }
      }
    } catch (error: any) {
      // do nothing on error
    }
  };

  // creates list of rated films
  // on page load and on local storage change
  useEffect(() => {
    const tempIndexStorage = readLocalStorageValue<any[]>({
      key: "indexStorage",
    });
    setDataSliced(chunk(getData(tempIndexStorage), 20));
  }, [indexStorage]);

  // cheсks of any data in local storage is outdated
  // on page load and on pagination change
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
        <div className={styles.frameMain}>
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
                classNames={{
                  root: styles.textInputRoot,
                  input: styles.textInputSearch,
                }}
              />
            </div>
          </div>
          <div className={styles.frame2}>
            {dataSliced.length === 0 ? (
              <MoviesNotFound />
            ) : (
              <Container fluid className={styles.movies}>
                <Grid classNames={{ root: styles.gridRoot }}>{items()}</Grid>
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
