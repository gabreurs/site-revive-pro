import { useParams, Link } from "react-router-dom";
import { CheckCircle, Wrench, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/seo/SEOHead";
import { ServiceJsonLd } from "@/components/seo/JsonLd";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Layout } from "@/components/layout/Layout";
import { SERVICES } from "@/lib/constants";

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

const ServicoDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <Layout>
        <div className="container-custom section-padding text-center">
          <h1 className="font-heading text-2xl font-bold">Serviço não encontrado</h1>
          <Button asChild className="mt-4"><Link to="/servicos">Voltar aos Serviços</Link></Button>
        </div>
      </Layout>
    );
  }

  const otherServices = SERVICES.filter((s) => s.slug !== slug);

  return (
    <Layout>
      <SEOHead title={service.seoTitle} description={service.seoDescription} keywords={service.seoKeyword} />
      <ServiceJsonLd name={service.title} description={service.fullDescription} />

      {/* Hero — height controlled, object-cover */}
      <section className="relative section-dark">
        <div className="aspect-[16/6] max-h-[420px] w-full overflow-hidden">
          <img src={serviceImages[service.image]} alt={`Serviço de ${service.title} em São Paulo`}
            className="h-full w-full object-cover" loading="eager" />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,30%,8%)] via-[hsl(222,30%,8%)]/40 to-transparent" />
        <div className="container-custom absolute inset-0 flex flex-col justify-end pb-8">
          <AnimatedSection>
            <nav className="mb-3 flex items-center gap-2 text-xs text-gray-300">
              <Link to="/" className="hover:text-white transition-colors">Início</Link>
              <span>/</span>
              <Link to="/servicos" className="hover:text-white transition-colors">Serviços</Link>
              <span>/</span>
              <span className="text-white">{service.title}</span>
            </nav>
            <h1 className="font-heading text-3xl font-extrabold text-white md:text-4xl lg:text-5xl">{service.title}</h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Content (light) */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-10">
              <AnimatedSection>
                <h2 className="font-heading text-2xl font-bold">Sobre o serviço</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{service.fullDescription}</p>
              </AnimatedSection>

              <AnimatedSection>
                <h3 className="font-heading text-xl font-bold">Para quem é?</h3>
                <p className="mt-3 text-muted-foreground leading-relaxed">{service.whoIsItFor}</p>
              </AnimatedSection>

              <AnimatedSection>
                <h3 className="font-heading text-xl font-bold">Como executamos</h3>
                <ol className="mt-4 space-y-3">
                  {service.howWeExecute.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{i + 1}</span>
                      <span className="text-muted-foreground pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </AnimatedSection>

              <AnimatedSection>
                <h3 className="font-heading text-xl font-bold flex items-center gap-2"><Wrench className="h-5 w-5 text-primary" /> Equipamentos</h3>
                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {service.equipment.map((eq, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary shrink-0" />{eq}</li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection>
                <h3 className="font-heading text-xl font-bold flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Segurança e qualidade</h3>
                <ul className="mt-4 space-y-2">
                  {service.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary shrink-0" />{b}</li>
                  ))}
                </ul>
              </AnimatedSection>

              {service.faq.length > 0 && (
                <AnimatedSection>
                  <h3 className="font-heading text-xl font-bold">Perguntas frequentes</h3>
                  <Accordion type="single" collapsible className="mt-4">
                    {service.faq.map((item, i) => (
                      <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                        <AccordionTrigger className="text-left text-sm font-medium hover:text-primary">{item.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm">{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AnimatedSection>
              )}

              <AnimatedSection>
                <div className="flex flex-col sm:flex-row gap-3">
                  <WhatsAppCTA label="Solicitar orçamento" message={`Olá, gostaria de um orçamento para ${service.title}!`}
                    locationTag="servico-interno" size="lg" className="rounded-full" />
                  <Button asChild variant="outline" size="lg" className="gap-2 rounded-full"><Link to="/contato">Formulário de contato</Link></Button>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              <AnimatedSection direction="right">
                <div className="rounded-lg border border-border bg-card p-5">
                  <h3 className="font-heading text-base font-bold mb-4">Outros serviços</h3>
                  <ul className="space-y-2">
                    {otherServices.map((s) => (
                      <li key={s.id}>
                        <Link to={`/servicos/${s.slug}`} className="flex items-center gap-3 rounded-md p-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                          <img src={serviceImages[s.image]} alt={s.title} className="h-10 w-10 rounded object-cover" loading="lazy" />
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.1}>
                <div className="rounded-lg bg-primary p-6 text-white">
                  <h3 className="font-heading text-lg font-bold">Precisa de ajuda?</h3>
                  <p className="mt-2 text-sm text-white/80">Nossa equipe está pronta para esclarecer suas dúvidas.</p>
                  <WhatsAppCTA label="Fale conosco" locationTag="servico-sidebar" className="mt-4 w-full bg-white text-primary hover:bg-white/90 rounded-full" />
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicoDetalhe;
