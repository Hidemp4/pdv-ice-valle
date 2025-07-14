import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { ItemVenda } from "@/App";

import { useDatabase } from "@/hooks/useDatabase";
import { Produto } from "@/types/produto";

interface TableProductsProps {
  itensVenda: ItemVenda[];
  onRemoverProduto: (produtoId: number) => void;
}

const TableProducts: React.FC<TableProductsProps> = ({
  itensVenda,
  onRemoverProduto,
}) => {
  const { listarProdutos } = useDatabase();
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [erro, setErro] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const carregarProdutos = async () => {
      if (itensVenda.length > 0) return; // Não carregar se já há itens na venda
      
      setLoading(true);
      try {
        const listaDeProdutos = await listarProdutos();
        setProdutos(listaDeProdutos);
        setErro(null);
      } catch (error: any) {
        setErro(error.message);
        console.error('Erro ao carregar produtos:', error);
      } finally {
        setLoading(false);
      }
    };

    carregarProdutos();
  }, [listarProdutos, itensVenda.length]);

  // Se não há itens na venda, mostra lista de produtos disponíveis
  if (itensVenda.length === 0) {
    return (
      <div className="p-4">
        <div className="text-center mb-6">
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Produtos Disponíveis
          </h2>
          <p className="text-sm text-gray-500">
            Use o código SKU acima para adicionar produtos à venda
          </p>
        </div>

        {erro && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
            <strong>Erro:</strong> {erro}
          </div>
        )}

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-500">Carregando produtos...</p>
          </div>
        ) : (
          <div className="grid gap-2">
            {produtos.map((produto) => (
              <div
                key={produto.id}
                className="border rounded-lg p-3 hover:bg-gray-50 transition-colors"
              >
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="font-medium text-gray-900">
                      {produto.nome_produto}
                    </h3>
                    <p className="text-sm text-gray-600">
                      SKU: <span className="font-mono">{produto.sku}</span>
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">
                      R$ {produto.preco_uni.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {!loading && produtos.length === 0 && !erro && (
          <div className="text-center py-8">
            <p className="text-gray-500">Nenhum produto cadastrado</p>
          </div>
        )}
      </div>
    );
  }

  // Se há itens na venda, mostra a tabela
  return (
    <div className="p-4">
      <Table>
        <TableCaption>
          {itensVenda.length} {itensVenda.length === 1 ? 'item' : 'itens'} na venda
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[60px]">Ação</TableHead>
            <TableHead>Produto</TableHead>
            <TableHead className="w-[100px]">SKU</TableHead>
            <TableHead className="w-[80px] text-center">Qtd</TableHead>
            <TableHead className="w-[100px] text-right">Preço Unit.</TableHead>
            <TableHead className="w-[100px] text-right">Total</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {itensVenda.map((item) => (
            <TableRow key={item.produto.id}>
              <TableCell>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onRemoverProduto(item.produto.id)}
                  className="h-8 w-8 p-0 hover:bg-red-100"
                  title="Remover produto"
                >
                  <Trash2 className="h-4 w-4 text-red-500" />
                </Button>
              </TableCell>
              <TableCell>
                <div>
                  <div className="font-medium">{item.produto.nome_produto}</div>
                  <div className="text-sm text-gray-500">ID: {item.produto.id}</div>
                </div>
              </TableCell>
              <TableCell>
                <span className="font-mono text-sm">{item.produto.sku}</span>
              </TableCell>
              <TableCell className="text-center">
                <span className="font-medium">{item.quantidade}</span>
              </TableCell>
              <TableCell className="text-right">
                R$ {item.produto.preco_uni.toFixed(2)}
              </TableCell>
              <TableCell className="text-right font-medium">
                R$ {item.total.toFixed(2)}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableProducts;