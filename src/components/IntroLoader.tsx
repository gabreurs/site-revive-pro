import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-sms.svg";

const KEY = "sms_intro_shown";

/**
 * Intro loader minimalista: fundo escuro sólido + logo centralizado.
 * Fade + leve scale na entrada, fade na saída. Sem linhas, sem texto extra.
 * Force replay com `?intro=1`.
 */
export function IntroLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const params = new URLSearchParams(window.location.search);
    const force = params.get("intro") === "1";
    const seen = sessionStorage.getItem(KEY);
    if (reduced) return;
    if (seen && !force) return;
    if (force) sessionStorage.removeItem(KEY);

    setShow(true);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const DURATION = 1800;
    const t = window.setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(KEY, "1");
      document.body.style.overflow = prevOverflow;
    }, DURATION);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{
            background:
              "radial-gradient(80% 60% at 50% 50%, hsl(222 30% 10%) 0%, hsl(222 35% 5%) 100%)",
          }}
          aria-hidden="true"
        >
          <motion.img
            src={logo}
            alt=""
            className="h-14 md:h-20 w-auto"
            initial={{ opacity: 0, scale: 0.92, filter: "blur(8px)" }}
            animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
            transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  );
}
