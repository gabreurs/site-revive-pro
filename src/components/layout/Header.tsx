import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, ChevronDown, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SERVICES, getWhatsAppUrl } from "@/lib/constants";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { label: "Início", href: "/" },
  { label: "Serviços", href: "/servicos", hasDropdown: true },
  { label: "Sobre nós", href: "/sobre" },
  { label: "Contato", href: "/contato" },
];

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isServicesOpen, setIsServicesOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesOpen(false);
  }, [location.pathname]);

  const isActive = (href: string) => {
    if (href === "/") return location.pathname === "/";
    return location.pathname.startsWith(href);
  };

  return (
    <motion.header
      initial={false}
      animate={{ height: scrolled ? 64 : 80 }}
      transition={{ duration: 0.2 }}
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-background/95 backdrop-blur-md shadow-lg border-b border-border/40"
          : "bg-background border-b border-border/20"
      }`}
    >
      <div className="container-custom h-full">
        <div className="flex h-full items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-1.5 shrink-0">
            <div className="flex items-baseline gap-0">
              <span className="text-xl font-extrabold tracking-tight text-foreground md:text-2xl">
                SMS<span className="text-primary">TERRA</span>
              </span>
              <span className="text-[9px] font-semibold uppercase tracking-[0.2em] text-muted-foreground md:text-[10px] ml-0.5">
                PLENAGEM
              </span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navLinks.map((link) => (
              <div
                key={link.href}
                className="relative"
                onMouseEnter={() => link.hasDropdown && setIsServicesOpen(true)}
                onMouseLeave={() => link.hasDropdown && setIsServicesOpen(false)}
              >
                <Link
                  to={link.href}
                  className={`flex items-center gap-1 text-sm font-medium transition-colors hover:text-primary ${
                    isActive(link.href) ? "text-primary" : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                  {link.hasDropdown && (
                    <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                  )}
                </Link>

                {/* Dropdown */}
                {link.hasDropdown && (
                  <AnimatePresence>
                    {isServicesOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 4 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 4 }}
                        transition={{ duration: 0.15 }}
                        className="absolute left-0 top-full pt-2 w-72"
                      >
                        <div className="rounded-lg border border-border/40 bg-card p-2 shadow-xl">
                          {SERVICES.map((service) => (
                            <Link
                              key={service.id}
                              to={`/servicos/${service.slug}`}
                              className="block rounded-md px-3 py-2.5 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
                            >
                              {service.title}
                            </Link>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                )}
              </div>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden lg:flex">
            <Button asChild className="gap-2 bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full px-5">
              <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-location="header">
                <MessageCircle className="h-4 w-4" />
                Contato
              </a>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="flex h-10 w-10 items-center justify-center rounded-md lg:hidden"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.2 }}
            className="border-t border-border/40 bg-background lg:hidden overflow-hidden"
          >
            <div className="container-custom py-4 flex flex-col gap-1">
              {navLinks.map((link) => (
                <div key={link.href}>
                  {link.hasDropdown ? (
                    <>
                      <button
                        onClick={() => setIsServicesOpen(!isServicesOpen)}
                        className={`flex w-full items-center justify-between rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted ${
                          isActive(link.href) ? "text-primary" : "text-muted-foreground"
                        }`}
                      >
                        {link.label}
                        <ChevronDown className={`h-4 w-4 transition-transform ${isServicesOpen ? 'rotate-180' : ''}`} />
                      </button>
                      <AnimatePresence>
                        {isServicesOpen && (
                          <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="overflow-hidden pl-4"
                          >
                            <Link
                              to="/servicos"
                              onClick={() => setIsMenuOpen(false)}
                              className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                            >
                              Todos os Serviços
                            </Link>
                            {SERVICES.map((service) => (
                              <Link
                                key={service.id}
                                to={`/servicos/${service.slug}`}
                                onClick={() => setIsMenuOpen(false)}
                                className="block rounded-md px-3 py-2 text-sm text-muted-foreground hover:text-foreground"
                              >
                                {service.title}
                              </Link>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </>
                  ) : (
                    <Link
                      to={link.href}
                      onClick={() => setIsMenuOpen(false)}
                      className={`block rounded-md px-3 py-2.5 text-base font-medium transition-colors hover:bg-muted ${
                        isActive(link.href) ? "text-primary" : "text-muted-foreground"
                      }`}
                    >
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
              <div className="mt-2 px-3">
                <Button asChild className="w-full gap-2 bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full">
                  <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-location="header-mobile">
                    <MessageCircle className="h-4 w-4" />
                    Fale Conosco
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
