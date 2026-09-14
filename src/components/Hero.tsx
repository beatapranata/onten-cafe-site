import Image from "next/image";
import { BUSINESS, HERO, PHOTOS } from "@/lib/content";
import { Magnetic, Reveal, SplitText } from "./motion-primitives";
import { ParallaxPhoto } from "./ParallaxPhoto";
import styles from "./Hero.module.css";

export function Hero() {
  const headline = `${HERO.headlineLead} ${HERO.headlineAccent}`;
  const accentFrom = HERO.headlineLead.split(" ").length;

  return (
    <section id="top" className={styles.hero}>
      <div className={`shell ${styles.grid}`}>
        <div className={styles.copy}>
          <Reveal>
            <p className="caps eyebrow">{HERO.eyebrow}</p>
          </Reveal>
          <h1 className={`display ${styles.h1}`}>
            <SplitText text={headline} accentFrom={accentFrom} delay={0.1} />
          </h1>
          <Reveal delay={0.35}>
            <p className="lede">{HERO.lede}</p>
          </Reveal>
          <Reveal delay={0.5} className={styles.ctas}>
            <Magnetic>
              <a
                href={BUSINESS.mapsUrl}
                className="btn btn-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions to 10th St <span className="arrow" aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <a href="#menu" className="btn btn-glass glass">
              See the menu
            </a>
          </Reveal>
        </div>

        <div className={styles.stage}>
          <span className={styles.orb} aria-hidden="true" />

          {/* The LCP element: priority, and no reveal wrapper that would hold
              it at opacity 0 while the page is being measured. */}
          <ParallaxPhoto
            photo={PHOTOS.interior}
            priority
            sizes="(max-width: 57.5rem) 92vw, 46vw"
            className={styles.photo}
          />

          {/* The inset is a print laid on the room: a paper mat, not glass —
              glass is kept for surfaces that carry words. */}
          <Reveal delay={0.7} className={styles.inset}>
            <div className={`frame ${styles.insetFrame}`}>
              <Image
                src={PHOTOS.pinkTee.src}
                alt={PHOTOS.pinkTee.alt}
                fill
                sizes="(max-width: 26rem) 40vw, (max-width: 57.5rem) 30vw, 16vw"
                placeholder="blur"
                style={{ objectPosition: PHOTOS.pinkTee.focus }}
              />
            </div>
          </Reveal>

          <Reveal delay={0.9} className={`${styles.chip} glass glass-photo`}>
            <a
              href={BUSINESS.mapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.rating}
            >
              <span className={styles.ratingValue}>{BUSINESS.rating.value.toFixed(1)}</span>
              <span className={styles.stars} aria-hidden="true">
                ★★★★★
              </span>
              <span className={styles.ratingMeta}>
                {BUSINESS.rating.count} reviews on {BUSINESS.rating.source}
              </span>
            </a>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
