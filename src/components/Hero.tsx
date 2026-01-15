import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6">
      {/* Background gradient effects */}
      <div className="absolute inset-0 gradient-bg" />
      <div className="hero-glow top-1/4" />
      
      {/* Badge */}
      <div className="relative z-10 animate-fade-up">
        <div className="glass-card px-4 py-2 rounded-full mb-8 inline-flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Alavanca AI</span>
          <span className="text-primary">✦</span>
        </div>
      </div>

      {/* Main heading */}
      <div className="relative z-10 text-center max-w-5xl mx-auto">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-tight mb-6 animate-fade-up animation-delay-100">
          Somos uma
          <br />
          <span className="text-gradient glow-text">Agência de Soluções</span>
          <br />
          <span className="text-muted-foreground">em Inteligência Artificial</span>
        </h1>

        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 animate-fade-up animation-delay-200">
          Transformamos processos manuais em máquinas de escala através de 
          automações inteligentes e assistentes de IA.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center animate-fade-up animation-delay-300">
          <Button variant="hero" size="xl" className="group">
            Solicite um Orçamento
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="glass" size="xl">
            Conheça nossos serviços
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-fade-up animation-delay-500">
        <a href="#services" className="glass-card w-12 h-12 rounded-full flex items-center justify-center cursor-pointer hover:bg-secondary/50 transition-colors">
          <ChevronDown className="w-5 h-5 text-muted-foreground animate-float" />
        </a>
      </div>

      {/* Partner logos placeholder */}
      <div className="absolute bottom-32 left-0 right-0 animate-fade-up animation-delay-400">
        <div className="flex items-center justify-center gap-8 md:gap-16 opacity-40">
          {["IPSUM", "logoipsum", "LOGO", "LOGO", "Logoipsum"].map((logo, i) => (
            <span key={i} className="text-sm md:text-base font-medium tracking-wider text-muted-foreground">
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
