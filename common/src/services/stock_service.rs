use std::sync::Arc;

use diesel::result::Error;

use crate::{
    infrastructure::DbPool,
    models::stock::{Stock, StockBuilder},
    repositories::stock_repository::{DStockRepository, StockRepository},
};

pub struct StockService {
    repository: DStockRepository,
}

impl StockService {
    pub fn new(pool: Arc<DbPool>) -> Self {
        let repository = DStockRepository::new(pool);
        Self { repository }
    }

    pub fn all(&self) -> Result<Vec<Stock>, Error> {
        self.repository.all()
    }

    pub fn create(&self, stock: StockBuilder) -> Result<Stock, Error> {
        let stock = &stock.build();
        self.repository.save(stock)
    }

    pub fn update(&self, stock: &Stock) -> Result<Stock, Error> {
        self.repository.update(stock)
    }

    pub fn get(&self, stock_id: i32) -> Result<Stock, Error> {
        self.repository.find_by_id(stock_id)
    }
}
