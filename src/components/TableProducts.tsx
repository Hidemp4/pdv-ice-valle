import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";


const TableProducts: React.FC = () => {
  return (
    <Table>
      <TableCaption>Lista de Produtos.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Ação</TableHead>
          <TableHead className="w-[100px]">ID</TableHead>
          <TableHead>Nome do Produto</TableHead>
          <TableHead>Qtd</TableHead>
          <TableHead className="text-right">Preço</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">x</TableCell>
          <TableCell className="font-medium">481</TableCell>
          <TableCell>Sorvere KiBom Baunilha 2L</TableCell>
          <TableCell>1</TableCell>
          <TableCell className="text-right">R$48,00</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default TableProducts;
