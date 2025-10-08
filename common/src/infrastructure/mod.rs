use diesel::r2d2::{self, ConnectionManager};
use diesel::sqlite::SqliteConnection;
use diesel_migrations::{EmbeddedMigrations, MigrationHarness, embed_migrations};
use std::fs;
use std::path::Path;

pub const MIGRATIONS: EmbeddedMigrations =
    embed_migrations!("C:\\Users\\augus\\Projects\\pdv-ice-valle\\common\\migrations");

pub type DbPool = r2d2::Pool<ConnectionManager<SqliteConnection>>;

pub fn db_pool(url: &str) -> Result<DbPool, String> {
    let path = Path::new(url);
    
    if let Some(parent) = path.parent() {
        if !parent.exists() {
            fs::create_dir_all(parent).map_err(|e| e.to_string())?;
        }
    }
    
    println!("{:?}", path);
    
    if !path.exists() {
        fs::File::create(path).map_err(|e| e.to_string())?;
    }

    let manager = ConnectionManager::<SqliteConnection>::new(url);

    let pool = r2d2::Pool::builder()
        .build(manager)
        .map_err(|e| e.to_string())?;

    {
        let mut conn = pool.get().map_err(|e| e.to_string())?;
        conn.run_pending_migrations(MIGRATIONS)
            .map_err(|e| e.to_string())?;
    }

    Ok(pool)
}
