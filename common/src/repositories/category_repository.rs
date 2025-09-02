use std::sync::Arc;

use crate::infrastructure::DbPool;
use crate::models::category::{Category, NewCategory};
use crate::models::schema::categories::{self, dsl::*};
use diesel::{ExpressionMethods, QueryDsl, RunQueryDsl, SelectableHelper, result::Error};
pub struct DCategoryRepository {
    pool: Arc<DbPool>,
}

impl DCategoryRepository {
    pub fn new(pool: Arc<DbPool>) -> Self {
        Self { pool }
    }
}
pub trait CategoryRepository {
    fn all(&self) -> Result<Vec<Category>, Error>;
    fn save(&self, category: &NewCategory) -> Result<Category, Error>;
    fn update(&self, category: &Category) -> Result<Category, Error>;
    fn find_by_id(&self, category_id: i32) -> Result<Category, Error>;
}

impl CategoryRepository for DCategoryRepository {
    fn all(&self) -> Result<Vec<Category>, Error> {
        let mut conn = self.pool.get().unwrap();

        match categories
            .select(Category::as_select())
            .get_results(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn save(&self, category: &NewCategory) -> Result<Category, Error> {
        let mut conn = self.pool.get().unwrap();

        match diesel::insert_into(categories::table)
            .values(category)
            .returning(Category::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn update(&self, category: &Category) -> Result<Category, Error> {
        let mut conn = self.pool.get().unwrap();

        match diesel::update(categories)
            .filter(id.eq(category.id))
            .set(category)
            .returning(Category::as_returning())
            .get_result(&mut conn)
        {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }

    fn find_by_id(&self, category_id: i32) -> Result<Category, Error> {
        let mut conn = self.pool.get().unwrap();

        let result = categories
            .filter(id.eq(category_id))
            .select(Category::as_select())
            .get_result::<Category>(&mut conn);

        match result {
            Ok(data) => Ok(data),
            Err(err) => Err(err),
        }
    }
}
