use std::sync::Arc;

use diesel::result::Error;

use crate::{
    infrastructure::DbPool,
    models::category::{Category, CategoryBuilder},
    repositories::category_repository::{CategoryRepository, DCategoryRepository},
};

pub struct CategoryService {
    repository: DCategoryRepository,
}

impl CategoryService {
    pub fn new(pool: Arc<DbPool>) -> Self {
        let repository = DCategoryRepository::new(pool);
        Self { repository }
    }

    pub fn all(&self) -> Result<Vec<Category>, Error> {
        self.repository.all()
    }

    pub fn create(&self, builder: CategoryBuilder) -> Result<Category, Error> {
        let category = &builder.build();
        self.repository.save(category)
    }

    pub fn update(&self, category: &Category) -> Result<Category, Error> {
        self.repository.update(category)
    }

    pub fn get(&self, category_id: i32) -> Result<Category, Error> {
        self.repository.find_by_id(category_id)
    }
}
