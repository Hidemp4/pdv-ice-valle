use rusqlite::{Connection, Result};
use serde::{Deserialize, Serialize};
use anyhow::Context;
use std::fs;
use tauri::Manager;

#[derive(Debug, Serialize, Deserialize, Clone)]
pub struct Produto {
    pub id: i64,
    pub nome_produto: String,
    pub sku: String,
    pub preco_uni: f64,
}

#[derive(Debug, Serialize, Deserialize)]
pub struct NovoProduto {
    pub nome_produto: String,
    pub sku: String,
    pub preco_uni: f64,
}

pub struct Database {
    conn: Connection,
}

impl Database {
    pub fn new(app_handle: &tauri::AppHandle) -> Result<Self, anyhow::Error> {
        // Usando o novo método para obter o diretório de dados no Tauri 2.0
        let app_dir = app_handle
            .path()
            .app_data_dir()
            .context("Failed to get app data directory")?;
        
        // Criando o diretório para armazenar dados da aplicação
        fs::create_dir_all(&app_dir)
            .context("Failed to create app directory")?;

        // Caminho completo do banco de dados
        let db_path = app_dir.join("pdv.db");
        let conn = Connection::open(&db_path)
            .context("Failed to open database")?;

        let db = Database { conn };
        db.create_tables()?;
        Ok(db)
    }

    fn create_tables(&self) -> Result<(), anyhow::Error> {
        self.conn.execute(
            "CREATE TABLE IF NOT EXISTS produtos (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                nome_produto TEXT NOT NULL,
                sku TEXT NOT NULL UNIQUE,
                preco_uni REAL NOT NULL
            )",
            [],
        ).context("Failed to create produtos table")?;

        Ok(())
    }

    pub fn inserir_produto(&self, produto: NovoProduto) -> Result<i64, anyhow::Error> {
        let mut stmt = self.conn.prepare(
            "INSERT INTO produtos (nome_produto, sku, preco_uni) VALUES (?1, ?2, ?3)"
        ).context("Failed to prepare insert statement")?;

        let id = stmt.insert(&[
            &produto.nome_produto,
            &produto.sku,
            &produto.preco_uni.to_string(),
        ]).context("Failed to insert produto")?;

        Ok(id)
    }

    pub fn buscar_produto_por_sku(&self, sku: &str) -> Result<Option<Produto>, anyhow::Error> {
        let mut stmt = self.conn.prepare(
            "SELECT id, nome_produto, sku, preco_uni FROM produtos WHERE sku = ?1"
        ).context("Failed to prepare select statement")?;

        let produto_iter = stmt.query_map([sku], |row| {
            Ok(Produto {
                id: row.get(0)?,
                nome_produto: row.get(1)?,
                sku: row.get(2)?,
                preco_uni: row.get(3)?,
            })
        }).context("Failed to query produto")?;

        for produto in produto_iter {
            return Ok(Some(produto?));
        }

        Ok(None)
    }

    pub fn listar_produtos(&self) -> Result<Vec<Produto>, anyhow::Error> {
        let mut stmt = self.conn.prepare(
            "SELECT id, nome_produto, sku, preco_uni FROM produtos ORDER BY nome_produto"
        ).context("Failed to prepare select statement")?;

        let produto_iter = stmt.query_map([], |row| {
            Ok(Produto {
                id: row.get(0)?,
                nome_produto: row.get(1)?,
                sku: row.get(2)?,
                preco_uni: row.get(3)?,
            })
        }).context("Failed to query produtos")?;

        let mut produtos = Vec::new();
        for produto in produto_iter {
            produtos.push(produto?);
        }

        Ok(produtos)
    }

    pub fn atualizar_produto(&self, id: i64, produto: NovoProduto) -> Result<(), anyhow::Error> {
        self.conn.execute(
            "UPDATE produtos SET nome_produto = ?1, sku = ?2, preco_uni = ?3 WHERE id = ?4",
            &[
                &produto.nome_produto,
                &produto.sku,
                &produto.preco_uni.to_string(),
                &id.to_string(),
            ],
        ).context("Failed to update produto")?;

        Ok(())
    }

    pub fn deletar_produto(&self, id: i64) -> Result<(), anyhow::Error> {
        self.conn.execute(
            "DELETE FROM produtos WHERE id = ?1",
            &[&id.to_string()],
        ).context("Failed to delete produto")?;

        Ok(())
    }
}