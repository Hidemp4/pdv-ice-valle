
interface CardTotalAmountProps {
  total: number;
  totalPayments: number;
}

const CardTotalAmount: React.FC<CardTotalAmountProps> = ({ total, totalPayments }) => {

  const pendentPayment = total - totalPayments;

  return (
    <>
      <div className="payment-area flex flex-col pl-4 pr-4 pt-4">
        <div className="total-amount flex flex-col justify-center items-center gap-2 w-full h-34 text-xl font-bold bg-gray-800 text-white">
          <h2>
            R$<span className="text-6xl tracking-wide">{pendentPayment.toFixed(2)}</span>
          </h2>
          <p className="tracking-wider">
            Pago: R$<span>{totalPayments.toFixed(2)}</span>
          </p>
        </div>
      </div>
    </>
  );
};

export default CardTotalAmount;
