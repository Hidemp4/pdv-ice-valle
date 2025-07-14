import React, { useState, useRef } from 'react';
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { useDatabase } from '@/hooks/useDatabase';
import { Produto } from '@/types/produto';
import { useToast } from '@/hooks/use-toast';

interface HeaderProps {
  onAdicionarProduto: (produto: Produto, quantidade: number) => void;
}

const Header: React.FC<HeaderProps> = ({ onAdicionarProduto }) => {
  const [codigoBarras, setCodigoBarras] = useState('');
  const [quantidade, setQuantidade] = useState(1);
  const [loading, setLoading] = useState(false);
  
  const codigoInputRef = useRef<HTMLInputElement>(null);
  const { buscarProdutoPorSku } = useDatabase();
  const { toast } = useToast();

  const handleBuscarProduto = async () => {
    if (!codigoBarras.trim()) {
      toast({
        title: "Erro",
        description: "Digite o código de barras",
        variant: "destructive"
      });
      // Focar no input do código
      codigoInputRef.current?.focus();
      return;
    }

    if (quantidade <= 0) {
      toast({
        title: "Erro",
        description: "Quantidade deve ser maior que zero",
        variant: "destructive"
      });
      return;
    }

    setLoading(true);

    try {
      const produto = await buscarProdutoPorSku(codigoBarras);
      
      if (produto) {
        onAdicionarProduto(produto, quantidade);
        
        // Limpar campos após adicionar
        setCodigoBarras('');
        setQuantidade(1);
        
        // Focar novamente no input do código para próxima entrada
        codigoInputRef.current?.focus();
        
        toast({
          title: "Sucesso",
          description: `${produto.nome_produto} (${quantidade}x) adicionado à venda`,
        });
      } else {
        toast({
          title: "Produto não encontrado",
          description: `Código "${codigoBarras}" não foi encontrado`,
          variant: "destructive"
        });
        
        // Limpar o input e focar para nova tentativa
        setCodigoBarras('');
        codigoInputRef.current?.focus();
      }
    } catch (err) {
      toast({
        title: "Erro",
        description: "Erro ao buscar produto no banco de dados",
        variant: "destructive"
      });
      console.error('Erro ao buscar produto:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === 'Enter') {
      handleBuscarProduto();
    }
  };

  const handleCodigoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCodigoBarras(e.target.value);
  };

  const handleQuantidadeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = parseInt(e.target.value);
    setQuantidade(valor > 0 ? valor : 1);
  };

  return (
    <header className="header bg-gray-800 text-white mt-4 p-4 h-26">
      <div className="flex items-center h-full gap-2">
        <label htmlFor="codeNumber" className="text-sm font-medium">
          Código
        </label>
        <Input 
          ref={codigoInputRef}
          className="w-full h-12" 
          type="text" 
          placeholder="Digite o SKU do produto" 
          id="codeNumber"
          value={codigoBarras}
          onChange={handleCodigoChange}
          onKeyPress={handleKeyPress}
          disabled={loading}
          autoFocus
        />
        
        <label htmlFor="qtdProduct" className="text-sm font-medium">
          Qtd
        </label>
        <Input 
          className="w-20 h-12" 
          type="number" 
          placeholder="1" 
          id="qtdProduct"
          value={quantidade}
          onChange={handleQuantidadeChange}
          onKeyPress={handleKeyPress}
          min="1"
          max="999"
          disabled={loading}
        />
        
        <Button 
          className="w-32 h-12 tracking-wide" 
          type="button" 
          variant="outline"
          onClick={handleBuscarProduto}
          disabled={loading || !codigoBarras.trim()}
        >
          {loading ? 'Buscando...' : 'Adicionar'}
        </Button>
      </div>
    </header>
  );
};

export default Header;