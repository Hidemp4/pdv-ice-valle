use diesel::SqliteConnection;
use diesel::r2d2::{self, ConnectionManager};
use diesel_migrations::{EmbeddedMigrations, MigrationHarness, embed_migrations};

pub const MIGRATIONS: EmbeddedMigrations =
    embed_migrations!("D:\\Projects\\pdv-ice-valle\\common\\migrations");
pub type DbPool = r2d2::Pool<ConnectionManager<SqliteConnection>>;

pub fn db_pool(url: &str) -> DbPool {
    let manager = ConnectionManager::<SqliteConnection>::new(url);

    let pool = r2d2::Pool::builder()
        .build(manager)
        .expect("Failed to create a pool");

    let _ = pool.get().unwrap().run_pending_migrations(MIGRATIONS);

    pool
}
