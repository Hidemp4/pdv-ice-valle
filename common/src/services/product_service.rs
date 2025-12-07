use diesel::result::Error;
use std::sync::Arc;

use crate::{
    infrastructure::DbPool,
    models::{
        category::Category,
        product::{Product, ProductBuilder},
    },
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

    pub fn all(&self) -> Result<Vec<(Product, Option<Category>)>, Error> {
        self.repository.all()
    }

    pub fn create(&self, builder: ProductBuilder) -> Result<(Product, Option<Category>), Error> {
        let category = builder.get_category();

        if let Some(_) = category {
            println!("Builder with category: {:?}", builder);
            let product = &builder.build_category();
            self.repository.save_with_category(product)
        } else {
            println!("Builder without category: {:?}", builder);
            let product = &builder.build();
            self.repository.save(product)
        }
    }

    pub fn delete(&self, product_id: i32) -> Result<(), Error> {
        self.repository.delete(product_id)
    }

    pub fn update(&self, product_id: i32, product: &Product) -> Result<(Product, Option<Category>), Error> {
        self.repository.update(product_id, product)
    }

    pub fn get(&self, id: i32) -> Result<(Product, Option<Category>), Error> {
        self.repository.find_by_id(id)
    }

    pub fn get_by_sku(&self, sku: impl Into<String>) -> Result<(Product, Option<Category>), Error> {
        self.repository.find_by_sku(sku.into())
    }
}