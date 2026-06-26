import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, ArrowRight, Home, MessageCircle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  SERVICES,
  BLOG_CATEGORIES,
  BLOG_POSTS,
  getExternalLinkTarget,
  getWhatsAppUrl,
  trackWhatsAppConversion,
} from "@/lib/constants";
import { REGION_HUB_LIST } from "@/data/regionHubs";
import { SERVICE_IMAGE_BY_KEY, HERO_OBRA } from "@/lib/serviceImages";
import logoLight from "@/assets/logo-sms.svg";

type MegaType = "services" | "areas" | "blog";
type ActiveMenu = MegaType | null;

interface NavItem {
  label: string;
  to: string;
  mega: boolean;
  type: MegaType | "simple";
  icon?: "home";
}

const NAV: NavItem[] = [
  { label: "Home", to: "/", mega: false, type: "simple", icon: "home" },
  { label: "Serviços", to: "/servicos", mega: true, type: "services" },
  { label: "Onde atuamos", to: "/onde-atuamos", mega: true, type: "areas" },
  { label: "Sobre", to: "/sobre", mega: false, type: "simple" },
  { label: "Blog", to: "/blog", mega: true, type: "blog" },
  { label: "Contato", to: "/contato", mega: false, type: "simple" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [active, setActive] = useState<ActiveMenu>(null);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";
  const target = getExternalLinkTarget();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setActive(null);
  }, [location.pathname]);

  useEffect(() => {
    const isDesktop = window.matchMedia("(min-width: 1024px)").matches;
    if (!isDesktop) document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // close mega on outside click + ESC
  useEffect(() => {
    if (!active) return;
    const click = (e: MouseEvent) => {
      const t = e.target as HTMLElement;
      if (!t.closest("[data-mega-trigger]") && !t.closest("[data-mega-panel]")) setActive(null);
    };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setActive(null); };
    document.addEventListener("click", click);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("click", click); document.removeEventListener("keydown", esc); };
  }, [active]);

  const isActivePath = (p: string) => p === "/" ? location.pathname === "/" : location.pathname.startsWith(p);

  const toggleMega = (t: MegaType) => setActive((p) => (p === t ? null : t));

  const headerBg = scrolled || !isHome
    ? "bg-[hsl(222_30%_8%/0.97)] shadow-lg"
    : "bg-[hsl(222_30%_8%/0.55)]";

  const latestPosts = BLOG_POSTS.slice(0, 3);

  return (
    <>
      <header
        className={`w-full fixed top-0 z-50 transition-[background-color,box-shadow] duration-200 ${headerBg} backdrop-blur-md`}
      >
        <div className="container-custom flex items-center justify-between" style={{ height: scrolled ? 64 : 80 }}>
          {/* Logo */}
          <Link to="/" aria-label="SMS Terraplenagem — Início" className="block shrink-0">
            <img src={logoLight} alt="SMS Terraplenagem" className="h-7 sm:h-8 lg:h-9 w-auto" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-0.5 text-sm font-medium" aria-label="Navegação principal">
            {NAV.map((item) =>
              item.mega ? (
                <button
                  key={item.label}
                  type="button"
                  data-mega-trigger
                  onClick={() => toggleMega(item.type as MegaType)}
                  className={`flex items-center gap-1 px-3.5 py-2 transition-colors ${
                    active === item.type || isActivePath(item.to) ? "text-primary" : "text-white/75 hover:text-white"
                  }`}
                >
                  {item.label}
                  <ChevronDown className={`w-3.5 h-3.5 transition-transform ${active === item.type ? "rotate-180" : ""}`} />
                </button>
              ) : (
                <Link
                  key={item.label}
                  to={item.to}
                  className={`flex items-center gap-1.5 px-3.5 py-2 transition-colors ${
                    isActivePath(item.to) ? "text-primary" : "text-white/75 hover:text-white"
                  }`}
                >
                  {item.icon === "home" && <Home className="w-3.5 h-3.5" />}
                  {item.label}
                </Link>
              )
            )}
            <a
              href={getWhatsAppUrl()}
              target={target}
              rel="noopener noreferrer"
              data-cta="whatsapp"
              data-location="header"
              onClick={trackWhatsAppConversion}
              className="ml-3 inline-flex items-center gap-2 bg-primary text-primary-foreground px-5 py-2.5 text-xs uppercase tracking-wider hover:bg-primary/90 transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5" /> Solicitar orçamento
            </a>
          </nav>

          {/* Mobile toggle */}
          <button
            className="lg:hidden p-2 text-white"
            onClick={() => setMobileOpen((o) => !o)}
            aria-label="Menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* MEGA PANEL — full width, dark */}
        <AnimatePresence>
          {active && (
            <motion.div
              data-mega-panel
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: "easeOut" }}
              className="absolute top-full left-0 w-full border-t border-white/10 shadow-2xl"
              style={{ background: "hsl(222 30% 10%)" }}
            >
              <div className="container-custom py-8">
                {active === "services" && (
                  <MegaServices onClose={() => setActive(null)} />
                )}
                {active === "areas" && (
                  <MegaAreas onClose={() => setActive(null)} />
                )}
                {active === "blog" && (
                  <MegaBlog latest={latestPosts} onClose={() => setActive(null)} />
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* MOBILE MENU */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.25 }}
              className="lg:hidden overflow-hidden border-t border-white/10"
              style={{ background: "hsl(222 30% 9%)", maxHeight: "calc(100dvh - 4rem)" }}
            >
              <div className="container-custom py-5 overflow-y-auto max-h-[calc(100dvh-5rem)]">
                <MobileNav onClose={() => setMobileOpen(false)} />
                <a
                  href={getWhatsAppUrl()}
                  target={target}
                  rel="noopener noreferrer"
                  data-cta="whatsapp"
                  data-location="drawer"
                  onClick={trackWhatsAppConversion}
                  className="mt-5 flex w-full items-center justify-center gap-2 bg-primary text-primary-foreground py-3 text-sm uppercase tracking-wider"
                >
                  <MessageCircle className="w-4 h-4" /> Solicitar orçamento
                </a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* spacer — header is fixed (constant height to avoid CLS) */}
      <div aria-hidden="true" style={{ height: 80 }} />
    </>
  );
}

/* ───────── MEGA: SERVICES ───────── */
function MegaServices({ onClose }: { onClose: () => void }) {
  const featured = SERVICES[0];
  const featuredImg = SERVICE_IMAGE_BY_KEY[featured.image]?.src ?? HERO_OBRA.src;
  // Atalhos — apenas os principais. "Ver todos" leva para a página completa.
  const shortcuts = SERVICES.slice(0, 4);
  return (
    <div>
      <h3 className="text-[10px] tracking-[0.22em] uppercase text-primary mb-5">Serviços em destaque</h3>
      <div className="grid grid-cols-[320px_1fr] gap-8">
        <Link
          to={`/servicos/${featured.slug}`}
          onClick={onClose}
          className="group relative block overflow-hidden border border-white/10 rounded-md aspect-[4/3]"
        >
          <img
            src={featuredImg}
            alt=""
            className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[10px] tracking-[0.18em] uppercase text-primary">Em destaque</span>
            <h4 className="mt-1 text-white text-lg font-medium leading-tight">{featured.title}</h4>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/85 group-hover:text-primary transition-colors">
              Ver serviço <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>
        <div className="flex flex-col">
          <Link
            to="/servicos"
            onClick={onClose}
            className="group flex items-center justify-between py-3 px-4 mb-2 bg-primary/10 border border-primary/30 rounded-md hover:bg-primary/15 transition-colors"
          >
            <div>
              <span className="text-sm font-medium text-white block">Ver todos os serviços</span>
              <span className="text-xs text-white/55">Catálogo completo, equipamentos e detalhes</span>
            </div>
            <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
          </Link>
          <div className="space-y-0.5">
            {shortcuts.map((s) => (
              <Link
                key={s.id}
                to={`/servicos/${s.slug}`}
                onClick={onClose}
                className="group flex items-start justify-between gap-4 py-2.5 px-4 rounded-md hover:bg-white/[0.04] transition-colors"
              >
                <div>
                  <span className="text-sm font-medium text-white/90 group-hover:text-primary transition-colors block">{s.title}</span>
                  <span className="text-xs text-white/45 line-clamp-1">{s.shortDescription}</span>
                </div>
                <ArrowRight className="w-4 h-4 text-white/25 group-hover:text-primary transition-colors flex-shrink-0 mt-1" />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── MEGA: AREAS ───────── */
function MegaAreas({ onClose }: { onClose: () => void }) {
  return (
    <div>
      <h3 className="text-[10px] tracking-[0.22em] uppercase text-primary mb-5">Onde atuamos</h3>
      <div className="grid grid-cols-[280px_1fr] gap-7">
        <Link to="/onde-atuamos" onClick={onClose} className="group relative block overflow-hidden border border-white/10 aspect-[4/5]">
          <img src={HERO_OBRA.src} alt="" className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />
          <div className="absolute bottom-4 left-4 right-4">
            <span className="text-[10px] tracking-[0.18em] uppercase text-primary">Cobertura</span>
            <h4 className="mt-1 text-white text-lg font-medium leading-tight">Toda a Grande São Paulo</h4>
            <span className="mt-3 inline-flex items-center gap-1.5 text-xs text-white/80 group-hover:text-primary transition-colors">
              Ver mapa de atuação <ArrowRight className="w-3.5 h-3.5" />
            </span>
          </div>
        </Link>
        <div className="grid grid-cols-2 gap-x-2 gap-y-0.5">
          {REGION_HUB_LIST.map((h) => (
            <Link key={h.slug} to={`/onde-atuamos/${h.slug}`} onClick={onClose} className="group flex items-center justify-between py-2.5 px-4 hover:bg-white/[0.04] transition-colors">
              <div>
                <span className="text-sm font-medium text-white/85 group-hover:text-primary transition-colors block">{h.shortLabel}</span>
                <span className="text-xs text-white/45">Bairros e localidades</span>
              </div>
              <ArrowRight className="w-4 h-4 text-white/20 group-hover:text-primary transition-colors flex-shrink-0" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────── MEGA: BLOG ───────── */
function MegaBlog({ latest, onClose }: { latest: typeof BLOG_POSTS; onClose: () => void }) {
  return (
    <div>
      <h3 className="text-[10px] tracking-[0.22em] uppercase text-primary mb-5">Blog</h3>
      <div className="grid grid-cols-[200px_1fr] gap-7">
        <div className="space-y-0.5">
          <Link to="/blog" onClick={onClose} className="block py-2 px-3 text-sm font-medium text-white hover:text-primary transition-colors">
            Todos os artigos
          </Link>
          {BLOG_CATEGORIES.map((c) => (
            <Link key={c.slug} to={`/blog/categoria/${c.slug}`} onClick={onClose} className="block py-2 px-3 text-sm text-white/55 hover:text-primary transition-colors">
              {c.label}
            </Link>
          ))}
        </div>
        <div>
          <p className="text-[10px] tracking-[0.18em] uppercase text-white/35 mb-3 px-1">Últimos artigos</p>
          <div className="grid grid-cols-3 gap-3">
            {latest.map((p) => (
              <Link key={p.slug} to={`/blog/${p.slug}`} onClick={onClose} className="group p-4 border border-white/10 hover:border-primary/40 hover:bg-white/[0.03] transition-colors">
                <span className="text-[10px] tracking-[0.14em] uppercase text-primary">{p.category}</span>
                <h4 className="text-sm font-medium text-white/85 mt-1.5 leading-snug group-hover:text-primary transition-colors line-clamp-2">{p.title}</h4>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ───────── MOBILE NAV ───────── */
function MobileNav({ onClose }: { onClose: () => void }) {
  const [openSec, setOpenSec] = useState<MegaType | null>(null);
  return (
    <div className="flex flex-col">
      <Link to="/" onClick={onClose} className="flex items-center gap-2 py-3 px-2 text-white text-base font-medium">
        <Home className="w-4 h-4" /> Home
      </Link>
      <MobileSection
        label="Serviços"
        open={openSec === "services"}
        onToggle={() => setOpenSec(openSec === "services" ? null : "services")}
      >
        <Link to="/servicos" onClick={onClose} className="block py-2 px-3 text-sm text-primary">Todos os serviços</Link>
        {SERVICES.map((s) => (
          <Link key={s.id} to={`/servicos/${s.slug}`} onClick={onClose} className="block py-2 px-3 text-sm text-white/70 hover:text-white">{s.title}</Link>
        ))}
      </MobileSection>
      <MobileSection
        label="Onde atuamos"
        open={openSec === "areas"}
        onToggle={() => setOpenSec(openSec === "areas" ? null : "areas")}
      >
        <Link to="/onde-atuamos" onClick={onClose} className="block py-2 px-3 text-sm text-primary">Ver todas as regiões</Link>
        {REGION_HUB_LIST.map((h) => (
          <Link key={h.slug} to={`/onde-atuamos/${h.slug}`} onClick={onClose} className="block py-2 px-3 text-sm text-white/70 hover:text-white">{h.shortLabel}</Link>
        ))}
      </MobileSection>
      <Link to="/sobre" onClick={onClose} className="block py-3 px-2 text-white text-base font-medium">Sobre</Link>
      <MobileSection
        label="Blog"
        open={openSec === "blog"}
        onToggle={() => setOpenSec(openSec === "blog" ? null : "blog")}
      >
        <Link to="/blog" onClick={onClose} className="block py-2 px-3 text-sm text-primary">Todos os artigos</Link>
        {BLOG_CATEGORIES.map((c) => (
          <Link key={c.slug} to={`/blog/categoria/${c.slug}`} onClick={onClose} className="block py-2 px-3 text-sm text-white/70 hover:text-white">{c.label}</Link>
        ))}
      </MobileSection>
      <Link to="/contato" onClick={onClose} className="block py-3 px-2 text-white text-base font-medium">Contato</Link>
    </div>
  );
}

function MobileSection({ label, open, onToggle, children }: { label: string; open: boolean; onToggle: () => void; children: React.ReactNode }) {
  return (
    <div className="border-b border-white/5">
      <button onClick={onToggle} className="flex w-full items-center justify-between py-3 px-2 text-white text-base font-medium" aria-expanded={open}>
        {label} <ChevronDown className={`w-4 h-4 transition-transform ${open ? "rotate-180" : ""}`} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden pl-2 pb-2">
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
