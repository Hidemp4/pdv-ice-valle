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
import { CartItem } from "@/types/product";

interface TableProductsProps {
  products: CartItem[];
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
            products.map((product, index) => (
              <TableRow key={`${product.sku}-${index}`}>
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
                    <div className="font-medium">{product.name}</div>
                    <div className="text-sm text-gray-500">SKU: {product.sku}</div>
                    {product.description && (
                      <div className="text-xs text-gray-400 mt-1">{product.description}</div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-medium">{product.quantity}</span>
                </TableCell>
                <TableCell className="text-right">
                  R$ {product.price.toFixed(2)} 
                </TableCell>
                <TableCell className="text-right font-medium">
                  R$ {product.subtotal.toFixed(2)}
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