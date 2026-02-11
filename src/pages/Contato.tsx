import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/seo/SEOHead";
import { Layout } from "@/components/layout/Layout";
import { COMPANY_INFO, SERVICES, getWhatsAppUrl } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const Contato = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Placeholder: replace with Formspree/Getform/Basin or serverless endpoint
    setTimeout(() => {
      toast({
        title: "Mensagem enviada!",
        description: "Entraremos em contato em breve.",
      });
      setIsSubmitting(false);
      (e.target as HTMLFormElement).reset();
    }, 1000);
  };

  return (
    <Layout>
      <SEOHead
        title="Contato | SMS Terraplenagem | Terraplanagem em SP"
        description="Entre em contato com a SMS Terraplenagem. Solicite orçamento para terraplanagem em São Paulo via WhatsApp, e-mail ou formulário."
        keywords="contato sms terraplenagem, orçamento terraplanagem sp"
      />

      {/* Hero */}
      <section className="hero-dark py-20 md:py-28 topo-pattern">
        <div className="container-custom">
          <AnimatedSection>
            <div className="mx-auto max-w-3xl text-center">
              <h1 className="text-4xl font-extrabold text-white md:text-5xl">
                Entre em <span className="text-primary">Contato</span>
              </h1>
              <p className="mt-4 text-lg text-white/70">
                Estamos prontos para atender sua demanda. Envie uma mensagem ou fale pelo WhatsApp.
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Form */}
            <AnimatedSection direction="left">
              <h2 className="text-2xl font-bold">Envie sua mensagem</h2>
              <p className="mt-2 text-muted-foreground">Preencha o formulário abaixo.</p>

              <form onSubmit={handleSubmit} className="mt-6 space-y-5">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" placeholder="Seu nome" required className="bg-card" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" type="tel" placeholder="(11) 99999-9999" required className="bg-card" />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" required className="bg-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Local da obra</Label>
                  <Input id="location" placeholder="Cidade / Bairro" className="bg-card" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="service">Tipo de serviço</Label>
                  <Select>
                    <SelectTrigger className="bg-card">
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((s) => (
                        <SelectItem key={s.id} value={s.id}>{s.title}</SelectItem>
                      ))}
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="message">Como podemos te ajudar?</Label>
                  <Textarea id="message" placeholder="Descreva sua necessidade..." rows={5} required className="bg-card" />
                </div>
                <Button type="submit" size="lg" className="w-full gap-2 rounded-full" disabled={isSubmitting}>
                  <Send className="h-4 w-4" />
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </AnimatedSection>

            {/* Info */}
            <AnimatedSection direction="right">
              <h2 className="text-2xl font-bold">Informações de Contato</h2>
              <p className="mt-2 text-muted-foreground">Ou entre em contato diretamente.</p>

              <div className="mt-6 space-y-4">
                <a href={getWhatsAppUrl()} target="_blank" rel="noopener noreferrer" data-cta="whatsapp" data-location="contato" className="flex items-start gap-4 rounded-lg border border-border/30 bg-card p-4 transition-colors hover:border-primary/30">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-whatsapp/10">
                    <MessageCircle className="h-5 w-5 text-whatsapp" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Telefone / WhatsApp</h3>
                    <p className="text-primary font-medium">{COMPANY_INFO.phone}</p>
                    <p className="text-xs text-muted-foreground">Atendimento rápido</p>
                  </div>
                </a>

                <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-start gap-4 rounded-lg border border-border/30 bg-card p-4 transition-colors hover:border-primary/30">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <Mail className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">E-mail</h3>
                    <p className="text-primary font-medium">{COMPANY_INFO.email}</p>
                    <p className="text-xs text-muted-foreground">Respondemos em até 24h</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 rounded-lg border border-border/30 bg-card p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <MapPin className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Localização</h3>
                    <p className="font-medium">{COMPANY_INFO.address}</p>
                    <p className="text-xs text-muted-foreground">Atendemos toda a Grande SP</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg border border-border/30 bg-card p-4">
                  <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-primary/10">
                    <Clock className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Horário de Atendimento</h3>
                    <p className="text-sm text-muted-foreground">{COMPANY_INFO.hoursWeekday}</p>
                    <p className="text-sm text-muted-foreground">{COMPANY_INFO.hoursSaturday}</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-6 rounded-lg bg-whatsapp p-6 text-white">
                <h3 className="text-lg font-bold">Prefere o WhatsApp?</h3>
                <p className="mt-1 text-sm text-white/80">
                  Fale diretamente com nossa equipe.
                </p>
                <WhatsAppCTA
                  label="Abrir WhatsApp"
                  locationTag="contato-whatsapp"
                  className="mt-4 w-full bg-white text-whatsapp hover:bg-white/90 rounded-full"
                  icon="message"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Contato;
