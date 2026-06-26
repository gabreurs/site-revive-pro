import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, MessageCircle, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES, BLOG_CATEGORIES, getExternalLinkTarget, getWhatsAppUrl, trackWhatsAppConversion } from "@/lib/constants";
import { REGION_HUB_LIST } from "@/data/regionHubs";
import { motion, AnimatePresence } from "framer-motion";
import logoDark from "@/assets/logo-sms-dark.svg";

type DropKey = "services" | "areas" | "blog" | null;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [drop, setDrop] = useState<DropKey>(null);
  const [mobServices, setMobServices] = useState(false);
  const [mobBlog, setMobBlog] = useState(false);
  const [mobAreas, setMobAreas] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const drawerRef = useRef<HTMLDivElement>(null);
  const closeTimer = useRef<number | null>(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    setMenuOpen(false);
    setDrop(null);
    setMobServices(false);
    setMobBlog(false);
    setMobAreas(false);
  }, [location.pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") setMenuOpen(false); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen || !drawerRef.current) return;
    const focusable = drawerRef.current.querySelectorAll<HTMLElement>(
      'a[href], button, input, textarea, select, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length) focusable[0].focus();
  }, [menuOpen]);

  const openDrop = (k: DropKey) => {
    if (closeTimer.current) { window.clearTimeout(closeTimer.current); closeTimer.current = null; }
    setDrop(k);
  };
  const scheduleClose = () => {
    if (closeTimer.current) window.clearTimeout(closeTimer.current);
    closeTimer.current = window.setTimeout(() => setDrop(null), 120);
  };

  const isActive = (h: string) => h === "/" ? location.pathname === "/" : location.pathname.startsWith(h);
  const target = getExternalLinkTarget();
  const linkCls = (h: string) =>
    `relative flex items-center gap-1 text-sm font-medium transition-colors hover:text-foreground after:absolute after:left-0 after:right-0 after:-bottom-1 after:h-px after:bg-primary after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform after:duration-300 ${
      isActive(h) ? "text-foreground after:scale-x-100" : "text-muted-foreground"
    }`;

  return (
    <>
      <motion.header
        initial={false}
        animate={{ height: scrolled ? 60 : 72 }}
        transition={{ duration: 0.25 }}
        className={`sticky top-0 z-50 w-full transition-colors duration-300 ${
          scrolled
            ? "bg-background/95 backdrop-blur-md border-b border-border shadow-sm"
            : "bg-background border-b border-border/60"
        }`}
      >
        <div className="container-custom h-full">
          <div className="flex h-full items-center justify-between gap-6">
            {/* Logo */}
            <Link to="/" className="shrink-0 flex items-center gap-2" aria-label="SMS Terraplenagem - Início">
              <img src={logoDark} alt="SMS Terraplenagem — Terraplanagem em São Paulo" className="h-6 w-auto md:h-8" />
            </Link>

            {/* Desktop nav */}
            <nav className="hidden lg:flex items-center gap-6 flex-1 justify-center">
              <Link
                to="/"
                className={`flex h-9 w-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/40 ${
                  isActive("/") ? "text-foreground border-foreground/40" : ""
                }`}
                aria-label="Início"
              >
                <Home className="h-4 w-4" />
              </Link>

              {/* Serviços mega menu */}
              <div className="relative" onMouseEnter={() => openDrop("services")} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  className={linkCls("/servicos")}
                  aria-expanded={drop === "services"}
                  aria-haspopup="true"
                >
                  Serviços <ChevronDown className={`h-3.5 w-3.5 transition-transform ${drop === "services" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {drop === "services" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[640px]"
                    >
                      <div className="border border-border bg-card shadow-xl overflow-hidden">
                        <div className="grid grid-cols-2 gap-px bg-border">
                          {SERVICES.map((s) => (
                            <Link
                              key={s.id}
                              to={`/servicos/${s.slug}`}
                              className="group block bg-card px-4 py-3 transition-colors hover:bg-muted"
                            >
                              <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                {s.title}
                              </div>
                              <div className="mt-0.5 text-xs text-muted-foreground line-clamp-2">
                                {s.shortDescription}
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link
                          to="/servicos"
                          className="block bg-muted/50 px-4 py-2.5 text-xs font-medium text-primary hover:bg-muted transition-colors text-center"
                        >
                          Ver todos os serviços →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/sobre" className={linkCls("/sobre")}>Sobre</Link>

              {/* Onde atuamos mega menu */}
              <div className="relative" onMouseEnter={() => openDrop("areas")} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  className={linkCls("/onde-atuamos")}
                  aria-expanded={drop === "areas"}
                  aria-haspopup="true"
                >
                  Onde atuamos <ChevronDown className={`h-3.5 w-3.5 transition-transform ${drop === "areas" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {drop === "areas" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute left-1/2 -translate-x-1/2 top-full pt-3 w-[520px]"
                    >
                      <div className="border border-border bg-card shadow-xl overflow-hidden">
                        <div className="grid grid-cols-2 gap-px bg-border">
                          {REGION_HUB_LIST.map((h) => (
                            <Link
                              key={h.slug}
                              to={`/onde-atuamos/${h.slug}`}
                              className="group block bg-card px-4 py-3 transition-colors hover:bg-muted"
                            >
                              <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                                {h.shortLabel}
                              </div>
                              <div className="mt-0.5 text-xs text-muted-foreground">
                                Terraplanagem em {h.shortLabel}
                              </div>
                            </Link>
                          ))}
                        </div>
                        <Link
                          to="/onde-atuamos"
                          className="block bg-muted/50 px-4 py-2.5 text-xs font-medium text-primary hover:bg-muted transition-colors text-center"
                        >
                          Ver todas as regiões e bairros →
                        </Link>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Blog dropdown */}
              <div className="relative" onMouseEnter={() => openDrop("blog")} onMouseLeave={scheduleClose}>
                <button
                  type="button"
                  className={linkCls("/blog")}
                  aria-expanded={drop === "blog"}
                  aria-haspopup="true"
                >
                  Blog <ChevronDown className={`h-3.5 w-3.5 transition-transform ${drop === "blog" ? "rotate-180" : ""}`} />
                </button>
                <AnimatePresence>
                  {drop === "blog" && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.18, ease: "easeOut" }}
                      className="absolute right-0 top-full pt-3 w-60"
                    >
                      <div className="border border-border bg-card shadow-xl py-1">
                        <Link to="/blog" className="block px-4 py-2 text-sm text-foreground hover:bg-muted transition-colors">Todos os artigos</Link>
                        <div className="my-1 h-px bg-border" />
                        {BLOG_CATEGORIES.map((c) => (
                          <Link key={c.slug} to={`/blog/categoria/${c.slug}`} className="block px-4 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors">
                            {c.label}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <Link to="/contato" className={linkCls("/contato")}>Contato</Link>
            </nav>

            {/* Desktop CTA */}
            <div className="hidden lg:flex shrink-0">
              <Button asChild className="gap-2 bg-whatsapp hover:bg-whatsapp/90 text-white rounded-none px-5 tap-feedback shadow-none">
                <a href={getWhatsAppUrl()} target={target} rel="noopener noreferrer" data-cta="whatsapp" data-location="header" onClick={trackWhatsAppConversion}>
                  <MessageCircle className="h-4 w-4" /> Orçamento
                </a>
              </Button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(true)}
              className="flex h-11 w-11 items-center justify-center lg:hidden"
              aria-label="Abrir menu"
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </motion.header>

      {/* ——— MOBILE DRAWER ——— */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="drawer-overlay lg:hidden"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
            <motion.div
              ref={drawerRef}
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.25, ease: "easeOut" }}
              className="drawer-panel lg:hidden"
              role="dialog"
              aria-modal="true"
              aria-label="Menu de navegação"
            >
              <div className="flex items-center justify-between px-5 py-4 border-b border-border">
                <img src={logoDark} alt="SMS Terraplenagem" className="h-6 w-auto" />
                <button
                  onClick={() => setMenuOpen(false)}
                  className="flex h-10 w-10 items-center justify-center hover:bg-muted"
                  aria-label="Fechar menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              <nav className="flex-1 overflow-y-auto py-4 px-4 space-y-1">
                <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 px-3 py-3 text-base font-medium hover:bg-muted text-foreground">
                  <Home className="h-4 w-4" /> Início
                </Link>

                <div>
                  <button
                    onClick={() => setMobServices(!mobServices)}
                    aria-expanded={mobServices}
                    className="flex w-full items-center justify-between px-3 py-3 text-base font-medium hover:bg-muted text-foreground"
                  >
                    Serviços
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobServices ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobServices && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pl-4 border-l border-border ml-3">
                        <Link to="/servicos" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm text-primary hover:bg-muted">
                          Todos os serviços
                        </Link>
                        {SERVICES.map((s) => (
                          <Link key={s.id} to={`/servicos/${s.slug}`} onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
                            {s.title}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/sobre" onClick={() => setMenuOpen(false)} className="block px-3 py-3 text-base font-medium hover:bg-muted text-foreground">
                  Sobre
                </Link>

                <div>
                  <button
                    onClick={() => setMobAreas(!mobAreas)}
                    aria-expanded={mobAreas}
                    className="flex w-full items-center justify-between px-3 py-3 text-base font-medium hover:bg-muted text-foreground"
                  >
                    Onde atuamos
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobAreas ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobAreas && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pl-4 border-l border-border ml-3">
                        <Link to="/onde-atuamos" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm text-primary hover:bg-muted">
                          Ver todas as regiões
                        </Link>
                        {REGION_HUB_LIST.map((h) => (
                          <Link key={h.slug} to={`/onde-atuamos/${h.slug}`} onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
                            {h.shortLabel}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div>
                  <button
                    onClick={() => setMobBlog(!mobBlog)}
                    aria-expanded={mobBlog}
                    className="flex w-full items-center justify-between px-3 py-3 text-base font-medium hover:bg-muted text-foreground"
                  >
                    Blog
                    <ChevronDown className={`h-4 w-4 transition-transform ${mobBlog ? "rotate-180" : ""}`} />
                  </button>
                  <AnimatePresence>
                    {mobBlog && (
                      <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pl-4 border-l border-border ml-3">
                        <Link to="/blog" onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm text-primary hover:bg-muted">
                          Todos os artigos
                        </Link>
                        {BLOG_CATEGORIES.map((c) => (
                          <Link key={c.slug} to={`/blog/categoria/${c.slug}`} onClick={() => setMenuOpen(false)} className="block px-3 py-2.5 text-sm text-muted-foreground hover:text-foreground hover:bg-muted">
                            {c.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link to="/contato" onClick={() => setMenuOpen(false)} className="block px-3 py-3 text-base font-medium hover:bg-muted text-foreground">
                  Contato
                </Link>
              </nav>

              <div className="border-t border-border p-4 safe-bottom">
                <a
                  href={getWhatsAppUrl()}
                  target={target}
                  rel="noopener noreferrer"
                  data-cta="whatsapp"
                  data-location="drawer"
                  onClick={trackWhatsAppConversion}
                  className="flex w-full items-center justify-center gap-2 bg-whatsapp py-3 text-base font-medium text-white tap-feedback"
                >
                  <MessageCircle className="h-5 w-5" />
                  Solicitar orçamento
                </a>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
