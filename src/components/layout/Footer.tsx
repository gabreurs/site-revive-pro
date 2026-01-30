import { Link } from "react-router-dom";
import { Phone, Mail, MapPin, Clock } from "lucide-react";
import { COMPANY_INFO, SERVICES, WHATSAPP_URL } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="border-t bg-secondary text-secondary-foreground">
      <div className="container-custom section-padding">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          {/* Company Info */}
          <div>
            <div className="mb-6">
              <span className="text-2xl font-bold">
                SMS<span className="text-primary">TERRA</span>
              </span>
              <span className="ml-1 text-xs font-medium uppercase tracking-widest text-muted-foreground">
                Plenagem
              </span>
            </div>
            <p className="text-sm text-muted-foreground">
              Terraplanagem em São Paulo com qualidade e segurança garantidas. Atendemos obras
              comerciais e industriais em toda a Grande São Paulo.
            </p>
          </div>

          {/* Services */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Serviços</h4>
            <ul className="space-y-2">
              {SERVICES.slice(0, 5).map((service) => (
                <li key={service.id}>
                  <Link
                    to={`/servicos/${service.id}`}
                    className="text-sm text-muted-foreground transition-colors hover:text-primary"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  to="/servicos"
                  className="text-sm font-medium text-primary transition-colors hover:underline"
                >
                  Ver todos →
                </Link>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link
                  to="/"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Início
                </Link>
              </li>
              <li>
                <Link
                  to="/servicos"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Serviços
                </Link>
              </li>
              <li>
                <Link
                  to="/sobre"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link
                  to="/contato"
                  className="text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="mb-4 text-lg font-semibold">Contato</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 flex-shrink-0" />
                  {COMPANY_INFO.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-primary"
                >
                  <Mail className="h-4 w-4 flex-shrink-0" />
                  {COMPANY_INFO.email}
                </a>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 flex-shrink-0 mt-0.5" />
                {COMPANY_INFO.address}
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Clock className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span className="text-xs">{COMPANY_INFO.hours}</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 border-t border-border/20 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © {new Date().getFullYear()} SMS Terraplenagem. Todos os direitos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
