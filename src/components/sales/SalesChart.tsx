import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface ChartData {
  time: string;
  total: number;
}

interface SalesChartProps {
  data: ChartData[];
}

export const SalesChart: React.FC<SalesChartProps> = ({ data }) => {
  return (
    <div className="h-[300px] w-full mt-4">
      <h3 className="text-sm font-medium text-gray-500 mb-4 ml-2">
        Vendas por Horário
      </h3>
      {data.length === 0 ? (
        <div className="h-full flex items-center justify-center text-gray-400 bg-gray-50 rounded-lg">
          Sem dados suficientes para gerar gráfico
        </div>
      ) : (
        <ResponsiveContainer width="100%" height="90%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#ec4899" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#ec4899" stopOpacity={0} />
              </linearGradient>
            </defs>
            <XAxis 
              dataKey="time" 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#6b7280" }} 
            />
            <YAxis 
              axisLine={false} 
              tickLine={false} 
              tick={{ fontSize: 12, fill: "#6b7280" }}
              tickFormatter={(value) => `R$${value}`}
            />
            <CartesianGrid vertical={false} strokeDasharray="3 3" stroke="#e5e7eb" />
            <Tooltip
              contentStyle={{ 
                backgroundColor: "#fff", 
                borderRadius: "8px", 
                border: "1px solid #e2e8f0",
                boxShadow: "0 4px 6px -1px rgb(0 0 0 / 0.1)"
              }}
              formatter={(value) => value !== undefined ? [`R$ ${value}`, "Vendas"] : ["N/A", "Vendas"]}
            />
            <Area
              type="monotone"
              dataKey="total"
              stroke="#ec4899"
              fillOpacity={1}
              fill="url(#colorTotal)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      )}
    </div>
  );
};