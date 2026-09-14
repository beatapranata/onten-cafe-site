import { BUSINESS } from "@/lib/content";
import styles from "./Wordmark.module.css";

/* Set from the signage, not traced from it: a geometric sans at a light-medium
   weight, generously tracked, with COFFEE underneath in small caps. The real
   logo files should replace this the day they exist. */
export function Wordmark({ compact = false }: { compact?: boolean }) {
  return (
    <span className={compact ? `${styles.mark} ${styles.compact}` : styles.mark}>
      <span className={styles.name}>{BUSINESS.wordmark}</span>
      <span className={styles.caption}>{BUSINESS.wordmarkCaption}</span>
    </span>
  );
}
