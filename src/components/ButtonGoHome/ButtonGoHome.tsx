"use client";

import { Button } from "@mantine/core";
import styles from "./ButtonGoHome.module.css";
import Link from "next/link";

export default function ButtonGoHome() {
  return (
    <Link href={"/movies"}>
      <Button className={styles.button}>
        <p className={styles.pButton}>{"Go Home"}</p>
      </Button>
    </Link>
  );
}
