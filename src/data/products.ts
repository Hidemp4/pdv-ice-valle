export interface Product {
  id: number;
  name_prod: string;
  sku: string;
  unit_price: number;
}

export const fakeProducts: Product[] = [
  {
    id: 1,
    name_prod: "Coca-Cola Lata 350ml",
    sku: "123",
    unit_price: 5.5,
  },
  {
    id: 2,
    name_prod: "Pastel Grande",
    sku: "321",
    unit_price: 7.9,
  },
  {
    id: 3,
    name_prod: "Casquinha de Morango",
    sku: "111",
    unit_price: 4.99,
  },
  {
    id: 4,
    name_prod: "Sorvete Napolitano 2L",
    sku: "222",
    unit_price: 44.0,
  },
];
