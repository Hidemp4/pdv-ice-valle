use std::sync::Arc;

use pdcommon::{
    infrastructure::DbPool,
    models::category::{Category, CategoryBuilder},
    services::category_service::CategoryService,
};
use tauri::State;

use crate::resources::{
    category_resource::{CategoryRequest, CategoryResponse},
    DataResponse,
};

#[tauri::command]
pub fn create_category(
    category: CategoryRequest,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<CategoryResponse>, DataResponse<String>> {
    let service = CategoryService::new(pool.inner().clone());

    let builder = CategoryBuilder::new(category.name);
    let builder = if let Some(description) = category.description {
        builder.description(description)
    } else {
        builder
    };

    match service.create(builder) {
        Ok(res) => Ok(DataResponse::success(CategoryResponse::from(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}

#[tauri::command]
pub fn update_category(
    category: CategoryRequest,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<CategoryResponse>, DataResponse<String>> {
    let service = CategoryService::new(pool.inner().clone());

    match service.update(&Category::from(category)) {
        Ok(res) => Ok(DataResponse::success(CategoryResponse::from(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}

#[tauri::command]
pub fn get_all_categories(
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<Vec<CategoryResponse>>, DataResponse<String>> {
    let service = CategoryService::new(pool.inner().clone());

    match service.all() {
        Ok(res) => Ok(DataResponse::success(CategoryResponse::collection(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}

#[tauri::command]
pub fn get_category_by_id(
    category_id: i32,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<CategoryResponse>, DataResponse<String>> {
    let service = CategoryService::new(pool.inner().clone());

    match service.get(category_id) {
        Ok(res) => Ok(DataResponse::success(CategoryResponse::from(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}
