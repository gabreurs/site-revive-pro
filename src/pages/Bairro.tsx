import { useParams, useLocation, Link } from "react-router-dom";
import {
  ArrowRight, MapPin, CheckCircle2, Truck, Building2, ShieldCheck, ClipboardList, ExternalLink,
} from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { JsonLd } from "@/components/seo/JsonLd";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { COMPANY_INFO, WHATSAPP_NUMBER } from "@/lib/constants";
import { findBairroBySlug, slugifyBairro } from "@/lib/bairros";
import { getPreposition, getLocationPhrase } from "@/lib/preposition";
import { getProfileByName, googleMapsLink, getServiceText, getLocationOverride } from "@/data/locationProfiles";

import heroImg from "@/assets/hero-terraplanagem.jpg";
import limpezaImg from "@/assets/limpeza-terreno.jpg";
import demolicaoImg from "@/assets/demolicao.jpg";
import escavacaoImg from "@/assets/escavacao.jpg";
import movimentacaoImg from "@/assets/movimentacao-terra.jpg";
import transporteImg from "@/assets/transporte-locacao.jpg";

type ServiceKey = "terraplanagem" | "limpeza" | "demolicao" | "nivelamento" | "movimentacao" | "preparo";

const SERVICE_META: Record<ServiceKey, { title: string; image: string; linkTo: string; alt: (p: string) => string }> = {
  terraplanagem: {
    title: "Terraplanagem",
    image: heroImg,
    linkTo: "/servicos",
    alt: (p) => `Escavadeira em serviço de terraplanagem ${p}`,
  },
  limpeza: {
    title: "Limpeza de terreno",
    image: limpezaImg,
    linkTo: "/servicos/limpeza-de-terreno",
    alt: (p) => `Limpeza de terreno ${p} com remoção de vegetação e entulho`,
  },
  demolicao: {
    title: "Demolição",
    image: demolicaoImg,
    linkTo: "/servicos/demolicao",
    alt: (p) => `Demolição controlada ${p} com escavadeira hidráulica`,
  },
  nivelamento: {
    title: "Nivelamento de terreno",
    image: movimentacaoImg,
    linkTo: "/servicos/movimentacao-de-terra-corte-e-aterro",
    alt: (p) => `Nivelamento de terreno ${p} com motoniveladora e rolo compactador`,
  },
  movimentacao: {
    title: "Movimentação de terra",
    image: escavacaoImg,
    linkTo: "/servicos/movimentacao-de-terra-corte-e-aterro",
    alt: (p) => `Movimentação de terra ${p} com escavadeira e caminhões basculantes`,
  },
  preparo: {
    title: "Preparo de terreno para obra",
    image: transporteImg,
    linkTo: "/servicos",
    alt: (p) => `Preparo de terreno para obra ${p} pela frota da SMS Terraplenagem`,
  },
};

const SERVICE_ORDER: ServiceKey[] = ["terraplanagem", "limpeza", "demolicao", "nivelamento", "movimentacao", "preparo"];

const Bairro = () => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  const prefix = "/terraplanagem-";
  const derivedSlug = pathname.startsWith(prefix)
    ? pathname.slice(prefix.length).replace(/\/$/, "")
    : undefined;
  const slug = paramSlug || derivedSlug;
  const bairro = slug ? findBairroBySlug(slug) : undefined;

  if (!bairro) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-muted">
        <div className="text-center">
          <h1 className="mb-4 text-4xl font-bold">404</h1>
          <p className="mb-4 text-xl text-muted-foreground">Localidade não encontrada</p>
          <a href="/" className="text-primary underline hover:text-primary/90">Voltar para o início</a>
        </div>
      </div>
    );
  }

  const { name, region, path, slug: bairroSlug } = bairro;
  const isCidade = region.key === "outras";
  const prep = getPreposition(name);
  const phrase = `${prep} ${name}`; // ex: "no Tatuapé"
  const cityLabel = isCidade ? name : "São Paulo";
  const profile = getProfileByName(name, region.key);
  const override = getLocationOverride(bairroSlug);

  const h1 = `Terraplanagem ${phrase} ${profile.h1Suffix}`;
  const seoTitle = override.title || `Terraplanagem ${phrase} | SMS Terraplenagem`;
  const seoDesc =
    override.metaDescription ||
    `Terraplanagem ${phrase} para ${profile.descSuffix}. Limpeza de terreno, demolição, nivelamento, movimentação de terra e preparo de solo com frota própria.`;
  const firstSentence = override.firstSentence || profile.heroLead(phrase);
  const introSentence =
    override.introSentence ||
    `${name} é uma ${profile.introProfile}. Por isso, a terraplanagem ${phrase} costuma envolver ${profile.workContext}, com cuidado especial no ${profile.accessConcern}.`;
  const canonical = `https://smsterraplenagem.com.br${path}`;
  const whatsappMsg = `Olá! Gostaria de um orçamento de terraplanagem ${phrase}.`;
  const mapsHref = googleMapsLink(name, cityLabel);
  const faq = profile.faq(name, phrase);
  const nearbyBairros = region.bairros.filter((n) => n !== name).slice(0, 12);

  // ---------- JSON-LD ----------
  const breadcrumbLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Início", item: "https://smsterraplenagem.com.br/" },
      { "@type": "ListItem", position: 2, name: region.label, item: "https://smsterraplenagem.com.br/#areas-atendimento" },
      { "@type": "ListItem", position: 3, name: `Terraplanagem ${phrase}`, item: canonical },
    ],
  };
  const localBusinessLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": canonical,
    name: `${COMPANY_INFO.name} — Terraplanagem ${phrase}`,
    url: canonical,
    telephone: `+${WHATSAPP_NUMBER}`,
    image: "https://smsterraplenagem.com.br/og-image.jpg",
    priceRange: "$$",
    areaServed: { "@type": "Place", name: `${name}, ${cityLabel}` },
    address: { "@type": "PostalAddress", addressLocality: cityLabel, addressRegion: "SP", addressCountry: "BR" },
  };
  const serviceLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: "Terraplanagem",
    name: `Terraplanagem ${phrase}`,
    areaServed: { "@type": "Place", name: `${name}, ${cityLabel}` },
    provider: { "@type": "LocalBusiness", name: COMPANY_INFO.name, url: "https://smsterraplenagem.com.br" },
    description: seoDesc,
  };
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };

  return (
    <Layout>
      <SEOHead title={seoTitle} description={seoDesc} canonical={canonical} />
      <JsonLd data={breadcrumbLd} />
      <JsonLd data={localBusinessLd} />
      <JsonLd data={serviceLd} />
      <JsonLd data={faqLd} />

      {/* HERO */}
      <section className="section-dark py-12 md:py-20 topo-pattern">
        <div className="container-custom">
          <AnimatedSection>
            <nav aria-label="breadcrumb" className="mb-4 text-xs text-gray-400">
              <Link to="/" className="hover:text-primary">Início</Link>
              <span className="mx-2">/</span>
              <a href="/#areas-atendimento" className="hover:text-primary">Onde atuamos</a>
              <span className="mx-2">/</span>
              <span className="text-gray-300">{region.label}</span>
              <span className="mx-2">/</span>
              <span className="text-white">{name}</span>
            </nav>

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr] items-center">
              <div>
                <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                  <MapPin className="h-3.5 w-3.5" /> {region.label} · {cityLabel}
                </span>
                <h1 className="mt-3 font-heading text-[1.75rem] font-extrabold text-white md:text-5xl leading-tight">
                  {h1}
                </h1>
                <p className="mt-4 text-base md:text-lg text-gray-300">
                  {firstSentence}
                </p>
                <div className="mt-6 flex flex-col sm:flex-row gap-3">
                  <WhatsAppCTA
                    label={`Orçamento ${phrase}`}
                    message={whatsappMsg}
                    locationTag={`bairro-hero-${bairro.slug}`}
                    size="lg"
                    className="bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full"
                    icon="message"
                  />
                  <a
                    href="#servicos-locais"
                    className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                  >
                    Ver serviços atendidos {phrase}
                  </a>
                </div>
              </div>

              <div className="hidden lg:block">
                <img
                  src={heroImg}
                  alt={`Escavadeira em serviço de terraplanagem ${phrase} pela SMS Terraplenagem`}
                  className="w-full h-[360px] object-cover rounded-2xl shadow-2xl"
                  loading="eager"
                />
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* INTRO ESPECÍFICA POR PERFIL */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Terraplanagem {phrase}: contexto local e tipos de obra atendidos
            </h2>
            <div className="mt-4 space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                {name} é uma {profile.introProfile}. Por isso, a terraplanagem {phrase} costuma envolver {profile.workContext}, com cuidado especial no {profile.accessConcern}.
              </p>
              <p>
                {region.intro} A SMS Terraplenagem atua nessa região com frota própria — escavadeira, retroescavadeira, motoniveladora, rolo compactador e caminhões basculantes — o que reduz dependência de terceiros e dá mais previsibilidade ao cronograma da obra {phrase}.
              </p>
              <p>
                Cada projeto começa com uma avaliação do terreno e do escopo da obra. Só depois apresentamos o orçamento, com clareza sobre serviços, prazos e logística específicos para {name}.
              </p>
            </div>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                "Frota e equipe próprias",
                "Orçamento rápido pelo WhatsApp",
                "Descarte de entulho conforme normas",
                "Atendimento a obras comerciais e industriais",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* LOCALIZAÇÃO E ATENDIMENTO (sem mapa fake) */}
      <section className="section-padding section-neutral">
        <div className="container-custom grid gap-8 lg:grid-cols-2 items-start">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Atendimento de terraplanagem {phrase} e entorno
            </h2>
            <p className="mt-3 text-muted-foreground">
              A SMS Terraplenagem atende {name} e bairros próximos {isCidade ? "no entorno" : `da ${region.label}`} em serviços de preparação de terreno, limpeza, demolição, movimentação de terra e nivelamento. Por se tratar de {profile.introProfile.split(",")[0]}, o planejamento da operação considera {profile.accessConcern}.
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {nearbyBairros.map((n) => {
                const s = slugifyBairro(n);
                return (
                  <Link
                    key={s}
                    to={`/terraplanagem-${s}`}
                    className="rounded-full border border-border bg-card px-3 py-1.5 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    Terraplanagem {getLocationPhrase(n)}
                  </Link>
                );
              })}
            </div>
          </AnimatedSection>

          {/* Card informativo de localização (sem mapa desenhado) */}
          <AnimatedSection delay={0.1}>
            <div className="overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
              <div className="relative h-48">
                <img
                  src={escavacaoImg}
                  alt={`Terraplanagem e preparo de terreno para obras ${phrase} e região`}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="p-6">
                <h3 className="font-heading text-lg font-semibold text-foreground">
                  Localização e atendimento {phrase}
                </h3>
                <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <dt className="text-xs text-muted-foreground">Localidade</dt>
                    <dd className="font-medium text-foreground">{name}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Cidade</dt>
                    <dd className="font-medium text-foreground">{cityLabel}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Região</dt>
                    <dd className="font-medium text-foreground">{region.label}</dd>
                  </div>
                  <div>
                    <dt className="text-xs text-muted-foreground">Tipo</dt>
                    <dd className="font-medium text-foreground">{isCidade ? "Cidade" : "Bairro"}</dd>
                  </div>
                  <div className="col-span-2">
                    <dt className="text-xs text-muted-foreground">Atendimento</dt>
                    <dd className="font-medium text-foreground">{profile.atendimento}</dd>
                  </div>
                  {nearbyBairros.length > 0 && (
                    <div className="col-span-2">
                      <dt className="text-xs text-muted-foreground">Bairros próximos</dt>
                      <dd className="font-medium text-foreground">
                        {nearbyBairros.slice(0, 6).join(", ")}
                      </dd>
                    </div>
                  )}
                </dl>
                <a
                  href={mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-5 inline-flex items-center gap-1.5 rounded-full border border-primary/30 px-4 py-2 text-sm font-medium text-primary hover:bg-primary/10 transition-colors"
                >
                  Ver {name} no mapa <ExternalLink className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* SEÇÕES DETALHADAS POR SERVIÇO */}
      <section id="servicos-locais" className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading
              title={`Serviços de terraplanagem ${phrase}`}
              subtitle="Cada etapa da obra atendida com frota própria e equipe especializada"
              centered
            />
          </AnimatedSection>

          <div className="mt-10 space-y-12 md:space-y-16">
            {SERVICE_ORDER.map((key, i) => {
              const meta = SERVICE_META[key];
              const text = profile.service[key](phrase);
              const reverse = i % 2 === 1;
              return (
                <AnimatedSection key={key} delay={i * 0.05}>
                  <article className={`grid gap-6 md:gap-10 md:grid-cols-2 items-center ${reverse ? "md:[&>div:first-child]:order-2" : ""}`}>
                    <div className="overflow-hidden rounded-2xl">
                      <img
                        src={meta.image}
                        alt={meta.alt(phrase)}
                        className="w-full h-64 md:h-80 object-cover"
                        loading="lazy"
                      />
                    </div>
                    <div>
                      <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
                        {meta.title} {phrase}
                      </h2>
                      <p className="mt-4 text-muted-foreground leading-relaxed">
                        {text}
                      </p>
                      <div className="mt-5 flex flex-wrap gap-3">
                        <Link
                          to={meta.linkTo}
                          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
                        >
                          Saiba mais sobre {meta.title.toLowerCase()} <ArrowRight className="h-4 w-4" />
                        </Link>
                        <WhatsAppCTA
                          label="Orçamento pelo WhatsApp"
                          message={`Olá! Quero um orçamento de ${meta.title.toLowerCase()} ${phrase}.`}
                          locationTag={`bairro-${bairro.slug}-${key}`}
                          size="sm"
                          variant="outline"
                          icon="message"
                        />
                      </div>
                    </div>
                  </article>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* FROTA PRÓPRIA */}
      <section className="section-padding section-dark">
        <div className="container-custom grid gap-8 lg:grid-cols-[1fr_1.2fr] items-center">
          <AnimatedSection>
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/15 px-3 py-1 text-xs font-medium text-primary">
              <Truck className="h-3.5 w-3.5" /> Frota própria
            </span>
            <h2 className="mt-3 font-heading text-2xl md:text-3xl font-bold text-white">
              Frota própria para terraplanagem {phrase}
            </h2>
            <p className="mt-4 text-gray-300">
              Trabalhar com frota própria significa mais controle sobre o cronograma da obra, menos dependência de terceiros e mais agilidade no atendimento {phrase}. Equipamentos disponíveis para movimentação de terra, demolição, nivelamento e transporte de material.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.1}>
            <ul className="grid gap-3 sm:grid-cols-2">
              {[
                "Mais controle sobre o cronograma",
                "Menos dependência de terceiros",
                "Agilidade para visita e orçamento",
                "Equipamentos adequados ao porte da obra",
                "Atendimento a obras comerciais e industriais",
                "Caminhões basculantes próprios para retirada de material",
              ].map((p) => (
                <li key={p} className="flex items-start gap-2 text-sm text-gray-200 bg-white/5 border border-white/10 rounded-xl p-3">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" /> {p}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* TIPOS DE OBRAS */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading
              title={`Obras atendidas pela SMS Terraplenagem ${phrase}`}
              subtitle="Atuação em diferentes tipos de projeto, do terreno urbano ao galpão industrial"
              centered
            />
          </AnimatedSection>
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Obras comerciais", d: "Preparação de terreno para lojas, centros comerciais e empreendimentos de uso misto." },
              { t: "Obras industriais", d: "Movimentação de terra e nivelamento para fábricas, indústrias e áreas produtivas." },
              { t: "Galpões e áreas logísticas", d: "Terraplanagem para galpões, centros de distribuição e pátios de manobra." },
              { t: "Estacionamentos", d: "Nivelamento, compactação e preparo de base para estacionamentos cobertos e abertos." },
              { t: "Terrenos urbanos", d: "Limpeza, demolição e regularização de lotes urbanos antes da construção." },
              { t: "Reformas com demolição", d: "Demolição controlada e retirada de entulho em reformas de prédios e instalações." },
            ].map((o) => (
              <div key={o.t} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 text-primary">
                  <Building2 className="h-4 w-4" />
                  <h3 className="font-heading font-semibold text-foreground">{o.t}</h3>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{o.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROCESSO DE CONTRATAÇÃO */}
      <section className="section-padding section-neutral">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading
              title={`Como contratar terraplanagem ${phrase}`}
              subtitle="Um processo simples, do primeiro contato até a execução"
              centered
            />
          </AnimatedSection>
          <ol className="mt-8 grid gap-4 md:grid-cols-3">
            {[
              "Solicitação de orçamento pelo WhatsApp",
              "Entendimento do tipo de obra e localização",
              "Avaliação das condições do terreno",
              "Definição dos serviços necessários",
              "Programação da equipe e da frota",
              "Execução da terraplanagem, limpeza, demolição ou nivelamento",
            ].map((step, i) => (
              <li key={step} className="rounded-2xl border border-border bg-card p-5">
                <div className="flex items-center gap-2 text-primary">
                  <ClipboardList className="h-4 w-4" />
                  <span className="text-xs font-semibold uppercase tracking-wide">Passo {i + 1}</span>
                </div>
                <p className="mt-2 text-sm text-foreground">{step}</p>
              </li>
            ))}
          </ol>
          <div className="mt-8 flex justify-center">
            <WhatsAppCTA
              label={`Falar com a SMS pelo WhatsApp`}
              message={whatsappMsg}
              locationTag={`bairro-processo-${bairro.slug}`}
              size="lg"
              className="bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full"
              icon="message"
            />
          </div>
        </div>
      </section>

      {/* FAQ REGIONAL */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <AnimatedSection>
            <SectionHeading
              title={`Dúvidas frequentes sobre terraplanagem ${phrase}`}
              subtitle="Perguntas comuns de quem vai contratar o serviço"
              centered
            />
          </AnimatedSection>
          <Accordion type="single" collapsible className="mt-8">
            {faq.map((item, i) => (
              <AccordionItem key={i} value={`faq-${i}`}>
                <AccordionTrigger className="text-left text-base font-medium">{item.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{item.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="section-padding cta-gradient section-dark">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-white md:text-4xl">
              Obra {phrase}? Vamos conversar.
            </h2>
            <p className="mx-auto mt-3 md:mt-4 max-w-2xl text-base md:text-lg text-white/80">
              Envie os detalhes do terreno pelo WhatsApp e receba um orçamento de terraplanagem rápido e sem compromisso.
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <WhatsAppCTA
                label="Solicitar orçamento"
                message={whatsappMsg}
                locationTag={`bairro-cta-${bairro.slug}`}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 w-full sm:w-auto"
              />
              <Link to="/contato" className="text-sm text-white/80 hover:text-white underline underline-offset-4">
                Formulário de contato
              </Link>
            </div>
            <p className="mt-4 text-xs text-white/60 flex items-center justify-center gap-1">
              <ShieldCheck className="h-3.5 w-3.5" /> Avaliação sem compromisso · Equipe e frota próprias
            </p>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Bairro;
