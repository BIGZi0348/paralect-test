"use client";

import styles from "./CustomPagination.module.css";
import React from "react";
import { Pagination } from "@mantine/core";

// #####################################

import { Button } from "@mantine/core";
import { Space } from "@mantine/core";
import IconLeft from "../SVG/IconLeft";
import IconRight from "../SVG/IconRight";

export default function CustomPagination({
  total_pages,
  onChange,
  page,
  setPage,
}: any) {
  // sets total pages to 500 if number more then 500 given
  // and sets it to 0 if it's only 1
  const total = total_pages > 500 ? 500 : total_pages === 1 ? 0 : total_pages;

  // mentor told to make pagination 1 to 1 as it showed on figma
  // despite it being objectively worse in any way
  // just stick to the dummy model filled with errors
  // may God have mercy on my soul

  const scrollOnTop = () => {
    document.querySelector("#scrollerToTop")!.scrollIntoView({
      behavior: "smooth",
    });
  };

  class PaginationHandler {
    private page: number;
    private total_pages: number;

    constructor(page: string, total_pages: number) {
      this.page = page === null ? 1 : parseInt(page);
      this.total_pages = total_pages;
    }

    _page(number: number) {
      switch (this.page) {
        case 1:
          return this.page + number + 1;

        case this.total_pages:
          return this.page + number - 1;

        default:
          return this.page + number;
      }
    }

    isActive(number: number) {
      if (this._page(number) === this.page) {
        return styles.buttonCurrent;
      } else {
        return styles.button;
      }
    }
  }

  const paginationHandler = new PaginationHandler(page, total_pages);

  switch (total) {
    case 0:
      return <></>;
    case 2:
      return (
        <div className={styles.pagination}>
          <Button
            className={styles.button}
            disabled={parseInt(page) === 1 || page === null}
            onClick={() => {
              setPage("1");
              onChange();
              scrollOnTop();
            }}
          >
            <IconLeft
              className={
                parseInt(page) === 1 || page === null
                  ? styles.iconDisabled
                  : styles.icon
              }
            />
          </Button>
          <Space w="8px" />
          <Button
            className={
              parseInt(page) === 1 || page === null
                ? styles.buttonCurrent
                : styles.button
            }
            onClick={() => {
              setPage("1");
              onChange();
              scrollOnTop();
            }}
          >
            {"1"}
          </Button>
          <Space w="8px" />
          <Button
            className={
              parseInt(page) === 2 ? styles.buttonCurrent : styles.button
            }
            onClick={() => {
              setPage("2");
              onChange();
              scrollOnTop();
            }}
          >
            {"2"}
          </Button>
          <Space w="8px" />
          <Button
            className={styles.button}
            disabled={parseInt(page) === 2}
            onClick={() => {
              setPage("2");
              onChange();
              scrollOnTop();
            }}
          >
            <IconRight
              className={
                parseInt(page) === 2 ? styles.iconDisabled : styles.icon
              }
            />
          </Button>
        </div>
      );
    default:
      return (
        <div className={styles.pagination}>
          <Button
            className={styles.button}
            disabled={parseInt(page) === 1 || page === null}
            onClick={() => {
              setPage((parseInt(page) - 1).toString());
              onChange();
              scrollOnTop();
            }}
          >
            <IconLeft
              className={
                parseInt(page) === 1 || page === null
                  ? styles.iconDisabled
                  : styles.icon
              }
            />
          </Button>
          <Space w="8px" />
          <Button
            className={paginationHandler.isActive(-1)}
            onClick={() => {
              setPage(paginationHandler._page(-1).toString());
              onChange();
              scrollOnTop();
            }}
          >
            {paginationHandler._page(-1)}
          </Button>
          <Space w="8px" />
          <Button
            className={paginationHandler.isActive(0)}
            onClick={() => {
              setPage(paginationHandler._page(0).toString());
              onChange();
              scrollOnTop();
            }}
          >
            {paginationHandler._page(0)}
          </Button>
          <Space w="8px" />
          <Button
            className={paginationHandler.isActive(1)}
            onClick={() => {
              setPage(paginationHandler._page(1).toString());
              onChange();
              scrollOnTop();
            }}
          >
            {paginationHandler._page(1)}
          </Button>
          <Space w="8px" />
          <Button
            className={styles.button}
            disabled={parseInt(page) === total}
            onClick={() => {
              setPage((page === null ? 2 : parseInt(page) + 1).toString());
              onChange();
              scrollOnTop();
            }}
          >
            <IconRight
              className={
                parseInt(page) === total ? styles.iconDisabled : styles.icon
              }
            />
          </Button>
        </div>
      );
  }

  // return code below if code above became redundant for some reason

  // return (
  //   <div className={styles.pagination}>
  //     <Pagination
  //       total={total}
  //       value={page === null ? 1 : parseInt(page)}
  //       onChange={(value) => {
  //         setPage(value.toString());
  //         onChange();
  //         document.querySelector("#scrollerToTop")!.scrollIntoView({
  //           behavior: "smooth",
  //         });
  //       }}
  //       classNames={{ control: styles.control }}
  //     />
  //   </div>
  // );
}
