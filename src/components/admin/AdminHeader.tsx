import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, LogOut, Loader2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import logo from "@/assets/logo-alavanca-ai.png";

const AdminHeader = () => {
  const navigate = useNavigate();
  const { signOut } = useAuth();
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    await signOut();
    navigate("/");
  };

  return (
    <header className="border-b border-border/50 bg-background/80 backdrop-blur-lg sticky top-0 z-10">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Left side */}
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="w-10 h-10 rounded-full hover:bg-secondary/50 flex items-center justify-center transition-colors"
          >
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <div className="flex items-center gap-3">
            <img src={logo} alt="Alavanca AI" className="h-10 w-auto" />
            <div>
              <h1 className="text-xl font-bold text-foreground">Alavanca AI</h1>
              <p className="text-xs text-muted-foreground">Sistema de Gestão de Leads</p>
            </div>
          </div>
        </div>

        {/* Right side */}
        <div className="flex items-center gap-6">
          {/* Clock */}
          <div className="hidden sm:block text-right">
            <p className="text-[10px] text-muted-foreground uppercase tracking-wider">
              Horário do Sistema
            </p>
            <p className="text-xl font-bold text-accent">
              {format(currentTime, "HH:mm:ss")}
            </p>
            <p className="text-xs text-muted-foreground">
              {format(currentTime, "dd 'de' MMM 'de' yyyy", { locale: ptBR })}
            </p>
          </div>

          {/* Logout */}
          <button
            onClick={handleLogout}
            disabled={isLoggingOut}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors disabled:opacity-50"
          >
            {isLoggingOut ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              <LogOut className="w-4 h-4" />
            )}
            <span className="hidden sm:inline text-sm">Sair</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default AdminHeader;
