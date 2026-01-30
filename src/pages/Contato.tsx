import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Send } from "lucide-react";
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
import { Layout } from "@/components/layout/Layout";
import { COMPANY_INFO, SERVICES, WHATSAPP_URL } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const Contato = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
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
      {/* Hero */}
      <section className="hero-section py-20 md:py-28">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-extrabold text-white md:text-5xl">
              Entre em <span className="text-primary">Contato</span>
            </h1>
            <p className="mt-4 text-lg text-gray-300">
              Estamos prontos para atender sua demanda. Envie uma mensagem ou fale conosco pelo
              WhatsApp.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="section-padding bg-background">
        <div className="container-custom">
          <div className="grid gap-12 lg:grid-cols-2">
            {/* Contact Form */}
            <div>
              <h2 className="text-2xl font-bold">Envie sua mensagem</h2>
              <p className="mt-2 text-muted-foreground">
                Preencha o formulário abaixo e entraremos em contato.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Nome completo</Label>
                    <Input id="name" placeholder="Seu nome" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Telefone</Label>
                    <Input id="phone" type="tel" placeholder="(11) 99999-9999" required />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">E-mail</Label>
                  <Input id="email" type="email" placeholder="seu@email.com" required />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="location">Local da obra</Label>
                  <Input id="location" placeholder="Cidade / Bairro" />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="service">Tipo de serviço</Label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecione o serviço" />
                    </SelectTrigger>
                    <SelectContent>
                      {SERVICES.map((service) => (
                        <SelectItem key={service.id} value={service.id}>
                          {service.title}
                        </SelectItem>
                      ))}
                      <SelectItem value="outro">Outro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="message">Como podemos te ajudar?</Label>
                  <Textarea
                    id="message"
                    placeholder="Descreva sua necessidade..."
                    rows={5}
                    required
                  />
                </div>

                <Button type="submit" size="lg" className="w-full gap-2" disabled={isSubmitting}>
                  <Send className="h-5 w-5" />
                  {isSubmitting ? "Enviando..." : "Enviar Mensagem"}
                </Button>
              </form>
            </div>

            {/* Contact Info */}
            <div>
              <h2 className="text-2xl font-bold">Informações de Contato</h2>
              <p className="mt-2 text-muted-foreground">
                Você também pode entrar em contato diretamente pelos canais abaixo.
              </p>

              <div className="mt-8 space-y-6">
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp/10">
                    <Phone className="h-6 w-6 text-whatsapp" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Telefone / WhatsApp</h3>
                    <p className="text-lg text-primary">{COMPANY_INFO.phone}</p>
                    <p className="text-sm text-muted-foreground">Atendimento rápido pelo WhatsApp</p>
                  </div>
                </a>

                <a
                  href={`mailto:${COMPANY_INFO.email}`}
                  className="flex items-start gap-4 rounded-lg border p-4 transition-colors hover:bg-muted"
                >
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Mail className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">E-mail</h3>
                    <p className="text-lg text-primary">{COMPANY_INFO.email}</p>
                    <p className="text-sm text-muted-foreground">Respondemos em até 24 horas</p>
                  </div>
                </a>

                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <MapPin className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Localização</h3>
                    <p className="text-lg">{COMPANY_INFO.address}</p>
                    <p className="text-sm text-muted-foreground">
                      Atendemos toda a Grande São Paulo
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 rounded-lg border p-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Clock className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold">Horário de Atendimento</h3>
                    <p className="text-muted-foreground">Segunda a Sexta: 7h às 18h</p>
                    <p className="text-muted-foreground">Sábado: 7h às 12h</p>
                  </div>
                </div>
              </div>

              {/* WhatsApp CTA */}
              <div className="mt-8 rounded-lg bg-whatsapp p-6 text-white">
                <h3 className="text-xl font-bold">Prefere o WhatsApp?</h3>
                <p className="mt-2 text-white/80">
                  Fale diretamente com nossa equipe e receba atendimento imediato.
                </p>
                <Button
                  asChild
                  variant="secondary"
                  className="mt-4 w-full gap-2 bg-white text-whatsapp hover:bg-white/90"
                >
                  <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer">
                    <Phone className="h-5 w-5" />
                    Abrir WhatsApp
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

export default Contato;
