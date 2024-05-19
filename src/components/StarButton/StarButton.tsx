"use client";

import styles from "./StarButton.module.css";
import StarIcon from "../SVG/StarIcon";
import { useState, useEffect } from "react";

export default function StarButton({ onClick, active }: any) {
  const [color, setColor] = useState("#D5D6DC");
  useEffect(() => {
    if (active) {
      setColor("#9854F6");
    } else {
      setColor("#D5D6DC");
    }
  }, [active]);

  return (
    <button type="button" onClick={onClick} className={styles.button}>
      <StarIcon color={color} />
    </button>
  );
}
