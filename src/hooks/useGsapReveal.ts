import { useEffect } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/**
 * Global scroll-reveal: any element with `data-reveal` fades + slides in once
 * when it enters the viewport. Respects prefers-reduced-motion (no-op).
 * Stagger children: add `data-reveal-stagger` on the parent.
 */
export function useGsapReveal() {
  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((el) => {
        gsap.fromTo(
          el,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: { trigger: el, start: "top 88%", once: true },
          }
        );
      });

      gsap.utils.toArray<HTMLElement>("[data-reveal-stagger]").forEach((parent) => {
        const kids = parent.children as unknown as HTMLElement[];
        gsap.fromTo(
          kids,
          { opacity: 0, y: 18 },
          {
            opacity: 1,
            y: 0,
            duration: 0.55,
            ease: "power2.out",
            stagger: 0.08,
            scrollTrigger: { trigger: parent, start: "top 85%", once: true },
          }
        );
      });
    });

    return () => ctx.revert();
  }, []);
}
