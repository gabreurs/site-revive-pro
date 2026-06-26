import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/seo/SEOHead";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import {
  Accordion, AccordionContent, AccordionItem, AccordionTrigger,
} from "@/components/ui/accordion";
import { Layout } from "@/components/layout/Layout";
import {
  SERVICES, COVERAGE_AREAS, TESTIMONIALS, FAQ_ITEMS, DIFFERENTIALS, BLOG_POSTS,
} from "@/lib/constants";

import heroImage from "@/assets/hero-terraplanagem.jpg";
import limpezaImg from "@/assets/limpeza-terreno.jpg";
import demolicaoImg from "@/assets/demolicao.jpg";
import escavacaoImg from "@/assets/escavacao.jpg";
import movimentacaoImg from "@/assets/movimentacao-terra.jpg";
import perfuracaoImg from "@/assets/perfuracao.jpg";
import transporteImg from "@/assets/transporte-locacao.jpg";

// Registros reais de obra enviados pela equipe SMS (uso em cards compactos)
import obraEscavadeiraPrancha from "@/assets/obras/sms-escavadeira-prancha.jpg.asset.json";
import obraDemolicaoTerreno from "@/assets/obras/sms-demolicao-terreno.jpg.asset.json";
import obraFrotaEscavadeiras from "@/assets/obras/sms-frota-escavadeiras.jpg.asset.json";
import obraCaminhaoTransporte from "@/assets/obras/sms-caminhao-transporte.jpg.asset.json";
import obraVolvoCanteiro from "@/assets/obras/sms-volvo-canteiro.jpg.asset.json";
import obraMiniEscavadeira from "@/assets/obras/sms-mini-escavadeira-sy35.jpg.asset.json";
import obraDoosanPatio from "@/assets/obras/sms-doosan-patio.jpg.asset.json";
import videoObra1 from "@/assets/obras/obra-14-43-07.mp4.asset.json";
import videoObra1Poster from "@/assets/obras/obra-14-43-07-poster.jpg.asset.json";

const OBRA_GALLERY = [
  { src: obraDemolicaoTerreno.url, alt: "Demolição de sobrado em São Paulo com escavadeira SMS removendo alvenaria" },
  { src: obraFrotaEscavadeiras.url, alt: "Frota SMS com mini escavadeira SY35U, SY75C e Doosan estacionadas em pátio próprio" },
  { src: obraEscavadeiraPrancha.url, alt: "Escavadeira SMS sendo transportada em prancha rebaixada para obra na capital" },
  { src: obraVolvoCanteiro.url, alt: "Escavadeira Volvo EC140B da SMS em canteiro de terraplanagem na Grande São Paulo" },
  { src: obraCaminhaoTransporte.url, alt: "Caminhão prancha SMS 18-310 carregando escavadeira Sany para obra" },
  { src: obraMiniEscavadeira.url, alt: "Mini escavadeira Sany SY35U da SMS em serviço de escavação em área urbana restrita" },
];

const serviceImages: Record<string, string> = {
  "limpeza-terreno": limpezaImg, demolicao: demolicaoImg, escavacao: escavacaoImg,
  "movimentacao-terra": movimentacaoImg, perfuracao: perfuracaoImg, "transporte-locacao": transporteImg,
};

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="Terraplanagem em SP | SMS Terraplenagem — Grande São Paulo"
        description="Serviços de terraplanagem, escavação, corte e aterro e demolição em São Paulo e Grande SP. Orçamento rápido pelo WhatsApp."
        canonical="https://smsterraplenagem.com.br"
        keywords="terraplanagem em sp, terraplanagem são paulo, movimentação de terra"
      />
      <LocalBusinessJsonLd />

      {/* ═══════════ HERO ═══════════ */}
      <section className="relative overflow-hidden section-dark">
        <div className="grid lg:grid-cols-2 min-h-[50vh] lg:min-h-[70vh]">
          {/* Left - Blue panel with text */}
          <div className="hero-blue-panel relative topo-pattern">
            <div className="container-custom flex items-center h-full py-12 md:py-20 lg:py-28 lg:pr-16">
              <AnimatedSection>
                <h1 className="font-heading text-[1.75rem] font-extrabold leading-[1.1] text-white md:text-5xl lg:text-[3.25rem]">
                  Terraplanagem em São Paulo com equipamento próprio
                </h1>
                <p className="mt-4 md:mt-6 max-w-xl text-[0.94rem] text-white/80 md:text-lg leading-relaxed">
                  Movimentação de terra, nivelamento e preparo de terreno para obras comerciais e
                  industriais em toda a Grande São Paulo. Além disso, contamos com frota própria para garantir agilidade e cumprimento de prazo.
                </p>
                <div className="mt-6 md:mt-8 flex flex-col gap-3 sm:flex-row">
                  <WhatsAppCTA label="Solicitar cotação rápida" locationTag="hero" size="lg"
                    className="bg-white text-primary hover:bg-white/90 rounded-full px-6 w-full sm:w-auto tap-feedback" icon="message" />
                  <Button asChild variant="outline" size="lg"
                    className="gap-2 border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full px-6 w-full sm:w-auto tap-feedback">
                    <Link to="/servicos">Ver serviços <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Right - Full image (desktop) */}
          <div className="relative hidden lg:block">
            <img src={heroImage} alt="Escavadeira realizando movimentação de terra em obra na Grande São Paulo"
              className="absolute inset-0 h-full w-full object-cover" loading="eager" width={960} height={720} />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(217,91%,50%)]/20 to-transparent" aria-hidden="true" />
          </div>
        </div>

        {/* Mobile image */}
        <div className="relative h-48 sm:h-56 lg:hidden">
          <img src={heroImage} alt="Máquinas de terraplanagem em obra na região de São Paulo" className="h-full w-full object-cover" loading="eager" width={800} height={400} />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,30%,8%)] to-transparent" aria-hidden="true" />
        </div>
      </section>

      {/* ═══════════ SERVIÇOS ═══════════ */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading title="Nossos serviços" subtitle="Conheça as principais soluções que oferecemos para preparar seu terreno com segurança" centered />
          </AnimatedSection>

          {/* Desktop grid */}
          <div className="hidden md:grid gap-5 md:grid-cols-2 mb-5">
            {SERVICES.slice(0, 2).map((s, i) => (
              <AnimatedSection key={s.id} delay={i * 0.08}>
                <ServiceCard id={s.id} slug={s.slug} title={s.title} description={s.shortDescription} image={serviceImages[s.image]} variant="large" />
              </AnimatedSection>
            ))}
          </div>
          <div className="hidden md:grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(2).map((s, i) => (
              <AnimatedSection key={s.id} delay={i * 0.06}>
                <ServiceCard id={s.id} slug={s.slug} title={s.title} description={s.shortDescription} image={serviceImages[s.image]} />
              </AnimatedSection>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden carousel-snap -mx-4 px-4">
            {SERVICES.map((s) => (
              <div key={s.id} className="w-[75vw] max-w-[300px]">
                <ServiceCard id={s.id} slug={s.slug} title={s.title} description={s.shortDescription} image={serviceImages[s.image]} />
              </div>
            ))}
          </div>

          <AnimatedSection className="mt-8 md:mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-7 w-full sm:w-auto tap-feedback">
              <Link to="/servicos">Ver todos os serviços</Link>
            </Button>
            <WhatsAppCTA label="Solicitar orçamento" locationTag="servicos-home" variant="outline" size="lg" className="rounded-full w-full sm:w-auto tap-feedback" />
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ ÁREAS ATENDIDAS ═══════════ */}
      <section id="areas-atendimento" className="section-padding section-neutral">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading
              title="Terraplanagem na Grande São Paulo para obras comerciais e industriais"
              subtitle="A SMS Terraplenagem atende a capital, bairros de São Paulo e municípios da região metropolitana com movimentação de terra, limpeza de terreno, demolição, nivelamento e preparo de solo."
            />
          </AnimatedSection>

          <div className="mt-10 grid gap-8 lg:grid-cols-12 lg:items-start">
            {/* Imagem real lateral — sticky para não deixar buraco vazio */}
            <AnimatedSection direction="left" className="hidden lg:block lg:col-span-5">
              <div className="lg:sticky lg:top-24">
                <div className="overflow-hidden rounded-2xl shadow-sm">
                  <img
                    src={heroImage}
                    alt="Escavadeira da SMS Terraplenagem em operação de movimentação de terra em obra na Grande São Paulo"
                    className="aspect-[4/5] w-full object-cover"
                    loading="lazy"
                    width={720}
                    height={900}
                  />
                </div>
                <div className="mt-5 rounded-2xl border border-border bg-card p-5">
                  <p className="text-sm text-muted-foreground">
                    Frota própria, equipe treinada e atendimento programado em <strong className="text-foreground">capital, Grande São Paulo e interior</strong>. Solicite avaliação para a sua obra.
                  </p>
                  <div className="mt-4">
                    <WhatsAppCTA label="Chamar no WhatsApp" locationTag="coverage" className="rounded-full w-full tap-feedback" />
                  </div>
                </div>
              </div>
            </AnimatedSection>

            {/* Imagem mobile — banner horizontal */}
            <div className="lg:hidden">
              <div className="overflow-hidden rounded-2xl shadow-sm">
                <img
                  src={heroImage}
                  alt="Escavadeira da SMS Terraplenagem em operação de movimentação de terra em obra na Grande São Paulo"
                  className="aspect-[16/9] w-full object-cover"
                  loading="lazy"
                  width={800}
                  height={450}
                />
              </div>
            </div>

            <AnimatedSection direction="right" className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  {
                    region: "Capital de São Paulo",
                    text: "Bairros das zonas Norte, Sul, Leste, Oeste e Centro — obras urbanas, reformas, demolições e adequação de áreas comerciais.",
                    links: [
                      { label: "Tatuapé", to: "/terraplanagem-tatuape", aria: "Terraplanagem no Tatuapé" },
                      { label: "Mooca", to: "/terraplanagem-mooca", aria: "Terraplanagem na Mooca" },
                      { label: "Morumbi", to: "/terraplanagem-morumbi", aria: "Terraplanagem no Morumbi" },
                    ],
                  },
                  {
                    region: "Centro de São Paulo",
                    text: "Regiões urbanas consolidadas, com foco em acesso de máquinas, retirada de entulho e adequação de terrenos.",
                    links: [
                      { label: "Aclimação", to: "/terraplanagem-aclimacao", aria: "Terraplanagem na Aclimação" },
                      { label: "Bela Vista", to: "/terraplanagem-bela-vista", aria: "Terraplanagem na Bela Vista" },
                      { label: "Brás", to: "/terraplanagem-bras", aria: "Terraplanagem no Brás" },
                    ],
                  },
                  {
                    region: "Zona Norte",
                    text: "Bairros consolidados e áreas em expansão — obras comerciais, demolições e movimentação de terra.",
                    links: [
                      { label: "Santana", to: "/terraplanagem-santana", aria: "Terraplanagem em Santana" },
                      { label: "Perus", to: "/terraplanagem-perus", aria: "Terraplanagem em Perus" },
                      { label: "Casa Verde", to: "/terraplanagem-casa-verde", aria: "Terraplanagem na Casa Verde" },
                    ],
                  },
                  {
                    region: "Zona Leste",
                    text: "Bairros de grande circulação urbana, com obras comerciais e adequação de áreas em vias movimentadas.",
                    links: [
                      { label: "Tatuapé", to: "/terraplanagem-tatuape", aria: "Terraplanagem no Tatuapé" },
                      { label: "Mooca", to: "/terraplanagem-mooca", aria: "Terraplanagem na Mooca" },
                      { label: "Penha", to: "/terraplanagem-penha", aria: "Terraplanagem na Penha" },
                    ],
                  },
                  {
                    region: "Região Oeste e Alphaville",
                    text: "Obras corporativas, galpões, estacionamentos e terrenos maiores em áreas empresariais.",
                    links: [
                      { label: "Alphaville", to: "/terraplanagem-alphaville", aria: "Terraplanagem em Alphaville" },
                      { label: "Osasco", to: "/terraplanagem-osasco", aria: "Terraplanagem em Osasco" },
                      { label: "Barueri", to: "/terraplanagem-barueri", aria: "Terraplanagem em Barueri" },
                    ],
                  },
                  {
                    region: "Grande ABC",
                    text: "Terraplanagem, demolição e nivelamento para obras comerciais e industriais nas cidades do ABC.",
                    links: [
                      { label: "Santo André", to: "/terraplanagem-santo-andre", aria: "Terraplanagem em Santo André" },
                      { label: "São Bernardo", to: "/terraplanagem-sao-bernardo-do-campo", aria: "Terraplanagem em São Bernardo do Campo" },
                      { label: "Diadema", to: "/terraplanagem-diadema", aria: "Terraplanagem em Diadema" },
                    ],
                  },
                  {
                    region: "Região Sul",
                    text: "Terrenos, áreas externas e preparação de solo em bairros e municípios da zona sul e entorno.",
                    links: [
                      { label: "Ipiranga", to: "/terraplanagem-ipiranga", aria: "Terraplanagem no Ipiranga" },
                      { label: "Santo Amaro", to: "/terraplanagem-santo-amaro", aria: "Terraplanagem em Santo Amaro" },
                      { label: "Vila Mariana", to: "/terraplanagem-vila-mariana", aria: "Terraplanagem na Vila Mariana" },
                    ],
                  },
                  {
                    region: "Cidades fora da capital",
                    text: "Atendimento programado em Guarulhos, Cajamar, Jundiaí, Campinas e demais cidades, com deslocamento de frota.",
                    links: [
                      { label: "Guarulhos", to: "/terraplanagem-guarulhos", aria: "Terraplanagem em Guarulhos" },
                      { label: "Cajamar", to: "/terraplanagem-cajamar", aria: "Terraplanagem em Cajamar" },
                      { label: "Campinas", to: "/terraplanagem-campinas", aria: "Terraplanagem em Campinas" },
                    ],
                  },
                ].map((card) => (
                  <div
                    key={card.region}
                    className="group relative flex flex-col rounded-2xl bg-card border border-border p-6 transition-all hover:border-primary/40 hover:shadow-md"
                  >
                    <span aria-hidden="true" className="absolute left-6 top-0 h-1 w-10 -translate-y-1/2 rounded-full bg-primary" />
                    <h3 className="font-heading text-base font-semibold text-foreground">{card.region}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.text}</p>
                    <ul className="mt-4 flex flex-wrap gap-2">
                      {card.links.map((l) => (
                        <li key={l.to}>
                          <Link
                            to={l.to}
                            aria-label={l.aria}
                            title={l.aria}
                            className="inline-flex items-center rounded-full border border-border bg-background px-3 py-1.5 text-xs font-medium text-foreground/80 hover:border-primary/50 hover:text-primary hover:bg-primary/5 transition-colors"
                          >
                            {l.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ DIFERENCIAIS ═══════════ */}
      <section className="section-padding section-dark">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading title="Por que escolher a SMS?" subtitle="Diferenciais que fazem a diferença na sua obra" centered />
          </AnimatedSection>
          <div className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIALS.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="rounded-lg border border-white/10 bg-white/5 p-5 md:p-6 transition-all hover:border-primary/30 card-interactive">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="font-heading text-base font-semibold text-white">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-gray-400">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ DEPOIMENTOS ═══════════ */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading title="O que nossos clientes dizem" subtitle="Avaliação 5.0 no Google" centered />
          </AnimatedSection>

          {/* Desktop grid */}
          <div className="hidden md:grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <TestimonialCard t={t} />
              </AnimatedSection>
            ))}
          </div>

          {/* Mobile carousel */}
          <div className="md:hidden carousel-snap -mx-4 px-4">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="w-[80vw] max-w-[320px]">
                <TestimonialCard t={t} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ ═══════════ */}
      <section className="section-padding section-neutral">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <SectionHeading title="Perguntas frequentes" subtitle="Tire suas dúvidas sobre terraplanagem em São Paulo" centered />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <Accordion type="single" collapsible className="w-full">
                {FAQ_ITEMS.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-border">
                    <AccordionTrigger className="text-left text-sm md:text-base font-medium hover:text-primary font-heading">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground text-sm md:text-base">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ BLOG ═══════════ */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading title="Artigos recentes" subtitle="Dicas e informações sobre terraplanagem e construção civil" centered />
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.slice(0, 3).map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.08}>
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-8 text-center">
            <Button asChild variant="outline" size="lg" className="gap-2 rounded-full tap-feedback">
              <Link to="/blog">Ver todos os artigos <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ CTA FINAL ═══════════ */}
      <section className="section-padding cta-gradient section-dark">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-white md:text-4xl">Pronto para começar seu projeto?</h2>
            <p className="mx-auto mt-3 md:mt-4 max-w-2xl text-base md:text-lg text-white/80">Entre em contato pelo WhatsApp e receba um orçamento personalizado sem compromisso.</p>
            <div className="mt-6 md:mt-8">
              <WhatsAppCTA label="Falar com um especialista" locationTag="cta-final"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 w-full sm:w-auto tap-feedback" size="lg" />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

function TestimonialCard({ t }: { t: { name: string; text: string } }) {
  return (
    <div className="rounded-lg border border-border bg-card p-5 md:p-6 h-full">
      <div className="mb-3 md:mb-4 flex gap-0.5">
        {[...Array(5)].map((_, j) => (
          <Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-sm text-muted-foreground italic leading-relaxed">"{t.text}"</p>
      <div className="mt-4 flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
          {t.name.charAt(0)}
        </div>
        <span className="text-sm font-medium text-foreground">{t.name}</span>
      </div>
    </div>
  );
}

export default Index;
