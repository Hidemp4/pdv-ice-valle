import React from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface PaymentActionsProps {
  onRequestClear: () => void;
  onRequestFinalize: () => void;
  isValidToFinalize: boolean;
}

export const PaymentActions: React.FC<PaymentActionsProps> = ({
  onRequestClear,
  onRequestFinalize,
  isValidToFinalize
}) => {
  return (
    <div className="mt-auto">
      <Separator />
      <div className="flex flex-col gap-4 p-4 bg-gray-50">
        <div className="flex gap-4">
          <Button
            className="flex-1 h-14 text-lg font-normal tracking-wide bg-white text-gray-700 border hover:bg-gray-100"
            variant="outline"
            onClick={onRequestClear}
          >
            Limpar
          </Button>
          <Button
            className="flex-1 h-14 text-lg font-normal tracking-wide bg-white text-gray-700 border hover:bg-gray-100"
            variant="outline"
          >
            Suspender
          </Button>
        </div>
        <Button
          className={`h-16 text-2xl font-bold tracking-wider shadow-md transition-all ${isValidToFinalize
              ? 'bg-brand-blue hover:bg-brand-blue/90 text-white' // Azul da marca
              : 'bg-gray-200 text-gray-400'
            }`}
          onClick={onRequestFinalize}
        >
          Finalizar Compra
        </Button>
      </div>
    </div>
  );
};