import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Home, ShoppingCart } from "lucide-react";
import { cn } from "@/lib/utils";

interface SideBarProps {
  className?: string;
}

const Sidebar: React.FC<SideBarProps> = ({ className }) => {
  const location = useLocation();

  // Função auxiliar para verificar se a rota está ativa
  const isActive = (path: string) => location.pathname === path;

  // Lista de links para facilitar a manutenção
  const menuItems = [
    { 
      path: "/", 
      icon: Home, 
      label: "Início" 
    },
    { 
      path: "/sales", 
      icon: ShoppingCart, 
      label: "Vendas" 
    },
  ];

  return (
    <aside className={cn("sidebar pt-4 pb-4 bg-white border-r border-gray-100 h-full flex flex-col", className)}>
      <nav className="flex flex-col items-center h-full w-full px-3 space-y-5">
        
        {/* Logo ou Brand Mark (Opcional - Pequeno detalhe rosa) */}
        <img src="/public/icon.ico" alt="Logo" className="w-10 h-13" />

        <ul className="flex flex-col gap-4 w-full">
          {menuItems.map((item) => {
            const active = isActive(item.path);
            const Icon = item.icon;

            return (
              <li key={item.path} className="w-full flex justify-center">
                <Link
                  to={item.path}
                  title={item.label}
                  className={cn(
                    "flex items-center justify-center w-12 h-12 rounded-xl transition-all duration-300 ease-in-out group relative",
                    active
                      ? "bg-brand-blue text-white shadow-lg shadow-brand-blue/30 scale-105" // Estado Ativo (Azul)
                      : "text-gray-400 hover:bg-brand-blue/10 hover:text-brand-blue hover:scale-105" // Estado Inativo
                  )}
                >
                  {/* Ícone */}
                  <Icon 
                    strokeWidth={active ? 2.5 : 2} // Ícone mais grosso se ativo
                    className={cn("w-6 h-6 transition-transform group-hover:rotate-3")} 
                  />

                  {/* Indicador lateral (bolinha rosa) apenas se ativo */}
                  {active && (
                    <span className="absolute -left-2 top-1/2 -translate-y-1/2 w-1 h-6 bg-brand-pink rounded-r-full" />
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;