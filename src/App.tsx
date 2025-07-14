import React, { useState } from 'react';
import MainLayout from '@/layouts/MainLayout';
import TableProducts from '@/components/TableProducts';
import Toaster from '@/components/Toaster';
import { Produto } from '@/types/produto';
import { useToast } from '@/hooks/use-toast';

// Interface para item de venda
export interface ItemVenda {
  produto: Produto;
  quantidade: number;
  total: number;
}

const App: React.FC = () => {
  const [itensVenda, setItensVenda] = useState<ItemVenda[]>([]);
  const { toast } = useToast();

  // Função para adicionar produto à venda
  const handleAdicionarProduto = (produto: Produto, quantidade: number) => {
    setItensVenda(prevItens => {
      // Verifica se o produto já existe na venda
      const itemExistente = prevItens.find(item => item.produto.id === produto.id);
      
      if (itemExistente) {
        // Se já existe, atualiza a quantidade
        return prevItens.map(item => 
          item.produto.id === produto.id 
            ? {
                ...item,
                quantidade: item.quantidade + quantidade,
                total: (item.quantidade + quantidade) * produto.preco_uni
              }
            : item
        );
      } else {
        // Se não existe, adiciona novo item
        const novoItem: ItemVenda = {
          produto,
          quantidade,
          total: quantidade * produto.preco_uni
        };
        return [...prevItens, novoItem];
      }
    });
  };

  // Função para remover produto da venda
  const handleRemoverProduto = (produtoId: number) => {
    const produto = itensVenda.find(item => item.produto.id === produtoId);
    
    setItensVenda(prevItens => 
      prevItens.filter(item => item.produto.id !== produtoId)
    );

    if (produto) {
      toast({
        title: "Produto removido",
        description: `${produto.produto.nome_produto} foi removido da venda`,
        variant: "default"
      });
    }
  };

  // Calcular total da venda
  const calcularTotalVenda = (): number => {
    return itensVenda.reduce((total, item) => total + item.total, 0);
  };

  return (
    <div className="App">
      <MainLayout 
        onAdicionarProduto={handleAdicionarProduto}
        totalVenda={calcularTotalVenda()}
      >
        <TableProducts 
          itensVenda={itensVenda}
          onRemoverProduto={handleRemoverProduto}
        />
      </MainLayout>
      <Toaster />
    </div>
  );
};

export default App;