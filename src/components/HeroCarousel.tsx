import { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, MapPin, Wrench } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { HERO_OBRA, SUPPORT_OBRAS } from "@/lib/serviceImages";
import obraDemolicaoTerreno from "@/assets/obras/sms-demolicao-terreno.jpg.asset.json";

type Slide = {
  src: string;
  alt: string;
  eyebrow: string;
  title: string;
  subtitle: string;
};

const SLIDES: Slide[] = [
  {
    src: HERO_OBRA.src,
    alt: "Escavadeira Volvo da SMS em canteiro de terraplanagem na Grande São Paulo",
    eyebrow: "Terraplanagem em São Paulo",
    title: "Movimentação de terra com equipamento próprio",
    subtitle: "Frota completa para obras comerciais e industriais em toda a Grande São Paulo.",
  },
  {
    src: obraDemolicaoTerreno.url,
    alt: "Demolição controlada executada por escavadeira da SMS em terreno urbano",
    eyebrow: "Demolição e limpeza",
    title: "Demolição controlada e limpeza de terreno",
    subtitle: "Escavadeiras com rompedor, retirada de entulho e preparo do terreno para a obra.",
  },
  {
    src: SUPPORT_OBRAS.transporte.src,
    alt: "Caminhão prancha SMS transportando escavadeira para obra em São Paulo",
    eyebrow: "Frota e logística próprias",
    title: "Transporte e locação de máquinas",
    subtitle: "Prancha rebaixada e operadores próprios para você ganhar tempo na obra.",
  },
];

const BADGES = [
  { icon: Truck, label: "Frota própria" },
  { icon: MapPin, label: "Grande São Paulo" },
  { icon: Wrench, label: "Operação técnica" },
  { icon: ShieldCheck, label: "Segurança em obra" },
];

const AUTOPLAY_MS = 6000;

export function HeroCarousel() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => setI((p) => (p + 1) % SLIDES.length), []);
  const prev = useCallback(() => setI((p) => (p - 1 + SLIDES.length) % SLIDES.length), []);

  useEffect(() => {
    if (paused) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) return;
    const id = window.setInterval(next, AUTOPLAY_MS);
    return () => window.clearInterval(id);
  }, [paused, next]);

  const slide = SLIDES[i];

  return (
    <section
      className="relative isolate overflow-hidden section-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Destaques SMS Terraplenagem"
    >
      {/* Blurred background of active slide */}
      <AnimatePresence mode="sync">
        <motion.div
          key={`bg-${i}`}
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 1.1, ease: "easeOut" }}
          className="absolute inset-0 -z-10"
          aria-hidden="true"
        >
          <img src={slide.src} alt="" className="h-full w-full object-cover scale-110 blur-2xl opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-br from-[hsl(222,30%,6%)]/85 via-[hsl(222,30%,6%)]/65 to-[hsl(217,91%,30%)]/40" />
        </motion.div>
      </AnimatePresence>

      <div className="container-custom py-14 md:py-20 lg:py-24">
        <div className="grid lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-12 items-center">
          {/* Text */}
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={`txt-${i}`}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                <span className="inline-block text-[11px] tracking-[0.22em] uppercase text-primary/90 border border-primary/40 px-2.5 py-1">
                  {slide.eyebrow}
                </span>
                <h1 className="mt-4 font-heading text-[1.85rem] md:text-5xl lg:text-[3.25rem] leading-[1.05] text-white font-medium">
                  {slide.title}
                </h1>
                <p className="mt-4 max-w-xl text-base md:text-lg text-white/75 leading-relaxed">
                  {slide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            <div className="mt-7 flex flex-col sm:flex-row gap-3">
              <WhatsAppCTA
                label="Solicitar cotação"
                locationTag="hero"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 px-6 rounded-none tap-feedback shadow-none"
                icon="message"
              />
              <Button asChild variant="outline" size="lg" className="gap-2 border-white/25 text-white hover:bg-white/10 hover:text-white rounded-none px-6 tap-feedback">
                <Link to="/servicos">Ver serviços <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </div>

            {/* Badges */}
            <ul className="mt-8 grid grid-cols-2 sm:grid-cols-4 gap-2 max-w-xl">
              {BADGES.map((b) => (
                <li key={b.label} className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-white/80">
                  <b.icon className="h-3.5 w-3.5 text-primary" />
                  <span>{b.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Image card */}
          <div className="relative">
            <div className="relative aspect-[4/3] md:aspect-[5/4] overflow-hidden border border-white/10 shadow-2xl">
              <AnimatePresence mode="sync">
                <motion.img
                  key={`img-${i}`}
                  src={slide.src}
                  alt={slide.alt}
                  initial={{ opacity: 0, scale: 1.05 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                  className="absolute inset-0 h-full w-full object-cover"
                  loading="eager"
                  fetchPriority="high"
                  width={960}
                  height={720}
                />
              </AnimatePresence>
              <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />

              {/* Controls */}
              <div className="absolute bottom-3 right-3 flex gap-1.5">
                <button
                  type="button"
                  onClick={prev}
                  className="flex h-9 w-9 items-center justify-center bg-black/40 hover:bg-black/60 backdrop-blur text-white transition-colors"
                  aria-label="Slide anterior"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <button
                  type="button"
                  onClick={next}
                  className="flex h-9 w-9 items-center justify-center bg-black/40 hover:bg-black/60 backdrop-blur text-white transition-colors"
                  aria-label="Próximo slide"
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>

              {/* Dots */}
              <div className="absolute bottom-3 left-3 flex gap-1.5">
                {SLIDES.map((_, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setI(idx)}
                    aria-label={`Ir para slide ${idx + 1}`}
                    aria-current={idx === i}
                    className={`h-1.5 transition-all ${idx === i ? "w-7 bg-white" : "w-3 bg-white/40 hover:bg-white/70"}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
