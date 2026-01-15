import { Instagram, Linkedin, MessageCircle } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative py-12 px-6 border-t border-border/30">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
              <span className="text-gradient font-bold text-xl">A</span>
            </div>
            <span className="text-xl font-bold">Alavanca AI</span>
          </div>

          {/* Links */}
          <nav className="flex items-center gap-8">
            <a href="#services" className="text-muted-foreground hover:text-foreground transition-colors">
              Serviços
            </a>
            <a href="#portfolio" className="text-muted-foreground hover:text-foreground transition-colors">
              Portfólio
            </a>
            <a href="#" className="text-muted-foreground hover:text-foreground transition-colors">
              Contato
            </a>
          </nav>

          {/* Social */}
          <div className="flex items-center gap-4">
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-secondary transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-secondary transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full glass-card flex items-center justify-center hover:bg-secondary transition-colors">
              <MessageCircle className="w-5 h-5" />
            </a>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/20 text-center text-sm text-muted-foreground">
          © 2025 Alavanca AI. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
