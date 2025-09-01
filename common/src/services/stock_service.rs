use std::sync::Arc;

use diesel::result::Error;

use crate::{
    infrastructure::DbPool,
    models::{
        stock::{Stock, StockBuilder},
        stock_movement::{MoveType, StockMovementBuilder},
    },
    repositories::stock_repository::{DStockRepository, StockRepository},
    services::stock_movements_service::StockMovementService,
};

pub struct StockService {
    repository: DStockRepository,
    movementservice: StockMovementService,
}

impl StockService {
    pub fn new(pool: Arc<DbPool>) -> Self {
        let repository = DStockRepository::new(pool.clone());
        let movementservice = StockMovementService::new(pool);
        Self {
            repository,
            movementservice,
        }
    }

    pub fn all(&self) -> Result<Vec<Stock>, Error> {
        self.repository.all()
    }

    pub fn create(&self, builder: StockBuilder) -> Result<Stock, Error> {
        let stock = &builder.build();

        let movement = StockMovementBuilder::new(
            stock.product_id,
            MoveType::StockInput,
            stock.quantity,
            "ProductRegistration",
        );
        match self.movementservice.create(movement) {
            Ok(_) => self.repository.save(stock),
            Err(err) => Err(err),
        }
    }

    pub fn update(&self, stock: &Stock) -> Result<Stock, Error> {
        self.repository.update(stock)
    }

    pub fn get(&self, stock_id: i32) -> Result<Stock, Error> {
        self.repository.find_by_id(stock_id)
    }
}
