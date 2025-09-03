import CardValueSales from "@/components/ui/cardValueSales";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Drawer, DrawerClose, DrawerContent, DrawerDescription, DrawerFooter, DrawerHeader, DrawerTitle, DrawerTrigger } from "@/components/ui/drawer";
import { Button } from "@/components/ui/button";

const Sales: React.FC = () => {
  return (
    <div className="layout-container p-4">
      <h1 className="font-bold text-3xl mt-4 mb-4">Vendas</h1>
      <CardValueSales />

      <Table>
        <TableCaption>Lista de vendas.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">ID</TableHead>
            <TableHead>Produtos</TableHead>
            <TableHead>Data da venda</TableHead>
            <TableHead className="text-right">Total Pago</TableHead>
            <TableHead className="text-right">Método de Pagamento</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Drawer>
            <DrawerTrigger>
              <TableRow>
                <TableCell className="font-medium">25</TableCell>
                <TableCell>Coca-Cola 2L</TableCell>
                <TableCell>02/09 21:56:04</TableCell>
                <TableCell className="text-right">R$12,00</TableCell>
                <TableCell className="text-right">Pix</TableCell>
              </TableRow>
            </DrawerTrigger>

            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Are you absolutely sure?</DrawerTitle>
                <DrawerDescription>
                  This action cannot be undone.
                </DrawerDescription>
              </DrawerHeader>
              <DrawerFooter>
                <Button>Submit</Button>
                <DrawerClose>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </TableBody>
      </Table>
    </div>
  );
};

export default Sales;
