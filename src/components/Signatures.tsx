import { PHOTOS, SIGNATURES, SIGNATURES_COPY, money } from "@/lib/content";
import { GlassSheen } from "./GlassSheen";
import { Reveal, SplitText } from "./motion-primitives";
import { ParallaxPhoto } from "./ParallaxPhoto";
import styles from "./Signatures.module.css";

const NUMBER_WORDS = ["Zero", "One", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight"];

/* The signature moment: the house list set on a pane of liquid glass laid
   over the bar itself. The face frosts the photo, and the light on the glass
   follows the cursor. */
export function Signatures() {
  /* Derived, so adding a fifth signature can't make the headline lie. */
  const count = NUMBER_WORDS[SIGNATURES.length] ?? String(SIGNATURES.length);

  return (
    <section id="signatures" className={`section ${styles.section}`} aria-labelledby="signatures-title">
      <div className="shell">
        <header className={styles.head}>
          <div className={styles.headText}>
            <Reveal>
              <p className="caps eyebrow">{SIGNATURES_COPY.eyebrow}</p>
            </Reveal>
            <h2 id="signatures-title" className={`display ${styles.h2}`}>
              <SplitText text={`${count} drinks, built in layers.`} accentFrom={2} />
            </h2>
          </div>
          <Reveal delay={0.15}>
            <p className={styles.intro}>{SIGNATURES_COPY.body}</p>
          </Reveal>
        </header>

        <div className={styles.stage}>
          <ParallaxPhoto
            photo={PHOTOS.barDetail}
            sizes="(max-width: 56rem) 92vw, 80rem"
            className={styles.photo}
          />

          <Reveal delay={0.1} className={`${styles.panel} glass glass-photo`}>
            <GlassSheen />
            <ol className={styles.list}>
              {SIGNATURES.map((drink, i) => (
                <li key={drink.name} className={styles.item}>
                  <span className={styles.index} aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div className={styles.row}>
                    <h3 className={styles.name}>{drink.name}</h3>
                    <p className={styles.price}>{money(drink.price)}</p>
                  </div>
                  <p className={styles.parts}>
                    {drink.parts.map((part, pi) => (
                      <span key={part}>
                        {pi > 0 && (
                          <span className={styles.plus} aria-hidden="true">
                            {" + "}
                          </span>
                        )}
                        {pi > 0 && <span className="sr-only">, </span>}
                        {part}
                      </span>
                    ))}
                  </p>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
