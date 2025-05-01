
import { useState } from "react";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { ChevronDown, ChevronUp } from "lucide-react";

type Company = {
  id: string;
  name: string;
  fantasyName: string;
  cnpj: string;
  city: string;
  state: string;
  segment: string;
  employees: string;
  opportunity?: "hot" | "warm" | "cold";
  companyType: string;
  creator?: {
    email: string;
    name: string;
    origin: string;
    createdAt: string;
  }
};

interface CompaniesTableProps {
  companies: Company[];
  onRowClick?: (company: Company) => void;
}

const CompaniesTable = ({ companies, onRowClick }: CompaniesTableProps) => {
  const [sortField, setSortField] = useState<keyof Company>("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");

  const handleSort = (field: keyof Company) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const sortedCompanies = [...companies].sort((a, b) => {
    let aValue: any = a[sortField];
    let bValue: any = b[sortField];
    
    // Handle nested creator properties
    if (sortField === "creator") {
      aValue = a.creator?.name || "";
      bValue = b.creator?.name || "";
    }
    
    if (aValue === bValue) return 0;
    
    const result = aValue > bValue ? 1 : -1;
    return sortDirection === "asc" ? result : -result;
  });

  const renderSortIcon = (field: keyof Company) => {
    if (sortField !== field) return null;
    return sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />;
  };

  const renderOpportunityBadge = (opportunity?: "hot" | "warm" | "cold") => {
    switch (opportunity) {
      case "hot":
        return <Badge className="bg-red-500">Quente</Badge>;
      case "warm":
        return <Badge className="bg-yellow-500">Morna</Badge>;
      case "cold":
        return <Badge className="bg-blue-500">Fria</Badge>;
      default:
        return <Badge variant="outline">Não classificada</Badge>;
    }
  };

  const renderOriginBadge = (origin?: string) => {
    switch (origin) {
      case "manual":
        return <Badge variant="outline" className="border-green-500 text-green-700">Manual</Badge>;
      case "radar":
        return <Badge variant="outline" className="border-blue-500 text-blue-700">Radar IA</Badge>;
      default:
        return null;
    }
  };

  return (
    <Table>
      <TableCaption>Lista de empresas cadastradas</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead 
            className="cursor-pointer hover:bg-muted transition-colors"
            onClick={() => handleSort("fantasyName")}
          >
            <div className="flex items-center">
              Empresa {renderSortIcon("fantasyName")}
            </div>
          </TableHead>
          <TableHead>CNPJ</TableHead>
          <TableHead>Localização</TableHead>
          <TableHead 
            className="cursor-pointer hover:bg-muted transition-colors"
            onClick={() => handleSort("opportunity")}
          >
            <div className="flex items-center">
              Oportunidade {renderSortIcon("opportunity")}
            </div>
          </TableHead>
          <TableHead 
            className="cursor-pointer hover:bg-muted transition-colors"
            onClick={() => handleSort("segment")}
          >
            <div className="flex items-center">
              Segmento {renderSortIcon("segment")}
            </div>
          </TableHead>
          <TableHead>Origem</TableHead>
          <TableHead>Inserido por</TableHead>
          <TableHead>Data de Inserção</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {sortedCompanies.map((company) => (
          <TableRow 
            key={company.id}
            className={onRowClick ? "cursor-pointer hover:bg-muted" : ""}
            onClick={() => onRowClick && onRowClick(company)}
          >
            <TableCell className="font-medium">{company.fantasyName}</TableCell>
            <TableCell>{company.cnpj}</TableCell>
            <TableCell>{`${company.city}, ${company.state}`}</TableCell>
            <TableCell>{renderOpportunityBadge(company.opportunity)}</TableCell>
            <TableCell>{company.segment}</TableCell>
            <TableCell>{renderOriginBadge(company.creator?.origin)}</TableCell>
            <TableCell>{company.creator?.name || "-"}</TableCell>
            <TableCell>
              {company.creator?.createdAt 
                ? format(new Date(company.creator.createdAt), "dd/MM/yyyy") 
                : "-"
              }
            </TableCell>
          </TableRow>
        ))}
        {sortedCompanies.length === 0 && (
          <TableRow>
            <TableCell colSpan={8} className="text-center py-6">
              Nenhuma empresa encontrada
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default CompaniesTable;
