import { CheckCircle, Users, Truck, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/seo/SEOHead";
import { Layout } from "@/components/layout/Layout";
import { COVERAGE_AREAS } from "@/lib/constants";
import { MapPin } from "lucide-react";
import heroImage from "@/assets/hero-terraplanagem.jpg";

const Sobre = () => (
  <Layout>
    <SEOHead
      title="Sobre a SMS Terraplenagem | Atendemos a Grande São Paulo"
      description="Conheça a SMS Terraplenagem, nossa forma de trabalho, compromisso com segurança e prazos e atuação em toda a Grande SP."
      canonical="https://smsterraplenagem.com.br/sobre"
    />

    <section className="section-dark py-16 md:py-24 topo-pattern">
      <div className="container-custom"><AnimatedSection><div className="mx-auto max-w-3xl text-center">
        <h1 className="font-heading text-4xl font-extrabold text-white md:text-5xl">Sobre a <span className="text-primary">SMS Terraplenagem</span></h1>
        <p className="mt-4 text-lg text-gray-300">Conheça nossa história, valores e o compromisso com a excelência em terraplanagem na Grande São Paulo.</p>
      </div></AnimatedSection></div>
    </section>

    <section className="section-padding">
      <div className="container-custom"><div className="grid gap-12 lg:grid-cols-2 lg:items-center">
        <AnimatedSection direction="left">
          <h2 className="font-heading text-3xl font-bold text-foreground">Quem somos</h2>
          <p className="mt-4 text-muted-foreground leading-relaxed">A SMS Terraplenagem é uma empresa especializada em serviços de terraplanagem, atendendo obras comerciais e industriais em toda a Grande São Paulo. Com anos de experiência no mercado, nos destacamos pela qualidade dos serviços e pelo compromisso com a satisfação dos nossos clientes.</p>
          <p className="mt-4 text-muted-foreground leading-relaxed">Além disso, contamos com equipamento próprio e moderno, garantindo agilidade e eficiência na execução de todos os projetos. Por isso, somos referência em <Link to="/servicos" className="text-primary hover:underline">serviços de terraplanagem em São Paulo</Link>.</p>
        </AnimatedSection>
        <AnimatedSection direction="right">
          <div className="overflow-hidden rounded-lg">
            <img src={heroImage} alt="Equipe da SMS Terraplenagem em obra de movimentação de terra na Grande São Paulo" className="rounded-lg w-full" loading="lazy" width={600} height={400} />
          </div>
        </AnimatedSection>
      </div></div>
    </section>

    <section className="section-padding section-neutral">
      <div className="container-custom">
        <AnimatedSection><SectionHeading title="Nossos valores" subtitle="Princípios que guiam nosso trabalho diário" centered /></AnimatedSection>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {[
            { icon: Shield, title: "Segurança", desc: "Priorizamos a segurança em todas as etapas da obra" },
            { icon: CheckCircle, title: "Qualidade", desc: "Entregamos com excelência e atenção aos detalhes" },
            { icon: Users, title: "Compromisso", desc: "Honramos nossos prazos com total transparência" },
            { icon: Truck, title: "Eficiência", desc: "Otimizamos processos para resultados rápidos" },
          ].map((v, i) => (
            <AnimatedSection key={i} delay={i * 0.08}>
              <div className="rounded-lg border border-border bg-card p-6 text-center">
                <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10"><v.icon className="h-6 w-6 text-primary" /></div>
                <h3 className="font-heading font-semibold text-foreground">{v.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground">{v.desc}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding">
      <div className="container-custom"><div className="grid gap-8 text-center md:grid-cols-4">
        {[
          { number: "500+", label: "Projetos Realizados" }, { number: "15+", label: "Anos de Experiência" },
          { number: "50+", label: "Máquinas na Frota" }, { number: "100%", label: "Clientes Satisfeitos" },
        ].map((s, i) => (
          <AnimatedSection key={i} delay={i * 0.08}>
            <div className="text-4xl font-extrabold text-primary md:text-5xl font-heading">{s.number}</div>
            <div className="mt-1 text-sm text-muted-foreground">{s.label}</div>
          </AnimatedSection>
        ))}
      </div></div>
    </section>

    <section className="section-padding section-neutral">
      <div className="container-custom">
        <AnimatedSection><SectionHeading title="Onde atendemos" subtitle="Presença em toda a Grande São Paulo" centered /></AnimatedSection>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
          {COVERAGE_AREAS.map((area, i) => (
            <AnimatedSection key={area.region} delay={i * 0.05}>
              <div className="flex items-start gap-3 rounded-lg border border-border bg-card p-4">
                <MapPin className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                <div><h3 className="font-heading font-semibold text-foreground text-sm">{area.region}</h3><p className="text-xs text-muted-foreground">{area.areas}</p></div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>

    <section className="section-padding cta-gradient section-dark">
      <div className="container-custom text-center"><AnimatedSection>
        <h2 className="font-heading text-3xl font-bold text-white md:text-4xl">Vamos trabalhar juntos?</h2>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/80">Entre em contato e descubra como podemos ajudar no seu próximo projeto de terraplanagem.</p>
        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <WhatsAppCTA label="Fale conosco" locationTag="sobre-cta" className="bg-white text-primary hover:bg-white/90 rounded-full px-8" size="lg" />
          <Link to="/contato" className="text-sm text-white/80 hover:text-white underline underline-offset-4 transition-colors">Ou use nosso formulário de contato</Link>
        </div>
      </AnimatedSection></div>
    </section>
  </Layout>
);

export default Sobre;
