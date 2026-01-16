import { Mail, Phone, MapPin, Calendar, Instagram, Linkedin, MessageCircle } from "lucide-react";
import logoAlavancaAI from "@/assets/logo-alavanca-ai.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const solutions = [
    { label: "Dashboards Personalizados", href: "#services" },
    { label: "IA de Atendimento e Vendas", href: "#services" },
    { label: "Gestão de Tráfego com IA", href: "#services" },
    { label: "Automação de Processos", href: "#services" },
  ];

  const contact = [
    { icon: Mail, label: "contato@alavancaia.online", href: "mailto:contato@alavancaia.online" },
    { icon: Phone, label: "(11) 99752-9072", href: "tel:+5511997529072" },
    { icon: MapPin, label: "São Paulo, SP", href: "#" },
    { icon: Calendar, label: "Agendar Consultoria", href: "#cta" },
  ];

  return (
    <footer className="relative border-t border-border/20">
      {/* Main Footer */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 lg:gap-16">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-3 mb-6">
              <img 
                src={logoAlavancaAI} 
                alt="Alavanca AI" 
                className="h-12 w-auto"
              />
            </div>
            <p className="text-muted-foreground leading-relaxed max-w-sm">
              Transformando negócios através da inteligência artificial. 
              Soluções sofisticadas e personalizadas para impulsionar seu crescimento.
            </p>
            
            {/* Social Icons */}
            <div className="flex items-center gap-3 mt-6">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary/50 hover:bg-primary/20 flex items-center justify-center transition-colors group"
              >
                <Instagram className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary/50 hover:bg-primary/20 flex items-center justify-center transition-colors group"
              >
                <Linkedin className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a 
                href="https://wa.me/5511997529072" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-full bg-secondary/50 hover:bg-primary/20 flex items-center justify-center transition-colors group"
              >
                <MessageCircle className="w-4 h-4 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Solutions */}
          <div>
            <h4 className="text-foreground font-semibold mb-5">Soluções</h4>
            <ul className="space-y-3">
              {solutions.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href}
                    className="text-muted-foreground hover:text-foreground transition-colors text-sm"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-foreground font-semibold mb-5">Contato</h4>
            <ul className="space-y-3">
              {contact.map((item) => (
                <li key={item.label}>
                  <a 
                    href={item.href}
                    className="flex items-center gap-3 text-muted-foreground hover:text-foreground transition-colors text-sm group"
                  >
                    <item.icon className="w-4 h-4 text-primary/70 group-hover:text-primary transition-colors" />
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-border/20">
        <div className="max-w-7xl mx-auto px-6 py-5">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              © {currentYear} Alavanca AI. Todos os direitos reservados.
            </p>
            <div className="flex items-center gap-6">
              <a href="/privacidade" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Política de Privacidade
              </a>
              <a href="/termos" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
                Termos de Uso
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
