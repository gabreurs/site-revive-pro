import { Link } from "react-router-dom";
import { MapPin, ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { REGION_HUB_LIST } from "@/data/regionHubs";
import { REGIONS, slugifyBairro } from "@/lib/bairros";
import { getLocationPhrase } from "@/lib/preposition";
import { SERVICES } from "@/lib/constants";

const CANONICAL = "https://smsterraplenagem.com.br/onde-atuamos";

// Localidades em destaque por região (curadoria, não tudo)
const PRIORITY_BY_REGION: Record<string, string[]> = {
  "centro": ["Aclimação", "Bela Vista", "Brás", "Liberdade", "Higienópolis", "Jardins"],
  "zona-norte": ["Santana", "Casa Verde", "Perus", "Anhanguera", "Tucuruvi", "Tremembé"],
  "zona-sul": ["Vila Mariana", "Moema", "Itaim Bibi", "Brooklin", "Morumbi", "Ipiranga"],
  "zona-leste": ["Tatuapé", "Mooca", "Penha", "Vila Prudente", "Vila Formosa", "Belém"],
  "zona-oeste": ["Pinheiros", "Butantã", "Lapa", "Vila Madalena", "Alphaville", "Barueri"],
  "outras": ["Osasco", "Guarulhos", "Cajamar", "Santo André", "São Bernardo do Campo", "Diadema"],
};

export default function OndeAtuamos() {
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://smsterraplenagem.com.br/" },
      { "@type": "ListItem", position: 2, name: "Onde atuamos", item: CANONICAL },
    ],
  };

  return (
    <Layout>
      <SEOHead
        title="Onde atuamos | Terraplanagem em São Paulo e Grande SP — SMS Terraplenagem"
        description="Áreas atendidas pela SMS Terraplenagem na capital, Grande São Paulo e interior. Veja as regiões e localidades para serviços de terraplanagem, demolição, limpeza e nivelamento."
        canonical={CANONICAL}
      />
      <JsonLd data={breadcrumbLd} />

      {/* HERO */}
      <section className="section-dark py-12 md:py-20 topo-pattern">
        <div className="container-custom">
          <AnimatedSection>
            <nav aria-label="breadcrumb" className="mb-4 text-xs text-gray-400">
              <Link to="/" className="hover:text-primary">Início</Link>
              <span className="mx-2">/</span>
              <span className="text-white">Onde atuamos</span>
            </nav>
            <h1 className="font-heading text-3xl md:text-5xl font-extrabold text-white leading-tight">
              Onde a SMS Terraplenagem atende em São Paulo e região
            </h1>
            <p className="mt-4 max-w-3xl text-base md:text-lg text-gray-300">
              Atendemos a capital de São Paulo, Grande São Paulo, ABC paulista e cidades do interior com frota própria e equipe dedicada — terraplanagem, limpeza de terreno, demolição, nivelamento e movimentação de terra para obras comerciais, industriais e residenciais.
            </p>
            <div className="mt-6">
              <WhatsAppCTA
                label="Solicitar orçamento"
                locationTag="onde-atuamos-hero"
                size="lg"
                className="bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full"
                icon="message"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* MACRO REGIÕES */}
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeading
            title="Regiões atendidas"
            subtitle="Cada região concentra perfis de obra diferentes. Veja os bairros e cidades atendidas em cada uma."
          />
          <div className="mt-10 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {REGION_HUB_LIST.map((hub) => {
              const localidades = PRIORITY_BY_REGION[hub.key] || [];
              return (
                <article
                  key={hub.key}
                  className="group relative flex flex-col rounded-2xl border border-border bg-card p-6 transition-all hover:border-primary/40 hover:shadow-md"
                >
                  <span aria-hidden="true" className="absolute left-6 top-0 h-1 w-10 -translate-y-1/2 rounded-full bg-primary" />
                  <h2 className="font-heading text-lg font-semibold text-foreground">
                    <Link to={`/onde-atuamos/${hub.slug}`} className="hover:text-primary">
                      {hub.shortLabel}
                    </Link>
                  </h2>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{hub.intro}</p>
                  <ul className="mt-4 flex flex-wrap gap-2">
                    {localidades.map((name) => {
                      const slug = slugifyBairro(name);
                      const aria = `Terraplanagem ${getLocationPhrase(name)}`;
                      return (
                        <li key={slug}>
                          <Link
                            to={`/terraplanagem-${slug}`}
                            aria-label={aria}
                            title={aria}
                            className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-colors"
                          >
                            {name}
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                  <Link
                    to={`/onde-atuamos/${hub.slug}`}
                    className="mt-5 inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                  >
                    Ver todas as localidades <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* SERVIÇOS */}
      <section className="section-padding section-neutral">
        <div className="container-custom">
          <SectionHeading
            title="Serviços disponíveis em todas as regiões"
            subtitle="Atendimento com frota própria para terraplanagem, limpeza, demolição, nivelamento e movimentação de terra."
          />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <Link
                key={s.id}
                to={`/servicos/${s.slug}`}
                className="flex items-center justify-between rounded-xl border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
              >
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-primary" />
                  {s.title}
                </span>
                <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary" />
              </Link>
            ))}
          </div>
          <div className="mt-10 flex justify-center">
            <WhatsAppCTA label="Falar com a SMS no WhatsApp" locationTag="onde-atuamos-footer-cta" size="lg" className="rounded-full" />
          </div>
        </div>
      </section>
    </Layout>
  );
}

// Help para silenciar imports não usados em alguns builds
void REGIONS;
