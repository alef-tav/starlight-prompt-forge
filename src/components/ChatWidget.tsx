import { useState, useRef, useEffect, useCallback } from "react";
import { MessageCircle, X, Sparkles, Send, Loader2, LogIn, LogOut, User } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import AuthModal from "./AuthModal";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface ChatMessage {
  id: string;
  user_id: string;
  session_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

// Generate unique session ID
const generateSessionId = () => {
  return `session_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
};

const ChatWidget = () => {
  const { user, loading: authLoading, signOut } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "assistant",
      content: "Olá! 👋 Sou a IA da Alavanca. Como posso ajudar a automatizar sua empresa hoje?",
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState(() => generateSessionId());
  const chatRef = useRef<HTMLDivElement>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Load chat history when user logs in
  const loadChatHistory = useCallback(async () => {
    if (!user) return;

    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: true })
        .limit(50);

      if (error) {
        console.error('Error loading chat history:', error);
        return;
      }

      if (data && data.length > 0) {
        const loadedMessages: Message[] = (data as ChatMessage[]).map((msg) => ({
          role: msg.role,
          content: msg.content,
        }));
        
        // Add welcome message at the beginning
        setMessages([
          {
            role: "assistant",
            content: "Olá! 👋 Sou a IA da Alavanca. Como posso ajudar a automatizar sua empresa hoje?",
          },
          ...loadedMessages,
        ]);

        // Get the latest session ID from the messages
        const latestSession = (data as ChatMessage[])[data.length - 1]?.session_id;
        if (latestSession) {
          setSessionId(latestSession);
        }
      }
    } catch (err) {
      console.error('Error loading chat history:', err);
    }
  }, [user]);

  useEffect(() => {
    if (user) {
      loadChatHistory();
    } else {
      // Reset to default state when user logs out
      setMessages([
        {
          role: "assistant",
          content: "Olá! 👋 Sou a IA da Alavanca. Como posso ajudar a automatizar sua empresa hoje?",
        },
      ]);
      setSessionId(generateSessionId());
    }
  }, [user, loadChatHistory]);

  // Scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

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

  // Save message to Supabase
  const saveMessage = async (role: "user" | "assistant", content: string) => {
    if (!user) return;

    try {
      await supabase.from('chat_messages').insert({
        user_id: user.id,
        session_id: sessionId,
        role,
        content,
      });
    } catch (err) {
      console.error('Error saving message:', err);
    }
  };

  const sendMessage = async (message: string) => {
    if (!message.trim() || isLoading) return;

    // Add user message
    const userMessage: Message = { role: "user", content: message };
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsLoading(true);

    // Save user message if logged in
    if (user) {
      await saveMessage("user", message);
    }

    try {
      // Call n8n webhook
      const response = await fetch(
        "https://n8n.autoia.store/webhook/a40f3e54-6037-431f-afb2-76a6e4097b1c",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ 
            mensagem: message, 
            sessionId,
            userId: user?.id || null,
          }),
        }
      );

      const data = await response.json();
      
      // Add assistant response
      const assistantContent = data.output || data.message || data.response || "Desculpe, não consegui processar sua mensagem.";
      const assistantMessage: Message = {
        role: "assistant",
        content: assistantContent,
      };
      setMessages((prev) => [...prev, assistantMessage]);

      // Save assistant message if logged in
      if (user) {
        await saveMessage("assistant", assistantContent);
      }
    } catch (error) {
      console.error("Error sending message:", error);
      const errorMessage: Message = {
        role: "assistant",
        content: "Desculpe, ocorreu um erro ao processar sua mensagem. Tente novamente.",
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(inputValue);
  };

  const handleQuickAction = (action: string) => {
    const actionMessages: Record<string, string> = {
      budget: "Gostaria de solicitar um orçamento para automação",
      how: "Como funciona o processo de automação com IA?",
      human: "Gostaria de falar com um atendente humano",
    };
    sendMessage(actionMessages[action] || action);
  };

  const quickActions = [
    { label: "Orçamento", action: "budget" },
    { label: "Como funciona?", action: "how" },
    { label: "Falar com humano", action: "human" },
  ];

  return (
    <>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
      
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
                <div className="flex items-center gap-1">
                  {/* Auth Button */}
                  {!authLoading && (
                    user ? (
                      <button
                        onClick={() => signOut()}
                        className="w-8 h-8 rounded-full hover:bg-secondary/50 flex items-center justify-center transition-colors group"
                        title="Sair"
                      >
                        <LogOut className="w-4 h-4 text-muted-foreground group-hover:text-destructive" />
                      </button>
                    ) : (
                      <button
                        onClick={() => setShowAuthModal(true)}
                        className="w-8 h-8 rounded-full hover:bg-secondary/50 flex items-center justify-center transition-colors group"
                        title="Entrar para salvar histórico"
                      >
                        <LogIn className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      </button>
                    )
                  )}
                  <button
                    onClick={() => setIsOpen(false)}
                    className="w-8 h-8 rounded-full hover:bg-secondary/50 flex items-center justify-center transition-colors"
                  >
                    <X className="w-4 h-4 text-muted-foreground" />
                  </button>
                </div>
              </div>

              {/* User Badge */}
              {user && (
                <div className="px-4 py-2 bg-primary/10 border-b border-border/30 flex items-center gap-2">
                  <User className="w-3 h-3 text-primary" />
                  <span className="text-xs text-muted-foreground truncate">
                    {user.email}
                  </span>
                  <span className="text-xs text-primary ml-auto">Histórico salvo</span>
                </div>
              )}

              {/* Chat Body */}
              <div className="p-4 min-h-[200px] max-h-[400px] overflow-y-auto">
                {/* Messages */}
                {messages.map((message, index) => (
                  <div
                    key={index}
                    className={`flex gap-3 mb-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                  >
                    {message.role === "assistant" && (
                      <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0 flex items-center justify-center">
                        <Sparkles className="w-4 h-4 text-white" />
                      </div>
                    )}
                    <div
                      className={`rounded-2xl p-3 max-w-[85%] ${
                        message.role === "user"
                          ? "bg-gradient-to-r from-primary to-accent text-white rounded-tr-sm"
                          : "glass-card rounded-tl-sm"
                      }`}
                    >
                      <p className="text-sm">{message.content}</p>
                    </div>
                  </div>
                ))}

                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex gap-3 mb-4">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-primary to-accent flex-shrink-0 flex items-center justify-center">
                      <Sparkles className="w-4 h-4 text-white" />
                    </div>
                    <div className="glass-card rounded-2xl rounded-tl-sm p-3">
                      <Loader2 className="w-4 h-4 animate-spin text-primary" />
                    </div>
                  </div>
                )}

                {/* Quick Actions - only show if no user messages yet */}
                {messages.length === 1 && (
                  <div className="flex flex-wrap gap-2 mt-4">
                    {quickActions.map((action) => (
                      <button
                        key={action.action}
                        onClick={() => handleQuickAction(action.action)}
                        className="px-4 py-2 rounded-full text-sm font-medium bg-gradient-to-r from-primary/20 to-accent/20 text-foreground border border-primary/30 hover:border-primary/50 hover:from-primary/30 hover:to-accent/30 transition-all duration-300"
                      >
                        {action.label}
                      </button>
                    ))}
                  </div>
                )}

                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <form onSubmit={handleSubmit} className="p-4 border-t border-border/30">
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    placeholder="Digite sua mensagem..."
                    disabled={isLoading}
                    className="flex-1 bg-secondary/50 border border-border/50 rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors disabled:opacity-50"
                  />
                  <button
                    type="submit"
                    disabled={isLoading || !inputValue.trim()}
                    className="w-10 h-10 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center hover:opacity-90 transition-opacity disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="w-4 h-4 text-white animate-spin" />
                    ) : (
                      <Send className="w-4 h-4 text-white" />
                    )}
                  </button>
                </div>
              </form>
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
    </>
  );
};

export default ChatWidget;
