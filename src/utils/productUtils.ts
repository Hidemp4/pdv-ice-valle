import { ProductResponse, ProductRequest, CartItem } from "@/types/product";

/**
 * Utilitários para trabalhar com produtos
 */
export class ProductUtils {
  /**
   * Converte ProductResponse em CartItem
   */
  static toCartItem(product: ProductResponse, quantity: number = 1): CartItem {
    return {
      ...product,
      quantity,
      subtotal: product.price * quantity,
    };
  }

  /**
   * Atualiza a quantidade e subtotal de um CartItem
   */
  static updateCartItemQuantity(item: CartItem, newQuantity: number): CartItem {
    return {
      ...item,
      quantity: newQuantity,
      subtotal: item.price * newQuantity,
    };
  }

  /**
   * Formata preço para exibição
   */
  static formatPrice(price: number): string {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price);
  }

  /**
   * Formatar data para exibição (se existir)
   */
  static formatDate(dateString: string | null): string | null {
    if (!dateString) return null;
    
    try {
      const date = new Date(dateString);
      return new Intl.DateTimeFormat('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      }).format(date);
    } catch {
      return null;
    }
  }

  /**
   * Validar SKU
   */
  static isValidSku(sku: string): boolean {
    return sku.trim().length > 0;
  }

  /**
   * Buscar produto por SKU em uma lista
   */
  static findBySku(products: ProductResponse[], sku: string): ProductResponse | undefined {
    return products.find(p => p.sku.toLowerCase() === sku.toLowerCase());
  }

  /**
   * Calcular total do carrinho
   */
  static calculateCartTotal(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.subtotal, 0);
  }

  /**
   * Contar itens únicos no carrinho
   */
  static getCartItemCount(items: CartItem[]): number {
    return items.length;
  }

  /**
   * Contar quantidade total de produtos no carrinho
   */
  static getTotalQuantity(items: CartItem[]): number {
    return items.reduce((total, item) => total + item.quantity, 0);
  }

  /**
   * Preparar ProductRequest para envio ao backend
   */
  static prepareProductRequest(data: Partial<ProductRequest>): ProductRequest {
    return {
      id: data.id || undefined,
      name: data.name || '',
      description: data.description || null,
      category_id: data.category_id || null,
      price: data.price || 0,
      sku: data.sku || '',
      created_at: data.created_at || null,
      updated_at: data.updated_at || null,
    };
  }

  /**
   * Verificar se produto tem categoria
   */
  static hasCategory(product: ProductResponse): boolean {
    return product.category !== null && product.category !== undefined;
  }

  /**
   * Obter nome da categoria ou 'Sem categoria'
   */
  static getCategoryName(product: ProductResponse): string {
    return product.category?.name || 'Sem categoria';
  }
}