import { Link } from "react-router-dom";
import { ArrowRight, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { Layout } from "@/components/layout/Layout";
import { SERVICES, WHATSAPP_URL } from "@/lib/constants";

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

const Servicos = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="hero-section py-20 md:py-28">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold text-white md:text-5xl">
              Nossos <span className="text-primary">Serviços</span>
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Oferecemos soluções completas em terraplanagem para obras de todos os portes.
              Equipamento próprio e equipe qualificada para atender sua demanda.
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid gap-8 md:grid-cols-2">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.shortDescription}
                image={serviceImages[service.image]}
                variant="large"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <SectionHeading
            title="Como Trabalhamos"
            subtitle="Processo simplificado para sua comodidade"
            centered
          />
          <div className="grid gap-8 md:grid-cols-4">
            {[
              { step: "01", title: "Contato", desc: "Entre em contato pelo WhatsApp ou telefone" },
              { step: "02", title: "Avaliação", desc: "Analisamos seu projeto e terreno" },
              { step: "03", title: "Orçamento", desc: "Enviamos orçamento detalhado e transparente" },
              { step: "04", title: "Execução", desc: "Realizamos o serviço com qualidade" },
            ].map((item, index) => (
              <div key={index} className="relative text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary text-2xl font-bold text-white">
                  {item.step}
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                {index < 3 && (
                  <ArrowRight className="absolute right-0 top-8 hidden h-6 w-6 -translate-x-1/2 text-muted-foreground md:block" />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding cta-gradient">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Precisa de um orçamento?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Fale com nossa equipe e receba uma proposta personalizada para seu projeto.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-8 gap-2 text-base bg-white text-primary hover:bg-white/90"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Phone className="h-5 w-5" />
              Solicitar Orçamento
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Servicos;
