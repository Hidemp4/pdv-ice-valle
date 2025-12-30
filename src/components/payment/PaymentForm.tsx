import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PaymentMethod } from "@/types/product";

interface PaymentFormProps {
  amount: string;
  selectedMethod: PaymentMethod | "";
  error: string;
  onAmountChange: (val: string) => void;
  onMethodSelect: (method: PaymentMethod) => void;
  onConfirm: () => void;
}

export const PaymentForm: React.FC<PaymentFormProps> = ({
  amount,
  selectedMethod,
  error,
  onAmountChange,
  onMethodSelect,
  onConfirm,
}) => {
  const methods: PaymentMethod[] = ["Dinheiro", "Pix", "Débito", "Crédito"];

  return (
    <div className="flex flex-col gap-4 p-4">
      {/* Input de Valor */}
      <div className="flex flex-col gap-2">
        <label className="text-sm font-medium text-gray-700">Valor do Pagamento</label>
        <div className="flex gap-2">
          <Input
            className="flex-1 h-12 text-lg"
            type="number"
            step="0.01"
            placeholder="0,00"
            value={amount}
            onChange={(e) => onAmountChange(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && onConfirm()}
          />
          <Button 
            onClick={onConfirm} 
            className="w-32 h-12 tracking-wide font-bold !bg-brand-pink hover:!bg-brand-pink/90 !text-white !border-none shadow-lg transition-all"
            disabled={!amount || !selectedMethod}
          >
            Confirmar
          </Button>
        </div>
      </div>

      {/* Erro */}
      {error && <p className="text-red-500 text-sm font-medium">{error}</p>}

      {/* Seleção de Método */}
      <div className="grid grid-cols-2 gap-3">
        {methods.map((method) => (
          <Button
            key={method}
            variant={selectedMethod === method ? "default" : "outline"}
            className={`h-16 text-lg transition-all ${
              selectedMethod === method 
                ? "ring-2 ring-offset-2 ring-gray-900 font-bold" 
                : "hover:bg-gray-100 text-gray-600"
            }`}
            onClick={() => onMethodSelect(method)}
          >
            {method}
          </Button>
        ))}
      </div>
    </div>
  );
};