import React, { useState } from "react";
import { useSales } from "@/hooks/useSales";
import { SalesHeader } from "@/components/sales/SalesHeader";
import { SalesSummary } from "@/components/sales/SalesSummary";
import { SalesTable } from "@/components/sales/SalesTable";
import { SaleDetailsDrawer } from "@/components/sales/SaleDetailsDrawer";
import { Sale } from "@/types/product";

const Sales: React.FC = () => {
  const [selectedSale, setSelectedSale] = useState<Sale | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const { 
    sales,
    filteredSales,
    summary, 
    chartData,
    searchTerm, 
    setSearchTerm,
    sortConfig,
    setSortConfig,
    currentPage,
    totalPages,
    setCurrentPage
  } = useSales();

  const handleOpenDrawer = (sale: Sale) => {
    setSelectedSale(sale);
    setIsDrawerOpen(true);
  };

  const handleCloseDrawer = () => {
    setIsDrawerOpen(false);
    setTimeout(() => setSelectedSale(null), 300);
  };

  return (
    // 1. h-screen, w-screen e overflow-hidden removem o scroll da página inteira
    // 2. flex-col organiza os itens um abaixo do outro
    <div className="h-screen max-w flex flex-col bg-gray-50/30 p-4 gap-4 overflow-hidden">
      
      {/* Header: shrink-0 impede que ele seja esmagado */}
      <div className="shrink-0">
        <SalesHeader />
      </div>
      
      {/* Resumo/Gráficos: shrink-0 impede que ele seja esmagado */}
      <div className="shrink-0">
        <SalesSummary 
          data={summary} 
          chartData={chartData} 
        />
      </div>
      
      {/* Tabela: flex-1 faz ela ocupar TODO o espaço que sobrou na tela. 
          min-h-0 é crucial para o scroll interno funcionar em flex items aninhados */}
      <div className="flex-1 min-h-0 flex flex-col">
        <SalesTable
          sales={sales} 
          allFilteredSales={filteredSales}
          onViewDetails={handleOpenDrawer}
          searchTerm={searchTerm}
          onSearchChange={(term) => {
            setSearchTerm(term);
            setCurrentPage(1); 
          }}
          sortConfig={sortConfig}
          onSortChange={setSortConfig}
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={setCurrentPage}
          // Passamos uma classe extra para garantir que o componente da tabela cresça
          className="h-full" 
        />
      </div>

      <SaleDetailsDrawer
        sale={selectedSale}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};

export default Sales;