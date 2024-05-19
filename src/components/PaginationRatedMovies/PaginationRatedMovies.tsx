"use client";

import React from "react";
import CustomPagination from "../CustomPagination/CustomPagination";

export default function PaginationMovies({
  page,
  setPage,
  total_pages,
  onChange,
}: any) {
  if (typeof onChange === "undefined") {
    onChange = () => {};
  }

  return (
    <CustomPagination
      total_pages={total_pages}
      onChange={onChange}
      page={page}
      setPage={setPage}
    />
  );
}
