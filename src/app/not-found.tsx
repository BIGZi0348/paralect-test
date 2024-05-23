"use server";

import styles from "./not-found.module.css";
import ColorBlocks from "@/components/ColorBlocks/ColorBlocks";
import ButtonGoHome from "@/components/ButtonGoHome/ButtonGoHome";
import PageNotFound from "@/components/SVG/PageNotFound";
import { Metadata } from "next";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "404",
    description: "Page not found",
  };
}

export default async function Custom404() {
  return (
    <div className={styles.div}>
      <div className={styles.box}>
        <ColorBlocks />
        <PageNotFound className={styles.boxSVG} />
        <ColorBlocks />
      </div>
      <div className={styles.frame}>
        <p className={styles.p}>
          {"We can't find the page you are looking for"}
        </p>
        <ButtonGoHome />
      </div>
    </div>
  );
}
