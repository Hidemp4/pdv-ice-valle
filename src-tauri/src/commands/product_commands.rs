use std::sync::Arc;

use pdcommon::{
    infrastructure::DbPool,
    models::product::{Product, ProductBuilder},
    services::product_service::ProductService,
};
use pdcontract::resources::{
    product_resource::{ProductRequest, ProductResponse},
    DataResponse,
};
use tauri::State;

#[tauri::command]
pub async fn create_product(
    product: ProductRequest,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<ProductResponse>, DataResponse<String>> {
    let service = ProductService::new(pool.inner().clone());

    let builder = ProductBuilder::new(
        product.name,
        product.description.unwrap_or_default(),
        product.sku,
        product.price,
    );

    let builder = if let Some(category_id) = product.category_id {
        builder.category(category_id)
    } else {
        builder
    };

    match service.create(builder) {
        Ok(res) => Ok(DataResponse::success(ProductResponse::from(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}

#[tauri::command]
pub async fn update_product(
    product_id: i32,
    data: ProductRequest,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<ProductResponse>, DataResponse<String>> {
    let service = ProductService::new(pool.inner().clone());

    match service.update(product_id, &Product::from(data)) {
        Ok(res) => Ok(DataResponse::success(ProductResponse::from(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}

#[tauri::command]
pub async fn get_all_products(
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<Vec<ProductResponse>>, DataResponse<String>> {
    let service = ProductService::new(pool.inner().clone());

    match service.all() {
        Ok(res) => Ok(DataResponse::success(
            ProductResponse::collection_with_category(res),
        )),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}

#[tauri::command]
pub async fn get_product_by_id(
    product_id: i32,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<ProductResponse>, DataResponse<String>> {
    let service = ProductService::new(pool.inner().clone());

    match service.get(product_id) {
        Ok(res) => Ok(DataResponse::success(ProductResponse::from(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}

#[tauri::command]
pub async fn get_product_by_sku(
    sku: String,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<ProductResponse>, DataResponse<String>> {
    let service = ProductService::new(pool.inner().clone());

    match service.get_by_sku(sku) {
        Ok(res) => Ok(DataResponse::success(ProductResponse::from(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}
