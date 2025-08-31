use crate::models::product::Product;
use chrono::NaiveDateTime;
use diesel::prelude::*;

#[derive(Insertable, Queryable, QueryableByName, Selectable, AsChangeset, Associations)]
#[diesel(table_name = crate::models::schema::stock)]
#[diesel(belongs_to(Product))]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Stock {
    pub id: i32,
    pub product_id: i32,
    pub quantity: Option<f64>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Insertable)]
#[diesel(table_name = crate::models::schema::stock)]
pub struct NewStock {
    pub product_id: i32,
    pub quantity: Option<f64>,
}

pub struct StockBuilder {
    product_id: i32,
    quantity: Option<f64>,
}

impl StockBuilder {
    pub fn new(product_id: i32) -> Self {
        Self {
            product_id: product_id,
            quantity: None,
        }
    }

    pub fn product_id(mut self, product_id: i32) -> Self {
        self.product_id = product_id;
        self
    }

    pub fn quantity(mut self, quantity: f64) -> Self {
        self.quantity = Some(quantity);
        self
    }

    pub fn build(self) -> NewStock {
        NewStock {
            product_id: self.product_id,
            quantity: self.quantity,
        }
    }
}
