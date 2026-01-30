import { CheckCircle, Users, Truck, Shield, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Layout } from "@/components/layout/Layout";
import { WHATSAPP_URL } from "@/lib/constants";

import heroImage from "@/assets/hero-terraplanagem.jpg";

const Sobre = () => {
  return (
    <Layout>
      {/* Hero */}
      <section className="hero-section py-20 md:py-28">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold text-white md:text-5xl">
              Sobre a <span className="text-primary">SMS Terraplenagem</span>
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Conheça nossa história, valores e o compromisso com a excelência em terraplanagem.
            </p>
          </div>
        </div>
      </section>

      {/* About Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold">Quem Somos</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                A SMS Terraplenagem é uma empresa especializada em serviços de terraplanagem,
                atendendo obras comerciais e industriais em toda a Grande São Paulo. Com anos de
                experiência no mercado, nos destacamos pela qualidade dos serviços prestados e pelo
                compromisso com a satisfação dos nossos clientes.
              </p>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                Contamos com equipamento próprio e moderno, garantindo agilidade e eficiência na
                execução de todos os projetos. Nossa equipe é formada por profissionais qualificados
                e experientes, prontos para transformar seu terreno.
              </p>
            </div>
            <div className="relative">
              <img
                src={heroImage}
                alt="SMS Terraplenagem em ação"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding bg-muted">
        <div className="container-custom">
          <SectionHeading
            title="Nossos Valores"
            subtitle="Princípios que guiam nosso trabalho diariamente"
            centered
          />
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Shield,
                title: "Segurança",
                desc: "Priorizamos a segurança em todas as etapas do trabalho",
              },
              {
                icon: CheckCircle,
                title: "Qualidade",
                desc: "Entregamos serviços com excelência e atenção aos detalhes",
              },
              {
                icon: Users,
                title: "Compromisso",
                desc: "Honramos nossos prazos e acordos com transparência",
              },
              {
                icon: Truck,
                title: "Eficiência",
                desc: "Otimizamos processos para entregar resultados rápidos",
              },
            ].map((value, index) => (
              <div key={index} className="rounded-lg bg-card p-6 text-center shadow-sm">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
                  <value.icon className="h-7 w-7 text-primary" />
                </div>
                <h3 className="text-lg font-semibold">{value.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="section-padding bg-secondary text-secondary-foreground">
        <div className="container-custom">
          <div className="grid gap-8 text-center md:grid-cols-4">
            {[
              { number: "500+", label: "Projetos Realizados" },
              { number: "15+", label: "Anos de Experiência" },
              { number: "50+", label: "Máquinas na Frota" },
              { number: "100%", label: "Clientes Satisfeitos" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-extrabold text-primary md:text-5xl">{stat.number}</div>
                <div className="mt-2 text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding cta-gradient">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold text-white md:text-4xl">
            Vamos trabalhar juntos?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">
            Entre em contato e descubra como podemos ajudar no seu próximo projeto.
          </p>
          <Button
            asChild
            size="lg"
            variant="secondary"
            className="mt-8 gap-2 text-base bg-white text-primary hover:bg-white/90"
          >
            <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
              <Phone className="h-5 w-5" />
              Fale Conosco
            </a>
          </Button>
        </div>
      </section>
    </Layout>
  );
};

export default Sobre;
