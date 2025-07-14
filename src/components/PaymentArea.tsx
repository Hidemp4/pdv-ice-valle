import { Separator } from "@/components/ui/separator"
import CardTotalAmount from "./CardTotalAmount";
import PaymentMethods from "./PaymentMethods";
import { Button } from "./ui/button";

interface PaymentAreaProps {
  totalVenda: number;
}

const PaymentArea: React.FC<PaymentAreaProps> = ({ totalVenda }) => {
  return (
    <>
      <CardTotalAmount subTotal={totalVenda} />
      <PaymentMethods />
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
