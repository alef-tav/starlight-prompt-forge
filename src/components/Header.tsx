import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <span className="text-gradient font-bold text-xl">A</span>
          </div>
          <span className="text-xl font-bold text-foreground">Alavanca AI</span>
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
