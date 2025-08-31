use std::sync::Arc;

use diesel::result::Error;

use crate::{
    infrastructure::DbPool,
    models::sale_items::{SaleItems, SaleItemsBuilder},
    repositories::sale_items_repository::{DSaleItemsRepository, SaleItemsRepository},
};

pub struct SaleItemsService {
    repository: DSaleItemsRepository,
}

impl SaleItemsService {
    pub fn new(pool: Arc<DbPool>) -> Self {
        let repository = DSaleItemsRepository::new(pool);
        Self { repository }
    }

    pub fn all(&self) -> Result<Vec<SaleItems>, Error> {
        self.repository.all()
    }

    pub fn create(&self, builder: SaleItemsBuilder) -> Result<SaleItems, Error> {
        let item = &builder.build();
        self.repository.save(item)
    }

    pub fn update(&self, item: &SaleItems) -> Result<SaleItems, Error> {
        self.repository.update(item)
    }

    pub fn get(&self, item_id: i32) -> Result<SaleItems, Error> {
        self.repository.find_by_id(item_id)
    }
}
