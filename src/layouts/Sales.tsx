
import HeaderSales from "@/components/HeaderSales";
import TableSales from "@/components/TableSales";

const Sales: React.FC = () => {
  return (
    <div className="layout-container p-4">
      <HeaderSales />
      <h1 className="font-medium mt-4 mb-4">Lista de Vendas</h1>
      <TableSales />      
    </div>
  );
};

export default Sales;