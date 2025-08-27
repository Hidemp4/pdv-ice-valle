use std::sync::Arc;

use pdcommon::{
    infrastructure::DbPool, models::product::ProductBuilder,
    services::product_service::ProductService,
};
use tauri::State;

use crate::resources::product_resource::{ProductRequest, ProductResponse};

#[tauri::command]
pub async fn create_product(
    product: ProductRequest,
    pool: State<'_, Arc<DbPool>>,
) -> Result<ProductResponse, String> {
    let service = ProductService::new(pool.inner().clone());

    let builder = ProductBuilder::new(
        product.name,
        product.description.unwrap_or_default(),
        product.sku,
        product.price,
        product.stock,
    );
    
    match service.create(builder) {
        Ok(res) => Ok(ProductResponse::from(res)),
        Err(err) => Err(err.to_string())
    }
}

#[tauri::command]
pub async fn update_product(
    pool: State<'_, Arc<DbPool>>,
    product: ProductRequest,
) -> Result<String, ()> {
    println!("product: {:#?} from connection {:#?}", product, pool);
    Ok("updated product".into())
}

#[tauri::command]
pub async fn get_all_products(pool: State<'_, Arc<DbPool>>) -> Result<String, ()> {
    Ok("all products".into())
}

#[tauri::command]
pub async fn get_product_by_sku(pool: State<'_, Arc<DbPool>>, sku: String) -> Result<String, ()> {
    println!("sku: {:#?}", sku);
    Ok("product sku".into())
}
