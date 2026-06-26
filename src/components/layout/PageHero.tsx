import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { HERO_OBRA } from "@/lib/serviceImages";

interface Crumb { label: string; to?: string }

interface PageHeroProps {
  eyebrow?: string;
  title: ReactNode;
  subtitle?: ReactNode;
  image?: string;
  imageAlt?: string;
  breadcrumbs?: Crumb[];
  actions?: ReactNode;
  size?: "default" | "tall";
}

/**
 * Hero das páginas internas. Imagem de fundo presente, mas o texto é prioridade:
 * scrim escuro à esquerda + gradiente vertical garantem leitura imediata.
 */
export function PageHero({
  eyebrow,
  title,
  subtitle,
  image,
  imageAlt = "",
  breadcrumbs,
  actions,
  size = "default",
}: PageHeroProps) {
  const bg = image ?? HERO_OBRA.src;
  const minH = size === "tall" ? "min-h-[62vh] lg:min-h-[68vh]" : "min-h-[48vh] lg:min-h-[54vh]";

  return (
    <section className={`relative isolate overflow-hidden -mt-20 section-dark ${minH} flex items-end`}>
      {/* Imagem de fundo */}
      <div className="absolute inset-0 -z-10">
        <img
          src={bg}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        {/* Camada escura geral para garantir contraste em qualquer área da foto */}
        <div className="absolute inset-0 bg-[hsl(222_30%_6%)]/60" />
        {/* Scrim esquerdo — onde o conteúdo vive */}
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222_30%_5%)] via-[hsl(222_30%_5%)]/85 to-transparent lg:via-[hsl(222_30%_5%)]/70" />
        {/* Reforço inferior para breadcrumb + CTA */}
        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-[hsl(222_30%_5%)] via-[hsl(222_30%_5%)]/40 to-transparent" />
        <div className="absolute inset-0 topo-pattern opacity-30" aria-hidden="true" />
      </div>

      <div className="container-custom relative w-full pt-28 pb-12 lg:pt-32 lg:pb-16">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-6 flex items-center flex-wrap gap-1.5 text-xs text-white/70">
            {breadcrumbs.map((c, idx) => (
              <span key={idx} className="inline-flex items-center gap-1.5">
                {idx > 0 && <ChevronRight className="h-3 w-3 text-white/40" />}
                {c.to ? (
                  <Link to={c.to} className="hover:text-white transition-colors">{c.label}</Link>
                ) : (
                  <span className="text-white">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="max-w-[640px]"
        >
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.22em] uppercase text-primary border border-primary/50 px-3 py-1.5 rounded-sm bg-[hsl(222_30%_5%)]/40 backdrop-blur-sm">
              <span className="h-1.5 w-1.5 bg-primary" /> {eyebrow}
            </span>
          )}
          <h1
            className="mt-6 font-heading font-medium text-white text-[1.9rem] sm:text-[2.4rem] lg:text-[3rem]"
            style={{ lineHeight: 1.15, textWrap: "balance" as any }}
          >
            {title}
          </h1>
          {subtitle && (
            <p className="mt-5 max-w-[560px] text-base md:text-lg text-white/85 leading-relaxed">
              {subtitle}
            </p>
          )}
          {actions && <div className="mt-8 flex flex-col sm:flex-row gap-3">{actions}</div>}
        </motion.div>
      </div>
    </section>
  );
}
