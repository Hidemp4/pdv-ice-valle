use std::sync::Arc;

use diesel::result::Error;

use crate::{
    infrastructure::DbPool,
    models::sale::{Sale, SaleBuilder},
    repositories::sale_repository::{DSaleRepository, SaleRepository},
};

pub struct SaleService {
    repository: DSaleRepository,
}

impl SaleService {
    pub fn new(pool: Arc<DbPool>) -> Self {
        let repository = DSaleRepository::new(pool);
        Self { repository }
    }

    pub fn all(&self) -> Result<Vec<Sale>, Error> {
        self.repository.all()
    }

    pub fn create(&self, builder: SaleBuilder) -> Result<Sale, Error> {
        let sale = &builder.build();
        self.repository.save(sale)
    }

    pub fn update(&self, sale: &Sale) -> Result<Sale, Error> {
        self.repository.update(sale)
    }

    pub fn get(&self, sale_id: i32) -> Result<Sale, Error> {
        self.repository.find_by_id(sale_id)
    }
}
