"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface AnimatedSectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right" | "none";
  blur?: boolean;
  scale?: boolean;
}

export default function AnimatedSection({
  children,
  className = "",
  delay = 0,
  direction = "up",
  blur = false,
  scale = false,
}: AnimatedSectionProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  const directionMap = {
    up: { y: 48 },
    down: { y: -48 },
    left: { x: -48 },
    right: { x: 48 },
    none: {},
  };

  const initial = {
    opacity: 0,
    ...directionMap[direction],
    ...(blur ? { filter: "blur(8px)" } : {}),
    ...(scale ? { scale: 0.94 } : {}),
  };

  const animate = isInView
    ? { opacity: 1, y: 0, x: 0, filter: "blur(0px)", scale: 1 }
    : initial;

  return (
    <motion.div
      ref={ref}
      initial={initial}
      animate={animate}
      transition={{
        duration: 0.75,
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
