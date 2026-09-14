"use client";

import {
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  type HTMLMotionProps,
} from "motion/react";
import {
  useRef,
  useState,
  type ElementType,
  type PointerEvent,
  type ReactNode,
} from "react";

/* The whole motion vocabulary. Every section composes from these three so the
   site reads as one gesture, not as sections that each invented an entrance.
   Under reduced motion each returns a plain element: no wrapper transform, no
   leftover inline styles. */

const EASE_OUT = [0.22, 1, 0.36, 1] as const;

type RevealProps = {
  children: ReactNode;
  delay?: number;
  className?: string;
  as?: "div" | "li" | "p" | "span" | "section" | "article" | "figure";
} & Omit<HTMLMotionProps<"div">, "children">;

export function Reveal({ children, delay = 0, className, as = "div", ...rest }: RevealProps) {
  const still = useReducedMotion();
  if (still) {
    const Tag = as as ElementType;
    return <Tag className={className}>{children}</Tag>;
  }
  const Tag = motion[as] as typeof motion.div;
  return (
    <Tag
      className={className}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      /* -12%: the element is properly in frame when it moves, instead of
         animating at the very edge where it reads as a glitch. */
      viewport={{ once: true, margin: "0px 0px -12% 0px" }}
      transition={{ duration: 0.75, ease: EASE_OUT, delay }}
      {...rest}
    >
      {children}
    </Tag>
  );
}

type SplitTextProps = {
  text: string;
  className?: string;
  delay?: number;
  /* Words to set in the italic accent, matched by index range. */
  accentFrom?: number;
};

/* Display headlines only. The complete string ships in the markup as sr-only
   text, so crawlers and screen readers get the real headline and the animated
   glyphs are aria-hidden. */
export function SplitText({ text, className, delay = 0, accentFrom }: SplitTextProps) {
  const still = useReducedMotion();
  const [done, setDone] = useState(false);
  /* Observe the HEADLINE, never the words. Each word starts translated
     entirely outside its overflow:hidden mask, and IntersectionObserver
     honours ancestor clipping — so a word watching itself is never
     "visible" and never animates. Shipped blank once; this is why. */
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px -10% 0px" });
  const words = text.split(" ");

  const renderWord = (w: string, i: number) =>
    accentFrom !== undefined && i >= accentFrom ? <em>{w}</em> : w;

  if (still) {
    return (
      <span className={className}>
        {words.map((w, i) => (
          <span key={i}>
            {renderWord(w, i)}
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    );
  }

  return (
    <span className={className} ref={ref}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {words.map((w, i) => (
          <span key={i}>
            <span className="word-mask" data-done={done}>
              <motion.span
                className="word-inner"
                initial={{ y: "155%" }}
                animate={inView ? { y: "0%" } : { y: "155%" }}
                transition={{ duration: 0.9, ease: EASE_OUT, delay: delay + i * 0.06 }}
                onAnimationComplete={i === words.length - 1 ? () => setDone(true) : undefined}
              >
                {renderWord(w, i)}
              </motion.span>
            </span>
            {i < words.length - 1 ? " " : ""}
          </span>
        ))}
      </span>
    </span>
  );
}

type MagneticProps = {
  children: ReactNode;
  className?: string;
  strength?: number;
};

/* Primary CTAs only — the extra weight is a signal, and it stops meaning
   anything if everything has it. Mouse pointers only: on touch it would
   just make the button lurch under a finger. */
export function Magnetic({ children, className, strength = 0.22 }: MagneticProps) {
  const still = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 260, damping: 20, mass: 0.35 });
  const sy = useSpring(y, { stiffness: 260, damping: 20, mass: 0.35 });

  if (still) return <span className={className}>{children}</span>;

  const onMove = (e: PointerEvent<HTMLSpanElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * strength);
    y.set((e.clientY - (r.top + r.height / 2)) * strength);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.span
      className={className}
      style={{ x: sx, y: sy, display: "inline-flex" }}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
    >
      {children}
    </motion.span>
  );
}
