import { useMemo } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import { format, subDays, eachDayOfInterval } from "date-fns";
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

interface LeadsChartsProps {
  leads: Lead[];
}

const COLORS = [
  "hsl(263, 70%, 58%)",
  "hsl(188, 100%, 42%)",
  "hsl(263, 70%, 70%)",
  "hsl(188, 100%, 60%)",
  "hsl(263, 50%, 50%)",
  "hsl(188, 80%, 50%)",
];

const LeadsCharts = ({ leads }: LeadsChartsProps) => {
  // Leads por dia (últimos 30 dias)
  const leadsPerDay = useMemo(() => {
    const endDate = new Date();
    const startDate = subDays(endDate, 29);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return days.map((day) => {
      const dayStart = new Date(day);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(day);
      dayEnd.setHours(23, 59, 59, 999);

      const count = leads.filter((lead) => {
        const leadDate = new Date(lead.inicio_atendimento);
        return leadDate >= dayStart && leadDate <= dayEnd;
      }).length;

      return {
        date: format(day, "dd/MM", { locale: ptBR }),
        leads: count,
      };
    });
  }, [leads]);

  // Leads por serviço
  const leadsPerService = useMemo(() => {
    const serviceCounts: Record<string, number> = {};
    leads.forEach((lead) => {
      const service = lead.servico_interesse || "Não informado";
      serviceCounts[service] = (serviceCounts[service] || 0) + 1;
    });

    return Object.entries(serviceCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 6);
  }, [leads]);

  // Leads por objetivo
  const leadsPerObjective = useMemo(() => {
    const objectiveCounts: Record<string, number> = {};
    leads.forEach((lead) => {
      const objective = lead.objetivo_projeto?.substring(0, 30) || "Não informado";
      objectiveCounts[objective] = (objectiveCounts[objective] || 0) + 1;
    });

    return Object.entries(objectiveCounts)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  }, [leads]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
      {/* Leads por Dia - Line Chart */}
      <div className="glass-card rounded-2xl border border-border/50 p-5">
        <h3 className="text-base font-semibold text-foreground mb-4">Leads por Dia</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={leadsPerDay}>
              <XAxis
                dataKey="date"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                interval="preserveStartEnd"
              />
              <YAxis
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "12px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Line
                type="monotone"
                dataKey="leads"
                stroke="hsl(188, 100%, 42%)"
                strokeWidth={2}
                dot={{ fill: "hsl(188, 100%, 42%)", strokeWidth: 0, r: 3 }}
                activeDot={{ r: 5, fill: "hsl(263, 70%, 58%)" }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leads por Serviço - Bar Chart */}
      <div className="glass-card rounded-2xl border border-border/50 p-5">
        <h3 className="text-base font-semibold text-foreground mb-4">Leads por Serviço</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={leadsPerService} layout="vertical">
              <XAxis
                type="number"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                allowDecimals={false}
              />
              <YAxis
                type="category"
                dataKey="name"
                tick={{ fontSize: 10, fill: "hsl(var(--muted-foreground))" }}
                tickLine={false}
                axisLine={false}
                width={80}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "12px",
                  color: "hsl(var(--foreground))",
                }}
              />
              <Bar dataKey="value" fill="hsl(188, 100%, 42%)" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Leads por Objetivo - Pie Chart */}
      <div className="glass-card rounded-2xl border border-border/50 p-5">
        <h3 className="text-base font-semibold text-foreground mb-4">Leads por Objetivo</h3>
        <div className="h-[200px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={leadsPerObjective}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {leadsPerObjective.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "hsl(var(--card))",
                  borderColor: "hsl(var(--border))",
                  borderRadius: "12px",
                  color: "hsl(var(--foreground))",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default LeadsCharts;
