use chrono::NaiveDateTime;
use pdcommon::models::category::Category;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Debug)]
pub struct CategoryResponse {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Deserialize)]
pub struct CategoryRequest {
    pub id: Option<i32>,
    pub name: String,
    pub description: Option<String>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

impl From<CategoryRequest> for Category {
    fn from(value: CategoryRequest) -> Self {
        Self {
            id: value.id.unwrap_or_default(),
            name: value.name,
            description: value.description,
            created_at: value.created_at,
            updated_at: value.updated_at,
        }
    }
}

impl From<Category> for CategoryResponse {
    fn from(category: Category) -> Self {
        Self {
            id: category.id,
            name: category.name,
            description: category.description,
            created_at: category.created_at,
            updated_at: category.updated_at,
        }
    }
}

impl CategoryResponse {
    pub fn collection(categories: Vec<Category>) -> Vec<Self> {
        categories.into_iter().map(CategoryResponse::from).collect()
    }
}
