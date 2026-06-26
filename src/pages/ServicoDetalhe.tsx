import { useParams, Link } from "react-router-dom";
import { CheckCircle, Wrench, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/seo/SEOHead";
import { ServiceJsonLd } from "@/components/seo/JsonLd";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Layout } from "@/components/layout/Layout";
import { SERVICES, BLOG_POSTS } from "@/lib/constants";

import { SERVICE_IMAGE_BY_KEY, getServiceImage } from "@/lib/serviceImages";
import piscinaVid1 from "@/assets/servicos/abertura-piscina-1.mp4.asset.json";
import piscinaVid1Poster from "@/assets/servicos/abertura-piscina-1-poster.jpg.asset.json";
import piscinaVid2 from "@/assets/servicos/abertura-piscina-2.mp4.asset.json";
import piscinaVid2Poster from "@/assets/servicos/abertura-piscina-2-poster.jpg.asset.json";
import piscinaVid3 from "@/assets/servicos/abertura-piscina-3.mp4.asset.json";
import piscinaVid3Poster from "@/assets/servicos/abertura-piscina-3-poster.jpg.asset.json";

const PISCINA_VIDEOS = [
  { src: piscinaVid1.url, poster: piscinaVid1Poster.url, label: "Abertura de cava para piscina — etapa 1" },
  { src: piscinaVid2.url, poster: piscinaVid2Poster.url, label: "Abertura de cava para piscina — etapa 2" },
  { src: piscinaVid3.url, poster: piscinaVid3Poster.url, label: "Abertura de cava para piscina — etapa 3" },
];

const ServicoDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.slug === slug);

  if (!service) {
    return (
      <Layout>
        <div className="container-custom section-padding text-center">
          <h1 className="font-heading text-2xl font-medium text-foreground">Serviço não encontrado</h1>
          <Button asChild className="mt-4"><Link to="/servicos">Voltar aos Serviços</Link></Button>
        </div>
      </Layout>
    );
  }

  const otherServices = SERVICES.filter((s) => s.slug !== slug);
  const relatedPosts = BLOG_POSTS.slice(0, 2);

  return (
    <Layout>
      <SEOHead
        title={service.seoTitle}
        description={service.seoDescription}
        canonical={`https://smsterraplenagem.com.br/servicos/${service.slug}`}
        keywords={service.seoKeyword}
      />
      <ServiceJsonLd name={service.title} description={service.fullDescription} />

      {/* Hero */}
      <section className="relative section-dark">
        <div className="aspect-[16/8] sm:aspect-[16/6] max-h-[420px] w-full overflow-hidden">
          <img
            src={getServiceImage(service.image).src}
            alt={getServiceImage(service.image).alt}
            className="h-full w-full object-cover"
            loading="eager"
            width={1200}
            height={450}
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-[hsl(222,30%,8%)] via-[hsl(222,30%,8%)]/40 to-transparent" aria-hidden="true" />
        <div className="container-custom absolute inset-0 flex flex-col justify-end pb-6 md:pb-8">
          <AnimatedSection>
            <nav className="mb-2 md:mb-3 flex items-center gap-2 text-xs text-gray-300" aria-label="Breadcrumb">
              <Link to="/" className="hover:text-white transition-colors">Início</Link>
              <span>/</span>
              <Link to="/servicos" className="hover:text-white transition-colors">Serviços</Link>
              <span>/</span>
              <span className="text-white truncate max-w-[150px] sm:max-w-none">{service.title}</span>
            </nav>
            <h1 className="font-heading text-2xl font-medium text-white md:text-4xl lg:text-5xl">{service.title}</h1>
          </AnimatedSection>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-8 md:gap-12 lg:grid-cols-3">
            <div className="lg:col-span-2 space-y-8 md:space-y-10">
              <AnimatedSection>
                <h2 className="font-heading text-xl md:text-2xl font-medium text-foreground">Sobre o serviço</h2>
                <p className="mt-3 md:mt-4 text-sm md:text-base text-muted-foreground leading-relaxed">{service.fullDescription}</p>
              </AnimatedSection>

              {service.slug === "abertura-de-piscina" && (
                <AnimatedSection>
                  <h3 className="font-heading text-lg md:text-xl font-medium text-foreground">Veja em obra</h3>
                  <p className="mt-2 text-sm text-muted-foreground">Registros reais de abertura de cava executada pela equipe SMS com mini escavadeira em terreno residencial.</p>
                  <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {PISCINA_VIDEOS.map((v) => (
                      <div key={v.src} className="overflow-hidden rounded-md border border-border bg-card aspect-video">
                        <video
                          src={v.src}
                          poster={v.poster}
                          aria-label={v.label}
                          controls
                          playsInline
                          muted
                          preload="none"
                          className="h-full w-full object-cover"
                        />
                      </div>
                    ))}
                  </div>
                </AnimatedSection>
              )}

              <AnimatedSection>
                <h3 className="font-heading text-lg md:text-xl font-medium text-foreground">Para quem é?</h3>
                <p className="mt-2 md:mt-3 text-sm md:text-base text-muted-foreground leading-relaxed">{service.whoIsItFor}</p>
              </AnimatedSection>

              <AnimatedSection>
                <h3 className="font-heading text-lg md:text-xl font-medium text-foreground">Como executamos</h3>
                <ol className="mt-3 md:mt-4 space-y-3">
                  {service.howWeExecute.map((step, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-bold text-white">{i + 1}</span>
                      <span className="text-sm md:text-base text-muted-foreground pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </AnimatedSection>

              <AnimatedSection>
                <h3 className="font-heading text-lg md:text-xl font-medium text-foreground flex items-center gap-2"><Wrench className="h-5 w-5 text-primary" /> Equipamentos</h3>
                <ul className="mt-3 md:mt-4 grid gap-2 sm:grid-cols-2">
                  {service.equipment.map((eq, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm md:text-base text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary shrink-0" />{eq}</li>
                  ))}
                </ul>
              </AnimatedSection>

              <AnimatedSection>
                <h3 className="font-heading text-lg md:text-xl font-medium text-foreground flex items-center gap-2"><ShieldCheck className="h-5 w-5 text-primary" /> Segurança e qualidade</h3>
                <ul className="mt-3 md:mt-4 space-y-2">
                  {service.benefits.map((b, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm md:text-base text-muted-foreground"><CheckCircle className="h-4 w-4 text-primary shrink-0" />{b}</li>
                  ))}
                </ul>
              </AnimatedSection>

              {service.faq.length > 0 && (
                <AnimatedSection>
                  <h3 className="font-heading text-lg md:text-xl font-medium text-foreground">Perguntas frequentes</h3>
                  <Accordion type="single" collapsible className="mt-3 md:mt-4">
                    {service.faq.map((item, i) => (
                      <AccordionItem key={i} value={`faq-${i}`} className="border-border">
                        <AccordionTrigger className="text-left text-sm font-medium hover:text-primary text-foreground">{item.q}</AccordionTrigger>
                        <AccordionContent className="text-muted-foreground text-sm">{item.a}</AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AnimatedSection>
              )}

              {/* Internal links */}
              <AnimatedSection>
                <div className="rounded-lg border border-border bg-card p-4 md:p-5">
                  <h3 className="font-heading text-sm md:text-base font-medium text-foreground mb-3">Artigos relacionados</h3>
                  <ul className="space-y-2">
                    {relatedPosts.map((post) => (
                      <li key={post.slug}>
                        <Link to={`/blog/${post.slug}`} className="text-sm text-primary hover:underline">{post.title} →</Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection>
                <div className="flex flex-col sm:flex-row gap-3">
                  <WhatsAppCTA label="Solicitar orçamento" message={`Olá, gostaria de um orçamento para ${service.title}!`}
                    locationTag="servico-interno" size="lg" className="rounded-full w-full sm:w-auto tap-feedback" />
                  <Button asChild variant="outline" size="lg" className="gap-2 rounded-full w-full sm:w-auto tap-feedback"><Link to="/contato">Formulário de contato</Link></Button>
                </div>
              </AnimatedSection>
            </div>

            {/* Sidebar */}
            <div className="space-y-5 md:space-y-6">
              <AnimatedSection direction="right">
                <div className="rounded-lg border border-border bg-card p-4 md:p-5">
                  <h3 className="font-heading text-sm md:text-base font-medium text-foreground mb-3 md:mb-4">Outros serviços</h3>
                  <ul className="space-y-2">
                    {otherServices.map((s) => (
                      <li key={s.id}>
                        <Link to={`/servicos/${s.slug}`} className="flex items-center gap-3 rounded-md p-2 text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground">
                          <img src={getServiceImage(s.image).src} alt={`Miniatura do serviço ${s.title}`} className="h-10 w-10 rounded object-cover" loading="lazy" width={40} height={40} />
                          {s.title}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedSection>

              <AnimatedSection direction="right" delay={0.1}>
                <div className="rounded-lg bg-primary p-5 md:p-6 text-white">
                  <h3 className="font-heading text-lg font-medium">Precisa de ajuda?</h3>
                  <p className="mt-2 text-sm text-white/80">Nossa equipe está pronta para esclarecer suas dúvidas sobre {service.title.toLowerCase()}.</p>
                  <WhatsAppCTA label="Fale conosco" locationTag="servico-sidebar" className="mt-4 w-full bg-white text-primary hover:bg-white/90 rounded-full tap-feedback" />
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
