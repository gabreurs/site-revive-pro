import { useParams, useLocation, Link } from "react-router-dom";
import { ArrowRight, MapPin, CheckCircle2 } from "lucide-react";
import { Layout } from "@/components/layout/Layout";
import { SEOHead } from "@/components/seo/SEOHead";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ServiceCard } from "@/components/ui/ServiceCard";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { SERVICES } from "@/lib/constants";
import { findBairroBySlug } from "@/lib/bairros";


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

const Bairro = () => {
  const { slug: paramSlug } = useParams<{ slug: string }>();
  const { pathname } = useLocation();
  const prefix = "/terraplanagem-";
  const derivedSlug = pathname.startsWith(prefix)
    ? pathname.slice(prefix.length).replace(/\/$/, "")
    : undefined;
  const slug = paramSlug || derivedSlug;
  const bairro = slug ? findBairroBySlug(slug) : undefined;

  if (!bairro) return <NotFound />;


  const { name, region, path } = bairro;
  const isCidade = region.key === "outras";
  const localLabel = isCidade ? name : `${name}, São Paulo`;
  const h1 = `Terraplanagem em ${localLabel}`;
  const seoTitle = `Terraplanagem em ${localLabel} | SMS Terraplenagem`;
  const seoDesc = `Empresa de terraplanagem em ${localLabel}: limpeza de terreno, escavação, movimentação de terra, demolição e locação de máquinas. Orçamento rápido no WhatsApp.`;
  const canonical = `https://smsterraplenagem.com.br${path}`;

  const whatsappMsg = `Olá! Gostaria de um orçamento de terraplanagem em ${localLabel}.`;

  return (
    <Layout>
      <SEOHead title={seoTitle} description={seoDesc} canonical={canonical} />

      {/* Hero */}
      <section className="section-dark py-12 md:py-20 topo-pattern">
        <div className="container-custom">
          <AnimatedSection>
            <nav aria-label="breadcrumb" className="mb-4 text-xs text-gray-400">
              <Link to="/" className="hover:text-primary">Início</Link>
              <span className="mx-2">/</span>
              <a href="/#areas-atendimento" className="hover:text-primary">Onde atuamos</a>
              <span className="mx-2">/</span>
              <span className="text-gray-300">{region.label}</span>
              <span className="mx-2">/</span>
              <span className="text-white">{name}</span>
            </nav>

            <div className="max-w-3xl">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                <MapPin className="h-3.5 w-3.5" /> {region.label}
              </span>
              <h1 className="mt-3 font-heading text-[1.75rem] font-extrabold text-white md:text-5xl">
                {h1}
              </h1>
              <p className="mt-4 text-base md:text-lg text-gray-300">
                Atendemos obras em {localLabel} com equipe própria, frota completa e prazo combinado. {region.intro}
              </p>
              <div className="mt-6 flex flex-col sm:flex-row gap-3">
                <WhatsAppCTA
                  label={`Orçamento em ${name}`}
                  message={whatsappMsg}
                  locationTag={`bairro-${bairro.slug}`}
                  size="lg"
                  className="bg-whatsapp hover:bg-whatsapp/90 text-white rounded-full"
                  icon="message"
                />
                <Link
                  to="/servicos"
                  className="inline-flex items-center justify-center rounded-full border border-white/20 px-6 py-3 text-sm font-medium text-white hover:bg-white/10 transition-colors"
                >
                  Ver todos os serviços
                </Link>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Intro contextual */}
      <section className="section-padding">
        <div className="container-custom max-w-3xl">
          <AnimatedSection>
            <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground">
              Empresa de terraplanagem em {localLabel}
            </h2>
            <div className="mt-4 space-y-4 text-base text-muted-foreground leading-relaxed">
              <p>
                A SMS Terraplenagem atende obras residenciais, comerciais e industriais em {localLabel}, executando todas as etapas que antecedem a construção: limpeza de terreno, demolição, escavação, corte, aterro, compactação e transporte de material.
              </p>
              <p>
                {region.intro} Por isso, cada projeto começa com visita técnica para entender acesso ao terreno, volume de terra a movimentar, condições do solo e prazo da obra — só depois apresentamos um orçamento objetivo, com escopo claro e logística definida.
              </p>
              <p>
                Trabalhamos com escavadeiras hidráulicas, retroescavadeiras, caminhões basculantes e equipe especializada. Em {name}, isso significa obra entregue no prazo, sem surpresas com remoção de entulho ou nivelamento mal executado.
              </p>
            </div>

            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                "Equipe e frota próprias",
                "Orçamento rápido pelo WhatsApp",
                "Descarte de entulho conforme normas",
                "Atendimento em obras de todos os portes",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-foreground">
                  <CheckCircle2 className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                  {item}
                </li>
              ))}
            </ul>
          </AnimatedSection>
        </div>
      </section>

      {/* Serviços */}
      <section className="section-padding section-neutral">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading
              title={`Serviços disponíveis em ${name}`}
              subtitle="Atendemos todas as etapas de preparação do terreno"
              centered
            />
          </AnimatedSection>
          <div className="grid gap-4 md:gap-6 grid-cols-1 md:grid-cols-2">
            {SERVICES.map((s, i) => (
              <AnimatedSection key={s.id} delay={i * 0.05}>
                <ServiceCard
                  id={s.id}
                  slug={s.slug}
                  title={s.title}
                  description={s.shortDescription}
                  image={serviceImages[s.image]}
                  variant="large"
                />
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding cta-gradient section-dark">
        <div className="container-custom text-center">
          <AnimatedSection>
            <h2 className="font-heading text-2xl font-bold text-white md:text-4xl">
              Obra em {localLabel}? Vamos conversar.
            </h2>
            <p className="mx-auto mt-3 md:mt-4 max-w-2xl text-base md:text-lg text-white/80">
              Envie os detalhes do terreno pelo WhatsApp e receba um orçamento de terraplanagem rápido e sem compromisso.
            </p>
            <div className="mt-6 md:mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
              <WhatsAppCTA
                label="Solicitar orçamento"
                message={whatsappMsg}
                locationTag={`bairro-cta-${bairro.slug}`}
                size="lg"
                className="bg-white text-primary hover:bg-white/90 rounded-full px-8 w-full sm:w-auto"
              />
              <Link to="/contato" className="text-sm text-white/80 hover:text-white underline underline-offset-4">
                Formulário de contato
              </Link>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Outras áreas próximas */}
      <section className="section-padding">
        <div className="container-custom">
          <AnimatedSection>
            <SectionHeading
              title={`Também atendemos na ${region.label}`}
              subtitle="Outros bairros e cidades próximas com o mesmo padrão de serviço"
              centered
            />
          </AnimatedSection>
          <div className="flex flex-wrap justify-center gap-2 max-w-4xl mx-auto">
            {region.bairros
              .filter((n) => n !== name)
              .slice(0, 18)
              .map((n) => {
                const s = n
                  .normalize("NFD")
                  .replace(/[\u0300-\u036f]/g, "")
                  .toLowerCase()
                  .replace(/'/g, "")
                  .replace(/[^a-z0-9]+/g, "-")
                  .replace(/^-+|-+$/g, "");
                return (
                  <Link
                    key={s}
                    to={`/terraplanagem-${s}`}
                    className="rounded-full border border-border bg-card px-4 py-2 text-sm text-muted-foreground hover:border-primary/40 hover:text-primary transition-colors"
                  >
                    {n}
                  </Link>
                );
              })}
            <a
              href="#areas-atendimento"
              className="inline-flex items-center gap-1 rounded-full px-4 py-2 text-sm font-medium text-primary hover:underline"
            >
              Ver todas <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Bairro;
