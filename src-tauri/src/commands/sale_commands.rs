use std::sync::Arc;

use pdcommon::{
    infrastructure::DbPool,
    models::{
        sale::SaleBuilder,
        sale_items::{SaleItems, SaleItemsBuilder},
    },
    services::{sale_items_service::SaleItemsService, sale_service::SaleService},
};
use pdcontract::resources::{
    sale_item_resource::{SaleItemRequest, SaleItemResponse},
    sale_resource::{SaleRequest, SaleResponse},
    DataResponse,
};
use tauri::State;

#[tauri::command]
pub fn create_sale(
    sale: SaleRequest,
    sale_items: Vec<SaleItemRequest>,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<SaleResponse>, DataResponse<String>> {
    let service = SaleService::new(pool.inner().clone());

    let builder = SaleBuilder::new(sale.total_gross, sale.total_net, sale.payment_method);
    let items = sale_items.into_iter().map(SaleItems::from).collect();
    match service.create(
        builder,
        items
    ) {
        Ok(res) => Ok(DataResponse::success(SaleResponse::from(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}

#[tauri::command]
pub fn get_sale_by_id(
    sale_id: i32,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<SaleResponse>, DataResponse<String>> {
    let service = SaleService::new(pool.inner().clone());

    match service.get(sale_id) {
        Ok(res) => Ok(DataResponse::success(SaleResponse::from(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}

#[tauri::command]
pub fn create_sale_items(
    items: Vec<SaleItemRequest>,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<Vec<SaleItemResponse>>, DataResponse<Vec<String>>> {
    let service = SaleItemsService::new(pool.inner().clone());

    let mut created_items: Vec<SaleItems> = vec![];
    let mut errors: Vec<String> = vec![];

    for item in items {
        let builder = SaleItemsBuilder::new(
            item.sale_id,
            item.product_id,
            item.quantity,
            item.unit_price,
            item.subtotal,
        );

        match service.create(builder) {
            Ok(item) => created_items.push(item),
            Err(err) => errors.push(err.to_string()),
        }
    }

    if !errors.is_empty() {
        Err(DataResponse::error(errors))
    } else {
        Ok(DataResponse::success(SaleItemResponse::collection(
            created_items,
        )))
    }
}

#[tauri::command]
pub fn get_sale_item_by_id(
    sale_id: i32,
    pool: State<'_, Arc<DbPool>>,
) -> Result<DataResponse<SaleItemResponse>, DataResponse<String>> {
    let service = SaleItemsService::new(pool.inner().clone());

    match service.get(sale_id) {
        Ok(res) => Ok(DataResponse::success(SaleItemResponse::from(res))),
        Err(err) => Err(DataResponse::error(err.to_string())),
    }
}
