"use client";

import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { useRef } from "react";
import type { Photo } from "@/lib/content";

type Props = {
  photo: Photo;
  sizes: string;
  className?: string;
  priority?: boolean;
};

/* A photo that drifts slower than the page inside its frame — the second of
   the two parallax layers motion.md allows (copy is the first). Oversized by
   12% so the drift never exposes the frame's edge.

   Reduced motion: the same image, framed, not oversized, not moving. */
export function ParallaxPhoto({ photo, sizes, className, priority }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const still = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-6%", "6%"]);

  const image = (
    <Image
      src={photo.src}
      alt={photo.alt}
      fill
      sizes={sizes}
      priority={priority}
      placeholder="blur"
      style={{ objectPosition: photo.focus ?? "50% 50%" }}
    />
  );

  return (
    <div ref={ref} className={["frame", className].filter(Boolean).join(" ")}>
      {still ? (
        image
      ) : (
        <motion.div style={{ position: "absolute", inset: "-6% 0", y }}>{image}</motion.div>
      )}
    </div>
  );
}
