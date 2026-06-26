import { useParams, Link, Navigate } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/layout/PageHero";
import { SUPPORT_OBRAS } from "@/lib/serviceImages";
import { SEOHead } from "@/components/seo/SEOHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnimatedSection } from "@/components/AnimatedSection";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { getRegionHubBySlug } from "@/data/regionHubs";
import { REGIONS, slugifyBairro } from "@/lib/bairros";
import { getLocationPhrase } from "@/lib/preposition";
import { SERVICES } from "@/lib/constants";

export default function RegiaoHub() {
  const { slug } = useParams<{ slug: string }>();
  const hub = slug ? getRegionHubBySlug(slug) : undefined;
  if (!hub) return <Navigate to="/onde-atuamos" replace />;

  const region = REGIONS.find((r) => r.key === hub.key);
  if (!region) return <Navigate to="/onde-atuamos" replace />;

  const canonical = `https://smsterraplenagem.com.br/onde-atuamos/${hub.slug}`;

  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://smsterraplenagem.com.br/" },
      { "@type": "ListItem", position: 2, name: "Onde atuamos", item: "https://smsterraplenagem.com.br/onde-atuamos" },
      { "@type": "ListItem", position: 3, name: hub.shortLabel, item: canonical },
    ],
  };

  return (
    <Layout>
      <SEOHead title={hub.title} description={hub.metaDescription} canonical={canonical} />
      <JsonLd data={breadcrumbLd} />

      <PageHero
        eyebrow={`Região · ${hub.shortLabel}`}
        title={hub.h1}
        subtitle={hub.intro}
        image={SUPPORT_OBRAS.frota.src}
        imageAlt={`Terraplanagem da SMS em ${hub.shortLabel}`}
        breadcrumbs={[
          { label: "Início", to: "/" },
          { label: "Onde atuamos", to: "/onde-atuamos" },
          { label: hub.shortLabel },
        ]}
        actions={
          <WhatsAppCTA
            label="Solicitar orçamento"
            locationTag={`hub-${hub.slug}-hero`}
            size="lg"
            className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-none px-7 py-6 text-sm uppercase tracking-wider tap-feedback"
            icon="message"
          />
        }
      />



      {/* LOCALIDADES */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground">
              Localidades atendidas — {hub.shortLabel}
            </h2>
            <p className="mt-3 max-w-3xl text-muted-foreground">
              {region.intro}
            </p>
            <ul className="mt-8 grid gap-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {region.bairros.map((name) => {
                const s = slugifyBairro(name);
                const aria = `Terraplanagem ${getLocationPhrase(name)}`;
                return (
                  <li key={s}>
                    <Link
                      to={`/terraplanagem-${s}`}
                      aria-label={aria}
                      title={aria}
                      className="flex items-center justify-between rounded-lg border border-border bg-card px-3 py-2.5 text-sm text-foreground/80 hover:border-primary/40 hover:text-primary hover:bg-primary/5 transition-colors"
                    >
                      <span>{name}</span>
                      <ArrowRight className="h-3.5 w-3.5 text-muted-foreground" />
                    </Link>
                  </li>
                );
              })}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* SERVIÇOS DISPONÍVEIS NA REGIÃO */}
      <section className="section-padding section-neutral">
        <div className="container-custom">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-medium text-foreground">
              Serviços disponíveis — {hub.shortLabel}
            </h2>
            <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {SERVICES.map((s) => (
                <Link
                  key={s.id}
                  to={`/servicos/${s.slug}`}
                  className="flex items-center justify-between rounded-md border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:text-primary"
                >
                  {s.title}
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                </Link>
              ))}
            </div>
            <div className="mt-10">
              <WhatsAppCTA label="Chamar no WhatsApp" locationTag={`hub-${hub.slug}-cta`} size="lg" className="rounded-full" />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
}
