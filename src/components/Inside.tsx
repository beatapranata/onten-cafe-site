import Image from "next/image";
import { INSIDE } from "@/lib/content";
import { Reveal, SplitText } from "./motion-primitives";
import styles from "./Inside.module.css";

/* Tile slots in reading order. The grid positions live in the CSS module;
   the ORDER lives in content.ts (official first, Brady's last), so reordering
   photos never means touching layout. */
const SIZES = [
  "(max-width: 48rem) 92vw, 56vw",
  "(max-width: 48rem) 92vw, 30vw",
  "(max-width: 48rem) 92vw, 62vw",
  "(max-width: 48rem) 92vw, 38vw",
  "(max-width: 48rem) 46vw, 30vw",
  "(max-width: 48rem) 46vw, 24vw",
  "(max-width: 48rem) 92vw, 56vw",
  "(max-width: 48rem) 92vw, 40vw",
  "(max-width: 48rem) 92vw, 40vw",
  "(max-width: 48rem) 92vw, 56vw",
]

export function Inside() {
  const headline = `${INSIDE.headlineLead} ${INSIDE.headlineAccent}`;
  const accentFrom = INSIDE.headlineLead.split(" ").length;

  return (
    <section id="inside" className={`section ${styles.section}`} aria-labelledby="inside-title">
      <div className={`shell ${styles.grid}`}>
        <header className={styles.intro}>
          <Reveal>
            <p className="caps eyebrow">{INSIDE.eyebrow}</p>
          </Reveal>
          <h2 id="inside-title" className={`display ${styles.h2}`}>
            <SplitText text={headline} accentFrom={accentFrom} />
          </h2>
          <Reveal delay={0.15}>
            <p className="lede">{INSIDE.body}</p>
          </Reveal>
        </header>

        {INSIDE.photos.map((photo, i) => (
          <Reveal
            as="figure"
            key={photo.caption}
            delay={(i % 3) * 0.08}
            className={`${styles.tile} ${styles[`t${i + 1}`]}`}
          >
            <div className={`frame ${styles.frame}`}>
              <Image
                src={photo.src}
                alt={photo.alt}
                fill
                sizes={SIZES[i] ?? "(max-width: 48rem) 92vw, 40vw"}
                placeholder="blur"
                style={{ objectPosition: photo.focus ?? "50% 50%" }}
              />
              <figcaption className="caption-pill caps glass glass-caption">{photo.caption}</figcaption>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
