import React, { useState } from "react";
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar.tsx";
import PaymentArea from "@/components/PaymentArea";
import TableProducts from "@/components/TableProducts";
import { fakeProducts, Product } from "@/data/products";

export interface CardItem extends Product {
  quantity: number;
  subtotal: number;
}

const MainLayout: React.FC = () => {
  // Adiciona produtos na lista de compras
  const [cart, setCart] = useState<CardItem[]>([]);

  const handleAddProduct = (sku: string, qtd: number) => {
    const found = fakeProducts.find((p) => p.sku === sku);

    if (found) {
      const newItem: CardItem = {
        ...found,
        quantity: qtd,
        subtotal: found.unit_price * qtd,
      };

      setCart((prev) => [...prev, newItem]);
    } else {
      alert("Produto não encontrado");
    }
  };

  return (
    <div className="layout-container flex overflow-hidden max-h-screen max-w-screen">
      <Sidebar />
      <div className="grid grid-cols-2 flex-1 overflow-hidden">
        <div>
          <Header onAddProduct={handleAddProduct} />
          <main className="main-content p-4 overflow-hidden">
            <TableProducts products={cart} />
          </main>
        </div>
        <div className="overflow-hidden">
          <PaymentArea />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;
