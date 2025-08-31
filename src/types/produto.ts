export interface Produto {
  id: number;
  nome_produto: string;
  sku: string;
  preco_uni: number;
}

export interface NovoProduto {
  nome_produto: string;
  sku: string;
  preco_uni: number;
}