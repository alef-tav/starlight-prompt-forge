import { X, Mail, Sparkles, Target, MessageSquare } from "lucide-react";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";

interface Lead {
  id: string;
  email: string;
  nome: string | null;
  servico_interesse: string | null;
  objetivo_projeto: string | null;
  resumo_da_conversa: string | null;
  inicio_atendimento: string;
  session_id: string;
}

interface LeadDetailDrawerProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

const LeadDetailDrawer = ({ lead, isOpen, onClose }: LeadDetailDrawerProps) => {
  if (!lead) return null;

  return (
    <Sheet open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <SheetContent className="w-full sm:max-w-md bg-card border-l border-border/50 p-0 overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-primary to-accent p-6">
          <SheetHeader>
            <SheetTitle className="text-white text-xl font-bold mb-1">
              {lead.nome || "Lead"}
            </SheetTitle>
            <p className="text-white/80 text-sm">Alavanca AI</p>
          </SheetHeader>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6 overflow-y-auto max-h-[calc(100vh-160px)]">
          {/* Email */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
              <Mail className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Email</p>
              <p className="text-sm font-medium text-foreground">{lead.email}</p>
            </div>
          </div>

          {/* Serviço */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
              <Sparkles className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Serviço de Interesse</p>
              <p className="text-sm font-medium text-foreground">
                {lead.servico_interesse || "Não informado"}
              </p>
            </div>
          </div>

          {/* Objetivo */}
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-xl bg-secondary flex items-center justify-center flex-shrink-0">
              <Target className="w-5 h-5 text-muted-foreground" />
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Objetivo do Contato</p>
              <p className="text-sm font-medium text-foreground">
                {lead.objetivo_projeto || "Não informado"}
              </p>
            </div>
          </div>

          {/* Resumo da Conversa */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <MessageSquare className="w-5 h-5 text-primary" />
              <h4 className="text-sm font-semibold text-foreground">Resumo da Conversa</h4>
            </div>
            <div className="bg-secondary/50 rounded-xl p-4 max-h-[300px] overflow-y-auto">
              <p className="text-sm text-foreground leading-relaxed">
                {lead.resumo_da_conversa || "Nenhum resumo disponível para este lead."}
              </p>
            </div>
          </div>

          {/* Data */}
          <div className="pt-4 border-t border-border/30">
            <p className="text-xs text-muted-foreground">
              Iniciado em{" "}
              <span className="text-foreground font-medium">
                {format(new Date(lead.inicio_atendimento), "dd 'de' MMMM 'de' yyyy 'às' HH:mm", {
                  locale: ptBR,
                })}
              </span>
            </p>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default LeadDetailDrawer;
