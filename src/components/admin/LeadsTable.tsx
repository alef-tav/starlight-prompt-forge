import { Search, ChevronDown } from "lucide-react";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

interface LeadsTableProps {
  leads: Lead[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  serviceFilter: string;
  onServiceFilterChange: (value: string) => void;
  onLeadSelect: (lead: Lead) => void;
  services: string[];
}

const LeadsTable = ({
  leads,
  searchTerm,
  onSearchChange,
  serviceFilter,
  onServiceFilterChange,
  onLeadSelect,
  services,
}: LeadsTableProps) => {
  return (
    <div className="glass-card rounded-2xl border border-border/50 overflow-hidden">
      {/* Header */}
      <div className="p-5 border-b border-border/30 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">
          Lista de Leads ({leads.length})
        </h3>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Buscar por nome ou email..."
              className="w-full sm:w-64 bg-secondary/50 border border-border/50 rounded-xl pl-10 pr-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors"
            />
          </div>
          {/* Filter */}
          <Select value={serviceFilter} onValueChange={onServiceFilterChange}>
            <SelectTrigger className="w-full sm:w-40 bg-secondary/50 border-border/50 rounded-xl">
              <SelectValue placeholder="Todos" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos</SelectItem>
              {services.map((service) => (
                <SelectItem key={service} value={service}>
                  {service}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border/30">
              <th className="text-left text-sm font-medium text-muted-foreground py-4 px-5">
                Nome
              </th>
              <th className="text-left text-sm font-medium text-muted-foreground py-4 px-5">
                Email
              </th>
              <th className="text-left text-sm font-medium text-muted-foreground py-4 px-5">
                Serviço
              </th>
              <th className="text-left text-sm font-medium text-muted-foreground py-4 px-5">
                Objetivo
              </th>
              <th className="text-left text-sm font-medium text-muted-foreground py-4 px-5">
                <div className="flex items-center gap-1">
                  Data
                  <ChevronDown className="w-4 h-4" />
                </div>
              </th>
            </tr>
          </thead>
          <tbody>
            {leads.length === 0 ? (
              <tr>
                <td colSpan={5} className="py-12 text-center text-muted-foreground">
                  Nenhum lead encontrado
                </td>
              </tr>
            ) : (
              leads.map((lead) => (
                <tr
                  key={lead.id}
                  onClick={() => onLeadSelect(lead)}
                  className="border-b border-border/20 hover:bg-secondary/30 cursor-pointer transition-colors"
                >
                  <td className="py-4 px-5">
                    <span className="text-sm font-medium text-primary">
                      {lead.nome || "Não informado"}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-sm text-foreground">{lead.email}</span>
                  </td>
                  <td className="py-4 px-5">
                    {lead.servico_interesse ? (
                      <span className="inline-flex px-3 py-1 rounded-full text-xs font-medium bg-accent/20 text-accent border border-accent/30">
                        {lead.servico_interesse}
                      </span>
                    ) : (
                      <span className="text-sm text-muted-foreground">-</span>
                    )}
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-sm text-foreground max-w-[200px] truncate block">
                      {lead.objetivo_projeto || "-"}
                    </span>
                  </td>
                  <td className="py-4 px-5">
                    <span className="text-sm text-foreground">
                      {format(new Date(lead.inicio_atendimento), "dd/MM/yyyy", { locale: ptBR })}
                    </span>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LeadsTable;
