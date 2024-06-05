"use client";

import styles from "./CustomPagination.module.css";
import React from "react";
import { Pagination } from "@mantine/core";

export default function CustomPagination({
  total_pages,
  onChange,
  page,
  setPage,
}: any) {
  const total = total_pages > 500 ? 500 : total_pages === 1 ? 0 : total_pages;

  return (
    <div className={styles.pagination}>
      <Pagination
        total={total}
        value={page === null ? 1 : parseInt(page)}
        onChange={(value) => {
          setPage(value.toString());
          onChange();
          document.querySelector("#scrollerToTop")!.scrollIntoView({
            behavior: "smooth",
          });
        }}
        classNames={{ control: styles.control }}
      />
    </div>
  );
}
