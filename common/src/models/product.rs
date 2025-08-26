use diesel::prelude::*;

#[derive(Insertable, Queryable, QueryableByName, Selectable, AsChangeset)]
#[diesel(table_name = crate::models::schema::products)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Product {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub sku: String,
    pub stock: i64,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub updated_at: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable)]
#[diesel(table_name = crate::models::schema::products)]
pub struct NewProduct {
    pub name: String,
    pub description: Option<String>,
    pub sku: String,
    pub price: f64,
    pub stock: i64,
}

pub struct ProductBuilder {
    name: String,
    description: Option<String>,
    sku: String,
    price: f64,
    stock: i64,
}

impl ProductBuilder {
    pub fn new(name: impl Into<String>, sku: impl Into<String>, price: f64, stock: i64) -> Self {
        Self {
            name: name.into(),
            description: None,
            sku: sku.into(),
            price,
            stock,
        }
    }

    pub fn name(mut self, name: impl Into<String>) -> Self {
        self.name = name.into();
        self
    }

    pub fn sku(mut self, sku: impl Into<String>) -> Self {
        self.sku = sku.into();
        self
    }

    pub fn price(mut self, price: f64) -> Self {
        self.price = price;
        self
    }

    pub fn stock(mut self, stock: i64) -> Self {
        self.stock = stock;
        self
    }

    pub fn description(mut self, description: impl Into<String>) -> Self {
        self.description = Some(description.into());
        self
    }

    pub fn build(self) -> NewProduct {
        NewProduct {
            name: self.name,
            description: self.description,
            sku: self.sku,
            price: self.price,
            stock: self.stock,
        }
    }
}
