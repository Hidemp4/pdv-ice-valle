use std::sync::Arc;

use crate::models::schema::sales::dsl::*;
use crate::{
    infrastructure::DbPool,
    models::sale::{NewSale, Sale},
};
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl, SelectableHelper, result::Error};

pub struct DSaleRepository {
    pool: Arc<DbPool>,
}

impl DSaleRepository {
    pub fn new(pool: Arc<DbPool>) -> Self {
        Self { pool }
    }
}

pub trait SaleRepository {
    fn all(&self) -> Result<Vec<Sale>, Error>;
    fn save(&self, sale: &NewSale) -> Result<Sale, Error>;
    fn update(&self, sale: &Sale) -> Result<Sale, Error>;
    fn find_by_id(&self, sale_id: i32) -> Result<Sale, Error>;
}

impl SaleRepository for DSaleRepository {
    fn all(&self) -> Result<Vec<Sale>, Error> {
        let mut conn = self.pool.get().unwrap();

        match sales.select(Sale::as_select()).get_results(&mut conn) {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn save(&self, sale: &NewSale) -> Result<Sale, Error> {
        let mut conn = self.pool.get().unwrap();

        match diesel::insert_into(sales)
            .values(sale)
            .returning(Sale::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn update(&self, sale: &Sale) -> Result<Sale, Error> {
        let mut conn = self.pool.get().unwrap();

        match diesel::update(sales)
            .filter(id.eq(sale.id))
            .set(sale)
            .returning(Sale::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn find_by_id(&self, sale_id: i32) -> Result<Sale, Error> {
        let mut conn = self.pool.get().unwrap();

        match sales
            .filter(id.eq(sale_id))
            .select(Sale::as_select())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }
}
