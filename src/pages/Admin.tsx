import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { supabase } from "@/integrations/supabase/client";
import { ArrowLeft, MessageSquare, User, Calendar, Search, Loader2, Shield, LogIn } from "lucide-react";

interface ChatMessage {
  id: string;
  user_id: string;
  session_id: string;
  role: "user" | "assistant";
  content: string;
  created_at: string;
}

interface ConversationGroup {
  session_id: string;
  user_id: string;
  user_email: string;
  messages: ChatMessage[];
  last_message_at: string;
}

const Admin = () => {
  const { user, loading: authLoading, signIn } = useAuth();
  const navigate = useNavigate();
  const [conversations, setConversations] = useState<ConversationGroup[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedConversation, setSelectedConversation] = useState<ConversationGroup | null>(null);
  
  // Login form state
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const [loginLoading, setLoginLoading] = useState(false);

  // Handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    setLoginLoading(true);

    const { error } = await signIn(email, password);
    
    if (error) {
      setLoginError("Credenciais inválidas");
    }
    
    setLoginLoading(false);
  };

  // Check if user is admin
  useEffect(() => {
    const checkAdminStatus = async () => {
      if (!user) {
        setIsAdmin(false);
        setLoading(false);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .maybeSingle();

        if (error) {
          console.error('Error checking admin status:', error);
          setIsAdmin(false);
        } else {
          setIsAdmin(!!data);
        }
      } catch (err) {
        console.error('Error:', err);
        setIsAdmin(false);
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading) {
      checkAdminStatus();
    }
  }, [user, authLoading]);

  // Load all conversations
  useEffect(() => {
    const loadConversations = async () => {
      if (!isAdmin) return;

      try {
        // Get all messages with user info
        const { data: messages, error } = await supabase
          .from('chat_messages')
          .select('*')
          .order('created_at', { ascending: true });

        if (error) {
          console.error('Error loading messages:', error);
          return;
        }

        if (!messages || messages.length === 0) {
          setConversations([]);
          return;
        }

        // Get unique user IDs
        const grouped: Record<string, ConversationGroup> = {};

        for (const msg of messages as ChatMessage[]) {
          const key = `${msg.user_id}_${msg.session_id}`;
          if (!grouped[key]) {
            grouped[key] = {
              session_id: msg.session_id,
              user_id: msg.user_id,
              user_email: msg.user_id.substring(0, 8) + '...', // Placeholder
              messages: [],
              last_message_at: msg.created_at,
            };
          }
          grouped[key].messages.push(msg);
          grouped[key].last_message_at = msg.created_at;
        }

        // Sort by last message date
        const sortedConversations = Object.values(grouped).sort(
          (a, b) => new Date(b.last_message_at).getTime() - new Date(a.last_message_at).getTime()
        );

        setConversations(sortedConversations);
      } catch (err) {
        console.error('Error:', err);
      }
    };

    if (isAdmin) {
      loadConversations();
    }
  }, [isAdmin]);

  // Filter conversations
  const filteredConversations = conversations.filter(
    (conv) =>
      conv.user_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      conv.messages.some((m) => m.content.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-primary" />
      </div>
    );
  }

  // Show login form if not authenticated
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="glass-card rounded-2xl border border-border/50 p-8">
            <div className="flex flex-col items-center mb-8">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center mb-4">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-2xl font-bold text-foreground">Painel Admin</h1>
              <p className="text-muted-foreground text-sm mt-1">Faça login para continuar</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              {loginError && (
                <div className="p-3 bg-destructive/10 border border-destructive/30 rounded-xl text-destructive text-sm text-center">
                  {loginError}
                </div>
              )}
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                  placeholder="admin@email.com"
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Senha</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-secondary/50 border border-border/50 rounded-xl px-4 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50"
                  placeholder="••••••••"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={loginLoading}
                className="w-full py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:opacity-90 transition-opacity disabled:opacity-50 flex items-center justify-center gap-2"
              >
                {loginLoading ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <>
                    <LogIn className="w-5 h-5" />
                    Entrar
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => navigate("/")}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                ← Voltar ao site
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-background flex flex-col items-center justify-center p-4">
        <Shield className="w-16 h-16 text-destructive mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Acesso Negado</h1>
        <p className="text-muted-foreground mb-6">Você não tem permissão de administrador.</p>
        <button
          onClick={() => navigate("/")}
          className="px-6 py-3 bg-gradient-to-r from-primary to-accent text-white rounded-xl hover:opacity-90 transition-opacity"
        >
          Voltar ao Início
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={() => navigate("/")}
              className="w-10 h-10 rounded-full hover:bg-secondary/50 flex items-center justify-center transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-foreground" />
            </button>
            <div>
              <h1 className="text-xl font-bold text-foreground">Painel de Administração</h1>
              <p className="text-sm text-muted-foreground">Gerenciar conversas do chatbot</p>
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Shield className="w-4 h-4 text-primary" />
            <span>Admin</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Conversations List */}
          <div className="lg:col-span-1">
            <div className="glass-card rounded-2xl border border-border/50 overflow-hidden">
              {/* Search */}
              <div className="p-4 border-b border-border/30">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Buscar conversas..."
                    className="w-full bg-secondary/50 border border-border/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
                  />
                </div>
              </div>

              {/* Stats */}
              <div className="p-4 border-b border-border/30 flex gap-4">
                <div className="flex-1 text-center">
                  <p className="text-2xl font-bold text-foreground">{conversations.length}</p>
                  <p className="text-xs text-muted-foreground">Conversas</p>
                </div>
                <div className="flex-1 text-center">
                  <p className="text-2xl font-bold text-foreground">
                    {conversations.reduce((acc, c) => acc + c.messages.length, 0)}
                  </p>
                  <p className="text-xs text-muted-foreground">Mensagens</p>
                </div>
              </div>

              {/* List */}
              <div className="max-h-[600px] overflow-y-auto">
                {filteredConversations.length === 0 ? (
                  <div className="p-8 text-center">
                    <MessageSquare className="w-12 h-12 text-muted-foreground mx-auto mb-3" />
                    <p className="text-muted-foreground">Nenhuma conversa encontrada</p>
                  </div>
                ) : (
                  filteredConversations.map((conv) => (
                    <button
                      key={`${conv.user_id}_${conv.session_id}`}
                      onClick={() => setSelectedConversation(conv)}
                      className={`w-full p-4 text-left border-b border-border/20 hover:bg-secondary/30 transition-colors ${
                        selectedConversation?.session_id === conv.session_id &&
                        selectedConversation?.user_id === conv.user_id
                          ? "bg-primary/10"
                          : ""
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-r from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                          <User className="w-5 h-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium text-foreground truncate">
                            {conv.user_id.substring(0, 12)}...
                          </p>
                          <p className="text-xs text-muted-foreground truncate">
                            {conv.messages[conv.messages.length - 1]?.content.substring(0, 50)}...
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Calendar className="w-3 h-3 text-muted-foreground" />
                            <span className="text-xs text-muted-foreground">
                              {new Date(conv.last_message_at).toLocaleDateString("pt-BR")}
                            </span>
                            <span className="text-xs text-primary">
                              {conv.messages.length} msgs
                            </span>
                          </div>
                        </div>
                      </div>
                    </button>
                  ))
                )}
              </div>
            </div>
          </div>

          {/* Conversation Detail */}
          <div className="lg:col-span-2">
            <div className="glass-card rounded-2xl border border-border/50 overflow-hidden min-h-[600px]">
              {selectedConversation ? (
                <>
                  {/* Conversation Header */}
                  <div className="p-4 border-b border-border/30 bg-gradient-to-r from-primary/10 to-accent/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-r from-primary to-accent flex items-center justify-center">
                        <User className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">
                          Usuário: {selectedConversation.user_id.substring(0, 16)}...
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Sessão: {selectedConversation.session_id.substring(0, 20)}...
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Messages */}
                  <div className="p-4 max-h-[500px] overflow-y-auto">
                    {selectedConversation.messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex gap-3 mb-4 ${message.role === "user" ? "flex-row-reverse" : ""}`}
                      >
                        <div
                          className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center ${
                            message.role === "user"
                              ? "bg-secondary"
                              : "bg-gradient-to-r from-primary to-accent"
                          }`}
                        >
                          {message.role === "user" ? (
                            <User className="w-4 h-4 text-muted-foreground" />
                          ) : (
                            <MessageSquare className="w-4 h-4 text-white" />
                          )}
                        </div>
                        <div
                          className={`rounded-2xl p-3 max-w-[80%] ${
                            message.role === "user"
                              ? "bg-secondary text-foreground rounded-tr-sm"
                              : "glass-card rounded-tl-sm"
                          }`}
                        >
                          <p className="text-sm">{message.content}</p>
                          <p className="text-[10px] text-muted-foreground mt-1">
                            {new Date(message.created_at).toLocaleString("pt-BR")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                <div className="h-full flex flex-col items-center justify-center p-8">
                  <MessageSquare className="w-16 h-16 text-muted-foreground mb-4" />
                  <h3 className="text-lg font-semibold text-foreground mb-2">
                    Selecione uma conversa
                  </h3>
                  <p className="text-muted-foreground text-center">
                    Clique em uma conversa na lista para visualizar os detalhes
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Admin;
