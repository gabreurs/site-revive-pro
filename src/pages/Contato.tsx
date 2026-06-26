import { useState } from "react";
import { Mail, MapPin, Clock, Send, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { WhatsAppCTA } from "@/components/WhatsAppCTA";
import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/seo/SEOHead";
import { Layout } from "@/components/layout/Layout";
import { PageHero } from "@/components/layout/PageHero";
import { SUPPORT_OBRAS } from "@/lib/serviceImages";
import { COMPANY_INFO, SERVICES, getExternalLinkTarget, getWhatsAppUrl, trackWhatsAppConversion } from "@/lib/constants";
import { useToast } from "@/hooks/use-toast";

const Contato = () => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [serviceType, setServiceType] = useState("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload = {
      name: String(fd.get("name") || "").trim(), phone: String(fd.get("phone") || "").trim(),
      email: String(fd.get("email") || "").trim(), location: String(fd.get("location") || "").trim(),
      serviceType: serviceType || "", message: String(fd.get("message") || "").trim(), source: "site",
    };
    const endpoint = import.meta.env.VITE_CONTACT_ENDPOINT || "/api/contato";
    try {
      const res = await fetch(endpoint, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      toast({ title: "Mensagem enviada!", description: "Recebemos seu contato e vamos retornar em breve." });
      form.reset(); setServiceType("");
    } catch {
      toast({ title: "Não foi possível enviar", description: "O envio está indisponível. Chame no WhatsApp que atendemos rapidinho.", variant: "destructive" });
    } finally { setIsSubmitting(false); }
  };

  const target = getExternalLinkTarget();

  return (
    <Layout>
      <SEOHead
        title="Contato | SMS Terraplenagem — WhatsApp e Orçamento"
        description="Fale com a SMS Terraplenagem: WhatsApp (11) 94352-1043. Atendemos São Paulo e Grande SP. Solicite orçamento."
        canonical="https://smsterraplenagem.com.br/contato"
      />

      <PageHero
        eyebrow="Fale com a SMS"
        title={<>Entre em <span className="text-primary">contato</span></>}
        subtitle="Atendemos São Paulo e toda a Grande SP. Resposta rápida pelo WhatsApp ou pelo formulário."
        image={SUPPORT_OBRAS.transporte.src}
        imageAlt="Caminhão prancha da SMS transportando equipamento na Grande São Paulo"
        breadcrumbs={[{ label: "Início", to: "/" }, { label: "Contato" }]}
      />


      <section className="section-padding">
        <div className="container-custom"><div className="grid gap-8 md:gap-12 lg:grid-cols-2">
          <AnimatedSection direction="left">
            <h2 className="font-heading text-xl md:text-2xl font-medium text-foreground">Envie sua mensagem</h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">Preencha o formulário abaixo e retornamos em até 24h.</p>
            <form onSubmit={handleSubmit} className="mt-5 md:mt-6 space-y-4 md:space-y-5">
              <input type="hidden" name="serviceType" value={serviceType} />
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2"><Label htmlFor="name">Nome completo</Label><Input id="name" name="name" placeholder="Seu nome" required className="h-11" /></div>
                <div className="space-y-2"><Label htmlFor="phone">Telefone</Label><Input id="phone" name="phone" type="tel" placeholder="(11) 99999-9999" required className="h-11" /></div>
              </div>
              <div className="space-y-2"><Label htmlFor="email">E-mail</Label><Input id="email" name="email" type="email" placeholder="seu@email.com" required className="h-11" /></div>
              <div className="space-y-2"><Label htmlFor="location">Local da obra</Label><Input id="location" name="location" placeholder="Cidade / Bairro" className="h-11" /></div>
              <div className="space-y-2"><Label>Tipo de serviço</Label>
                <Select value={serviceType} onValueChange={setServiceType}>
                  <SelectTrigger className="h-11"><SelectValue placeholder="Selecione o serviço" /></SelectTrigger>
                  <SelectContent>{SERVICES.map((s) => (<SelectItem key={s.id} value={s.title}>{s.title}</SelectItem>))}<SelectItem value="Outro">Outro</SelectItem></SelectContent>
                </Select>
              </div>
              <div className="space-y-2"><Label htmlFor="message">Como podemos te ajudar?</Label><Textarea id="message" name="message" placeholder="Descreva sua necessidade..." rows={5} required /></div>
              <Button type="submit" size="lg" className="w-full gap-2 rounded-full tap-feedback h-12" disabled={isSubmitting}><Send className="h-4 w-4" />{isSubmitting ? "Enviando..." : "Enviar mensagem"}</Button>
            </form>
          </AnimatedSection>

          <AnimatedSection direction="right">
            <h2 className="font-heading text-xl md:text-2xl font-medium text-foreground">Informações de contato</h2>
            <p className="mt-2 text-sm md:text-base text-muted-foreground">Ou entre em contato diretamente.</p>
            <div className="mt-5 md:mt-6 space-y-3 md:space-y-4">
              <a href={getWhatsAppUrl()} target={target} rel="noopener noreferrer" data-cta="whatsapp" data-location="contato" onClick={trackWhatsAppConversion}
                className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30 card-interactive">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-green-50"><MessageCircle className="h-5 w-5 text-green-600" /></div>
                <div><h3 className="font-heading font-semibold text-sm text-foreground">WhatsApp</h3><p className="text-primary font-medium">{COMPANY_INFO.phone}</p><p className="text-xs text-muted-foreground">Atendimento rápido</p></div>
              </a>
              <a href={`mailto:${COMPANY_INFO.email}`} className="flex items-start gap-4 rounded-lg border border-border bg-card p-4 transition-colors hover:border-primary/30 card-interactive">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50"><Mail className="h-5 w-5 text-primary" /></div>
                <div><h3 className="font-heading font-semibold text-sm text-foreground">E-mail</h3><p className="text-primary font-medium text-sm break-all">{COMPANY_INFO.email}</p></div>
              </a>
              <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50"><MapPin className="h-5 w-5 text-primary" /></div>
                <div><h3 className="font-heading font-semibold text-sm text-foreground">Localização</h3><p className="font-medium text-foreground">{COMPANY_INFO.address}</p><p className="text-xs text-muted-foreground">Atendemos toda a Grande SP</p></div>
              </div>
              <div className="flex items-start gap-4 rounded-lg border border-border bg-card p-4">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg bg-blue-50"><Clock className="h-5 w-5 text-primary" /></div>
                <div><h3 className="font-heading font-semibold text-sm text-foreground">Horário</h3><p className="text-sm text-muted-foreground">{COMPANY_INFO.hoursWeekday}</p><p className="text-sm text-muted-foreground">{COMPANY_INFO.hoursSaturday}</p></div>
              </div>
            </div>
            <div className="mt-5 md:mt-6 rounded-lg bg-green-600 p-5 md:p-6 text-white">
              <h3 className="font-heading text-lg font-medium">Prefere o WhatsApp?</h3>
              <p className="mt-1 text-sm text-white/80">Fale diretamente com nossa equipe.</p>
              <WhatsAppCTA label="Abrir WhatsApp" locationTag="contato-whatsapp" className="mt-4 w-full bg-white text-green-700 hover:bg-white/90 rounded-full tap-feedback" icon="message" />
            </div>
          </AnimatedSection>
        </div></div>
      </section>
    </Layout>
  );
};

export default Contato;
