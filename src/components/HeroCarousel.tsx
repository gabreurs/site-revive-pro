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
    eyebrow: "SMS Terraplenagem · São Paulo",
    title: "Terraplanagem com frota própria em toda a Grande São Paulo",
    subtitle: "Movimentação de terra, nivelamento, demolição e preparo de terreno para obras comerciais e industriais.",
  },
  {
    src: obraDemolicaoTerreno.url,
    alt: "Demolição controlada executada por escavadeira da SMS em terreno urbano",
    eyebrow: "Demolição e limpeza",
    title: "Demolição controlada e limpeza de terreno",
    subtitle: "Escavadeiras com rompedor, retirada de entulho e terreno pronto para a próxima etapa da obra.",
  },
  {
    src: SUPPORT_OBRAS.transporte.src,
    alt: "Caminhão prancha SMS transportando escavadeira para obra em São Paulo",
    eyebrow: "Frota e logística próprias",
    title: "Transporte e locação de máquinas",
    subtitle: "Prancha rebaixada, operadores próprios e equipamento certo para você ganhar tempo na obra.",
  },
];

const BADGES = [
  { icon: Truck, label: "Frota própria" },
  { icon: MapPin, label: "Grande São Paulo" },
  { icon: Wrench, label: "Operação técnica" },
  { icon: ShieldCheck, label: "Segurança em obra" },
];

const AUTOPLAY_MS = 6500;

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
      className="relative isolate overflow-hidden -mt-20 lg:-mt-20 section-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Destaques SMS Terraplenagem"
    >
      {/* FULL-BLEED background image (crossfade) */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="sync">
          <motion.img
            key={`bg-${i}`}
            src={slide.src}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover"
            loading="eager"
            fetchPriority="high"
          />
        </AnimatePresence>
        {/* Layered overlays for contrast + brand tint */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222_30%_6%)]/95 via-[hsl(222_30%_6%)]/70 to-[hsl(222_30%_6%)]/35" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_30%_6%)] via-transparent to-[hsl(222_30%_6%)]/40" />
        <div className="absolute inset-0 topo-pattern opacity-60" aria-hidden="true" />
      </div>

      <div className="container-custom relative flex flex-col justify-end min-h-[88vh] lg:min-h-[92vh] pt-32 pb-12 lg:pt-40 lg:pb-20">
        {/* Eyebrow + headline */}
        <div className="max-w-4xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={`txt-${i}`}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
            >
              <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-primary/90 border border-primary/40 px-3 py-1.5">
                <span className="h-1.5 w-1.5 bg-primary" /> {slide.eyebrow}
              </span>
              <h1 className="mt-6 font-heading font-medium text-white leading-[1.02] text-[2.2rem] sm:text-5xl lg:text-[4.5rem] xl:text-[5rem]">
                {slide.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base md:text-lg lg:text-xl text-white/75 leading-relaxed">
                {slide.subtitle}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* CTAs */}
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <WhatsAppCTA
              label="Solicitar cotação no WhatsApp"
              locationTag="hero"
              size="lg"
              className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-7 py-6 text-sm uppercase tracking-wider tap-feedback shadow-none"
              icon="message"
            />
            <Button asChild variant="outline" size="lg" className="gap-2 border-white/25 text-white hover:bg-white/10 hover:text-white rounded-none px-7 py-6 text-sm uppercase tracking-wider tap-feedback">
              <Link to="/servicos">Conheça os serviços <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </div>

          {/* Badges */}
          <ul className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-x-2 gap-y-2 max-w-3xl">
            {BADGES.map((b) => (
              <li key={b.label} className="flex items-center gap-2 border border-white/10 bg-white/[0.03] px-3 py-2.5 text-xs text-white/85">
                <b.icon className="h-4 w-4 text-primary" />
                <span>{b.label}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Bottom strip — controls + thumbnails */}
        <div className="mt-12 lg:mt-16 flex flex-col md:flex-row md:items-end md:justify-between gap-6 border-t border-white/10 pt-6">
          {/* Slide counter + arrows */}
          <div className="flex items-center gap-6">
            <span className="text-xs tracking-[0.2em] text-white/40">
              <span className="text-white text-lg font-medium">{String(i + 1).padStart(2, "0")}</span>
              <span className="mx-2">/</span>
              {String(SLIDES.length).padStart(2, "0")}
            </span>
            <div className="flex gap-1.5">
              <button type="button" onClick={prev} aria-label="Slide anterior" className="flex h-10 w-10 items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors">
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button type="button" onClick={next} aria-label="Próximo slide" className="flex h-10 w-10 items-center justify-center border border-white/20 text-white hover:bg-white/10 transition-colors">
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Slide thumbnails / titles */}
          <div className="grid grid-cols-3 gap-2 md:gap-3 md:max-w-xl w-full">
            {SLIDES.map((s, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setI(idx)}
                aria-current={idx === i}
                className={`group text-left border-t pt-3 transition-colors ${
                  idx === i ? "border-primary text-white" : "border-white/20 text-white/55 hover:text-white"
                }`}
              >
                <span className="block text-[10px] tracking-[0.18em] uppercase">{s.eyebrow.split("·")[0].trim()}</span>
                <span className="block text-xs md:text-sm mt-1 line-clamp-2">{s.title}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
