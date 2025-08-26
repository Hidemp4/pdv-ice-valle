import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Payment } from "./PaymentArea";

interface PaymentMethodsProps {
  paymentsList: Payment[];
  setPaymentsList: React.Dispatch<React.SetStateAction<Payment[]>>;
}

const PaymentMethods: React.FC<PaymentMethodsProps> = ({ paymentsList, setPaymentsList }) => {
  const [payment, setPayment] = useState<{ value: string; method: string }>({
    value: "",
    method: "",
  });

  // Estado para controlar mensagens de erro
  const [error, setError] = useState<string>("");

  // Estado para controlar o modal de confirmação
  const [showCancelModal, setShowCancelModal] = useState<boolean>(false);
  const [paymentToCancel, setPaymentToCancel] = useState<number | null>(null);

  // Função para lidar com a mudança de valor
  const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPayment({
      ...payment,
      value: e.target.value,
    });
    // Limpar erro quando o usuário começar a digitar
    if (error) setError("");
  };

  // Função para lidar com a seleção do método de pagamento
  const handlePaymentMethodChange = (method: string) => {
    setPayment({
      ...payment,
      method,
    });
    // Limpar erro quando o usuário selecionar um método
    if (error) setError("");
  };

  // Função para adicionar o pagamento
  const handleAddPayment = () => {
    if (!payment.value || !payment.method) return;

    const newPayment: Payment = {
      id: paymentsList.length + 1,
      value: payment.value,
      method: payment.method,
    };

    setPaymentsList((prev) => [...prev, newPayment]);
    setPayment({ value: "", method: "" }); // limpa o form
  };

  // Função para remover um pagamento da lista
  const removePayment = (id: number) => {
    setPaymentsList(paymentsList.filter((p) => p.id !== id));
  };

  // Função para abrir o modal de confirmação
  const handleCancelClick = (id: number) => {
    setPaymentToCancel(id);
    setShowCancelModal(true);
  };

  // Função para confirmar o cancelamento
  const confirmCancel = () => {
    if (paymentToCancel !== null) {
      removePayment(paymentToCancel);
    }
    setShowCancelModal(false);
    setPaymentToCancel(null);
  };

  // Função para cancelar o modal
  const cancelModal = () => {
    setShowCancelModal(false);
    setPaymentToCancel(null);
  };

  return (
    <div className="flex flex-col justify-between h-140 w-full pl-4">
      <div>
        <div className="payment-inputs flex items-center p-4 gap-4">
          <p className="tracking-wide">Valor do Pagamento: R$</p>
          <div className="flex flex-1 justify-between items-center gap-4 w-full">
            <Input
              className="w-full"
              type="number"
              value={payment.value}
              onChange={handleValueChange}
              placeholder="0,00"
            />
            <Button onClick={handleAddPayment}>Confirmar</Button>
          </div>
        </div>

        {/* Exibir erro se houver */}
        {error && (
          <div className="px-4 pb-2">
            <p className="text-red-500 text-sm">{error}</p>
          </div>
        )}

        {/* Mostrar método selecionado */}
        {payment.method && (
          <div className="px-4 pb-2">
            <p className="text-sm text-gray-600">
              Método selecionado: {payment.method}
            </p>
          </div>
        )}

        <div className="payment-result flex p-4 gap-4 flex-1 overflow-hidden">
          <div className="w-full overflow-y-auto max-h-60">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[100px]">Ação</TableHead>
                  <TableHead>Método de Pagamento</TableHead>
                  <TableHead className="text-right">Valor</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paymentsList.map((p) => (
                  <TableRow key={p.id}>
                    <TableCell className="font-medium">
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => handleCancelClick(p.id)}
                      >
                        X
                      </Button>
                    </TableCell>
                    <TableCell>{p.method}</TableCell>
                    <TableCell className="text-right">
                      R$ {p.value}
                    </TableCell>
                  </TableRow>
                ))}

                {paymentsList.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={3}
                      className="text-center text-gray-500 py-4"
                    >
                      Nenhum pagamento confirmado ainda
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      <div className="payments-methods grid grid-cols-2 gap-4 p-4">
        <Button
          className={`w-full h-20 text-2xl ${
            payment.method === "Dinheiro" ? "ring-2 ring-blue-500" : ""
          }`}
          variant="payment"
          onClick={() => handlePaymentMethodChange("Dinheiro")}
        >
          Dinheiro
        </Button>
        <Button
          className={`w-full h-20 text-2xl ${
            payment.method === "Pix" ? "ring-2 ring-blue-500" : ""
          }`}
          variant="payment"
          onClick={() => handlePaymentMethodChange("Pix")}
        >
          Pix
        </Button>
        <Button
          className={`w-full h-20 text-2xl ${
            payment.method === "Débito" ? "ring-2 ring-blue-500" : ""
          }`}
          variant="payment"
          onClick={() => handlePaymentMethodChange("Débito")}
        >
          Débito
        </Button>
        <Button
          className={`w-full h-20 text-2xl ${
            payment.method === "Crédito" ? "ring-2 ring-blue-500" : ""
          }`}
          variant="payment"
          onClick={() => handlePaymentMethodChange("Crédito")}
        >
          Crédito
        </Button>
      </div>

      {/* Modal de Confirmação */}
      {showCancelModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <h2 className="text-xl font-semibold mb-4">
              Confirmar Cancelamento
            </h2>
            <p className="text-gray-600 mb-6">
              Tem certeza que deseja cancelar este pagamento? Esta ação não pode
              ser desfeita.
            </p>
            <div className="flex justify-end gap-3">
              <Button variant="outline" onClick={cancelModal}>
                Não, manter
              </Button>
              <Button variant="destructive" onClick={confirmCancel}>
                Sim, cancelar
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentMethods;
