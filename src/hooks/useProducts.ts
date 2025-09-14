import { useState, useEffect, useCallback } from "react";
import { ProductResponse, ProductRequest, CartItem } from "@/types/product";
import { ProductService } from "@/services/productService";
import { ProductUtils } from "@/utils/productUtils";

/**
 * Hook para gerenciar lista de produtos
 */
export function useProducts() {
  const [products, setProducts] = useState<ProductResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProductService.getAllProducts();
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produtos';
      setError(errorMessage);
      console.error('Erro ao carregar produtos:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  const searchProducts = useCallback(async (query: string) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProductService.searchProducts(query);
      setProducts(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro na busca';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const getProductBySku = useCallback((sku: string): ProductResponse | undefined => {
    return ProductUtils.findBySku(products, sku);
  }, [products]);

  const refreshProducts = useCallback(() => {
    loadProducts();
  }, [loadProducts]);

  return {
    products,
    loading,
    error,
    loadProducts,
    searchProducts,
    getProductBySku,
    refreshProducts,
  };
}

/**
 * Hook para gerenciar carrinho de compras
 */
export function useCart() {
  const [cart, setCart] = useState<CartItem[]>([]);

  const addProduct = useCallback((product: ProductResponse, quantity: number = 1) => {
    setCart(currentCart => {
      const existingIndex = currentCart.findIndex(item => item.sku === product.sku);
      
      if (existingIndex > -1) {
        // Atualizar quantidade existente
        const updatedCart = [...currentCart];
        const newQuantity = updatedCart[existingIndex].quantity + quantity;
        updatedCart[existingIndex] = ProductUtils.updateCartItemQuantity(
          updatedCart[existingIndex],
          newQuantity
        );
        return updatedCart;
      } else {
        // Adicionar novo item
        const newItem = ProductUtils.toCartItem(product, quantity);
        return [...currentCart, newItem];
      }
    });
  }, []);

  const removeProduct = useCallback((index: number) => {
    setCart(currentCart => currentCart.filter((_, i) => i !== index));
  }, []);

  const updateQuantity = useCallback((index: number, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeProduct(index);
      return;
    }

    setCart(currentCart => {
      const updatedCart = [...currentCart];
      updatedCart[index] = ProductUtils.updateCartItemQuantity(
        updatedCart[index],
        newQuantity
      );
      return updatedCart;
    });
  }, [removeProduct]);

  const clearCart = useCallback(() => {
    setCart([]);
  }, []);

  const total = ProductUtils.calculateCartTotal(cart);
  const itemCount = ProductUtils.getCartItemCount(cart);
  const totalQuantity = ProductUtils.getTotalQuantity(cart);

  return {
    cart,
    addProduct,
    removeProduct,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    totalQuantity,
  };
}

/**
 * Hook para gerenciar um produto específico (para edição/visualização)
 */
export function useProduct(id?: number) {
  const [product, setProduct] = useState<ProductResponse | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadProduct = useCallback(async (productId: number) => {
    setLoading(true);
    setError(null);
    try {
      const data = await ProductService.getProductById(productId);
      setProduct(data);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao carregar produto';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const createProduct = useCallback(async (productData: Omit<ProductRequest, 'id' | 'created_at' | 'updated_at'>) => {
    setLoading(true);
    setError(null);
    try {
      const newProduct = await ProductService.createProductWithValidation(productData);
      setProduct(newProduct);
      return newProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao criar produto';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const updateProduct = useCallback(async (productId: number, productData: Partial<ProductRequest>) => {
    setLoading(true);
    setError(null);
    try {
      const updatedProduct = await ProductService.updateProductWithValidation(productId, productData);
      setProduct(updatedProduct);
      return updatedProduct;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao atualizar produto';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  const deleteProduct = useCallback(async (productId: number) => {
    setLoading(true);
    setError(null);
    try {
      await ProductService.deleteProduct(productId);
      setProduct(null);
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao deletar produto';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (id) {
      loadProduct(id);
    }
  }, [id, loadProduct]);

  return {
    product,
    loading,
    error,
    loadProduct,
    createProduct,
    updateProduct,
    deleteProduct,
  };
}

/**
 * Hook combinado para tela principal (Home)
 */
export function useHomePage() {
  const { products, loading, error, loadProducts, getProductBySku } = useProducts();
  const { 
    cart, 
    addProduct, 
    removeProduct, 
    updateQuantity, 
    clearCart, 
    total, 
    itemCount, 
    totalQuantity 
  } = useCart();

  const addProductToCart = useCallback((sku: string, quantity: number) => {
    const product = getProductBySku(sku);
    if (product) {
      addProduct(product, quantity);
      return true;
    } else {
      console.error(`Produto com SKU "${sku}" não encontrado`);
      return false;
    }
  }, [getProductBySku, addProduct]);

  return {
    // Produtos
    products,
    productsLoading: loading,
    productsError: error,
    loadProducts,
    getProductBySku,
    
    // Carrinho
    cart,
    addProductToCart,
    removeProduct,
    updateQuantity,
    clearCart,
    total,
    itemCount,
    totalQuantity,
  };
}