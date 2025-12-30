import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface ProductFormProps {
  onAddProduct: (sku: string, quantity: number) => Promise<void>;
  isLoading?: boolean;
}

export const ProductForm: React.FC<ProductFormProps> = ({ onAddProduct, isLoading = false }) => {
  const [sku, setSku] = useState<string>("");
  const [qtd, setQtd] = useState<number>(1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!sku) return;

    try {
      const cleanedSku = sku.trim().replace(/"/g, "");
      await onAddProduct(cleanedSku, qtd);

      // Limpa o formulário após sucesso
      setSku("");
      setQtd(1);
      
      // Foca novamente no input de código
      const skuInput = document.getElementById("codeNumber");
      if (skuInput) skuInput.focus();
      
    } catch (error) {
      console.error('Erro ao inserir produto:', error);
    }
  };

  return (
    <header className="header bg-brand-blue text-white mt-4 p-4 h-26 rounded-t-md shadow-md">
      <form onSubmit={handleSubmit} className="flex items-center h-full gap-3">
        <div className="flex-1">
          <label htmlFor="codeNumber" className="text-sm font-semibold block mb-1">
            Código
          </label>
          <Input
            className="w-full h-12 bg-white/10 border-white/20 !text-white placeholder:text-white/70 focus-visible:ring-brand-pink focus-visible:border-brand-pink"
            type="text"
            placeholder="Digite o SKU do produto"
            id="codeNumber"
            autoComplete="off"
            value={sku}
            onChange={(e) => setSku(e.target.value)}
            autoFocus
          />
        </div>

        <div>
          <label htmlFor="qtd" className="text-sm font-semibold block mb-1">
            Qtd
          </label>
          <Input
            className="w-24 h-12 bg-white/10 border-white/20 !text-white placeholder:text-white/70 focus-visible:ring-brand-pink focus-visible:border-brand-pink text-center"
            type="number"
            placeholder="1"
            id="qtd"
            min="1"
            max="999"
            value={qtd}
            onChange={(e) => setQtd(Number(e.target.value))}
          />
        </div>

        <div className="flex flex-col justify-end h-full pt-6">
           <Button
            className="w-32 h-12 tracking-wide font-bold !bg-brand-pink hover:!bg-brand-pink/90 !text-white !border-none shadow-lg transition-all"
            type="submit"
            disabled={isLoading}
          >
            Adicionar
          </Button>
        </div>
      </form>
    </header>
  );
};