import { Link } from "react-router-dom";
import { ArrowRight, MapPin, Phone, Star, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Layout } from "@/components/layout/Layout";
import { SERVICES, COVERAGE_AREAS, TESTIMONIALS, FAQ_ITEMS, WHATSAPP_URL } from "@/lib/constants";

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
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center">
        <div className="absolute inset-0">
          <div className="absolute inset-0 hero-section" />
          <img
            src={heroImage}
            alt="Terraplanagem em São Paulo"
            className="h-full w-full object-cover opacity-40"
          />
        </div>
        <div className="container-custom relative z-10 py-20">
          <div className="max-w-2xl animate-fade-in">
            <h1 className="text-4xl font-extrabold leading-tight text-white md:text-5xl lg:text-6xl">
              Terraplanagem em SP:{" "}
              <span className="text-primary">Preparando o terreno</span> para grandes projetos
            </h1>
            <p className="mt-6 text-lg text-gray-300 md:text-xl">
              Movimentação de terra, nivelamento e preparo de terreno com equipamento próprio.
              Atendemos obras comerciais e industriais em toda a Grande São Paulo.
            </p>
            <div className="mt-8 flex flex-col gap-4 sm:flex-row">
              <Button asChild size="lg" className="gap-2 text-base">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                  <Phone className="h-5 w-5" />
                  Solicitar Cotação Rápida
                </a>
              </Button>
              <Button asChild variant="outline" size="lg" className="gap-2 text-base border-white/30 text-white hover:bg-white/10 hover:text-white">
                <Link to="/servicos">
                  Ver Serviços
                  <ArrowRight className="h-5 w-5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            title="Nossos Serviços"
            subtitle="Soluções completas em terraplanagem para sua obra"
            centered
          />
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((service) => (
              <ServiceCard
                key={service.id}
                id={service.id}
                title={service.title}
                description={service.shortDescription}
                image={serviceImages[service.image]}
              />
            ))}
          </div>
          <div className="mt-10 text-center">
            <Button asChild variant="outline" size="lg" className="gap-2">
              <Link to="/servicos">
                Ver todos os serviços
                <ArrowRight className="h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom">
          <SectionHeading
            title="Atendemos toda a Grande São Paulo"
            subtitle="Presença em todas as regiões para melhor atender sua obra"
            centered
            light
          />
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {COVERAGE_AREAS.map((area) => (
              <div
                key={area.region}
                className="rounded-lg bg-secondary/50 border border-border/20 p-6 transition-all hover:bg-secondary/80"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="h-5 w-5 text-primary" />
                  <h3 className="text-lg font-semibold text-white">{area.region}</h3>
                </div>
                <p className="mt-2 text-sm text-gray-400">{area.areas}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <SectionHeading
            title="Por que escolher a SMS Terraplenagem?"
            subtitle="Diferenciais que fazem a diferença na sua obra"
            centered
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { title: "Equipamento Próprio", desc: "Frota completa de máquinas modernas e bem mantidas" },
              { title: "Experiência Comprovada", desc: "Anos de atuação em obras de todos os portes" },
              { title: "Atendimento Ágil", desc: "Resposta rápida e início imediato dos serviços" },
              { title: "Preço Competitivo", desc: "Orçamentos justos e condições de pagamento flexíveis" },
            ].map((item, index) => (
              <div key={index} className="text-center">
                <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
                  <CheckCircle className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{item.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <SectionHeading
            title="O que nossos clientes dizem"
            subtitle="Avaliação de 5.0 com base em avaliações do Google"
            centered
          />
          <div className="grid gap-6 md:grid-cols-3">
            {TESTIMONIALS.map((testimonial, index) => (
              <div
                key={index}
                className="rounded-lg bg-card p-6 shadow-sm"
              >
                <div className="mb-4 flex gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-sms-gold text-sms-gold" />
                  ))}
                </div>
                <p className="text-muted-foreground italic">"{testimonial.text}"</p>
                <div className="mt-4 flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-white">
                    {testimonial.name.charAt(0)}
                  </div>
                  <span className="font-medium">{testimonial.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <SectionHeading
              title="Perguntas Frequentes"
              subtitle="Tire suas dúvidas sobre nossos serviços de terraplanagem"
              centered
            />
            <Accordion type="single" collapsible className="w-full">
              {FAQ_ITEMS.map((item, index) => (
                <AccordionItem key={index} value={`item-${index}`}>
                  <AccordionTrigger className="text-left text-base font-medium">
                    {item.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {item.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding cta-gradient">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Pronto para começar seu projeto?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Entre em contato agora e receba um orçamento personalizado sem compromisso. Nossa equipe
            está pronta para transformar seu terreno.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-8 gap-2 text-base bg-white text-primary hover:bg-white/90"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Phone className="h-5 w-5" />
              Falar com um Especialista
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
