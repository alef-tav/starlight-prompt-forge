import { Bot, Zap, Video, Target, MessageSquare, Code } from "lucide-react";
import { Button } from "@/components/ui/button";

const services = [
  {
    icon: Zap,
    title: "Automação de Processos",
    description: "Eficiência total com fluxos de trabalho inteligentes que economizam tempo e reduzem erros.",
    size: "large",
  },
  {
    icon: MessageSquare,
    title: "Assistentes de Atendimento",
    description: "Atendimento 24/7 humanizado via WhatsApp e Instagram que converte seguidores em clientes.",
    size: "medium",
  },
  {
    icon: Video,
    title: "Vídeos Publicitários",
    description: "Criação de conteúdo visual de alto impacto em escala usando IA generativa.",
    size: "medium",
  },
  {
    icon: Target,
    title: "Gestão de Tráfego",
    description: "Otimização de anúncios em tempo real para o menor custo por lead.",
    size: "small",
  },
  {
    icon: Bot,
    title: "Chatbots Inteligentes",
    description: "Assistentes virtuais personalizados para sua marca.",
    size: "small",
  },
  {
    icon: Code,
    title: "Desenvolvimento",
    description: "Soluções customizadas com as mais recentes tecnologias de IA.",
    size: "small",
  },
];

const Services = () => {
  return (
    <section id="services" className="relative py-24 px-6 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="flex flex-col lg:flex-row gap-12 mb-16">
          <div className="lg:w-1/3">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              <span className="text-gradient">Serviços</span>
            </h2>
            <p className="text-muted-foreground text-lg mb-8">
              Soluções completas em inteligência artificial para escalar seu negócio com tecnologia de ponta.
            </p>
            <Button variant="glass" size="lg">
              Orçamento
            </Button>
          </div>

          {/* Bento Grid */}
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-3 gap-4">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isLarge = service.size === "large";
              const isMedium = service.size === "medium";
              
              return (
                <div
                  key={index}
                  className={`glass-card rounded-3xl p-6 transition-all duration-300 hover:scale-[1.02] hover:glow-effect group
                    ${isLarge ? "md:col-span-2 md:row-span-2" : ""}
                    ${isMedium ? "md:col-span-1 md:row-span-1" : ""}
                  `}
                  style={{
                    animationDelay: `${index * 100}ms`,
                  }}
                >
                  <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center mb-4 group-hover:bg-primary/30 transition-colors">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className={`font-semibold mb-2 ${isLarge ? "text-2xl" : "text-lg"}`}>
                    {service.title}
                  </h3>
                  <p className={`text-muted-foreground ${isLarge ? "text-base" : "text-sm"}`}>
                    {service.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
