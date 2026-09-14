import { LINGER, PHOTOS } from "@/lib/content";
import { Reveal } from "./motion-primitives";
import { ParallaxPhoto } from "./ParallaxPhoto";
import styles from "./Linger.module.css";

/* A breather between the signatures and the menu: one full-width photograph
   and one glass note. No headline competing for attention — the picture is
   the section. */
export function Linger() {
  return (
    <section className={styles.band} aria-label={`${LINGER.headline} ${LINGER.note}`}>
      <ParallaxPhoto
        photo={PHOTOS.friends}
        sizes="100vw"
        className={styles.photo}
      />
      <div className={`shell ${styles.overlay}`}>
        <Reveal className={`${styles.note} glass glass-photo`}>
          <p className={`display ${styles.headline}`}>{LINGER.headline}</p>
          <p className={styles.meta}>
            <span className="caps">{LINGER.note}</span>
            {LINGER.detail}
          </p>
        </Reveal>
      </div>
    </section>
  );
}
