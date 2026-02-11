import { ReactNode, useRef } from "react";
import { motion, useInView } from "framer-motion";

interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right" | "none";
}

export function AnimatedSection({ children, className = "", delay = 0, direction = "up" }: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  // Smaller translate on mobile (8px vs 16px)
  const dist = typeof window !== "undefined" && window.innerWidth < 768 ? 8 : 16;

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? dist : 0,
      x: direction === "left" ? -dist : direction === "right" ? dist : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      x: 0,
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={variants}
      transition={{ duration: 0.4, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
