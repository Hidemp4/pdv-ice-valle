import React from 'react';
import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar.tsx";
import PaymentArea from "@/components/PaymentArea";
import { Produto } from '@/types/produto';

interface MainLayoutProps {
  children: React.ReactNode;
  onAdicionarProduto: (produto: Produto, quantidade: number) => void;
  totalVenda: number;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children, onAdicionarProduto, totalVenda }) => {
  return (
    <div className="layout-container flex overflow-hidden max-h-screen max-w-screen">
      <Sidebar />
      <div className="grid grid-cols-2 flex-1 overflow-hidden">
        <div>
          <Header onAdicionarProduto={onAdicionarProduto} />
          <main className="main-content p-4 overflow-hidden">{children}</main>
        </div>
        <div className="overflow-hidden">
          <PaymentArea totalVenda={totalVenda} />
        </div>
      </div>
    </div>
  );
};

export default MainLayout;