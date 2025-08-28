use chrono::NaiveDateTime;
use pdcommon::models::product::Product;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Debug)]
pub struct ProductResponse {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub stock: i64,
    pub price: f64,
    pub sku: String,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Deserialize, Debug)]
pub struct ProductRequest {
    pub id: Option<i32>,
    pub name: String,
    pub description: Option<String>,
    pub price: f64,
    pub stock: i64,
    pub sku: String,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

impl From<ProductRequest> for Product {
    fn from(value: ProductRequest) -> Self {
        Self {
            id: value.id.unwrap_or_default(),
            name: value.name,
            description: value.description,
            price: value.price,
            stock: value.stock,
            sku: value.sku,
            created_at: value.created_at,
            updated_at: value.updated_at,
        }
    }
}

impl From<Product> for ProductResponse {
    fn from(product: Product) -> Self {
        Self {
            id: product.id,
            name: product.name,
            description: product.description,
            stock: product.stock,
            price: product.price,
            sku: product.sku,
            created_at: product.created_at,
            updated_at: product.updated_at,
        }
    }
}

impl ProductResponse {
    pub fn collection(products: Vec<Product>) -> Vec<Self> {
        products.into_iter().map(ProductResponse::from).collect()
    }
}
