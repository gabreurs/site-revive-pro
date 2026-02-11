import { AnimatedSection } from "@/components/AnimatedSection";
import { SEOHead } from "@/components/seo/SEOHead";
import { Layout } from "@/components/layout/Layout";
import { COMPANY_INFO } from "@/lib/constants";

const PoliticaPrivacidade = () => {
  return (
    <Layout>
      <SEOHead
        title="Política de Privacidade | SMS Terraplenagem"
        description="Política de privacidade da SMS Terraplenagem. Saiba como tratamos seus dados pessoais."
        canonical="https://smsterraplenagem.com.br/politica-de-privacidade"
        noindex
      />

      <section className="section-dark py-16 md:py-20 topo-pattern">
        <div className="container-custom">
          <AnimatedSection>
            <h1 className="font-heading text-3xl font-extrabold text-white md:text-4xl">Política de Privacidade</h1>
            <p className="mt-3 text-gray-400">Última atualização: Janeiro de 2026</p>
          </AnimatedSection>
        </div>
      </section>

      <section className="section-padding">
        <div className="container-custom">
          <div className="mx-auto max-w-3xl">
            <AnimatedSection>
              <h2 className="font-heading text-xl font-bold mb-4 text-foreground">1. Informações Coletadas</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Coletamos informações que você nos fornece diretamente, como nome, e-mail, telefone e detalhes do projeto ao preencher nosso formulário de contato ou entrar em contato pelo WhatsApp.
              </p>

              <h2 className="font-heading text-xl font-bold mb-4 mt-8 text-foreground">2. Uso das Informações</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Utilizamos suas informações para: responder às suas solicitações, enviar orçamentos, prestar serviços contratados e melhorar nossa comunicação.
              </p>

              <h2 className="font-heading text-xl font-bold mb-4 mt-8 text-foreground">3. Compartilhamento de Dados</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Não vendemos ou compartilhamos seus dados pessoais com terceiros, exceto quando necessário para a prestação de serviços ou por exigência legal.
              </p>

              <h2 className="font-heading text-xl font-bold mb-4 mt-8 text-foreground">4. Cookies e Tecnologias</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Nosso site pode utilizar cookies e tecnologias de rastreamento para melhorar a experiência do usuário e para fins de análise e marketing (Google Analytics, Google Ads).
              </p>

              <h2 className="font-heading text-xl font-bold mb-4 mt-8 text-foreground">5. Seus Direitos</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Você tem o direito de solicitar acesso, correção ou exclusão de seus dados pessoais. Para exercer esses direitos, entre em contato pelo e-mail {COMPANY_INFO.email}.
              </p>

              <h2 className="font-heading text-xl font-bold mb-4 mt-8 text-foreground">6. Contato</h2>
              <p className="text-muted-foreground mb-4 leading-relaxed">
                Para dúvidas sobre esta política, entre em contato:<br />
                E-mail: {COMPANY_INFO.email}<br />
                Telefone: {COMPANY_INFO.phone}
              </p>
            </AnimatedSection>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default PoliticaPrivacidade;
