import { Users, CalendarDays, Star, Clock } from "lucide-react";
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

interface LeadsKPICardsProps {
  leads: Lead[];
}

const LeadsKPICards = ({ leads }: LeadsKPICardsProps) => {
  // Total de leads
  const totalLeads = leads.length;

  // Leads de hoje
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const leadsToday = leads.filter((lead) => {
    const leadDate = new Date(lead.inicio_atendimento);
    leadDate.setHours(0, 0, 0, 0);
    return leadDate.getTime() === today.getTime();
  }).length;

  // Principal serviço
  const serviceCounts: Record<string, number> = {};
  leads.forEach((lead) => {
    if (lead.servico_interesse) {
      serviceCounts[lead.servico_interesse] = (serviceCounts[lead.servico_interesse] || 0) + 1;
    }
  });
  const topService = Object.entries(serviceCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A";

  // Último atendimento
  const lastLead = leads.sort(
    (a, b) => new Date(b.inicio_atendimento).getTime() - new Date(a.inicio_atendimento).getTime()
  )[0];
  const lastAttendance = lastLead
    ? format(new Date(lastLead.inicio_atendimento), "dd/MM 'às' HH:mm", { locale: ptBR })
    : "N/A";

  const cards = [
    {
      title: "Total de Leads",
      value: totalLeads.toString(),
      icon: Users,
    },
    {
      title: "Leads Hoje",
      value: leadsToday.toString(),
      icon: CalendarDays,
    },
    {
      title: "Serviço Top",
      value: topService,
      icon: Star,
    },
    {
      title: "Último Atendimento",
      value: lastAttendance,
      icon: Clock,
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, index) => (
        <div
          key={index}
          className="glass-card rounded-2xl border border-border/50 p-5 flex items-center justify-between"
        >
          <div>
            <p className="text-sm text-muted-foreground mb-1">{card.title}</p>
            <p className="text-2xl font-bold text-foreground truncate max-w-[180px]">{card.value}</p>
          </div>
          <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
            <card.icon className="w-6 h-6 text-primary" />
          </div>
        </div>
      ))}
    </div>
  );
};

export default LeadsKPICards;
