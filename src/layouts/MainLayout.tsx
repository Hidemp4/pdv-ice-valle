import React from "react";
import Sidebar from "@/components/Sidebar"; // Ajuste o caminho se necessário

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen w-screen overflow-hidden bg-gray-50">

      <Sidebar className="shrink-0 z-20" />

      <main className="flex-1 flex flex-col min-w-0 overflow-hidden relative z-10">
        {children}
      </main>
      
    </div>
  );
};

export default MainLayout;