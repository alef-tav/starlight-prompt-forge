import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import logoAlavancaAI from "@/assets/logo-alavanca-ai.png";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <img 
            src={logoAlavancaAI} 
            alt="Alavanca AI" 
            className="h-12 w-auto"
          />
        </div>

        <Button variant="hero" size="lg" className="group">
          Orçamento
          <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
        </Button>
      </div>
    </header>
  );
};

export default Header;
