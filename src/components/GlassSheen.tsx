"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useEffect, useRef } from "react";
import styles from "./GlassSheen.module.css";

/* The signature moment's light. A pre-blurred highlight rides under the glass
   face and follows the pointer, the way a window catches the room's light as
   you move past it. Transform only: the gradient is painted once and the
   spring moves the layer.

   Listens on the panel's parent (the photo stage), so the light starts
   travelling before the cursor reaches the glass.

   Touch and reduced motion get the designed still: the highlight parked at
   the top-left, where the base sheen already puts it. */
export function GlassSheen() {
  const ref = useRef<HTMLSpanElement>(null);
  const still = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 90, damping: 26, mass: 0.6 });
  const sy = useSpring(y, { stiffness: 90, damping: 26, mass: 0.6 });

  useEffect(() => {
    const el = ref.current;
    const stage = el?.parentElement?.parentElement;
    if (!el || !stage || still || !matchMedia("(hover: hover)").matches) return;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const panel = el.parentElement!.getBoundingClientRect();
      x.set(e.clientX - panel.left - panel.width / 2);
      y.set(e.clientY - panel.top - panel.height / 2);
    };
    const onLeave = () => {
      x.set(0);
      y.set(0);
    };
    stage.addEventListener("pointermove", onMove);
    stage.addEventListener("pointerleave", onLeave);
    return () => {
      stage.removeEventListener("pointermove", onMove);
      stage.removeEventListener("pointerleave", onLeave);
    };
  }, [still, x, y]);

  return (
    <motion.span
      ref={ref}
      aria-hidden="true"
      className={styles.sheen}
      style={still ? undefined : { x: sx, y: sy }}
      data-still={still ? "true" : undefined}
    />
  );
}
