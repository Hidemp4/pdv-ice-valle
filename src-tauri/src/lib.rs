use pdcommon::infrastructure::*;
use std::sync::Arc;
use tauri::Manager;

mod commands;

#[cfg_attr(mobile, tauri::mobile_entry_point)]
pub fn run() {
    tauri::Builder::default()
        .plugin(tauri_plugin_dialog::init())
        .plugin(tauri_plugin_fs::init())
        .plugin(tauri_plugin_opener::init())
        .setup(|app| {
            let data_dir = app.path().app_data_dir().unwrap();

            let mut data_dir = data_dir.into_os_string().into_string().unwrap();
            data_dir.push_str("/dev.db");

            match db_pool(&data_dir) {
                Ok(pool) => {
                    app.manage(Arc::new(pool));
                }
                Err(err) => {
                    println!("Error: {}", err);
                }
            }
            Ok(())
        })
        .invoke_handler(tauri::generate_handler![
            /* product commands */
            commands::product_commands::create_product,
            commands::product_commands::delete_product,
            commands::product_commands::update_product,
            commands::product_commands::get_all_products,
            commands::product_commands::get_product_by_id,
            commands::product_commands::get_product_by_sku,
            commands::product_commands::debug_list_all_skus,
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
            commands::stock_commands::get_stock_movement_by_id,
            /* sale commands */
            commands::sale_commands::create_sale,
            commands::sale_commands::get_sale_by_id,
            commands::sale_commands::create_sale_items,
            commands::sale_commands::get_sale_item_by_id
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
