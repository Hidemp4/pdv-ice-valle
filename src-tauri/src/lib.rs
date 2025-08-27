use std::sync::Arc;
use tauri::Manager;
use pdcommon::infrastructure::*;

mod commands;
mod resources;

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
            commands::product_commands::create_product,
            commands::product_commands::update_product,
            commands::product_commands::get_all_products,
            commands::product_commands::get_product_by_sku
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
