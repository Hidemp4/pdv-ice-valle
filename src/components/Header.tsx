import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useCart } from "@/hooks/useCart";


const Header: React.FC = () => {

  // const { addProductToCart } = useProducts();
  const { addProduct } = useCart();
  const [sku, setSku] = useState("");
  const [qtd, setQtd] = useState(1);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

  try {
    const success = await addProduct(sku, qtd);

    if (success) {
      setSku("");
      setQtd(1);
      // TODO: Mostrar mensagem de sucesso ao usuário
      console.log(success);
    }
  } catch (error) {
    const errorMessage = error instanceof Error 
      ? error.message 
      : 'Erro ao adicionar ao carrinho';
    
    console.error('Erro no Header:', errorMessage);
    // TODO: Mostrar erro ao usuário (toast, alert, etc)
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
