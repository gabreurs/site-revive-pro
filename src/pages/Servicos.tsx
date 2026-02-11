import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/seo/SEOHead";
import { Layout } from "@/components/layout/Layout";
import { SERVICES, COVERAGE_AREAS } from "@/lib/constants";

import limpezaImg from "@/assets/limpeza-terreno.jpg";
import demolicaoImg from "@/assets/demolicao.jpg";
import escavacaoImg from "@/assets/escavacao.jpg";
import movimentacaoImg from "@/assets/movimentacao-terra.jpg";
import perfuracaoImg from "@/assets/perfuracao.jpg";
import transporteImg from "@/assets/transporte-locacao.jpg";
import { MapPin } from "lucide-react";

const serviceImages: Record<string, string> = {
  "limpeza-terreno": limpezaImg,
  demolicao: demolicaoImg,
  escavacao: escavacaoImg,
  "movimentacao-terra": movimentacaoImg,
  perfuracao: perfuracaoImg,
  "transporte-locacao": transporteImg,
};

const Servicos = () => {
  return (
    <Layout>
      <SEOHead
        title="Serviços de Terraplanagem em SP | SMS Terraplenagem"
        description="Conheça nossos serviços de terraplanagem em São Paulo: limpeza de terreno, demolição, escavação, corte e aterro, perfuração e locação de máquinas."
        keywords="serviços terraplanagem sp, limpeza de terreno, demolição, escavação, movimentação de terra"
      />

      {/* Hero */}
      <section className="hero-dark py-20 md:py-28 topo-pattern">
        <div className="container-custom">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold text-white md:text-5xl">
                Terraplanagem em SP: <span className="text-primary">Serviços</span>
              </h1>
              <p className="mt-4 text-lg text-white/70">
                Oferecemos soluções completas em terraplanagem para obras de todos os portes. Equipamento próprio e equipe qualificada.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Intro */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <h2 className="text-2xl font-bold md:text-3xl">Como Trabalhamos</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Da avaliação inicial à entrega final, seguimos um processo estruturado para garantir qualidade, segurança e cumprimento de prazos em cada projeto.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Grid */}
      <section className="pb-16 md:pb-24">
        <div className="container-custom">
          <div className="grid gap-6 md:grid-cols-2">
            {SERVICES.map((service, i) => (
              <AnimatedSection key={service.id} delay={i * 0.08}>
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
        </div>
      </section>

      {/* Process */}
      <section className="section-padding bg-card">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading title="Nosso Processo" subtitle="Etapas simplificadas para sua comodidade" centered />
          </AnimatedSection>
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "Contato", desc: "Entre em contato pelo WhatsApp ou telefone" },
              { step: "02", title: "Avaliação", desc: "Analisamos seu projeto e terreno" },
              { step: "03", title: "Orçamento", desc: "Enviamos orçamento detalhado e transparente" },
              { step: "04", title: "Execução", desc: "Realizamos o serviço com qualidade" },
            ].map((item, i) => (
              <AnimatedSection key={i} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">
                    {item.step}
                  </div>
                  <h3 className="text-base font-semibold">{item.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
                  {i < 3 && (
                    <ArrowRight className="absolute right-0 top-7 hidden h-5 w-5 -translate-x-1/2 text-muted-foreground/40 md:block" />
                  )}
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Coverage */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading title="Áreas Atendidas" subtitle="Presença em toda a Grande São Paulo" centered />
          </AnimatedSection>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COVERAGE_AREAS.map((area, i) => (
              <AnimatedSection key={area.region} delay={i * 0.06}>
                <div className="flex items-start gap-3 rounded-lg border border-border/30 bg-card p-4">
                  <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-foreground text-sm">{area.region}</h3>
                    <p className="text-xs text-muted-foreground">{area.areas}</p>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding cta-gradient">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="text-3xl font-bold text-white md:text-4xl">Precisa de um orçamento?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
              Fale com nossa equipe e receba uma proposta personalizada para seu projeto.
            </p>
            <div className="mt-8">
              <WhatsAppCTA
                label="Solicitar Orçamento"
                locationTag="servicos-cta"
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

export default Servicos;
