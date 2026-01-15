import { Button } from "@/components/ui/button";
import { ArrowRight, Mail } from "lucide-react";

const CTA = () => {
  return (
    <section className="relative py-32 px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 via-primary/10 to-transparent" />
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-primary/30 blur-[120px] rounded-full" />

      <div className="max-w-4xl mx-auto relative z-10 text-center">
        {/* Scroll indicator */}
        <div className="w-12 h-12 rounded-full glass-card mx-auto mb-12 flex items-center justify-center">
          <ArrowRight className="w-5 h-5 text-muted-foreground rotate-90" />
        </div>

        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
          Solicite um orçamento
          <br />
          <span className="text-gradient">gratuitamente</span>
        </h2>

        <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
          Pronto para transformar seu negócio com IA? Entre em contato e descubra como podemos ajudar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="hero" size="xl" className="group">
            Orçamento
            <ArrowRight className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button variant="glass" size="xl" className="group">
            <Mail className="w-5 h-5 mr-2" />
            Entre em contato
          </Button>
        </div>
      </div>
    </section>
  );
};

export default CTA;
