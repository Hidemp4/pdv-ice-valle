use std::sync::Arc;

use self::schema::products::dsl::*;
use crate::models::{product::NewProduct, schema};
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl, SelectableHelper, result::Error};

use crate::{
    infrastructure::DbPool,
    models::{product::Product, schema::products},
};

pub struct DProductRepository {
    pool: Arc<DbPool>,
}

impl DProductRepository {
    pub fn new(pool: Arc<DbPool>) -> Self {
        Self { pool }
    }
}

pub trait ProductRepository {
    fn all(&self) -> Result<Vec<Product>, Error>;
    fn save(&self, product: &NewProduct) -> Result<Product, Error>;
    fn update(&self, product_id: i32, product: &Product) -> Result<Product, Error>;
    fn find_by_id(&self, product_id: i32) -> Result<Product, Error>;
    fn find_by_sku(&self, qsku: String) -> Result<Product, Error>;
}

impl ProductRepository for DProductRepository {
    fn all(&self) -> Result<Vec<Product>, Error> {
        let mut conn = self.pool.get().unwrap();
        match products.select(Product::as_select()).get_results(&mut conn) {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn save(&self, product: &NewProduct) -> Result<Product, Error> {
        let mut conn = self.pool.get().unwrap();
        match diesel::insert_into(products::table)
            .values(product)
            .returning(Product::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn update(&self, product_id: i32, product: &Product) -> Result<Product, Error> {
        let mut conn = self.pool.get().unwrap();

        match diesel::update(products)
            .filter(id.eq(product_id))
            .set(product)
            .returning(Product::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn find_by_id(&self, product_id: i32) -> Result<Product, Error> {
        let mut conn = self.pool.get().unwrap();
        let result = products
            .filter(id.eq(product_id))
            .select(Product::as_select())
            .get_result::<Product>(&mut conn);

        match result {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn find_by_sku(&self, qsku: String) -> Result<Product, Error> {
        let mut conn = self.pool.get().unwrap();
        let result = products
            .filter(sku.eq(qsku))
            .select(Product::as_select())
            .get_result::<Product>(&mut conn);

        match result {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }
}
