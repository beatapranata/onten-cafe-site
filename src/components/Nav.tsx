import { BUSINESS, NAV } from "@/lib/content";
import { Wordmark } from "./Wordmark";
import styles from "./Nav.module.css";

/* One treatment that works over every ground: a light glass pill dense
   enough (white at .80) that ink holds 8.89:1 even over the dark ON10
   section. No tone sampling, no scroll handler, nothing to desynchronise. */
export function Nav() {
  return (
    <header className={styles.wrap}>
      <nav className={`${styles.pill} glass`} aria-label="Primary">
        <a href="#top" className={styles.brand} aria-label={`${BUSINESS.legalName} — back to top`}>
          <Wordmark compact />
        </a>
        <ul className={styles.links}>
          {NAV.map((item) => (
            <li key={item.href}>
              <a href={item.href} className="caps">
                {item.label}
              </a>
            </li>
          ))}
        </ul>
        <a
          href={BUSINESS.mapsUrl}
          className={`btn btn-ink ${styles.cta}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Directions <span className="arrow" aria-hidden="true">→</span>
        </a>
      </nav>
    </header>
  );
}
