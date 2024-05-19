import NoMoviesFound from "../SVG/NoMoviesFound";
import styles from "./MoviesNotFound.module.css";

export default function MoviesNotFound() {
  return (
    <div className={styles.div}>
      <NoMoviesFound />
      <p className={styles.p}>
        {"We don't have such movies, look for another one"}
      </p>
    </div>
  );
}
