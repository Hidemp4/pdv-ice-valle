import { useState, useEffect, useCallback, useMemo } from "react";
import { Sale, STORAGE_KEYS } from "@/types/product";

export type SortConfig = {
  key: keyof Sale | "product_count";
  direction: "asc" | "desc";
};

export const useSales = () => {
  const [sales, setSales] = useState<Sale[]>([]);
  const [loading, setLoading] = useState(true);
  
  // Estados de Filtro e Paginação
  const [searchTerm, setSearchTerm] = useState("");
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: "id", direction: "desc" });
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const loadSales = useCallback(() => {
    try {
      setLoading(true);
      const storedSales = localStorage.getItem(STORAGE_KEYS.SALES);
      
      if (storedSales) {
        const parsedSales: Sale[] = JSON.parse(storedSales);
        setSales(parsedSales);
      } else {
        setSales([]);
      }
    } catch (error) {
      console.error("Erro ao carregar vendas:", error);
      setSales([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadSales();
    const handleSalesUpdate = () => loadSales();
    window.addEventListener("salesUpdated", handleSalesUpdate);
    return () => window.removeEventListener("salesUpdated", handleSalesUpdate);
  }, [loadSales]);

  // --- Lógica de Filtragem e Ordenação ---
  const filteredAndSortedSales = useMemo(() => {
    let result = [...sales];

    // 1. Filtro (Busca por ID ou Nome de Produto)
    if (searchTerm) {
      const lowerTerm = searchTerm.toLowerCase();
      result = result.filter(
        (sale) =>
          sale.id.includes(lowerTerm) ||
          sale.products.some((p) => p.name.toLowerCase().includes(lowerTerm))
      );
    }

    // 2. Ordenação
    result.sort((a, b) => {
      let valA: any = a[sortConfig.key as keyof Sale];
      let valB: any = b[sortConfig.key as keyof Sale];

      // Tratamento especial para datas e totais
      if (sortConfig.key === "id") {
        // Assumindo que ID é timestamp string, comparamos como número
        valA = Number(a.id);
        valB = Number(b.id);
      }

      if (valA < valB) return sortConfig.direction === "asc" ? -1 : 1;
      if (valA > valB) return sortConfig.direction === "asc" ? 1 : -1;
      return 0;
    });

    return result;
  }, [sales, searchTerm, sortConfig]);

  // --- Paginação ---
  const totalPages = Math.ceil(filteredAndSortedSales.length / itemsPerPage);
  const paginatedSales = filteredAndSortedSales.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // --- Dados para o Gráfico (Vendas por Hora) ---
  const chartData = useMemo(() => {
    // Cria um mapa das últimas 24h ou agrupa por horário da venda
    const dataMap: Record<string, number> = {};
    
    // Inicializa horas vazias (opcional, para o gráfico ficar bonito)
    sales.forEach(sale => {
      // Pega apenas a hora (ex: "14:30" -> "14h")
      const hour = sale.time.split(':')[0] + 'h';
      dataMap[hour] = (dataMap[hour] || 0) + sale.total;
    });

    // Converte para array e ordena por hora
    return Object.entries(dataMap)
      .map(([time, total]) => ({ time, total }))
      .sort((a, b) => parseInt(a.time) - parseInt(b.time));
  }, [sales]);

  // --- Resumo ---
  const totalSales = sales.reduce((acc, sale) => acc + sale.total, 0);
  const totalTransactions = sales.length;
  const averageTicket = totalTransactions > 0 ? totalSales / totalTransactions : 0;

  return {
    sales: paginatedSales, // Retorna apenas a página atual
    filteredSales: filteredAndSortedSales,
    allSalesCount: filteredAndSortedSales.length,
    loading,
    summary: { totalSales, totalTransactions, averageTicket },
    chartData,
    
    // Controles de Tabela
    searchTerm,
    setSearchTerm,
    sortConfig,
    setSortConfig,
    currentPage,
    setCurrentPage,
    totalPages,
    refreshSales: loadSales
  };
};