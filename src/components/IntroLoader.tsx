import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-sms.svg";

const KEY = "sms_intro_shown";

/**
 * Intro loader: aparece na primeira visita da sessão.
 * Force replay com `?intro=1` ou limpando sessionStorage.
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
    document.body.style.overflow = "hidden";
    const DURATION = 2000;
    const t = window.setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(KEY, "1");
      document.body.style.overflow = "";
    }, DURATION);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.55, ease: [0.65, 0, 0.35, 1] } }}
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-hidden"
          style={{ background: "hsl(222 30% 6%)" }}
          aria-hidden="true"
        >
          {/* Topo lines + radial glow */}
          <div className="absolute inset-0 topo-pattern opacity-40" />
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(60% 50% at 50% 50%, hsl(217 91% 30% / 0.45), transparent 70%)",
            }}
          />

          {/* Linha horizontal varrendo */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/2 left-0 right-0 h-px origin-left bg-primary/70"
          />

          {/* Linha varrendo de volta como "wipe" inferior */}
          <motion.div
            initial={{ scaleX: 1, opacity: 0 }}
            animate={{ scaleX: 0, opacity: [0, 1, 1, 0] }}
            transition={{ delay: 1.1, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-[calc(50%+1px)] left-0 right-0 h-px origin-right bg-primary"
          />

          {/* Logo + label */}
          <motion.div
            initial={{ opacity: 0, y: 16, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, transition: { duration: 0.35 } }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex flex-col items-center gap-4"
          >
            <motion.img
              src={logo}
              alt=""
              className="h-12 md:h-16 w-auto"
              initial={{ filter: "blur(6px)" }}
              animate={{ filter: "blur(0px)" }}
              transition={{ delay: 0.35, duration: 0.6 }}
            />
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: 120 }}
              transition={{ delay: 0.55, duration: 0.55, ease: "easeOut" }}
              className="h-px bg-primary"
            />
            <motion.span
              initial={{ opacity: 0, letterSpacing: "0.5em" }}
              animate={{ opacity: 1, letterSpacing: "0.3em" }}
              transition={{ delay: 0.7, duration: 0.55 }}
              className="text-[11px] uppercase text-white/70"
            >
              Terraplenagem
            </motion.span>
          </motion.div>

          {/* Indicador de carregamento sutil */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.9, duration: 0.4 }}
            className="absolute bottom-10 left-1/2 -translate-x-1/2 flex gap-1.5"
          >
            {[0, 1, 2].map((i) => (
              <motion.span
                key={i}
                className="h-1 w-1 rounded-full bg-white/50"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
              />
            ))}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
