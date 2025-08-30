use std::sync::Arc;

use diesel::result::Error;

use crate::{
    infrastructure::DbPool,
    models::stock_movement::{StockMovement, StockMovementBuilder},
    repositories::stock_movements_repository::{DStockMovementsRepository, StockMovementRepository},
};

pub struct StockMovementService {
    repository: DStockMovementsRepository,
}

impl StockMovementService {
    pub fn new(pool: Arc<DbPool>) -> Self {
        let repository = DStockMovementsRepository::new(pool);
        Self { repository }
    }

    pub fn all(&self) -> Result<Vec<StockMovement>, Error> {
        self.repository.all()
    }

    pub fn create(&self, builder: StockMovementBuilder) -> Result<StockMovement, Error> {
        let movement = &builder.build();
        self.repository.save(movement)
    }

    pub fn update(&self, movement: &StockMovement) -> Result<StockMovement, Error> {
        self.repository.update(movement)
    }

    pub fn get(&self, movement_id: i32) -> Result<StockMovement, Error> {
        self.repository.find_by_id(movement_id)
    }
}
