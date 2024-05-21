"use client";

import Link from "next/link";
import NoRatedMovies from "../SVG/NoRatedMovies";
import styles from "./RatedMoviesNotFound.module.css";
import { Button } from "@mantine/core";

export default function RatedMoviesNotFound() {
  return (
    <div className={styles.div}>
      <NoRatedMovies className={styles.noRatedMovies} />
      <div className={styles.frame}>
        <p className={styles.p}>{"You haven't rated any films yet"}</p>
        <Link href={"/movies"}>
          <Button className={styles.button}>
            <p className={styles.pButton}>{"Find movies"}</p>
          </Button>
        </Link>
      </div>
    </div>
  );
}
