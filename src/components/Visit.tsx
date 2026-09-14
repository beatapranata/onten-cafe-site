import { BUSINESS, ON10, PHOTOS, addressLine } from "@/lib/content";
import { Magnetic, Reveal, SplitText } from "./motion-primitives";
import { ParallaxPhoto } from "./ParallaxPhoto";
import styles from "./Visit.module.css";

export function Visit() {
  return (
    <section id="visit" className={`section ${styles.section}`} aria-labelledby="visit-title">
      <div className={`shell ${styles.layout}`}>
        <div className={styles.copy}>
          <Reveal>
            <p className="caps eyebrow">Visit</p>
          </Reveal>
          <h2 id="visit-title" className={`display ${styles.h2}`}>
            <SplitText text="Find us on 10th Street." accentFrom={3} />
          </h2>
          <Reveal delay={0.15}>
            <p className="lede">
              Coffee at the counter, handrolls at the bar — both at {BUSINESS.street} in {BUSINESS.neighborhood}.
            </p>
          </Reveal>
          <Reveal delay={0.25} className={styles.ctas}>
            <Magnetic>
              <a
                href={BUSINESS.mapsUrl}
                className="btn btn-ink"
                target="_blank"
                rel="noopener noreferrer"
              >
                Get directions <span className="arrow" aria-hidden="true">→</span>
              </a>
            </Magnetic>
            <a href={`tel:${BUSINESS.phoneE164}`} className="btn btn-glass glass">
              Call {BUSINESS.phoneDisplay}
            </a>
          </Reveal>
        </div>

        <div className={styles.cardWrap}>
          <ParallaxPhoto
            photo={PHOTOS.diningRoom}
            sizes="(max-width: 55rem) 92vw, 40vw"
            className={styles.photo}
          />
          <Reveal delay={0.1} className={styles.cardReveal}>
          <address className={`${styles.card} glass glass-photo`}>
            <dl className={styles.list}>
              <div>
                <dt className="caps">Address</dt>
                <dd>
                  <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer">
                    {addressLine}
                  </a>
                </dd>
              </div>
              <div>
                <dt className="caps">Phone</dt>
                <dd>
                  <a href={`tel:${BUSINESS.phoneE164}`}>{BUSINESS.phoneDisplay}</a>
                </dd>
              </div>
              <div>
                <dt className="caps">Hours</dt>
                <dd>
                  Handroll bar {ON10.hours}.{" "}
                  <a href={BUSINESS.mapsUrl} target="_blank" rel="noopener noreferrer" className={styles.inline}>
                    Today&rsquo;s coffee hours on Google
                  </a>
                </dd>
              </div>
              <div>
                <dt className="caps">Instagram</dt>
                <dd>
                  <a
                    href={`https://www.instagram.com/${BUSINESS.instagram}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    @{BUSINESS.instagram}
                  </a>
                </dd>
              </div>
            </dl>
          </address>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
