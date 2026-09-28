import { FEATURED, FEATURED_COPY, basePrice, featuredPrice, money } from "@/lib/content";
import { Reveal, SplitText } from "./motion-primitives";
import styles from "./Featured.module.css";

/* The builds the bar would talk you into: a board drink, a seasonal syrup or
   a cold foam, and the arithmetic done for you. Quiet cards on paper — the
   signatures above already carry the glass, and two glass panes in a row
   flattens both. */
export function Featured() {
  return (
    <section id="featured" className={`section ${styles.section}`} aria-labelledby="featured-title">
      <div className="shell">
        <header className={styles.head}>
          <div className={styles.headText}>
            <Reveal>
              <p className="caps eyebrow">{FEATURED_COPY.eyebrow}</p>
            </Reveal>
            <h2 id="featured-title" className={`display ${styles.h2}`}>
              <SplitText text={FEATURED_COPY.headline} accentFrom={2} />
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className={styles.intro}>{FEATURED_COPY.body}</p>
          </Reveal>
        </header>

        <ul className={styles.cards}>
          {FEATURED.map((drink, i) => (
            <Reveal key={`${drink.base}-${drink.addOn}`} delay={i * 0.08} as="li" className={styles.card}>
              <p className={`caps ${styles.kind}`}>{drink.kind}</p>

              <h3 className={styles.name}>
                {drink.base}
                <span className={styles.joiner} aria-hidden="true"> + </span>
                <span className="sr-only">, </span>
                <em>{drink.addOn}</em>
              </h3>

              <p className={styles.note}>{drink.note}</p>

              <p className={styles.math}>
                <span className={styles.total}>{money(featuredPrice(drink))}</span>
                <span className={styles.breakdown}>
                  {money(basePrice(drink.base))} + {money(drink.surcharge)}
                </span>
              </p>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
