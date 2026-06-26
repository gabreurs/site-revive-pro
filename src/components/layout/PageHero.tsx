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
  /** taller variant for landing-style hubs */
  size?: "default" | "tall";
}

/**
 * Full-bleed hero used across subpages — same visual energy as home,
 * but with breadcrumbs and slot for actions. Subpages stop looking generic.
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
  const minH = size === "tall" ? "min-h-[78vh] lg:min-h-[80vh]" : "min-h-[60vh] lg:min-h-[64vh]";

  return (
    <section className={`relative isolate overflow-hidden -mt-20 section-dark ${minH} flex items-end`}>
      <div className="absolute inset-0 -z-10">
        <img
          src={bg}
          alt={imageAlt}
          className="absolute inset-0 h-full w-full object-cover"
          loading="eager"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[hsl(222_30%_6%)]/95 via-[hsl(222_30%_6%)]/70 to-[hsl(222_30%_6%)]/30" />
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222_30%_6%)] via-transparent to-[hsl(222_30%_6%)]/35" />
        <div className="absolute inset-0 topo-pattern opacity-50" aria-hidden="true" />
      </div>

      <div className="container-custom relative w-full pt-32 pb-12 lg:pt-40 lg:pb-16">
        {breadcrumbs && breadcrumbs.length > 0 && (
          <nav aria-label="Breadcrumb" className="mb-5 flex items-center flex-wrap gap-1 text-xs text-white/55">
            {breadcrumbs.map((c, idx) => (
              <span key={idx} className="inline-flex items-center gap-1">
                {idx > 0 && <ChevronRight className="h-3 w-3 text-white/30" />}
                {c.to ? (
                  <Link to={c.to} className="hover:text-white transition-colors">{c.label}</Link>
                ) : (
                  <span className="text-white/80">{c.label}</span>
                )}
              </span>
            ))}
          </nav>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.55, ease: "easeOut" }}
          className="max-w-3xl"
        >
          {eyebrow && (
            <span className="inline-flex items-center gap-2 text-[11px] tracking-[0.24em] uppercase text-primary/90 border border-primary/40 px-3 py-1.5">
              <span className="h-1.5 w-1.5 bg-primary" /> {eyebrow}
            </span>
          )}
          <h1 className="mt-5 font-heading font-medium text-white leading-[1.05] text-[2rem] sm:text-4xl lg:text-[3.75rem]">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-4 max-w-2xl text-base md:text-lg text-white/75 leading-relaxed">
              {subtitle}
            </p>
          )}
          {actions && <div className="mt-7 flex flex-col sm:flex-row gap-3">{actions}</div>}
        </motion.div>
      </div>
    </section>
  );
}
