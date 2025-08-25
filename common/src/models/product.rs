use diesel::prelude::*;

#[derive(Insertable, Queryable, Selectable)]
#[diesel(table_name = crate::models::schema::products)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Product {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub barcode: f64,
    pub stock: i64,
    pub created_at: String,
    pub updated_at: Option<String>,
}
