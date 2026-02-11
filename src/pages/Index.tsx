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

      {/* ═══════════ HERO (dark, full-bleed image right) ═══════════ */}
      <section className="relative overflow-hidden section-dark">
        <div className="grid lg:grid-cols-2 min-h-[70vh]">
          {/* Left - Blue panel with text */}
          <div className="hero-blue-panel relative topo-pattern">
            <div className="container-custom flex items-center h-full py-20 lg:py-28 lg:pr-16">
              <AnimatedSection>
                <h1 className="font-heading text-4xl font-extrabold leading-[1.08] text-white md:text-5xl lg:text-[3.25rem]">
                  Terraplanagem em São Paulo com equipamento próprio
                </h1>
                <p className="mt-6 max-w-xl text-base text-white/80 md:text-lg">
                  Movimentação de terra, nivelamento e preparo de terreno para obras comerciais e
                  industriais em toda a Grande São Paulo. Além disso, contamos com frota própria para garantir agilidade e cumprimento de prazo.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <WhatsAppCTA label="Solicitar cotação rápida" locationTag="hero" size="lg"
                    className="bg-white text-primary hover:bg-white/90 rounded-full px-6" icon="message" />
                  <Button asChild variant="outline" size="lg"
                    className="gap-2 border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full px-6">
                    <Link to="/servicos">Ver serviços <ArrowRight className="h-4 w-4" /></Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Right - Full image */}
          <div className="relative hidden lg:block">
            <img src={heroImage} alt="Escavadeira realizando movimentação de terra em obra na Grande São Paulo"
              className="absolute inset-0 h-full w-full object-cover" loading="eager" width={960} height={720} />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(217,91%,50%)]/20 to-transparent" aria-hidden="true" />
          </div>
        </div>

        {/* Mobile image */}
        <div className="relative h-56 lg:hidden">
          <img src={heroImage} alt="Máquinas de terraplanagem em obra na região de São Paulo" className="h-full w-full object-cover" loading="eager" width={800} height={400} />
          <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,30%,8%)] to-transparent" aria-hidden="true" />
        </div>
      </section>

      {/* ═══════════ SERVIÇOS (light) ═══════════ */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading title="Nossos serviços" subtitle="Conheça as principais soluções que oferecemos para preparar seu terreno com segurança" centered />
          </AnimatedSection>

          <div className="grid gap-5 md:grid-cols-2 mb-5">
            {SERVICES.slice(0, 2).map((s, i) => (
              <AnimatedSection key={s.id} delay={i * 0.08}>
                <ServiceCard id={s.id} slug={s.slug} title={s.title} description={s.shortDescription} image={serviceImages[s.image]} variant="large" />
              </AnimatedSection>
            ))}
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(2).map((s, i) => (
              <AnimatedSection key={s.id} delay={i * 0.06}>
                <ServiceCard id={s.id} slug={s.slug} title={s.title} description={s.shortDescription} image={serviceImages[s.image]} />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Button asChild size="lg" className="rounded-full px-7">
              <Link to="/servicos">Ver todos os serviços</Link>
            </Button>
            <WhatsAppCTA label="Solicitar orçamento" locationTag="servicos-home" variant="outline" size="lg" className="rounded-full" />
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ ÁREAS ATENDIDAS (neutral) ═══════════ */}
      <section className="section-padding section-neutral">
        <div className="container-custom">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-stretch">
            <AnimatedSection direction="left" className="lg:col-span-5">
              <div className="h-full min-h-[420px] overflow-hidden rounded-2xl shadow-sm">
                <img src={heroImage} alt="Região metropolitana de São Paulo onde a SMS Terraplenagem atende" className="h-full w-full object-cover" loading="lazy" width={600} height={800} />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" className="lg:col-span-7">
              <SectionHeading title="Atendemos toda a Grande São Paulo"
                subtitle="Capital e região metropolitana. Se tiver dúvida sobre sua cidade, chame no WhatsApp." />
              <div className="space-y-3">
                {COVERAGE_AREAS.map((area) => (
                  <div key={area.region} className="flex items-start gap-4 rounded-lg bg-card border border-border p-4 transition-colors hover:border-primary/20">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-heading font-semibold text-foreground">{area.region}</h3>
                      <p className="text-sm text-muted-foreground">{area.areas}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div className="mt-7">
                <WhatsAppCTA label="Chamar no WhatsApp" locationTag="coverage" className="rounded-full" />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ DIFERENCIAIS (dark) ═══════════ */}
      <section className="section-padding section-dark">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading title="Por que escolher a SMS?" subtitle="Diferenciais que fazem a diferença na sua obra" centered />
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIALS.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.06}>
                <div className="rounded-lg border border-white/10 bg-white/5 p-6 transition-all hover:border-primary/30">
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

      {/* ═══════════ DEPOIMENTOS (light) ═══════════ */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading title="O que nossos clientes dizem" subtitle="Avaliação 5.0 no Google" centered />
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((t, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="rounded-lg border border-border bg-card p-6">
                  <div className="mb-4 flex gap-0.5">
                    {[...Array(5)].map((_, j) => (<Star key={j} className="h-4 w-4 fill-yellow-400 text-yellow-400" />))}
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">"{t.text}"</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">{t.name.charAt(0)}</div>
                    <span className="text-sm font-medium text-foreground">{t.name}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════ FAQ (neutral) ═══════════ */}
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
                    <AccordionTrigger className="text-left text-base font-medium hover:text-primary font-heading">{item.question}</AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* ═══════════ BLOG (light) ═══════════ */}
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
            <Button asChild variant="outline" size="lg" className="gap-2 rounded-full">
              <Link to="/blog">Ver todos os artigos <ArrowRight className="h-4 w-4" /></Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* ═══════════ CTA FINAL ═══════════ */}
      <section className="section-padding cta-gradient section-dark">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">Pronto para começar seu projeto?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">Entre em contato pelo WhatsApp e receba um orçamento personalizado sem compromisso.</p>
            <div className="mt-8">
              <WhatsAppCTA label="Falar com um especialista" locationTag="cta-final"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8" size="lg" />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
