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

  // Hook agora retorna muito mais coisas
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
    <div className="layout-container p-4 max-w-7xl mx-auto min-h-screen bg-gray-50/30">
      <SalesHeader />
      
      {/* Passamos chartData para o novo layout do resumo */}
      <SalesSummary 
        data={summary} 
        chartData={chartData} 
      />
      
      {/* Tabela com controles conectados ao Hook */}
      <SalesTable
        sales={sales} 
        allFilteredSales={filteredSales}
        onViewDetails={handleOpenDrawer}
        searchTerm={searchTerm}
        onSearchChange={(term) => {
          setSearchTerm(term);
          setCurrentPage(1); // Resetar para página 1 ao filtrar
        }}
        sortConfig={sortConfig}
        onSortChange={setSortConfig}
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />

      <SaleDetailsDrawer
        sale={selectedSale}
        isOpen={isDrawerOpen}
        onClose={handleCloseDrawer}
      />
    </div>
  );
};

export default Sales;