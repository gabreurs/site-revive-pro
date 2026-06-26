import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import logo from "@/assets/logo-sms.svg";

const KEY = "sms_intro_shown";

export function IntroLoader() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const seen = sessionStorage.getItem(KEY);
    if (seen || reduced) return;
    setShow(true);
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => {
      setShow(false);
      sessionStorage.setItem(KEY, "1");
      document.body.style.overflow = "";
    }, 1400);
    return () => { window.clearTimeout(t); document.body.style.overflow = ""; };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: "easeInOut" } }}
          className="fixed inset-0 z-[100] flex items-center justify-center"
          style={{ background: "hsl(222 30% 6%)" }}
          aria-hidden="true"
        >
          {/* subtle topo lines */}
          <div className="absolute inset-0 topo-pattern opacity-50" />

          {/* horizontal line sweep */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
            className="absolute top-1/2 left-0 right-0 h-px origin-left bg-primary/60"
          />

          {/* logo */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.25, duration: 0.6, ease: "easeOut" }}
            className="relative z-10 flex flex-col items-center gap-3"
          >
            <img src={logo} alt="" className="h-10 md:h-14 w-auto" />
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.55, duration: 0.4 }}
              className="text-[10px] tracking-[0.3em] uppercase text-white/50"
            >
              Terraplenagem
            </motion.span>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
