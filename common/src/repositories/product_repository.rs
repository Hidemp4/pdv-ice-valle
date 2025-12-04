use self::schema::products::dsl::*;
use std::sync::Arc;

use crate::models::{
    category::Category,
    product::{NewProduct, NewProductWithCategory},
    schema::{self, categories},
};
use diesel::prelude::*;
use diesel::result::Error;

use crate::{
    infrastructure::DbPool,
    models::{product::Product, schema::products},
};

pub struct DProductRepository {
    pool: Arc<DbPool>,
}

// The keyword "D" represents a diesel repository
impl DProductRepository {
    pub fn new(pool: Arc<DbPool>) -> Self {
        Self { pool }
    }
}

pub trait ProductRepository {
    fn all(&self) -> Result<Vec<(Product, Option<Category>)>, Error>;
    fn save(&self, product: &NewProduct) -> Result<(Product, Option<Category>), Error>;
    fn save_with_category(
        &self,
        product: &NewProductWithCategory,
    ) -> Result<(Product, Option<Category>), Error>;
    fn update(&self, product_id: i32, product: &Product) -> Result<(Product, Category), Error>;
    fn delete(&self, product_id: i32) -> Result<(), Error>;
    fn find_by_id(&self, product_id: i32) -> Result<(Product, Category), Error>;
    fn find_by_sku(&self, qsku: String) -> Result<(Product, Category), Error>;
}

impl ProductRepository for DProductRepository {
    fn all(&self) -> Result<Vec<(Product, Option<Category>)>, Error> {
        let mut conn = self.pool.get().unwrap();

        products
            .left_join(categories::table)
            .select((Product::as_select(), categories::all_columns.nullable()))
            .get_results::<(Product, Option<Category>)>(&mut conn)
    }

    fn save(&self, product: &NewProduct) -> Result<(Product, Option<Category>), Error> {
        let mut conn = self.pool.get().unwrap();

        let created = diesel::insert_into(products::table)
            .values(product)
            .returning(Product::as_returning())
            .get_result(&mut conn)?;

        Ok((created, None))
    }

    fn save_with_category(
        &self,
        product: &NewProductWithCategory,
    ) -> Result<(Product, Option<Category>), Error> {
        let mut conn = self.pool.get().unwrap();

        let created = diesel::insert_into(products::table)
            .values(product)
            .returning(Product::as_returning())
            .get_result::<Product>(&mut conn)?;

        // carregar produto + categoria
        let (prod, cat) = self.find_by_id(created.id)?;

        Ok((prod, Some(cat)))
    }

    fn update(&self, product_id: i32, product: &Product) -> Result<(Product, Category), Error> {
        let mut conn = self.pool.get().unwrap();

        let updated = diesel::update(products.filter(id.eq(product_id)))
            .set(product)
            .returning(Product::as_returning())
            .get_result::<Product>(&mut conn)?;

        self.find_by_id(updated.id)
    }

    fn delete(&self, product_id: i32) -> Result<(), Error> {
        let mut conn = self.pool.get().unwrap();

        diesel::delete(products.filter(id.eq(product_id))).execute(&mut conn)?;

        Ok(())
    }

    fn find_by_id(&self, product_id: i32) -> Result<(Product, Option<Category>), Error> {
        let mut conn = self.pool.get().unwrap();

        products
            .filter(id.eq(product_id))
            .left_join(categories::table)
            .select((Product::as_select(), categories::all_columns.nullable()))
            .get_result::<(Product, Option<Category>)>(&mut conn)
    }

    fn find_by_sku(&self, qsku: String) -> Result<(Product, Option<Category>), Error> {
        let mut conn = self.pool.get().unwrap();

        products
            .filter(sku.eq(qsku))
            .left_join(categories::table)
            .select((Product::as_select(), categories::all_columns.nullable()))
            .get_result::<(Product, Option<Category>)>(&mut conn)
    }
}
