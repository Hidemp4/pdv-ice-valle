use std::sync::Arc;

use crate::models::schema::saleitems::dsl::*;
use crate::{
    infrastructure::DbPool,
    models::sale_items::{NewSaleItems, SaleItems},
};
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl, SelectableHelper, result::Error};

pub struct DSaleItemsRepository {
    pool: Arc<DbPool>,
}

impl DSaleItemsRepository {
    pub fn new(pool: Arc<DbPool>) -> Self {
        Self { pool }
    }
}

pub trait SaleItemsRepository {
    fn all(&self) -> Result<Vec<SaleItems>, Error>;
    fn save(&self, item: &NewSaleItems) -> Result<SaleItems, Error>;
    fn update(&self, item: &SaleItems) -> Result<SaleItems, Error>;
    fn find_by_id(&self, item_id: i32) -> Result<SaleItems, Error>;
}

impl SaleItemsRepository for DSaleItemsRepository {
    fn all(&self) -> Result<Vec<SaleItems>, Error> {
        let mut conn = self.pool.get().unwrap();

        match saleitems
            .select(SaleItems::as_select())
            .get_results(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn save(&self, item: &NewSaleItems) -> Result<SaleItems, Error> {
        let mut conn = self.pool.get().unwrap();

        match diesel::insert_into(saleitems)
            .values(item)
            .returning(SaleItems::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn update(&self, item: &SaleItems) -> Result<SaleItems, Error> {
        let mut conn = self.pool.get().unwrap();

        match diesel::update(saleitems)
            .filter(id.eq(item.id))
            .set(item)
            .returning(SaleItems::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn find_by_id(&self, item_id: i32) -> Result<SaleItems, Error> {
        let mut conn = self.pool.get().unwrap();

        match saleitems
            .filter(id.eq(item_id))
            .select(SaleItems::as_select())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }
}
