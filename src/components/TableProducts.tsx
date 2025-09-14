
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

interface CardItem {
  id: number;
  name_prod: string;
  unit_price: number;
  sku: string;
  quantity: number;
  subtotal: number;
}

interface TableProductsProps {
  products: CardItem[];
  onRemoveProduct?: (index: number) => void;
}

const TableProducts: React.FC<TableProductsProps> = ({ products, onRemoveProduct }) => {
  return (
    <div className="p-4">
      <Table>
        <TableCaption>
          {products.length === 0 
            ? "Nenhum produto adicionado" 
            : `${products.length} produto${products.length > 1 ? 's' : ''} no carrinho`
          }
        </TableCaption>
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
          {products.length === 0 ? (
            <TableRow>
              <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                Digite um SKU no campo acima para adicionar produtos
              </TableCell>
            </TableRow>
          ) : (
            products.map((p, index) => (
              <TableRow key={`${p.sku}-${index}`}>
                <TableCell>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0 hover:bg-red-100"
                    title="Remover produto"
                    onClick={() => onRemoveProduct?.(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                </TableCell>
                <TableCell>
                  <div>
                    <div className="font-medium">{p.name_prod}</div>
                    <div className="text-sm text-gray-500">SKU: {p.sku}</div> 
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-medium">{p.quantity}</span>
                </TableCell>
                <TableCell className="text-right">
                  R$ {p.unit_price.toFixed(2)} 
                </TableCell>
                <TableCell className="text-right font-medium">
                  R$ {p.subtotal.toFixed(2)}
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