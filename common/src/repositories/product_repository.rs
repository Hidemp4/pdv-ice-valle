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

        match products
            .left_join(categories::table)
            .select((Product::as_select(), categories::all_columns.nullable()))
            .get_results::<(Product, Option<Category>)>(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn save(&self, product: &NewProduct) -> Result<(Product, Option<Category>), Error> {
        let mut conn = self.pool.get().unwrap();
        match diesel::insert_into(products::table)
            .values(product)
            .returning(Product::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => Ok((data, None)),
            Err(err) => Err(err),
        }
    }

    fn save_with_category(
        &self,
        product: &NewProductWithCategory,
    ) -> Result<(Product, Option<Category>), Error> {
        let mut conn = self.pool.get().unwrap();
        match diesel::insert_into(products::table)
            .values(product)
            .returning(Product::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => {
                let (product, category) = self.find_by_id(data.id)?;
                Ok((product, Some(category)))
            }
            Err(err) => Err(err),
        }
    }

    fn update(&self, product_id: i32, product: &Product) -> Result<(Product, Category), Error> {
        let mut conn = self.pool.get().unwrap();

        match diesel::update(products)
            .filter(id.eq(product_id))
            .set(product)
            .returning(Product::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => {
                let product = self.find_by_id(data.id)?;
                Ok(product)
            }
            Err(err) => Err(err),
        }
    }

    fn delete(&self, product_id: i32) -> Result<(), Error> {
        let mut conn = self.pool.get().unwrap();
        match diesel::delete(products)
        .filter(id.eq(product_id))
        .execute(&mut conn)
        {
            Ok(_) => {
                Ok(())
            },
            Err(err) => Err(err)
        }
    }

    fn find_by_id(&self, product_id: i32) -> Result<(Product, Category), Error> {
        let mut conn = self.pool.get().unwrap();

        match products
            .filter(id.eq(product_id))
            .inner_join(categories::table)
            .select((Product::as_select(), Category::as_select()))
            .get_result::<(Product, Category)>(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn find_by_sku(&self, qsku: String) -> Result<(Product, Category), Error> {
        let mut conn = self.pool.get().unwrap();

        match products
            .filter(sku.eq(qsku))
            .inner_join(categories::table)
            .select((Product::as_select(), Category::as_select()))
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }
}
