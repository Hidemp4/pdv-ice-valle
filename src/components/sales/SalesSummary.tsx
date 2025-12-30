import React from "react";
import { SalesSummaryData } from "@/types/product";
import { SalesChart } from "./SalesChart";
import { TrendingUp, Users, DollarSign } from "lucide-react";

interface SalesSummaryProps {
  data: SalesSummaryData;
  chartData: { time: string; total: number }[];
}

export const SalesSummary: React.FC<SalesSummaryProps> = ({ data, chartData }) => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
      
      {/* Coluna da Esquerda: Cards de Métricas */}
      <div className="lg:col-span-1 flex flex-col gap-4">
        
        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Total de Vendas</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              R$ {data.totalSales.toFixed(2)}
            </p>
          </div>
          <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Transações</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              {data.totalTransactions}
            </p>
          </div>
          <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-gray-500">Ticket Médio</p>
            <p className="text-3xl font-bold text-gray-900 mt-2">
              R$ {data.averageTicket.toFixed(2)}
            </p>
          </div>
          <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
        </div>

      </div>

      {/* Coluna da Direita: Gráfico (Ocupa 2 espaços) */}
      <div className="lg:col-span-2 bg-white border rounded-xl p-6 shadow-sm">
        <SalesChart data={chartData} />
      </div>

    </div>
  );
};