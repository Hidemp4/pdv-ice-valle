import React from "react";

interface PaymentDisplayProps {
  remaining: number;
  paid: number;
}

export const PaymentDisplay: React.FC<PaymentDisplayProps> = ({ remaining, paid }) => {
  return (
    <div className="payment-area flex flex-col pt-4 px-4">
      <div className="total-amount relative flex flex-col justify-center items-center gap-1 w-full py-8 bg-brand-blue text-white rounded-xl shadow-lg border border-white/10 overflow-hidden">

        <div className="absolute top-0 right-0 -mt-4 -mr-4 w-24 h-24 bg-white/10 rounded-full blur-2xl"></div>
        <div className="absolute bottom-0 left-0 -mb-4 -ml-4 w-24 h-24 bg-brand-pink/20 rounded-full blur-2xl"></div>

        <h2 className="relative z-10 flex flex-col items-center">
          <span className="text-xs font-semibold text-white/90 uppercase tracking-[0.2em] mb-2">
            Restante a Pagar
          </span>

          <div className="flex items-baseline text-white">
            <span className="text-3xl mr-2 font-medium opacity-80">R$</span>
            <span className="text-7xl font-bold tracking-tighter tabular-nums drop-shadow-sm">
              {remaining.toFixed(2)}
            </span>
          </div>
        </h2>

        <div className="w-2/3 h-px bg-gradient-to-r from-transparent via-white/30 to-transparent my-4"></div>

        <div className="relative z-10 flex items-center gap-2 bg-black/10 px-4 py-1.5 rounded-full border border-white/10">
          <span className="text-sm font-medium text-white/80">Total Pago:</span>
          <span className="text-lg font-bold text-white tabular-nums">
            R$ {paid.toFixed(2)}
          </span>
        </div>

      </div>
    </div>
  );
};