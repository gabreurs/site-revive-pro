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
  tag: string;
  title: string;
  subtitle: string;
};

const SLIDES: Slide[] = [
  {
    src: HERO_OBRA.src,
    alt: "Escavadeira Volvo da SMS em canteiro de terraplanagem na Grande São Paulo",
    tag: "Terraplanagem",
    title: "Terraplanagem com frota própria em toda a Grande São Paulo",
    subtitle:
      "Movimentação de terra, nivelamento e preparo de terreno para obras comerciais e industriais.",
  },
  {
    src: obraDemolicaoTerreno.url,
    alt: "Demolição controlada executada por escavadeira da SMS em terreno urbano",
    tag: "Demolição e limpeza",
    title: "Demolição controlada e limpeza de terreno",
    subtitle:
      "Escavadeiras com rompedor, retirada de entulho e terreno pronto para a próxima etapa da obra.",
  },
  {
    src: SUPPORT_OBRAS.transporte.src,
    alt: "Caminhão prancha SMS transportando escavadeira para obra em São Paulo",
    tag: "Transporte e locação",
    title: "Transporte e locação de máquinas",
    subtitle:
      "Prancha rebaixada, operadores próprios e equipamento certo para você ganhar tempo na obra.",
  },
];

const BADGES = [
  { icon: Truck, label: "Frota própria" },
  { icon: MapPin, label: "Grande São Paulo" },
  { icon: Wrench, label: "Operação técnica" },
  { icon: ShieldCheck, label: "Obras comerciais" },
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
      className="relative isolate overflow-hidden -mt-16 lg:-mt-[72px] section-dark"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Destaques SMS Terraplenagem"
    >
      {/* Atmosfera de fundo: imagem do slide MUITO desfocada + camadas escuras */}
      <div className="absolute inset-0 -z-10">
        <AnimatePresence mode="sync">
          <motion.img
            key={`bg-${i}`}
            src={slide.src}
            alt=""
            aria-hidden="true"
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.35 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute inset-0 h-full w-full object-cover scale-110"
            style={{ filter: "blur(38px) saturate(0.85)" }}
          />
        </AnimatePresence>
        <div className="absolute inset-0 bg-[hsl(222_30%_5%)]/85" />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(80% 60% at 25% 35%, hsl(217 91% 25% / 0.35), transparent 60%)",
          }}
        />
        <div className="absolute inset-0 topo-pattern opacity-40" aria-hidden="true" />
      </div>

      <div className="container-custom relative pt-28 pb-14 lg:pt-32 lg:pb-20">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-12 items-center min-h-[72vh] lg:min-h-[78vh]">
          {/* Texto */}
          <div className="lg:col-span-7">
            <AnimatePresence mode="wait">
              <motion.div
                key={`txt-${i}`}
                initial={{ opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
              >
                <span className="inline-flex items-center gap-2 text-[13px] font-medium text-primary bg-primary/10 border border-primary/30 px-3 py-1.5 rounded-full">
                  <span className="h-1.5 w-1.5 rounded-full bg-primary" /> {slide.tag}
                </span>
                <h1
                  className="mt-6 font-heading font-medium text-white text-[2.2rem] sm:text-[2.9rem] lg:text-[3.6rem] xl:text-[4.1rem]"
                  style={{ lineHeight: 1.08, textWrap: "balance" as any }}
                >
                  {slide.title}
                </h1>
                <p className="mt-5 max-w-[560px] text-base md:text-lg text-white/85 leading-relaxed">
                  {slide.subtitle}
                </p>
              </motion.div>
            </AnimatePresence>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: "easeOut", delay: 0.15 }}
              className="mt-8 flex flex-col sm:flex-row gap-3"
            >
              <WhatsAppCTA
                label="Solicitar cotação"
                locationTag="hero"
                size="lg"
                className="bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.6)] transition-all rounded-md px-6 py-6 text-[15px] font-medium normal-case tracking-normal"
                icon="message"
              />
              <Button
                asChild
                size="lg"
                variant="outline"
                className="gap-2 border-white/25 bg-white/[0.04] text-white hover:bg-white/10 hover:text-white hover:border-white/40 rounded-md px-6 py-6 text-[15px] font-medium normal-case tracking-normal transition-all"
              >
                <Link to="/servicos">Conhecer serviços <ArrowRight className="h-4 w-4" /></Link>
              </Button>
            </motion.div>

            {/* Badges */}
            <ul className="mt-8 flex flex-wrap gap-2 max-w-2xl">
              {BADGES.map((b) => (
                <li
                  key={b.label}
                  className="flex items-center gap-2 border border-white/15 bg-white/[0.05] px-3 py-2 rounded-md text-[13px] font-medium text-white/90"
                >
                  <b.icon className="h-3.5 w-3.5 text-primary" />
                  <span>{b.label}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Card com a imagem real (contida, proporção 4:3) */}
          <div className="lg:col-span-5">
            <div className="relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`card-${i}`}
                  initial={{ opacity: 0, scale: 0.96, y: 14 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.98 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="relative aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-white/10 shadow-2xl"
                >
                  <img
                    src={slide.src}
                    alt={slide.alt}
                    className="absolute inset-0 h-full w-full object-cover"
                    loading="eager"
                    fetchPriority="high"
                  />
                  <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/55 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-3 text-white">
                    <span className="text-[12px] font-medium bg-black/45 backdrop-blur-sm border border-white/15 px-2.5 py-1 rounded-md">
                      {slide.tag}
                    </span>
                    <span className="text-[12px] text-white/85">
                      {String(i + 1).padStart(2, "0")} / {String(SLIDES.length).padStart(2, "0")}
                    </span>
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Controles do carrossel — sem traço decorativo */}
              <div className="mt-5 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  {SLIDES.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setI(idx)}
                      aria-label={`Ir para slide ${idx + 1}`}
                      aria-current={idx === i}
                      className={`h-2 rounded-full transition-all ${
                        idx === i ? "w-8 bg-primary" : "w-2 bg-white/30 hover:bg-white/55"
                      }`}
                    />
                  ))}
                </div>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={prev}
                    aria-label="Slide anterior"
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/[0.04] text-white hover:bg-white/10 hover:border-white/35 transition-colors"
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={next}
                    aria-label="Próximo slide"
                    className="flex h-10 w-10 items-center justify-center rounded-md border border-white/20 bg-white/[0.04] text-white hover:bg-white/10 hover:border-white/35 transition-colors"
                  >
                    <ChevronRight className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
