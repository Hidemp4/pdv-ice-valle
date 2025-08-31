use std::sync::Arc;

use pdcommon::infrastructure::DbPool;
use tauri::State;

#[tauri::command]
pub fn create_stock_item(pool: State<'_, Arc<DbPool>>) {}

#[tauri::command]
pub fn update_stock_item(pool: State<'_, Arc<DbPool>>) {}

#[tauri::command]
pub fn get_all_stock_items(pool: State<'_, Arc<DbPool>>) {}

#[tauri::command]
pub fn get_stock_item_by_id(pool: State<'_, Arc<DbPool>>) {}
