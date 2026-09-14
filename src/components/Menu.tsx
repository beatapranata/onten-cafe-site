import { ADD_ONS, MENU, money } from "@/lib/content";
import { Reveal, SplitText } from "./motion-primitives";
import styles from "./Menu.module.css";

const ADD_ON_GROUPS = [ADD_ONS.syrups, ADD_ONS.seasonal, ADD_ONS.foam, ADD_ONS.milk];

export function Menu() {
  return (
    <section id="menu" className={`section ${styles.section}`} aria-labelledby="menu-title">
      <div className="shell">
        <header className={styles.head}>
          <Reveal>
            <p className="caps eyebrow">The board</p>
          </Reveal>
          <h2 id="menu-title" className={`display ${styles.h2}`}>
            <SplitText text="The coffee menu." accentFrom={1} />
          </h2>
        </header>

        <div className={styles.layout}>
          <div className={styles.groups}>
            {MENU.map((group, gi) => (
              <Reveal key={group.title} delay={gi * 0.08} className={styles.group}>
                <h3 className={`caps ${styles.groupTitle}`}>{group.title}</h3>
                <ul className={styles.items}>
                  {group.items.map((item) => (
                    <li key={item.name} className={styles.row}>
                      <span className={styles.itemName}>
                        {item.name}
                        {item.note && <span className={styles.note}> · {item.note}</span>}
                      </span>
                      {/* the board's own dotted leader */}
                      <span className={styles.leader} aria-hidden="true" />
                      <span className={styles.itemPrice}>{money(item.price)}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>

          <Reveal delay={0.2} className={styles.addWrap}>
            <span className={`${styles.orb} ${styles.orbSage}`} aria-hidden="true" />
            <span className={`${styles.orb} ${styles.orbMocha}`} aria-hidden="true" />
            <div className={`${styles.addCard} glass`}>
              <h3 className={styles.addTitle}>
                Make it <em>yours.</em>
              </h3>
              <dl className={styles.addList}>
                {ADD_ON_GROUPS.map((g) => (
                  <div key={g.title} className={styles.addGroup}>
                    <dt className="caps">
                      {g.title}
                      <span className={styles.addPrice}>{g.price}</span>
                    </dt>
                    <dd>{g.items.join(" · ")}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
