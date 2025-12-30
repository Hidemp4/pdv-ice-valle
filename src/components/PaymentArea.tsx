import React from "react";
import type { CartItem } from "@/types/product";
import { usePayment } from "@/hooks/usePayment";
import { PaymentDisplay } from "@/components/payment/PaymentDisplay";
import { PaymentForm } from "@/components/payment/PaymentForm";
import { PaymentList } from "@/components/payment/PaymentList";
import { PaymentActions } from "@/components/payment/PaymentActions";
import { Button } from "@/components/ui/button";
import { AlertTriangle, CheckCircle2 } from "lucide-react";

interface PaymentAreaProps {
  total: number;
  cart: CartItem[];
  onClearCart: () => void;
}

// Componente visual simples para o Modal (evita duplicar código)
const ConfirmationModal = ({
  isOpen,
  title,
  description,
  confirmText = "Confirmar",
  cancelText = "Cancelar",
  variant = "default",
  onConfirm,
  onCancel,
}: {
  isOpen: boolean;
  title: string;
  description: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "destructive" | "success";
  onConfirm: () => void;
  onCancel: () => void;
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg p-6 max-w-md w-full shadow-2xl transform transition-all animate-in fade-in zoom-in-95 duration-200">
        <div className="flex flex-col items-center text-center mb-6">
          {variant === "destructive" && <AlertTriangle className="h-12 w-12 text-red-500 mb-4" />}
          {variant === "success" && <CheckCircle2 className="h-12 w-12 text-green-600 mb-4" />}
          
          <h2 className="text-xl font-bold text-gray-900">{title}</h2>
          <p className="text-gray-500 mt-2">{description}</p>
        </div>
        
        <div className="flex gap-3 w-full">
          <Button 
            variant="outline" 
            className="flex-1 h-12" 
            onClick={onCancel}
          >
            {cancelText}
          </Button>
          <Button 
            variant={variant === "success" ? "default" : "destructive"} 
            className={`flex-1 h-12 ${variant === "success" ? "bg-green-600 hover:bg-green-700" : ""}`}
            onClick={onConfirm}
          >
            {confirmText}
          </Button>
        </div>
      </div>
    </div>
  );
};

const PaymentArea: React.FC<PaymentAreaProps> = ({ total, cart, onClearCart }) => {
  const {
    paymentsList,
    amountInput,
    selectedMethod,
    error,
    totalPaid,
    remainingAmount,
    changeAmount,
    handleAmountChange,
    handleMethodSelect,
    addPayment,
    removePayment,
    // Novos controllers e estados
    requestClear,
    confirmClearAction,
    showClearModal,
    setShowClearModal,
    requestFinalize,
    confirmFinalizeAction,
    showFinalizeModal,
    setShowFinalizeModal
  } = usePayment({
    cart,
    cartTotal: total,
    onClearCart
  });

  return (
    <div className="flex flex-col h-full bg-white border-l shadow-sm relative">
      
      <PaymentDisplay 
        remaining={remainingAmount} 
        paid={totalPaid} 
      />

      <PaymentForm
        amount={amountInput}
        selectedMethod={selectedMethod}
        error={error}
        onAmountChange={handleAmountChange}
        onMethodSelect={handleMethodSelect}
        onConfirm={addPayment}
      />

      <PaymentList 
        payments={paymentsList} 
        onRemove={removePayment} 
      />

      <PaymentActions
        onRequestClear={requestClear}
        onRequestFinalize={requestFinalize}
        isValidToFinalize={remainingAmount === 0 && paymentsList.length > 0}
      />

      {/* --- Modais de Confirmação --- */}

      {/* 1. Modal de Limpar Tudo */}
      <ConfirmationModal
        isOpen={showClearModal}
        title="Limpar Venda?"
        description="Isso removerá todos os produtos do carrinho e os pagamentos lançados. Essa ação não pode ser desfeita."
        confirmText="Sim, Limpar Tudo"
        variant="destructive"
        onConfirm={confirmClearAction}
        onCancel={() => setShowClearModal(false)}
      />

      {/* 2. Modal de Finalizar Compra */}
      <ConfirmationModal
        isOpen={showFinalizeModal}
        title="Finalizar Venda"
        description={`Confirma o fechamento da venda no valor de R$ ${total.toFixed(2)}? ${changeAmount > 0 ? `Troco: R$ ${changeAmount.toFixed(2)}` : ''}`}
        confirmText="Confirmar Venda"
        variant="success"
        onConfirm={confirmFinalizeAction}
        onCancel={() => setShowFinalizeModal(false)}
      />
    </div>
  );
};

export default PaymentArea;