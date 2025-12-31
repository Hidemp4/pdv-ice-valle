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
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4 mb-2">
      <div className="xl:col-span-1 grid grid-cols-1 md:grid-cols-3 xl:grid-cols-1 gap-4">
        
        {/* Card 1 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center justify-between min-w-0">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-500 truncate">Total Vendas</p>
            <p className="text-2xl font-bold text-gray-900 mt-1 truncate">
              R$ {data.totalSales.toFixed(2)}
            </p>
          </div>

          <div className="h-12 w-12 bg-green-50 rounded-full flex items-center justify-center shrink-0 ml-2">
            <DollarSign className="h-6 w-6 text-green-600" />
          </div>
        </div>

        {/* Card 2 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center justify-between min-w-0">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-500 truncate">Transações</p>
            <p className="text-2xl font-bold text-gray-900 mt-1 truncate">
              {data.totalTransactions}
            </p>
          </div>
          <div className="h-12 w-12 bg-blue-50 rounded-full flex items-center justify-center shrink-0 ml-2">
            <Users className="h-6 w-6 text-blue-600" />
          </div>
        </div>

        {/* Card 3 */}
        <div className="bg-white border rounded-xl p-6 shadow-sm flex items-center justify-between min-w-0">
          <div className="min-w-0">
            <p className="text-sm font-medium text-gray-500 truncate">Ticket Médio</p>
            <p className="text-2xl font-bold text-gray-900 mt-1 truncate">
              R$ {data.averageTicket.toFixed(2)}
            </p>
          </div>
          <div className="h-12 w-12 bg-purple-50 rounded-full flex items-center justify-center shrink-0 ml-2">
            <TrendingUp className="h-6 w-6 text-purple-600" />
          </div>
        </div>

      </div>

      {/* Coluna da Direita: Gráfico */}
      <div className="xl:col-span-2 bg-white border rounded-xl p-4 shadow-sm min-w-0">
        <SalesChart data={chartData} />
      </div>

    </div>
  );
};