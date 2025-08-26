use self::schema::products::dsl::*;
use crate::models::{product::NewProduct, schema};
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl, SelectableHelper, result::Error};

use crate::{
    infrastructure::DbPool,
    models::{product::Product, schema::products},
};

pub trait ProductRepository {
    fn save(&self, product: &NewProduct) -> Product;
    fn find_by_id(&self, product_id: i32) -> Result<Product, Error>;
    fn find_by_sku(&self, qsku: String) -> Result<Product, Error>;
}

pub struct DProductRepository {
    pool: DbPool,
}

impl DProductRepository {
    pub fn new(pool: DbPool) -> Self {
        Self { pool }
    }
}

impl ProductRepository for DProductRepository {
    fn save(&self, product: &NewProduct) -> Product {
        let mut conn = self.pool.get().unwrap();
        diesel::insert_into(products::table)
            .values(product)
            .returning(Product::as_returning())
            .get_result(&mut conn)
            .expect("Failed to create a product")
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
