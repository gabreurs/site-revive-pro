/**
 * Classes utilitárias padronizadas para CTAs em todo o site.
 * Mantém a mesma linguagem visual da home em páginas internas.
 */

// CTA primário em hero escuro (foto + scrim)
export const HERO_PRIMARY_CTA =
  "bg-primary text-primary-foreground hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.6)] transition-all rounded-md px-6 py-6 text-[15px] font-medium normal-case tracking-normal";

// CTA secundário em hero escuro (link/âncora)
export const HERO_SECONDARY_CTA =
  "inline-flex items-center justify-center gap-2 border border-white/25 bg-white/[0.04] text-white hover:bg-white/10 hover:border-white/40 transition-all rounded-md px-6 py-3 text-[15px] font-medium normal-case tracking-normal";

// CTA branco sobre fundo azul (seção "cta-gradient")
export const SECTION_CTA_LIGHT =
  "bg-white text-primary hover:bg-white/95 hover:-translate-y-0.5 transition-all rounded-md px-7 py-6 text-[15px] font-medium normal-case tracking-normal w-full sm:w-auto";

// Pill primário no header
export const HEADER_PILL_CTA =
  "ml-3 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-[13px] font-medium rounded-md hover:bg-primary/90 hover:-translate-y-0.5 hover:shadow-[0_10px_30px_-12px_hsl(var(--primary)/0.6)] transition-all normal-case tracking-normal";

// CTA no drawer mobile
export const DRAWER_CTA =
  "mt-5 flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground py-3 text-[14px] font-medium rounded-md normal-case tracking-normal";
