import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Star, CheckCircle, Newspaper } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { BlogCard } from "@/components/blog/BlogCard";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/seo/SEOHead";
import { LocalBusinessJsonLd } from "@/components/seo/JsonLd";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Layout } from "@/components/layout/Layout";
import {
  SERVICES,
  COVERAGE_AREAS,
  TESTIMONIALS,
  FAQ_ITEMS,
  DIFFERENTIALS,
  BLOG_POSTS,
} from "@/lib/constants";

import heroImage from "@/assets/hero-terraplanagem.jpg";
import limpezaImg from "@/assets/limpeza-terreno.jpg";
import demolicaoImg from "@/assets/demolicao.jpg";
import escavacaoImg from "@/assets/escavacao.jpg";
import movimentacaoImg from "@/assets/movimentacao-terra.jpg";
import perfuracaoImg from "@/assets/perfuracao.jpg";
import transporteImg from "@/assets/transporte-locacao.jpg";

const serviceImages: Record<string, string> = {
  "limpeza-terreno": limpezaImg,
  demolicao: demolicaoImg,
  escavacao: escavacaoImg,
  "movimentacao-terra": movimentacaoImg,
  perfuracao: perfuracaoImg,
  "transporte-locacao": transporteImg,
};

const Index = () => {
  return (
    <Layout>
      <SEOHead
        title="SMS Terraplenagem | Terraplanagem em SP | Orçamento Rápido"
        description="Empresa de terraplanagem em São Paulo. Limpeza de terreno, demolição, escavação, corte e aterro, perfuração e locação de máquinas. Equipamento próprio. Solicite orçamento!"
        keywords="terraplanagem em sp, terraplanagem são paulo, movimentação de terra, limpeza de terreno, demolição"
      />
      <LocalBusinessJsonLd />

      {/* Hero - Split layout matching PDF */}
      <section className="relative overflow-hidden">
        <div className="grid lg:grid-cols-2 min-h-[75vh]">
          {/* Left - Blue panel */}
          <div className="hero-blue-panel relative flex items-center topo-pattern">
            <div className="container-custom py-16 lg:py-20 lg:pr-12">
              <AnimatedSection>
                <h1 className="text-4xl font-extrabold leading-[1.1] text-white md:text-5xl lg:text-[3.5rem]">
                  Terraplanagem em SP:<br />
                  Preparando o terreno para grandes projetos
                </h1>
                <p className="mt-6 text-base text-white/80 md:text-lg max-w-lg">
                  Movimentação de terra, nivelamento e preparo de terreno com equipamento próprio.
                  Atendemos obras comerciais e industriais em toda a Grande São Paulo.
                </p>
                <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                  <WhatsAppCTA
                    label="Solicitar Cotação Rápida"
                    locationTag="hero"
                    size="lg"
                    className="bg-white text-primary hover:bg-white/90 rounded-full px-6"
                    icon="message"
                  />
                  <Button asChild variant="outline" size="lg" className="gap-2 border-white/30 text-white hover:bg-white/10 hover:text-white rounded-full px-6">
                    <Link to="/servicos">
                      Ver Serviços
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </AnimatedSection>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative hidden lg:block">
            <img
              src={heroImage}
              alt="Terraplanagem em São Paulo - Máquinas trabalhando"
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[hsl(217,91%,50%)]/20 to-transparent" />
          </div>
        </div>

        {/* Mobile hero image */}
        <div className="relative h-64 lg:hidden">
          <img src={heroImage} alt="Terraplanagem em São Paulo" className="h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
        </div>
      </section>

      {/* Services Grid - 2 large + 4 small (matching PDF) */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading
              title="Nossos Serviços"
              subtitle="Soluções completas em terraplanagem para sua obra"
              centered
            />
          </AnimatedSection>

          {/* Top row - 2 large cards */}
          <div className="grid gap-5 md:grid-cols-2 mb-5">
            {SERVICES.slice(0, 2).map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.1}>
                <ServiceCard
                  id={service.id}
                  slug={service.slug}
                  title={service.title}
                  description={service.shortDescription}
                  image={serviceImages[service.image]}
                  variant="large"
                />
              </AnimatedSection>
            ))}
          </div>

          {/* Bottom row - 4 smaller cards */}
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.slice(2).map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.08}>
                <ServiceCard
                  id={service.id}
                  slug={service.slug}
                  title={service.title}
                  description={service.shortDescription}
                  image={serviceImages[service.image]}
                />
              </AnimatedSection>
            ))}
          </div>

          <AnimatedSection className="mt-8 text-center">
            <WhatsAppCTA
              label="Solicitar orçamento para serviço"
              locationTag="servicos-home"
              variant="outline"
              size="lg"
              className="rounded-full"
            />
          </AnimatedSection>
        </div>
      </section>

      {/* Coverage Areas - matching PDF layout */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
            {/* Map illustration */}
            <AnimatedSection direction="left">
              <div className="relative aspect-square max-w-md mx-auto lg:mx-0 rounded-2xl overflow-hidden bg-muted flex items-center justify-center">
                <div className="text-center p-8">
                  <div className="text-8xl mb-4">🗺️</div>
                  <p className="text-lg font-semibold text-foreground">Grande São Paulo</p>
                  <p className="text-sm text-muted-foreground mt-1">Atendemos toda a região</p>
                </div>
              </div>
            </AnimatedSection>

            {/* Areas list */}
            <AnimatedSection direction="right">
              <SectionHeading
                title="Área de Atendimento"
                subtitle="Presença em toda a Grande São Paulo"
              />
              <div className="space-y-4">
                {COVERAGE_AREAS.map((area, i) => (
                  <div key={area.region} className="flex items-start gap-4 rounded-lg bg-muted/50 border border-border/30 p-4 transition-colors hover:bg-muted">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{area.region}</h3>
                      <p className="text-sm text-muted-foreground">{area.areas}</p>
                    </div>
                  </div>
                ))}
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Differentials */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading
              title="Por que escolher a SMS Terraplenagem?"
              subtitle="Diferenciais que fazem a diferença na sua obra"
              centered
            />
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {DIFFERENTIALS.map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.08}>
                <div className="rounded-lg border border-border/30 bg-card p-6 transition-all hover:border-primary/30 hover:shadow-md">
                  <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading
              title="O que nossos clientes dizem"
              subtitle="Avaliação de 5.0 com base em avaliações do Google"
              centered
            />
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="rounded-lg border border-border/30 bg-background p-6">
                  <div className="mb-4 flex gap-0.5">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-sms-gold text-sms-gold" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">"{testimonial.text}"</p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-sm font-bold text-white">
                      {testimonial.name.charAt(0)}
                    </div>
                    <span className="text-sm font-medium">{testimonial.name}</span>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <SectionHeading
                title="Perguntas Frequentes"
                subtitle="Tire suas dúvidas sobre nossos serviços de terraplanagem"
                centered
              />
            </AnimatedSection>
            <AnimatedSection delay={0.1}>
              <Accordion type="single" collapsible className="w-full">
                {FAQ_ITEMS.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`} className="border-border/30">
                    <AccordionTrigger className="text-left text-base font-medium hover:text-primary">
                      {item.question}
                    </AccordionTrigger>
                    <AccordionContent className="text-muted-foreground">
                      {item.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Blog Preview */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading
              title="Blog SMS Terraplenagem"
              subtitle="Artigos e dicas sobre terraplanagem e construção civil"
              centered
            />
          </AnimatedSection>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {BLOG_POSTS.slice(0, 3).map((post, i) => (
              <AnimatedSection key={post.slug} delay={i * 0.1}>
                <BlogCard post={post} />
              </AnimatedSection>
            ))}
          </div>
          <AnimatedSection className="mt-8 text-center">
            <Button asChild variant="outline" size="lg" className="gap-2 rounded-full">
              <Link to="/blog">
                Ver todos os artigos
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding cta-gradient">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white md:text-4xl">
              Pronto para começar seu projeto?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Entre em contato agora e receba um orçamento personalizado sem compromisso.
            </p>
            <div className="mt-8">
              <WhatsAppCTA
                label="Falar com um Especialista"
                locationTag="cta-final"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8"
                size="lg"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
