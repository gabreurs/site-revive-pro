import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Phone, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
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

const ServicoDetalhe = () => {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES.find((s) => s.id === slug);

  if (!service) {
    return (
      <Layout>
        <div className="container-custom section-padding text-center">
          <h1 className="text-2xl font-bold">Serviço não encontrado</h1>
          <Button asChild className="mt-4">
            <Link to="/servicos">Voltar aos Serviços</Link>
          </Button>
        </div>
      </Layout>
    );
  }

  const otherServices = SERVICES.filter((s) => s.id !== slug).slice(0, 3);

  return (
    <Layout>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px]">
        <img
          src={serviceImages[service.image]}
          alt={service.title}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
        <div className="container-custom absolute inset-0 flex flex-col justify-end pb-12">
          <Link
            to="/servicos"
            className="mb-4 inline-flex items-center gap-2 text-sm text-white/80 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Voltar aos Serviços
          </Link>
          <h1 className="text-4xl font-extrabold text-white md:text-5xl">{service.title}</h1>
        </div>
      </section>

      {/* Content */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold">Sobre o Serviço</h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {service.fullDescription}
              </p>

              <h3 className="mt-10 text-xl font-bold">Benefícios</h3>
              <ul className="mt-4 space-y-3">
                {service.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3">
                    <CheckCircle className="h-5 w-5 flex-shrink-0 text-primary" />
                    <span className="text-muted-foreground">{benefit}</span>
                  </li>
                ))}
              </ul>

              <div className="mt-10">
                <Button asChild size="lg" className="gap-2">
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <Phone className="h-5 w-5" />
                    Solicitar Orçamento
                  </a>
                </Button>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div className="rounded-lg bg-muted p-6">
                <h3 className="text-lg font-bold">Outros Serviços</h3>
                <ul className="mt-4 space-y-3">
                  {otherServices.map((s) => (
                    <li key={s.id}>
                      <Link
                        to={`/servicos/${s.id}`}
                        className="flex items-center gap-3 rounded-md p-2 transition-colors hover:bg-background"
                      >
                        <img
                          src={serviceImages[s.image]}
                          alt={s.title}
                          className="h-12 w-12 rounded object-cover"
                        />
                        <span className="text-sm font-medium">{s.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
                <Link
                  to="/servicos"
                  className="mt-4 inline-block text-sm font-medium text-primary hover:underline"
                >
                  Ver todos os serviços →
                </Link>
              </div>

              <div className="mt-6 rounded-lg bg-primary p-6 text-white">
                <h3 className="text-lg font-bold">Precisa de ajuda?</h3>
                <p className="mt-2 text-sm text-white/80">
                  Nossa equipe está pronta para esclarecer suas dúvidas e oferecer a melhor solução.
                </p>
                <Button
                  asChild
                  variant="secondary"
                  className="mt-4 w-full gap-2 bg-white text-primary hover:bg-white/90"
                >
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <Phone className="h-4 w-4" />
                    Fale Conosco
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default ServicoDetalhe;
