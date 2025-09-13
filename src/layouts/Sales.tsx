
import HeaderSales from "@/components/HeaderSales";
import TableSales from "@/components/TableSales";

// Tipos
type mockSale = {
  id: number;
  products: string[];
  date: string;
  total: string;
  paymentMethod: string;
};

const Sales: React.FC = () => {
  // Aqui você importaria ou passaria os dados reais das vendas
  // Por enquanto, usando dados mockados como exemplo
  const mockSalesData: mockSale[] = [
    {
      id: 1,
      products: ["Coca-Cola 2L", "Hamburguer Artesanal"],
      date: "07/08 21:56:04", // Data de hoje (exemplo)
      total: "R$25,50",
      paymentMethod: "Pix",
    },
    {
      id: 2,
      products: ["Pizza Margherita"],
      date: "07/09 15:30:22", // Data de hoje (exemplo)
      total: "R$35,00",
      paymentMethod: "Cartão",
    },
    {
      id: 3,
      products: ["Sanduíche Natural"],
      date: "13/09 12:15:10", // Ontem (exemplo)
      total: "R$10,00",
      paymentMethod: "Dinheiro",
    },
    {
      id: 4,
      products: ["Sanduíche Natural"],
      date: "13/08 12:15:10", // Ontem (exemplo)
      total: "R$100,00",
      paymentMethod: "Dinheiro",
    }
  ];

  return (
    <div className="layout-container p-4">
      <HeaderSales salesData={mockSalesData} />
      <h1 className="font-medium mt-4 mb-4">Lista de Vendas</h1>
      <TableSales sales={mockSalesData} />      
    </div>
  );
};

export default Sales;