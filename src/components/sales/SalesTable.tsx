import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Sale, CartItem, Payment } from "@/types/product";
import { SortConfig } from "@/hooks/useSales";
import { ChevronDown, ChevronUp, Search, ChevronLeft, ChevronRight, ArrowUpDown, Download, FileText, FileSpreadsheet } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { exportToCSV, exportToPDF } from "@/utils/export";

interface SalesTableProps {
  sales: Sale[];
  allFilteredSales: Sale[]; // Todas as vendas filtradas (para exportação)
  onViewDetails: (sale: Sale) => void;
  // Novas props para controle
  searchTerm: string;
  onSearchChange: (term: string) => void;
  sortConfig: SortConfig;
  onSortChange: (config: SortConfig) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;

}

export const SalesTable: React.FC<SalesTableProps> = ({
  sales,
  allFilteredSales,
  onViewDetails,
  searchTerm,
  onSearchChange,
  sortConfig,
  onSortChange,
  currentPage,
  totalPages,
  onPageChange
}) => {

  // Helpers de formatação
  const formatProductsSummary = (products: CartItem[]) => {
    const summary = products.map((p) => `${p.quantity}x ${p.name}`).join(", ");
    return summary.length > 50 ? summary.substring(0, 50) + "..." : summary;
  };

  const formatPaymentMethods = (payments: Payment[]) => {
    return payments.map((p) => p.method).join(", ");
  };

  // Helper de Ordenação
  const handleSort = (key: keyof Sale) => {
    let direction: "asc" | "desc" = "asc";
    if (sortConfig.key === key && sortConfig.direction === "asc") {
      direction = "desc";
    }
    onSortChange({ key, direction });
  };

  const SortIcon = ({ columnKey }: { columnKey: string }) => {
    if (sortConfig.key !== columnKey) return <ArrowUpDown className="ml-2 h-3 w-3 text-gray-300" />;
    return sortConfig.direction === "asc" ? (
      <ChevronUp className="ml-2 h-3 w-3" />
    ) : (
      <ChevronDown className="ml-2 h-3 w-3" />
    );
  };

  return (
    <div className="bg-white rounded-lg border shadow-sm flex flex-col">

      {/* Toolbar: Filtro */}
      <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
        <h2 className="font-medium text-lg">Histórico</h2>
        <div className="relative w-72">
          <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar por ID ou produto..."
            className="pl-8 bg-white"
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
          />
        </div>
      </div>

      <div className="p-4 border-b flex justify-between items-center bg-gray-50/50">
        <h2 className="font-medium text-lg">Histórico</h2>

        <div className="flex items-center gap-2">
          {/* Campo de Busca existente */}
          <div className="relative w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Buscar..."
              className="pl-8 bg-white"
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>

          {/* Botão de Exportar */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="gap-2 bg-white">
                <Download className="h-4 w-4" />
                Exportar
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Formatos</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem onClick={() => exportToPDF(allFilteredSales)}>
                <FileText className="mr-2 h-4 w-4 text-red-600" />
                <span>PDF (Extrato)</span>
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => exportToCSV(allFilteredSales)}>
                <FileSpreadsheet className="mr-2 h-4 w-4 text-green-600" />
                <span>CSV (Excel)</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead
                className="w-[150px] cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("id")}
              >
                <div className="flex items-center">Data/Hora <SortIcon columnKey="id" /></div>
              </TableHead>
              <TableHead>Produtos</TableHead>
              <TableHead className="w-[200px]">Pagamento</TableHead>
              <TableHead
                className="text-right w-[120px] cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("total")}
              >
                <div className="flex items-center justify-end">Total <SortIcon columnKey="total" /></div>
              </TableHead>
              <TableHead className="w-[100px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sales.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center text-gray-500 py-12">
                  {searchTerm ? "Nenhum resultado encontrado para a busca." : "Nenhuma venda registrada."}
                </TableCell>
              </TableRow>
            ) : (
              sales.map((sale) => (
                <TableRow key={sale.id} className="hover:bg-gray-50 group transition-colors">
                  <TableCell>
                    <div className="flex flex-col text-sm">
                      <span className="font-medium">{sale.date}</span>
                      <span className="text-gray-500 text-xs">{sale.time}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span className="text-sm text-gray-600">
                      {formatProductsSummary(sale.products)}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className="text-xs font-medium bg-gray-100 px-2 py-1 rounded text-gray-600">
                      {formatPaymentMethods(sale.payments)}
                    </span>
                  </TableCell>
                  <TableCell className="text-right font-semibold text-gray-900">
                    R$ {sale.total.toFixed(2)}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="opacity-0 group-hover:opacity-100 transition-opacity"
                      onClick={() => onViewDetails(sale)}
                    >
                      Detalhes
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Paginação */}
      <div className="p-4 border-t flex items-center justify-between bg-gray-50/50">
        <div className="text-sm text-gray-500">
          Página {currentPage} de {totalPages || 1}
        </div>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage >= totalPages}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};