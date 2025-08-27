use std::sync::Arc;

use diesel::result::Error;

use crate::{
    infrastructure::DbPool,
    models::product::{Product, ProductBuilder},
    repositories::product_repository::{DProductRepository, ProductRepository},
};

pub struct ProductService {
    repository: DProductRepository,
}

impl ProductService {
    pub fn new(pool: Arc<DbPool>) -> Self {
        let repository = DProductRepository::new(pool);
        Self { repository }
    }

    pub fn create(&self, builder: ProductBuilder) -> Result<Product, Error> {
        let product = &builder.build();
        self.repository.save(product)
    }

    pub fn update(&self, product: &Product) -> Result<Product, Error> {
        self.repository.update(product)
    }

    pub fn get(&self, id: i32) -> Result<Product, Error> {
        self.repository.find_by_id(id)
    }

    pub fn get_by_sku(&self, sku: impl Into<String>) -> Result<Product, Error> {
        self.repository.find_by_sku(sku.into())
    }
}
