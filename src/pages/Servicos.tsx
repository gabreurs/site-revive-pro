import { Link } from "react-router-dom";
import { ArrowRight, MapPin } from "lucide-react";
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

const serviceImages: Record<string, string> = {
  "limpeza-terreno": limpezaImg, demolicao: demolicaoImg, escavacao: escavacaoImg,
  "movimentacao-terra": movimentacaoImg, perfuracao: perfuracaoImg, "transporte-locacao": transporteImg,
};

const Servicos = () => (
  <Layout>
    <SEOHead
      title="Serviços de Terraplanagem em SP | SMS Terraplenagem"
      description="Conheça nossos serviços: limpeza de terreno, demolição, escavação, corte e aterro, perfuração e locação de máquinas em São Paulo."
      keywords="serviços terraplanagem sp, limpeza terreno, demolição, escavação"
    />

    {/* ── Hero curta (dark) ── */}
    <section className="section-dark py-16 md:py-22 topo-pattern">
      <div className="container-custom">
        <AnimatedSection>
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="font-heading text-4xl font-extrabold text-white md:text-5xl">
              Serviços de terraplanagem em São Paulo
            </h1>
            <p className="mt-4 text-lg text-white/70">
              Soluções completas para preparar, nivelar e executar sua obra com segurança e equipamento próprio.
            </p>
          </div>
        </AnimatedSection>
      </div>
    </section>

    {/* ── Grid de serviços (light) ── */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection>
          <SectionHeading title="Escolha o serviço" subtitle="Clique para ver detalhes, equipamentos e como executamos cada etapa" centered />
        </AnimatedSection>
        <div className="grid gap-6 md:grid-cols-2">
          {SERVICES.map((s, i) => (
            <AnimatedSection key={s.id} delay={i * 0.06}>
              <ServiceCard id={s.id} slug={s.slug} title={s.title} description={s.shortDescription} image={serviceImages[s.image]} variant="large" />
            </AnimatedSection>
          ))}
        </div>
        <AnimatedSection className="mt-10 text-center">
          <WhatsAppCTA label="Solicitar cotação no WhatsApp" locationTag="servicos" size="lg" className="rounded-full" />
        </AnimatedSection>
      </div>
    </section>

    {/* ── Como trabalhamos (neutral) ── */}
    <section className="section-padding section-neutral">
      <div className="container-custom">
        <AnimatedSection>
          <SectionHeading title="Como trabalhamos" subtitle="Um processo simples, transparente e com foco em prazo" centered />
        </AnimatedSection>
        <div className="grid gap-8 md:grid-cols-4">
          {[
            { step: "01", title: "Contato", desc: "Você chama no WhatsApp e alinhamos a necessidade" },
            { step: "02", title: "Avaliação", desc: "Entendemos o terreno, acesso e volumes" },
            { step: "03", title: "Orçamento", desc: "Proposta objetiva com escopo, prazos e logística" },
            { step: "04", title: "Execução", desc: "Equipe e equipamento em campo com segurança" },
          ].map((item, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="relative text-center">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-xl font-bold text-white">{item.step}</div>
                <h3 className="font-heading text-base font-semibold">{item.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{item.desc}</p>
                {i < 3 && <ArrowRight className="absolute right-0 top-7 hidden h-5 w-5 -translate-x-1/2 text-muted-foreground/30 md:block" />}
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* ── Áreas atendidas (light) ── */}
    <section className="section-padding">
      <div className="container-custom">
        <AnimatedSection>
          <SectionHeading title="Áreas atendidas" subtitle="Presença em toda a Grande São Paulo" centered />
        </AnimatedSection>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {COVERAGE_AREAS.map((area, i) => (
            <AnimatedSection key={area.region} delay={i * 0.05}>
              <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-heading font-semibold text-foreground text-sm">{area.region}</h3>
                  <p className="text-xs text-muted-foreground">{area.areas}</p>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    {/* ── CTA ── */}
    <section className="section-padding cta-gradient section-dark">
      <div className="container-custom text-center">
        <AnimatedSection>
          <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">Precisa de um orçamento?</h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">Fale com nossa equipe e receba uma proposta personalizada.</p>
          <div className="mt-8">
            <WhatsAppCTA label="Solicitar orçamento" locationTag="servicos-cta" className="bg-white text-primary hover:bg-white/90 rounded-full px-8" size="lg" />
          </div>
        </AnimatedSection>
      </div>
    </section>
  </Layout>
);

export default Servicos;
