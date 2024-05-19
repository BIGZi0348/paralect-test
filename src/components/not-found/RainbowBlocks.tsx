import styles from "./RainbowBlocks.module.css";

export default function RainbowBlocks() {
  return (
    <div className={styles.div}>
      <div className={styles.white}></div>
      <div className={styles.yellow}></div>
      <div className={styles.cyan}></div>
      <div className={styles.green}></div>
      <div className={styles.pink}></div>
      <div className={styles.red}></div>
      <div className={styles.blue}></div>
    </div>
  );
}
