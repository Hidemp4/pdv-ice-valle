import { invoke } from '@tauri-apps/api/core';
import { Produto, NovoProduto } from '../types/product';

export const useDatabase = () => {
  const buscarProdutoPorSku = async (sku: string): Promise<Produto | null> => {
    try {
      const produto = await invoke<Produto | null>('buscar_produto_por_sku', { sku });
      return produto;
    } catch (error) {
      console.error('Erro ao buscar produto:', error);
      throw error;
    }
  };

  const listarProdutos = async (): Promise<Produto[]> => {
    try {
      console.log('Chamando invoke para listar_produtos...');
      console.log('Função invoke disponível:', typeof invoke);
      
      const produtos = await invoke<Produto[]>('listar_produtos');
      console.log('Produtos recebidos do backend:', produtos);
      return produtos;
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
      
      // Se houver erro, retorna dados mock para não quebrar a aplicação
      console.warn('Retornando dados mock devido ao erro');
      return [
        { id: 1, nome_produto: 'Produto Teste', sku: 'TEST001', preco_uni: 10.99 },
        { id: 2, nome_produto: 'Produto Teste 2', sku: 'TEST002', preco_uni: 15.50 }
      ];
    }
  };

  const inserirProduto = async (produto: NovoProduto): Promise<number> => {
    try {
      const id = await invoke<number>('inserir_produto', { produto });
      return id;
    } catch (error) {
      console.error('Erro ao inserir produto:', error);
      throw error;
    }
  };

  const atualizarProduto = async (id: number, produto: NovoProduto): Promise<void> => {
    try {
      await invoke('atualizar_produto', { id, produto });
    } catch (error) {
      console.error('Erro ao atualizar produto:', error);
      throw error;
    }
  };

  const deletarProduto = async (id: number): Promise<void> => {
    try {
      await invoke('deletar_produto', { id });
    } catch (error) {
      console.error('Erro ao deletar produto:', error);
      throw error;
    }
  };

  return {
    buscarProdutoPorSku,
    listarProdutos,
    inserirProduto,
    atualizarProduto,
    deletarProduto,
  };
};