use chrono::NaiveDateTime;
use pdcommon::models::{category::Category, product::Product};
use serde::{Deserialize, Serialize};

use crate::resources::category_resource::CategoryResponse;

#[derive(Serialize, Debug)]
pub struct ProductResponse {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub price: f64,
    pub sku: String,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,

    pub category: Option<CategoryResponse>,
}

#[derive(Deserialize, Debug)]
pub struct ProductRequest {
    pub id: Option<i32>,
    pub name: String,
    pub description: Option<String>,
    pub category_id: Option<i32>,
    pub price: f64,
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
            category_id: value.category_id,
            price: value.price,
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
            price: product.price,
            sku: product.sku,
            created_at: product.created_at,
            updated_at: product.updated_at,
            category: None,
        }
    }
}

impl From<(Product, Category)> for ProductResponse {
    fn from((product, category): (Product, Category)) -> Self {
        Self {
            id: product.id,
            name: product.name,
            description: product.description,
            price: product.price,
            sku: product.sku,
            created_at: product.created_at,
            updated_at: product.updated_at,
            category: Some(CategoryResponse::from(category)),
        }
    }
}

impl ProductResponse {
    pub fn collection(products: Vec<Product>) -> Vec<Self> {
        products.into_iter().map(ProductResponse::from).collect()
    }

    pub fn collection_with_category(products: Vec<(Product, Category)>) -> Vec<Self> {
        products.into_iter().map(ProductResponse::from).collect()
    }
}
