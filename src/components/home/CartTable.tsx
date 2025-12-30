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
import { useToast } from "@/hooks/use-toast";
import type { CartItem } from "@/types/product";

interface CartTableProps {
  cart: CartItem[];
  onRemoveItem: (sku: string) => void;
}

export const CartTable: React.FC<CartTableProps> = ({ cart, onRemoveItem }) => {
  const { toast } = useToast();

  // Função auxiliar para remover e mostrar o aviso
  const handleRemoveClick = (sku: string, name: string) => {
    onRemoveItem(sku);
    
    toast({
      title: "Produto removido",
      description: `${name} foi removido do carrinho.`,
      // duration: 3000, <--- LINHA REMOVIDA PARA CORRIGIR O ERRO
    });
  };

  return (
    <div className="p-4 bg-white rounded-b-md shadow-sm border h-full overflow-hidden flex flex-col">
      <div className="overflow-auto flex-1">
        <Table>
          <TableHeader className="sticky top-0 bg-white z-10">
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
                <TableCell colSpan={5} className="text-center text-gray-500 py-12">
                  <div className="flex flex-col items-center gap-2">
                    <span className="text-lg font-medium">Carrinho vazio</span>
                    <span className="text-sm">Bipe um produto ou digite o código acima</span>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              cart.map((item: CartItem) => (
                <TableRow key={item.sku} className="hover:bg-gray-50">
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-brand-pink hover:bg-brand-pink/10 hover:text-brand-pink transition-colors"
                      title="Remover produto"
                      onClick={() => handleRemoveClick(item.sku, item.name)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium text-gray-900">{item.name}</div>
                      <div className="text-xs text-gray-500 font-mono">{item.sku}</div>
                      {item.description && (
                        <div className="text-xs text-gray-400 truncate max-w-[200px]">
                          {item.description}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <span className="font-medium bg-gray-100 px-2 py-1 rounded">
                      {item.quantity}
                    </span>
                  </TableCell>
                  <TableCell className="text-right text-gray-600">
                    R$ {item.price.toFixed(2)}
                  </TableCell>
                  <TableCell className="text-right font-bold text-gray-900">
                    R$ {item.subtotal.toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};