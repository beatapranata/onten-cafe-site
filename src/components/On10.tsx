import { ON10, PHOTOS } from "@/lib/content";
import { Reveal, SplitText } from "./motion-primitives";
import { ParallaxPhoto } from "./ParallaxPhoto";
import styles from "./On10.module.css";

export function On10() {
  return (
    <section
      id="on10"
      className={`section ${styles.section}`}
      data-ground="dark"
      aria-labelledby="on10-title"
    >
      <span className={styles.glow} aria-hidden="true" />
      <div className={`shell ${styles.layout}`}>
        <ParallaxPhoto
          photo={PHOTOS.on10Sign}
          sizes="(max-width: 56rem) 92vw, 34vw"
          className={styles.photo}
        />
        <div className={styles.main}>
        <div className={styles.copy}>
          <Reveal>
            <p className="caps eyebrow">{ON10.eyebrow}</p>
          </Reveal>
          <h2 id="on10-title" className={`display ${styles.h2}`}>
            <SplitText text={ON10.headline} accentFrom={2} />
          </h2>
          <Reveal delay={0.15}>
            <p className="lede">
              {ON10.name} is at the same address. {ON10.body}
            </p>
          </Reveal>
          <Reveal delay={0.25}>
            <ul className={styles.facts}>
              <li>
                <span className="caps">Hours</span>
                {ON10.hours}
              </li>
              <li>
                <span className="caps">Bring a bottle</span>
                {ON10.byob}
              </li>
            </ul>
          </Reveal>
        </div>

        <div className={styles.sets}>
          {ON10.sets.map((set, i) => (
            <Reveal key={set.name} delay={0.1 + i * 0.1} className={`${styles.set} glass`}>
              <div className={styles.setHead}>
                <h3 className={styles.setName}>{set.name}</h3>
                <p className={styles.setPrice}>${set.price}</p>
              </div>
              <ul className={styles.rolls}>
                {set.rolls.map((roll) => (
                  <li key={roll}>{roll}</li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
        </div>
      </div>
    </section>
  );
}
