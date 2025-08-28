use std::sync::Arc;

use crate::infrastructure::DbPool;

pub struct DCategoryRepository {
    pool: Arc<DbPool>,
}

impl DCategoryRepository {
    pub fn new(pool: Arc<DbPool>) -> Self {
        Self { pool }
    }
}
pub trait CategoryRepository {
    fn all(&self) -> Result<(), ()>;
    fn save(&self) -> Result<(), ()>;
    fn update(&self) -> Result<(), ()>;
    fn find_by_id(&self) -> Result<(), ()>;
}

impl CategoryRepository for DCategoryRepository {
    fn all(&self) -> Result<(), ()> {
        Ok(())
    }

    fn save(&self) -> Result<(), ()> {
        Ok(())
    }

    fn update(&self) -> Result<(), ()> {
        Ok(())
    }

    fn find_by_id(&self) -> Result<(), ()> {
        Ok(())
    }
}
