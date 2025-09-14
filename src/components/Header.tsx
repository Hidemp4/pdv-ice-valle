import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

interface HeaderProps {
  onAddProduct: (sku: string, qtd: number) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddProduct }) => {

  const [sku, setSku] = useState("");
  const [qtdProduct, setQtdProduct] = useState(1);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (sku.trim()) {
      onAddProduct(sku, qtdProduct);
      setSku("");
      setQtdProduct(1);
    }
  };

  return (
    <header className="header bg-gray-800 text-white mt-4 p-4 h-26">
      <form onSubmit={handleSubmit} className="flex items-center h-full gap-2">
        <label htmlFor="codeNumber" className="text-sm font-medium">
          Código
        </label>
        <Input
          className="w-full h-12"
          type="text"
          placeholder="Digite o SKU do produto"
          id="codeNumber"
          value={sku}
          onChange={(e) => setSku(e.target.value)}
        />

        <label htmlFor="qtdProduct" className="text-sm font-medium">
          Qtd
        </label>
        <Input
          className="w-20 h-12"
          type="number"
          placeholder="1"
          id="qtdProduct"
          min="1"
          max="999"
          value={qtdProduct}
          onChange={(e) => setQtdProduct(Number(e.target.value))}
        />

        <Button
          className="w-32 h-12 tracking-wide"
          type="submit"
          variant="outline"
        >
          Adicionar
        </Button>
      </form>
    </header>
  );
};

export default Header;
