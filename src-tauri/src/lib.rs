use pdcommon::infrastructure::*;
use std::sync::Arc;
use tauri::Manager;

mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let data_dir = app.path().app_data_dir().unwrap();

            let mut data_dir = data_dir.into_os_string().into_string().unwrap();
            data_dir.push_str("/dev.db");

            let pool = Arc::new(db_pool(&data_dir));
            app.manage(pool);
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            /* product commands */
            commands::product_commands::create_product,
            commands::product_commands::update_product,
            commands::product_commands::get_all_products,
            commands::product_commands::get_product_by_sku,
            /* category commands */
            commands::category_commands::create_category,
            commands::category_commands::update_category,
            commands::category_commands::get_all_categories,
            commands::category_commands::get_category_by_id,
            /* stock commands */
            commands::stock_commands::create_stock_item,
            commands::stock_commands::update_stock_item,
            commands::stock_commands::get_all_stock_items,
            commands::stock_commands::get_stock_item_by_id,
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
