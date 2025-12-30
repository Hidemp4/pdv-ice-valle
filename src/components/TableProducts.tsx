import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useCart } from "@/hooks/useCart";

const TableProducts: React.FC = () => {
  const { cart } = useCart();

  return (
    <div className="p-4">
      <Table>
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
          {cart.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500">
                Carrinho vazio
              </TableCell>
            </TableRow>
          ) : (
            cart.map((item) => (
              <TableRow key={item.sku}>
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
                    <div className="font-medium">{item.name}</div>
                    <div className="text-sm text-gray-500">{item.sku}</div>
                    <div className="text-sm text-gray-500">{item.description}</div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-medium">{item.quantity}</span>
                </TableCell>
                <TableCell className="text-right">
                  R$ {item.price.toFixed(2)}
                </TableCell>
                <TableCell className="text-right font-medium">
                  R$ {item.subtotal.toFixed(2)}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableProducts;