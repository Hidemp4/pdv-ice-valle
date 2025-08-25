use crate::{
    infrastructure::DbPool, models::product::Product, repositories::product_repository::{DProductRepository, ProductRepository}
};

pub struct ProductService {
    repository: DProductRepository,
}

impl ProductService {
    pub fn new(pool: DbPool) -> Self {
        let repository = DProductRepository::new(pool);
        Self { repository }
    }

    pub fn get(&self, id: i32) {
        self.repository.find_by_id(id);
    }

    pub fn create(&self, product: &Product) {
        self.repository.save(product);
    }
}
