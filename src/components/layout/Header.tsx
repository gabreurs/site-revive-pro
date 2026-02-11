import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES, BLOG_CATEGORIES, getExternalLinkTarget, getWhatsAppUrl, trackWhatsAppConversion } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";
import logoSvg from "@/assets/logo-sms.svg";

type DesktopDrop = "services" | "blog" | null;

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [deskDrop, setDeskDrop] = useState<DesktopDrop>(null);
  const [mobServices, setMobServices] = useState(false);
  const [mobBlog, setMobBlog] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => { const fn = () => setScrolled(window.scrollY > 20); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  useEffect(() => { setMenuOpen(false); setDeskDrop(null); setMobServices(false); setMobBlog(false); }, [location.pathname]);

  const isActive = (h: string) => h === "/" ? location.pathname === "/" : location.pathname.startsWith(h);
  const target = getExternalLinkTarget();
  const linkCls = (h: string) => `flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${isActive(h) ? "text-primary" : "text-muted-foreground"}`;

  return (
    <motion.header initial={false} animate={{ height: scrolled ? 64 : 80 }} transition={{ duration: 0.2 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${scrolled ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border" : "bg-background border-b border-border/50"}`}>
      <div className="container-custom h-full">
        <div className="flex h-full items-center justify-between">
          <Link to="/" className="shrink-0" aria-label="SMS Terraplenagem - Início"><img src={logoSvg} alt="SMS Terraplenagem" className="h-7 w-auto md:h-8" /></Link>

          {/* Desktop nav */}
          <nav className="hidden items-center gap-7 lg:flex">
            <Link to="/" className={linkCls("/")}>Início</Link>

            {/* Serviços dropdown */}
            <div className="relative" onMouseEnter={() => setDeskDrop("services")} onMouseLeave={() => setDeskDrop(null)}>
              <Link to="/servicos" className={linkCls("/servicos")}>Serviços <ChevronDown className={`h-3.5 w-3.5 transition-transform ${deskDrop === "services" ? "rotate-180" : ""}`} /></Link>
              <AnimatePresence>
                {deskDrop === "services" && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }} className="absolute left-0 top-full pt-2 w-72">
                    <div className="rounded-lg border border-border bg-card p-2 shadow-xl">
                      {SERVICES.map((s) => (<Link key={s.id} to={`/servicos/${s.slug}`} className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{s.title}</Link>))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link to="/sobre" className={linkCls("/sobre")}>Sobre nós</Link>
            <Link to="/contato" className={linkCls("/contato")}>Contato</Link>

            {/* Blog dropdown */}
            <div className="relative" onMouseEnter={() => setDeskDrop("blog")} onMouseLeave={() => setDeskDrop(null)}>
              <Link to="/blog" className={linkCls("/blog")}>Blog <ChevronDown className={`h-3.5 w-3.5 transition-transform ${deskDrop === "blog" ? "rotate-180" : ""}`} /></Link>
              <AnimatePresence>
                {deskDrop === "blog" && (
                  <motion.div initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 4 }} transition={{ duration: 0.15 }} className="absolute left-0 top-full pt-2 w-56">
                    <div className="rounded-lg border border-border bg-card p-2 shadow-xl">
                      <Link to="/blog" className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">Todos os artigos</Link>
                      <div className="my-1 h-px bg-border" />
                      {BLOG_CATEGORIES.map((c) => (<Link key={c.slug} to={`/blog/categoria/${c.slug}`} className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">{c.label}</Link>))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTA */}
          <div className="hidden lg:flex">
            <Button asChild className="gap-2 bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full px-5">
              <a href={getWhatsAppUrl()} target={target} rel="noopener noreferrer" data-cta="whatsapp" data-location="header" onClick={trackWhatsAppConversion}>
                <MessageCircle className="h-4 w-4" /> Solicitar orçamento
              </a>
            </Button>
          </div>

          <button onClick={() => setMenuOpen(!menuOpen)} className="flex h-10 w-10 items-center justify-center rounded-md lg:hidden" aria-label="Abrir menu">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} transition={{ duration: 0.2 }}
            className="border-t border-border bg-background lg:hidden overflow-hidden">
            <div className="container-custom py-4 flex flex-col gap-1">
              <Link to="/" onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted text-muted-foreground">Início</Link>

              {/* Services accordion */}
              <button onClick={() => setMobServices(!mobServices)} className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted text-muted-foreground">
                Serviços <ChevronDown className={`h-4 w-4 transition-transform ${mobServices ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>{mobServices && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pl-4">
                  <Link to="/servicos" onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Todos os Serviços</Link>
                  {SERVICES.map((s) => (<Link key={s.id} to={`/servicos/${s.slug}`} onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground">{s.title}</Link>))}
                </motion.div>
              )}</AnimatePresence>

              <Link to="/sobre" onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted text-muted-foreground">Sobre nós</Link>
              <Link to="/contato" onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted text-muted-foreground">Contato</Link>

              {/* Blog accordion */}
              <button onClick={() => setMobBlog(!mobBlog)} className="flex w-full items-center justify-between rounded-md px-3 py-2.5 text-base font-medium hover:bg-muted text-muted-foreground">
                Blog <ChevronDown className={`h-4 w-4 transition-transform ${mobBlog ? "rotate-180" : ""}`} />
              </button>
              <AnimatePresence>{mobBlog && (
                <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="overflow-hidden pl-4">
                  <Link to="/blog" onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground">Todos os artigos</Link>
                  {BLOG_CATEGORIES.map((c) => (<Link key={c.slug} to={`/blog/categoria/${c.slug}`} onClick={() => setMenuOpen(false)} className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground">{c.label}</Link>))}
                </motion.div>
              )}</AnimatePresence>

              <div className="mt-2 px-3">
                <Button asChild className="w-full gap-2 bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full">
                  <a href={getWhatsAppUrl()} target={target} rel="noopener noreferrer" data-cta="whatsapp" data-location="header-mobile" onClick={trackWhatsAppConversion}>
                    <MessageCircle className="h-4 w-4" /> Solicitar orçamento
                  </a>
                </Button>
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
