import { BUSINESS, CREDIT, NAV, addressLine } from "@/lib/content";
import { Wordmark } from "./Wordmark";
import styles from "./Footer.module.css";

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`shell ${styles.inner}`}>
        <Wordmark />
        <nav aria-label="Footer" className={styles.nav}>
          {NAV.map((item) => (
            <a key={item.href} href={item.href} className="caps">
              {item.label}
            </a>
          ))}
        </nav>
        <p className={styles.meta}>
          {BUSINESS.legalName} · {addressLine} ·{" "}
          <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a>
        </p>
        <p className={styles.credit}>
          {CREDIT.lead}{" "}
          <a href={CREDIT.url} target="_blank" rel="noopener">
            {CREDIT.name}
          </a>
        </p>
      </div>
    </footer>
  );
}
