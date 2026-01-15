import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Sparkles, Send } from "lucide-react";
import { Button } from "@/components/ui/button";

const ChatWidget = () => {
  const [isOpen, setIsOpen] = useState(false);
  const chatRef = useRef<HTMLDivElement>(null);

  // Close chat when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (chatRef.current && !chatRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const quickActions = [
    { label: "Orçamento", action: "budget" },
    { label: "Como funciona?", action: "how" },
    { label: "Falar com humano", action: "human" },
  ];

  return (
    <div className="fixed bottom-6 right-6 z-50" ref={chatRef}>
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-20 right-0 w-[340px] sm:w-[380px] animate-scale-in origin-bottom-right">
          <div className="glass-card rounded-3xl overflow-hidden border border-border/50 shadow-2xl shadow-primary/20">
            {/* Header */}
            <div className="bg-gradient-to-r from-primary/20 to-accent/20 p-4 flex items-center justify-between border-b border-border/30">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">Assistente Alavanca AI</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    <span className="text-xs text-muted-foreground">Online</span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-8 h-8 rounded-full hover:bg-secondary/50 flex items-center justify-center transition-colors"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
              {/* Welcome Message */}
              <div className="flex gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div className="glass-card rounded-2xl rounded-tl-sm p-3 max-w-[85%]">
                  <p className="text-sm text-foreground">
                    Olá! 👋 Sou a IA da Alavanca. Como posso ajudar a automatizar sua empresa hoje?
                  </p>
                </div>
              </div>

              {/* Quick Actions */}
              <div className="flex flex-wrap gap-2 mt-4">
                {quickActions.map((action) => (
                  <button
                    key={action.action}
                    className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary/20 to-accent/20 text-foreground border border-primary/30 hover:border-primary/50 hover:from-primary/30 hover:to-accent/30 transition-all duration-300"
                  >
                    {action.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-border/30">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Digite sua mensagem..."
                  className="flex-1 bg-secondary/50 border border-border/50 rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center hover:opacity-90 transition-opacity">
                  <Send className="w-4 h-4 text-white" />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* FAB Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`
          w-14 h-14 rounded-full bg-gradient-to-r from-primary to-accent
          flex items-center justify-center
          shadow-lg shadow-primary/40
          transition-all duration-300
          hover:scale-110 hover:shadow-xl hover:shadow-primary/50
          ${isOpen ? "rotate-0" : ""}
        `}
        style={{
          animation: !isOpen ? "pulse-glow 2s ease-in-out infinite" : "none",
        }}
      >
        {isOpen ? (
          <X className="w-6 h-6 text-white" />
        ) : (
          <MessageCircle className="w-6 h-6 text-white" />
        )}
      </button>

      {/* Pulse effect ring */}
      {!isOpen && (
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent opacity-40 animate-ping pointer-events-none" />
      )}
    </div>
  );
};

export default ChatWidget;
