"use client";

import styles from "./MobileSearchInputs.module.css";
import React, { useEffect, useState } from "react";
import { useQueryState } from "nuqs";
import ScrollableInputFieldMultiselect from "../ScrollableInputFieldMultiselect/ScrollableInputFieldMultiselect";
import ScrollableInputField from "../ScrollableInputField/ScrollableInputField";
import NumberInputField from "../NumberInputField/NumberInputField";
import generateArrayOfYears from "@/utils/generateArrayOfYears";
import generateSortByArray from "@/utils/generateSortByArray";

export default function MobileSearchInputs({ genres, reFetchData }: any) {
  const [valueRatingFrom, setValueRatingFrom] =
    useQueryState("vote_average_gte");
  const [valueRatingTo, setValueRatingTo] = useQueryState("vote_average_lte");
  const [page, setPage] = useQueryState("page");
  const [sortBy, setSortBy] = useQueryState("sort_by");
  const [withGenres, setWithGenres] = useQueryState("with_genres");
  const [primaryReleaseYear, setPrimaryReleaseYear] = useQueryState(
    "primary_release_year"
  );
  const [isResetFiltersButtonDisabled, setIsResetFiltersButtonDisabled] =
    useState(true);

  const onClickResetFilters = () => {
    setValueRatingFrom(null);
    setValueRatingTo(null);
    setSortBy(null);
    setWithGenres(null);
    setPrimaryReleaseYear(null);
    setPage(null);
  };

  useEffect(() => {
    if (
      valueRatingFrom !== null ||
      valueRatingTo !== null ||
      sortBy !== null ||
      withGenres !== null ||
      primaryReleaseYear !== null
    ) {
      setIsResetFiltersButtonDisabled(false);
    } else {
      setIsResetFiltersButtonDisabled(true);
    }
    reFetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [valueRatingFrom, valueRatingTo, sortBy, withGenres, primaryReleaseYear]);

  return (
    <>
      <div className={styles.div}>
        <div className={styles.sortGenres}>
          <p className={styles.p}>{"Genres"}</p>
          <ScrollableInputFieldMultiselect
            value={withGenres}
            setValue={setWithGenres}
            placeHolder={"Select genre"}
            data={genres}
            onChange={() => {
              setPage(null);
            }}
          />
        </div>
        <div className={styles.sortReleaseYear}>
          <p className={styles.p}>{"Release year"}</p>
          <ScrollableInputField
            value={primaryReleaseYear}
            setValue={setPrimaryReleaseYear}
            placeHolder={"Select release year"}
            data={generateArrayOfYears()}
            onChange={() => {
              setPage(null);
            }}
          />
        </div>
        <div className={styles.sortRatings}>
          <p className={styles.p}>{"Ratings"}</p>
          <div className={styles.frameSortRatings}>
            <NumberInputField
              placeholder={"From"}
              maxV={valueRatingTo}
              value={valueRatingFrom}
              setValue={setValueRatingFrom}
              onChange={() => {
                setPage(null);
              }}
            />
            <NumberInputField
              placeholder={"To"}
              minV={valueRatingFrom}
              value={valueRatingTo}
              setValue={setValueRatingTo}
              onChange={() => {
                setPage(null);
              }}
            />
          </div>
        </div>
        <div className={styles.sortBy}>
          <p className={styles.p}>{"Sort by"}</p>
          <ScrollableInputField
            value={sortBy}
            setValue={setSortBy}
            defaultValue={"Most Popular"}
            onChange={() => {
              setPage(null);
            }}
            data={generateSortByArray()}
          />
        </div>
        <div className={styles.sortResetFilters}>
          <button
            onClick={onClickResetFilters}
            className={styles.resetFiltersButton}
            disabled={isResetFiltersButtonDisabled}
          >
            {"Reset filters"}
          </button>
        </div>
      </div>
    </>
  );
}
