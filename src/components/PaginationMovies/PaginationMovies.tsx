"use client";

import React from "react";
import { useQueryState } from "nuqs";
import CustomPagination from "../CustomPagination/CustomPagination";

export default function PaginationMovies({ total_pages, reFetchData }: any) {
  const [page, setPage] = useQueryState("page");

  return (
    <CustomPagination
      total_pages={total_pages}
      onChange={reFetchData}
      page={page}
      setPage={setPage}
    />
  );
}
