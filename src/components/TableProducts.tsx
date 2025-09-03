import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
// import { CardItem } from "@/layouts/MainLayout";

type CardItem = {
  name_prod: string;
  quantity: number;
  unit_price: number;
  subtotal: number
}

interface TableProductsProps {
  products: CardItem[];
}

const TableProducts: React.FC<TableProductsProps> = ({ products }) => {
  return (
    <div className="p-4">
      <Table>
        <TableCaption></TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">Ação</TableHead>
            <TableHead>Nome do Produto</TableHead>
            <TableHead className="w-[80px] text-center">Qtd</TableHead>
            <TableHead className="w-[100px] text-right">Preço Unit.</TableHead>
            <TableHead className="w-[100px] text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {products.map((p) => (
            <TableRow>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 w-8 p-0 hover:bg-red-100"
                  title="Remover produto"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{p.name_prod}</div>
                </div>
              </TableCell>
              <TableCell className="text-center">
                <span className="font-medium">{p.quantity}</span>
              </TableCell>
              <TableCell className="text-right">R$ {p.unit_price}</TableCell>
              <TableCell className="text-right font-medium">R$ {p.subtotal}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableProducts;
