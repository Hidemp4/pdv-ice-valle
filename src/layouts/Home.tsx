import React, { useEffect } from "react";
import Header from "@/components/Header";
import PaymentArea from "@/components/PaymentArea";
import TableProducts from "@/components/TableProducts";
import { ProductUtils } from "@/utils/productUtils";
import { useProducts } from "@/hooks/useProducts";   

interface HomeProps {
  className?: string;
}

const Home: React.FC<HomeProps> = ({ className }) => {
  const {
    // Produtos
    products,
    productsLoading,
    productsError,
    loadProducts,
    
    // Carrinho
    cart,
    addProductToCart,
    removeProduct,
    clearCart,
    total,
    itemCount,
    totalQuantity,
  } = useProducts();

  // FUNÇÃO PARA ADICIONAR PRODUTO AO CARRINHO (através do hook)
  const handleAddProduct = (sku: string, qtd: number) => {
    const success = addProductToCart(sku, qtd);
    if (success) {
      console.log(`Produto adicionado: SKU ${sku} (${qtd}x)`);
    } else {
      alert(`Produto com SKU "${sku}" não encontrado no banco de dados`);
      console.log('SKUs disponíveis:', products.map(p => p.sku).join(', '));
    }
  };

  // FUNÇÃO PARA REMOVER PRODUTO DO CARRINHO
  const handleRemoveProduct = (index: number) => {
    const removedItem = cart[index];
    removeProduct(index);
    console.log(`Produto removido: ${removedItem.name}`);
  };

  // CARREGAR PRODUTOS AO INICIAR
  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  // MOSTRAR ERRO SE HOUVER
  useEffect(() => {
    if (productsError) {
      alert(`Erro ao carregar produtos: ${productsError}`);
    }
  }, [productsError]);

  return (
    <div className={`layout-container flex overflow-hidden max-h-screen max-w-screen ${className ?? ""}`}>
      <div className="grid grid-cols-2 flex-1 overflow-hidden">
        <div>
          <Header onAddProduct={handleAddProduct} />
          
          <main className="main-content p-4 overflow-hidden">
            {/* Mostrar estado de carregamento apenas se não há produtos */}
            {productsLoading && products.length === 0 && (
              <div className="text-center py-4 text-gray-600">
                <p>Carregando produtos do banco de dados...</p>
              </div>
            )}
            
            {/* Mostrar erro se houver */}
            {productsError && (
              <div className="text-center py-4 text-red-600">
                <p>Erro: {productsError}</p>
                <button 
                  onClick={() => loadProducts()}
                  className="mt-2 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                >
                  Tentar Novamente
                </button>
              </div>
            )}
            
            {/* TableProducts mostra apenas os itens adicionados via Header */}
            <TableProducts 
              products={cart}
              onRemoveProduct={handleRemoveProduct}
            />
            
            {/* Info de debug (apenas em desenvolvimento) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-2 bg-gray-100 rounded text-xs text-gray-600">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <strong>Produtos no banco:</strong> {products.length}
                    <br />
                    <strong>Itens no carrinho:</strong> {itemCount}
                    <br />
                    <strong>Qtd total:</strong> {totalQuantity}
                    <br />
                    <strong>Total:</strong> {ProductUtils.formatPrice(total)}
                  </div>
                  <div>
                    <button 
                      onClick={() => loadProducts()}
                      disabled={productsLoading}
                      className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:bg-gray-400"
                    >
                      {productsLoading ? 'Carregando...' : 'Atualizar DB'}
                    </button>
                    <br />
                    <button 
                      onClick={() => clearCart()}
                      className="mt-1 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                    >
                      Limpar Carrinho
                    </button>
                  </div>
                </div>
                {products.length > 0 && (
                  <details className="mt-2">
                    <summary className="cursor-pointer">Produtos disponíveis</summary>
                    <div className="mt-1 text-xs bg-white p-2 rounded max-h-20 overflow-y-auto">
                      {products.map(p => (
                        <div key={p.id} className="flex justify-between gap-2 py-1 border-b border-gray-100 last:border-0">
                          <span className="font-mono">{p.sku}</span>
                          <span className="flex-1 truncate">{p.name}</span>
                          <span className="font-medium">{ProductUtils.formatPrice(p.price)}</span>
                          <span className="text-blue-600 text-xs">
                            ({ProductUtils.getCategoryName(p)})
                          </span>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>
            )}
          </main>
        </div>
        <div className="overflow-hidden">
          <PaymentArea total={total} />
        </div>
      </div>
    </div>
  );
};

export default Home;