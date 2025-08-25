use diesel::{SqliteConnection};
use diesel::r2d2::{self, ConnectionManager};

pub type DbPool = r2d2::Pool<ConnectionManager<SqliteConnection>>;

pub fn db_pool(url: &str) -> DbPool {
    let manager = ConnectionManager::<SqliteConnection>::new(url);
    r2d2::Pool::builder()
    .build(manager)
    .expect("Failed to create a pool")
}
