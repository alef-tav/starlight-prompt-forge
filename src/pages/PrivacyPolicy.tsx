import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-16">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao início
        </Link>

        <h1 className="text-4xl font-bold text-foreground mb-8">Política de Privacidade</h1>
        
        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <p className="text-lg">
            Última atualização: {new Date().toLocaleDateString('pt-BR')}
          </p>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">1. Introdução</h2>
            <p>
              A Alavanca AI ("nós", "nosso" ou "empresa") está comprometida em proteger sua privacidade. 
              Esta Política de Privacidade explica como coletamos, usamos, divulgamos e protegemos suas 
              informações quando você utiliza nossos serviços e website.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">2. Informações que Coletamos</h2>
            <p>Podemos coletar os seguintes tipos de informações:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li><strong>Dados de identificação:</strong> nome, e-mail, telefone e empresa.</li>
              <li><strong>Dados de uso:</strong> informações sobre como você interage com nossos serviços.</li>
              <li><strong>Dados de comunicação:</strong> mensagens enviadas através do nosso chat ou formulários.</li>
              <li><strong>Dados técnicos:</strong> endereço IP, tipo de navegador e dispositivo.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">3. Como Usamos suas Informações</h2>
            <p>Utilizamos suas informações para:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Fornecer e melhorar nossos serviços de consultoria em IA.</li>
              <li>Comunicar-nos sobre projetos, atualizações e novidades.</li>
              <li>Personalizar sua experiência em nosso website.</li>
              <li>Cumprir obrigações legais e regulatórias.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">4. Compartilhamento de Dados</h2>
            <p>
              Não vendemos suas informações pessoais. Podemos compartilhar dados com:
            </p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Prestadores de serviços que nos auxiliam nas operações.</li>
              <li>Autoridades quando exigido por lei.</li>
              <li>Parceiros de negócios, mediante seu consentimento.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">5. Segurança dos Dados</h2>
            <p>
              Implementamos medidas técnicas e organizacionais para proteger suas informações, 
              incluindo criptografia, controles de acesso e monitoramento contínuo.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">6. Seus Direitos (LGPD)</h2>
            <p>De acordo com a Lei Geral de Proteção de Dados, você tem direito a:</p>
            <ul className="list-disc pl-6 space-y-2">
              <li>Acessar seus dados pessoais.</li>
              <li>Corrigir dados incompletos ou desatualizados.</li>
              <li>Solicitar a exclusão de seus dados.</li>
              <li>Revogar consentimento a qualquer momento.</li>
              <li>Solicitar portabilidade dos dados.</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">7. Cookies</h2>
            <p>
              Utilizamos cookies para melhorar sua experiência. Você pode gerenciar suas preferências 
              de cookies através das configurações do seu navegador.
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">8. Contato</h2>
            <p>
              Para dúvidas sobre esta política ou exercer seus direitos, entre em contato:
            </p>
            <ul className="list-none space-y-1">
              <li><strong>E-mail:</strong> contato@alavancaia.online</li>
              <li><strong>Telefone:</strong> (11) 99752-9072</li>
              <li><strong>Endereço:</strong> São Paulo, SP</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
