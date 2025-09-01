use std::sync::Arc;

use pdcommon::{
    infrastructure::DbPool,
    models::stock::{Stock, StockBuilder},
    services::{stock_movements_service::StockMovementService, stock_service::StockService},
};
use pdcontract::resources::{
    stock_movement_resource::StockMovementResponse,
    stock_resource::{StockRequest, StockResponse},
    DataResponse,
};
use tauri::State;

#[tauri::command]
pub fn create_stock_item(
    stock_item: StockRequest,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<StockResponse>, DataResponse<String>> {
    let service = StockService::new(pool.inner().clone());

    let builder = StockBuilder::new(stock_item.product_id, stock_item.quantity);
    match service.create(builder) {
        Ok(res) => Ok(DataResponse::success(StockResponse::from(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}

#[tauri::command]
pub fn update_stock_item(
    stock_item: StockRequest,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<StockResponse>, DataResponse<String>> {
    let service = StockService::new(pool.inner().clone());

    match service.update(&Stock::from(stock_item)) {
        Ok(res) => Ok(DataResponse::success(StockResponse::from(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}

#[tauri::command]
pub fn get_all_stock_items(
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<Vec<StockResponse>>, DataResponse<String>> {
    let service = StockService::new(pool.inner().clone());

    match service.all() {
        Ok(res) => Ok(DataResponse::success(StockResponse::collection(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}

#[tauri::command]
pub fn get_stock_item_by_id(
    stock_id: i32,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<StockResponse>, DataResponse<String>> {
    let service = StockService::new(pool.inner().clone());

    match service.get(stock_id) {
        Ok(res) => Ok(DataResponse::success(StockResponse::from(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}

#[tauri::command]
pub fn get_stock_movement_by_id(
    movement_id: i32,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<StockMovementResponse>, DataResponse<String>> {
    let service = StockMovementService::new(pool.inner().clone());

    match service.get(movement_id) {
        Ok(res) => Ok(DataResponse::success(StockMovementResponse::from(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}
