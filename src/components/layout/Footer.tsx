import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import {
  COMPANY_INFO,
  SERVICES,
  BLOG_POSTS,
  getExternalLinkTarget,
  getWhatsAppUrl,
  trackWhatsAppConversion,
} from "@/lib/constants";
import logoSvg from "@/assets/logo-sms.svg";

export function Footer() {
  return (
    <footer className="border-t border-border/30 bg-[hsl(222,30%,6%)]">
      <div className="container-custom section-padding">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <div className="mb-4">
              <img src={logoSvg} alt="SMS Terraplenagem" className="h-7 w-auto" />
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed max-w-xs">
              Terraplanagem em São Paulo com qualidade e segurança garantidas.
              Atendemos obras comerciais e industriais em toda a Grande São Paulo.
            </p>
            <div className="mt-6 space-y-2">
              <a
                href={getWhatsAppUrl()}
                target={getExternalLinkTarget()}
                rel="noopener noreferrer"
                data-cta="whatsapp"
                data-location="footer"
                onClick={trackWhatsAppConversion}
                className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                <Phone className="h-4 w-4 shrink-0" />
                {COMPANY_INFO.phone}
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors">
                <Mail className="h-4 w-4 shrink-0" />
                {COMPANY_INFO.email}
              </a>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                {COMPANY_INFO.address}
              </div>
              <div className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <p>{COMPANY_INFO.hoursWeekday}</p>
                  <p>{COMPANY_INFO.hoursSaturday}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Serviços</h4>
            <ul className="space-y-2">
              {SERVICES.map((service) => (
                <li key={service.id}>
                  <Link to={`/servicos/${service.slug}`} className="text-sm text-muted-foreground transition-colors hover:text-primary">
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">Início</Link></li>
              <li><Link to="/servicos" className="text-sm text-muted-foreground hover:text-primary transition-colors">Serviços</Link></li>
              <li><Link to="/sobre" className="text-sm text-muted-foreground hover:text-primary transition-colors">Sobre Nós</Link></li>
              <li><Link to="/contato" className="text-sm text-muted-foreground hover:text-primary transition-colors">Contato</Link></li>
              <li><Link to="/blog" className="text-sm text-muted-foreground hover:text-primary transition-colors">Blog</Link></li>
              <li><Link to="/politica-de-privacidade" className="text-sm text-muted-foreground hover:text-primary transition-colors">Política de Privacidade</Link></li>
            </ul>
          </div>

          {/* Blog */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">Blog</h4>
            <ul className="space-y-2">
              {BLOG_POSTS.slice(0, 4).map((post) => (
                <li key={post.slug}>
                  <Link to={`/blog/${post.slug}`} className="text-sm text-muted-foreground hover:text-primary transition-colors line-clamp-1">
                    {post.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/blog" className="text-sm font-medium text-primary hover:underline">
                  Ver todos →
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border/20 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-muted-foreground">
            © {new Date().getFullYear()} SMS Terraplenagem. Todos os direitos reservados.
          </p>
          <Link to="/politica-de-privacidade" className="text-xs text-muted-foreground hover:text-primary transition-colors">
            Política de Privacidade
          </Link>
        </div>
      </div>
    </footer>
  );
}
