import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCart } from "@/hooks/useCart";

const Header: React.FC = () => {
  const { addProduct } = useCart();
  const [sku, setSku] = useState("");
  const [qtd, setQtd] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const cleanedSku = sku.trim().replace(/"/g, "");
    const success = await addProduct(cleanedSku, qtd);

    if (success) {
      setSku("");
      setQtd(1);
      console.log(success);
    }
  } catch (error) {
    console.error('Erro no Header:', error);
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

        <label htmlFor="qtd" className="text-sm font-medium">
          Qtd
        </label>
        <Input
          className="w-20 h-12"
          type="number"
          placeholder="1"
          id="qtd"
          min="1"
          max="999"
          value={qtd}
          onChange={(e) => setQtd(Number(e.target.value))}
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
