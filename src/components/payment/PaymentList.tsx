import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Payment } from "@/types/product";
import { Trash2 } from "lucide-react";

interface PaymentListProps {
  payments: Payment[];
  onRemove: (id: number) => void;
}

export const PaymentList: React.FC<PaymentListProps> = ({ payments, onRemove }) => {
  // Estado local para o modal de confirmação
  const [deleteId, setDeleteId] = useState<number | null>(null);

  const confirmDelete = () => {
    if (deleteId) onRemove(deleteId);
    setDeleteId(null);
  };

  return (
    <div className="flex-1 px-4 overflow-hidden flex flex-col">
      <h3 className="font-medium text-sm text-gray-500 mb-2">Pagamentos Lançados</h3>

      <div className="border rounded-md overflow-hidden flex-1 overflow-y-auto bg-white">
        <Table>
          <TableHeader className="bg-gray-50 sticky top-0">
            <TableRow>
              <TableHead className="w-[80px]">Ação</TableHead>
              <TableHead>Método</TableHead>
              <TableHead className="text-right">Valor</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {payments.length === 0 ? (
              <TableRow>
                <TableCell colSpan={3} className="text-center text-gray-400 py-8">
                  Nenhum pagamento registrado
                </TableCell>
              </TableRow>
            ) : (
              payments.map((p) => (
                <TableRow key={p.id}>
                  <TableCell>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 w-8 p-0 text-red-500 hover:text-red-700 hover:bg-red-50"
                      onClick={() => setDeleteId(p.id)}
                    >
                      <Trash2 className="h-8 w-8 p-0 text-brand-pink hover:bg-brand-pink/10 hover:text-brand-pink transition-colors" />
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium">{p.method}</TableCell>
                  <TableCell className="text-right">
                    R$ {parseFloat(p.value).toFixed(2)}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Modal Simples de Confirmação (Inline para simplicidade) */}
      {deleteId && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-sm w-full shadow-lg">
            <h3 className="font-bold text-lg mb-2">Remover pagamento?</h3>
            <p className="text-gray-600 mb-6 text-sm">Essa ação não pode ser desfeita.</p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={() => setDeleteId(null)}>Cancelar</Button>
              <Button variant="destructive" onClick={confirmDelete}>Remover</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};