// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

mod database;

use database::{Database, Produto, NovoProduto};
use std::sync::Mutex;
use tauri::{Manager, State};

type DbState = Mutex<Database>;

// Função para popular o banco com dados de teste
fn popular_banco_com_dados_teste(app_handle: &tauri::AppHandle) -> Result<(), anyhow::Error> {
    let database = Database::new(app_handle)?;
    
    // Produtos de teste
    let produtos_teste = vec![
        NovoProduto {
            nome_produto: "Copão de Morango KiBom 350ml".to_string(),
            sku: "12345".to_string(),
            preco_uni: 7.50,
        },
        NovoProduto {
            nome_produto: "Pastel de Pizza".to_string(),
            sku: "23456".to_string(),
            preco_uni: 8.50,
        },
        NovoProduto {
            nome_produto: "Milk Shake de Paçoca P".to_string(),
            sku: "34567".to_string(),
            preco_uni: 5.50,
        },
    ];

    for produto in produtos_teste {
        // Verifica se o produto já existe antes de inserir
        if database.buscar_produto_por_sku(&produto.sku)?.is_none() {
            if let Err(e) = database.inserir_produto(produto) {
                println!("Erro ao inserir produto de teste: {}", e);
            }
        }
    }

    Ok(())
}

#[tauri::command]
fn buscar_produto_por_sku(sku: String, db: State<DbState>) -> Result<Option<Produto>, String> {
    let db = db.lock().map_err(|e| e.to_string())?;
    db.buscar_produto_por_sku(&sku).map_err(|e| e.to_string())
}

#[tauri::command]
fn listar_produtos(db: State<DbState>) -> Result<Vec<Produto>, String> {
    let db = db.lock().map_err(|e| e.to_string())?;
    db.listar_produtos().map_err(|e| e.to_string())
}

#[tauri::command]
fn inserir_produto(produto: NovoProduto, db: State<DbState>) -> Result<i64, String> {
    let db = db.lock().map_err(|e| e.to_string())?;
    db.inserir_produto(produto).map_err(|e| e.to_string())
}

#[tauri::command]
fn atualizar_produto(id: i64, produto: NovoProduto, db: State<DbState>) -> Result<(), String> {
    let db = db.lock().map_err(|e| e.to_string())?;
    db.atualizar_produto(id, produto).map_err(|e| e.to_string())
}

#[tauri::command]
fn deletar_produto(id: i64, db: State<DbState>) -> Result<(), String> {
    let db = db.lock().map_err(|e| e.to_string())?;
    db.deletar_produto(id).map_err(|e| e.to_string())
}

fn main() {
    tauri::Builder::default()
        .setup(|app| {
            // Inicializar o banco de dados usando o AppHandle
            let database = Database::new(app.handle()).expect("Failed to initialize database");
            
            // Popular com dados de teste (você pode remover isso depois)
            if let Err(e) = popular_banco_com_dados_teste(app.handle()) {
                println!("Erro ao popular banco com dados de teste: {}", e);
            }
            
            // Gerenciar o estado do banco de dados
            app.manage(Mutex::new(database));
            
            Ok(())
        })
        .plugin(tauri_plugin_opener::init())
        .invoke_handler(tauri::generate_handler![
            buscar_produto_por_sku,
            listar_produtos,
            inserir_produto,
            atualizar_produto,
            deletar_produto
        ])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}