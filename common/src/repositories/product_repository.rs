use diesel::{RunQueryDsl, SelectableHelper};

use crate::{
    infraestructure::DbPool,
    models::{self, product::Product, schema::products},
};

pub trait ProductRepository {
    fn save(&self, product: &Product) -> Product;
    fn find_by_id(&self, id: i32);
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
    fn save(&self, product: &Product) -> Product {
        let mut conn = self.pool.get().unwrap();
        let result = diesel::insert_into(products::table)
            .values(product)
            .returning(Product::as_returning())
            .get_result(&mut conn)
            .expect("Failed to create a product");

        result
    }

    fn find_by_id(&self, id: i32) {
        let mut conn = self.pool.get().unwrap();
    }
}
