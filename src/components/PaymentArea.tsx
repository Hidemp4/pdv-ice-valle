import { Separator } from "@/components/ui/separator"
import CardTotalAmount from "./CardTotalAmount";
import PaymentMethods from "./PaymentMethods";
import { Button } from "./ui/button";
import { useState } from "react";

interface PaymentAreaProps {
  total: number;
}

// Definindo um tipo Payment
export type Payment = {
  id: number;
  value: string;
  method: string;
};


const PaymentArea: React.FC<PaymentAreaProps> = ({ total }) => {

  // Estado para a lista de pagamentos confirmados
  const [paymentsList, setPaymentsList] = useState<Payment[]>([]);
  
  // Soma o total dos pagamentos confirmados
  const totalPayments = paymentsList.reduce((acc, p) => acc + parseFloat(p.value), 0);

  return (
    <>
      <CardTotalAmount total={total} totalPayments={totalPayments} />
      <PaymentMethods paymentsList={paymentsList} setPaymentsList={setPaymentsList} />
      <Separator />
      <div className="flex justify-end flex-col gap-4 p-4">
        <div className="flex justify-between gap-8">
          <Button className="flex-1 h-20 text-xl tracking-wide" variant="secondary" >Limpar</Button>
          <Button className="flex-1 h-20 text-xl tracking-wide" variant="secondary" >Suspender</Button>
        </div>
        <Button className="h-20 text-3xl tracking-wider" variant="default" >Finalizar Compra</Button>
      </div>
    </>
  );
};

export default PaymentArea;
