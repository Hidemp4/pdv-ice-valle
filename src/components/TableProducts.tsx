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

const TableProducts: React.FC = () => {
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
                    <div className="font-medium">NOME</div>
                    <div className="text-sm text-gray-500">SKU</div>
                      <div className="text-xs text-gray-400 mt-1">DESCRICAO</div>
                  </div>
                </TableCell>
                <TableCell className="text-center">
                  <span className="font-medium">QUANTIDADE</span>
                </TableCell>
                <TableCell className="text-right">
                  R$ PRECO
                </TableCell>
                <TableCell className="text-right font-medium">
                  R$ SUBTOTAL
                </TableCell>
              </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default TableProducts;