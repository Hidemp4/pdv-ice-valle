use chrono::NaiveDateTime;
use diesel::prelude::*;
use serde::Deserialize;

#[derive(Insertable, Queryable, QueryableByName, Selectable, AsChangeset)]
#[diesel(table_name = crate::models::schema::stockmovements)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct StockMovement {
    pub id: i32,
    pub product_id: i32,
    pub move_type: String,
    pub quantity: f64,
    pub origin: String,
    pub reference_id: Option<i32>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Insertable)]
#[diesel(table_name = crate::models::schema::stockmovements)]
pub struct NewStockMovement {
    pub product_id: i32,
    pub move_type: String,
    pub quantity: f64,
    pub reference_id: Option<i32>,
    pub origin: String,
}

pub struct StockMovementBuilder {
    product_id: i32,
    move_type: String,
    quantity: f64,
    origin: String,
    reference_id: Option<i32>,
}

#[derive(Deserialize, Debug)]
pub enum MoveType {
    StockInput,
    StockOutput,
    StockTransfer,
}

impl StockMovementBuilder {
    pub fn new(
        product_id: i32,
        move_type: MoveType,
        quantity: f64,
        origin: impl Into<String>,
    ) -> Self {
        Self {
            move_type: match move_type {
                MoveType::StockInput => String::from("StockInput"),
                MoveType::StockOutput => String::from("StockOutput"),
                MoveType::StockTransfer => String::from("StockTransfer"),
            },
            reference_id: None,
            origin: origin.into(),
            quantity,
            product_id,
        }
    }

    pub fn product_id(mut self, product_id: i32) -> Self {
        self.product_id = product_id;
        self
    }

    pub fn quantity(mut self, quantity: f64) -> Self {
        self.quantity = quantity;
        self
    }

    pub fn origin(mut self, origin: String) -> Self {
        self.origin = origin;
        self
    }

    pub fn move_type(mut self, move_type: MoveType) -> Self {
        let move_match = match move_type {
            MoveType::StockInput => "StockInput",
            MoveType::StockOutput => "StockOutput",
            MoveType::StockTransfer => "StockTransfer",
        };

        self.move_type = String::from(move_match);
        self
    }

    pub fn reference_id(mut self, reference_id: i32) -> Self {
        self.reference_id = Some(reference_id);
        self
    }

    pub fn build(self) -> NewStockMovement {
        NewStockMovement {
            product_id: self.product_id,
            move_type: self.move_type,
            quantity: self.quantity,
            origin: self.origin,
            reference_id: self.reference_id,
        }
    }
}
