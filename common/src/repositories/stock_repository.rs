use std::sync::Arc;

use crate::models::schema::stock::dsl::*;
use crate::{
    infrastructure::DbPool,
    models::stock::{NewStock, Stock},
};
use diesel::prelude::*;
use diesel::result::Error;

pub struct DStockRepository {
    pool: Arc<DbPool>,
}

impl DStockRepository {
    pub fn new(pool: Arc<DbPool>) -> Self {
        Self { pool }
    }
}

pub trait StockRepository {
    fn all(&self) -> Result<Vec<Stock>, Error>;
    fn save(&self, nstock: &NewStock) -> Result<Stock, Error>;
    fn update(&self, ustock: &Stock) -> Result<Stock, Error>;
    fn update_quantity(&self, qproduct_id: i32, new_quantity: f64) -> Result<Stock, Error>;
    fn find_by_id(&self, stock_id: i32) -> Result<Stock, Error>;
    fn find_by_product_id(&self, qproduct_id: i32) -> Result<Stock, Error>;
}

impl StockRepository for DStockRepository {
    fn all(&self) -> Result<Vec<Stock>, Error> {
        let mut conn = self.pool.get().unwrap();

        match stock.select(Stock::as_select()).get_results(&mut conn) {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn save(&self, nstock: &NewStock) -> Result<Stock, Error> {
        let mut conn = self.pool.get().unwrap();

        match diesel::insert_into(stock)
            .values(nstock)
            .returning(Stock::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn update(&self, ustock: &Stock) -> Result<Stock, Error> {
        let mut conn = self.pool.get().unwrap();

        match diesel::update(stock)
            .filter(id.eq(ustock.id))
            .set(ustock)
            .returning(Stock::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn update_quantity(&self, qproduct_id: i32, new_quantity: f64) -> Result<Stock, Error> {
        let mut conn = self.pool.get().unwrap();

        match diesel::update(stock)
            .filter(id.eq(qproduct_id))
            .set(quantity.eq(new_quantity))
            .returning(Stock::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn find_by_id(&self, stock_id: i32) -> Result<Stock, Error> {
        let mut conn = self.pool.get().unwrap();

        match stock
            .filter(id.eq(stock_id))
            .select(Stock::as_select())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn find_by_product_id(&self, qproduct_id: i32) -> Result<Stock, Error> {
        let mut conn = self.pool.get().unwrap();

        match stock
            .filter(product_id.eq(qproduct_id))
            .select(Stock::as_select())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }
}
