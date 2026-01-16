import Header from "@/components/Header";
import Footer from "@/components/Footer";

const TermsOfUse = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      <div className="max-w-4xl mx-auto px-6 pt-28 pb-16">

        <h1 className="text-4xl font-bold text-foreground mb-8">Termos de Uso</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Aceitação dos Termos</h2>
            <p>
              Ao acessar e utilizar os serviços da Alavanca AI, você concorda com estes Termos de Uso. 
              Se você não concordar com qualquer parte destes termos, não deverá utilizar nossos serviços.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Descrição dos Serviços</h2>
            <p>A Alavanca AI oferece serviços de:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Consultoria em inteligência artificial e automação.</li>
              <li>Desenvolvimento de dashboards personalizados.</li>
              <li>Implementação de IA para atendimento e vendas.</li>
              <li>Gestão de tráfego com inteligência artificial.</li>
              <li>Automação de processos empresariais.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Uso Adequado</h2>
            <p>Ao utilizar nossos serviços, você concorda em:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fornecer informações verdadeiras e atualizadas.</li>
              <li>Não utilizar os serviços para fins ilegais ou não autorizados.</li>
              <li>Não interferir na segurança ou funcionamento dos sistemas.</li>
              <li>Respeitar a propriedade intelectual da Alavanca AI.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Propriedade Intelectual</h2>
            <p>
              Todo o conteúdo, marcas, logos, designs e software disponibilizados são de propriedade 
              exclusiva da Alavanca AI ou de seus licenciadores. É proibida a reprodução, modificação 
              ou distribuição sem autorização prévia por escrito.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Confidencialidade</h2>
            <p>
              Comprometemo-nos a manter a confidencialidade das informações compartilhadas durante 
              a prestação de serviços, conforme acordado em contratos específicos de cada projeto.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Limitação de Responsabilidade</h2>
            <p>
              A Alavanca AI não será responsável por danos indiretos, incidentais ou consequenciais 
              decorrentes do uso de nossos serviços. Nossa responsabilidade total será limitada ao 
              valor pago pelos serviços contratados.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Rescisão</h2>
            <p>
              Podemos suspender ou encerrar seu acesso aos serviços a qualquer momento, 
              caso haja violação destes termos ou por qualquer outro motivo justificável.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Alterações nos Termos</h2>
            <p>
              Reservamo-nos o direito de modificar estes termos a qualquer momento. 
              As alterações entrarão em vigor após publicação no website. 
              O uso continuado dos serviços constitui aceitação dos novos termos.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">9. Lei Aplicável</h2>
            <p>
              Estes termos são regidos pelas leis da República Federativa do Brasil. 
              Qualquer disputa será resolvida no foro da comarca de São Paulo, SP.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">10. Contato</h2>
            <p>
              Para dúvidas sobre estes termos, entre em contato:
            </p>
            <ul className="list-none space-y-1">
              <li><strong>E-mail:</strong> contato@alavancaia.online</li>
              <li><strong>Telefone:</strong> (11) 99752-9072</li>
              <li><strong>Endereço:</strong> São Paulo, SP</li>
            </ul>
          </section>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default TermsOfUse;
