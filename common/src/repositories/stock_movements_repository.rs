use std::sync::Arc;

use crate::models::schema::stockmovements::dsl::*;
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl, SelectableHelper, result::Error};

use crate::{
    infrastructure::DbPool,
    models::stock_movement::{NewStockMovement, StockMovement},
};

pub struct DStockMovementsRepository {
    pool: Arc<DbPool>,
}

impl DStockMovementsRepository {
    pub fn new(pool: Arc<DbPool>) -> Self {
        Self { pool }
    }
}

pub trait StockMovementRepository {
    fn all(&self) -> Result<Vec<StockMovement>, Error>;
    fn save(&self, movement: &NewStockMovement) -> Result<StockMovement, Error>;
    fn update(&self, movement: &StockMovement) -> Result<StockMovement, Error>;
    fn find_by_id(&self, movement_id: i32) -> Result<StockMovement, Error>;
}

impl StockMovementRepository for DStockMovementsRepository {
    fn all(&self) -> Result<Vec<StockMovement>, Error> {
        let mut conn = self.pool.get().unwrap();

        match stockmovements
            .select(StockMovement::as_select())
            .get_results(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn save(&self, movement: &NewStockMovement) -> Result<StockMovement, Error> {
        let mut conn = self.pool.get().unwrap();

        match diesel::insert_into(stockmovements)
            .values(movement)
            .returning(StockMovement::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn update(&self, movement: &StockMovement) -> Result<StockMovement, Error> {
        let mut conn = self.pool.get().unwrap();

        match diesel::update(stockmovements)
            .filter(id.eq(movement.id))
            .set(movement)
            .returning(StockMovement::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn find_by_id(&self, movement_id: i32) -> Result<StockMovement, Error> {
        let mut conn = self.pool.get().unwrap();

        match stockmovements
            .filter(id.eq(movement_id))
            .select(StockMovement::as_select())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }
}
