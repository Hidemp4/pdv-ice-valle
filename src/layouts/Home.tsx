import React, { useEffect } from "react";
import Header from "@/components/Header";
import PaymentArea from "@/components/PaymentArea";
import TableProducts from "@/components/TableProducts";
import { useProducts } from "@/hooks/useProducts";

interface HomeProps {
  className?: string;
}

const Home: React.FC<HomeProps> = ({ className }) => {
  const {
    // Produtos
    products,
    loadProducts,

    // Carrinho
    cart,
    addProductToCart,
    total,
  } = useProducts();

  

  // CARREGAR PRODUTOS AO INICIAR
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  return (
    <div className={`layout-container flex overflow-hidden max-h-screen max-w-screen ${className ?? ""}`}>
      <div className="grid grid-cols-2 flex-1 overflow-hidden">
        <div>
          <Header />

          <main className="main-content p-4 overflow-hidden">
            {/* TableProducts mostra apenas os itens adicionados via Header */}
            <TableProducts products={cart} />
          </main>
        </div>
        <div className="overflow-hidden">
          <PaymentArea total={total} />
        </div>
      </div>
    </div>
  );
};

export default Home;