import React, { useState, useEffect } from "react";
import Header from "@/components/Header";
import PaymentArea from "@/components/PaymentArea";
import TableProducts from "@/components/TableProducts";
import { DataResponse, Product, ProductResponse } from "@/types/product";

export interface CardItem extends Product {
  quantity: number;
  subtotal: number;
}

interface HomeProps {
  className?: string;
}

const Home: React.FC<HomeProps> = ({ className }) => {

  // ESTADOS
  const [cart, setCart] = useState<CardItem[]>([]); // Produtos adicionados via Header
  const [availableProducts, setAvailableProducts] = useState<Product[]>([]); // Produtos do banco
  const [loading, setLoading] = useState(false);

  // FUNÇÃO PARA BUSCAR PRODUTOS DO BANCO
  const loadProductsFromDatabase = async () => {
    setLoading(true);
    try {
      const result = await (window as any).__TAURI_INTERNALS__.invoke('get_all_products') as DataResponse<ProductResponse[]>;
      
      if (result.success && result.data) {
        const convertedProducts: Product[] = result.data.map(dbProduct => ({
          id: dbProduct.id,
          name_prod: dbProduct.name,
          unit_price: dbProduct.price,
          sku: dbProduct.sku
        }));
        
        setAvailableProducts(convertedProducts);
        console.log(`${convertedProducts.length} produtos carregados do banco`);
      } else {
        console.error('Erro ao carregar produtos:', result.error);
        alert('Erro ao carregar produtos do banco de dados');
      }
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      alert('Erro de conexão com o banco de dados');
    } finally {
      setLoading(false);
    }
  };

  // FUNÇÃO PARA ADICIONAR PRODUTO AO CARRINHO
  const handleAddProduct = (sku: string, qtd: number) => {
    const found = availableProducts.find((p) => p.sku === sku);
    if (found) {
      // Verificar se já existe no carrinho
      const existingItemIndex = cart.findIndex(item => item.sku === sku);
      
      if (existingItemIndex > -1) {
        // Se já existe, somar a quantidade
        const updatedCart = [...cart];
        updatedCart[existingItemIndex].quantity += qtd;
        updatedCart[existingItemIndex].subtotal = updatedCart[existingItemIndex].unit_price * updatedCart[existingItemIndex].quantity;
        setCart(updatedCart);
      } else {
        // Se não existe, adicionar novo item
        const newItem: CardItem = {
          ...found,
          quantity: qtd,
          subtotal: found.unit_price * qtd,
        };
        setCart((prev) => [...prev, newItem]);
      }
      
      console.log(`Produto adicionado: ${found.name_prod} (${qtd}x)`);
    } else {
      alert(`Produto com SKU "${sku}" não encontrado no banco de dados`);
      console.log('SKUs disponíveis:', availableProducts.map(p => p.sku).join(', '));
    }
  };

  // FUNÇÃO PARA REMOVER PRODUTO DO CARRINHO
  const handleRemoveProduct = (index: number) => {
    const removedItem = cart[index];
    setCart(prev => prev.filter((_, i) => i !== index));
    console.log(`Produto removido: ${removedItem.name_prod}`);
  };

  // SOMA TOTAL DA COMPRA (mesma lógica)
  const total = cart.reduce((acc, item) => acc + item.subtotal, 0);

  // CARREGAR PRODUTOS AO INICIAR
  useEffect(() => {
    loadProductsFromDatabase();
  }, []);

  return (
    <div className={`layout-container flex overflow-hidden max-h-screen max-w-screen ${className ?? ""}`}>
      <div className="grid grid-cols-2 flex-1 overflow-hidden">
        <div>
          <Header onAddProduct={handleAddProduct} />
          
          <main className="main-content p-4 overflow-hidden">
            {/* Mostrar estado de carregamento apenas se não há produtos */}
            {loading && availableProducts.length === 0 && (
              <div className="text-center py-4 text-gray-600">
                <p>Carregando produtos do banco de dados...</p>
              </div>
            )}
            
            {/* TableProducts mostra apenas os itens adicionados via Header */}
            <TableProducts 
              products={cart}
              onRemoveProduct={handleRemoveProduct} // Função para remover do carrinho
            />
            
            {/* Info de debug (apenas em desenvolvimento) */}
            {process.env.NODE_ENV === 'development' && (
              <div className="mt-4 p-2 bg-gray-100 rounded text-xs text-gray-600">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <strong>Produtos no banco:</strong> {availableProducts.length}
                    <br />
                    <strong>Itens no carrinho:</strong> {cart.length}
                  </div>
                  <div>
                    <button 
                      onClick={loadProductsFromDatabase}
                      disabled={loading}
                      className="px-2 py-1 bg-blue-500 text-white rounded text-xs hover:bg-blue-600 disabled:bg-gray-400"
                    >
                      {loading ? 'Carregando...' : 'Atualizar DB'}
                    </button>
                    <br />
                    <button 
                      onClick={() => setCart([])}
                      className="mt-1 px-2 py-1 bg-red-500 text-white rounded text-xs hover:bg-red-600"
                    >
                      Limpar Carrinho
                    </button>
                  </div>
                </div>
                {availableProducts.length > 0 && (
                  <details className="mt-2">
                    <summary className="cursor-pointer">SKUs disponíveis</summary>
                    <div className="mt-1 text-xs bg-white p-2 rounded max-h-20 overflow-y-auto">
                      {availableProducts.map(p => (
                        <div key={p.id} className="flex justify-between">
                          <span>{p.sku}</span>
                          <span>{p.name_prod}</span>
                          <span>R$ {p.unit_price.toFixed(2)}</span>
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