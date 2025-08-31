use chrono::NaiveDateTime;
use diesel::prelude::*;

#[derive(Insertable, Queryable, QueryableByName, Selectable, AsChangeset)]
#[diesel(table_name = crate::models::schema::stockmovements)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct StockMovement {
    pub id: i32,
    pub product_id: i32,
    pub move_type: String,
    pub quantity: f64,
    pub origin: String,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Insertable)]
#[diesel(table_name = crate::models::schema::stockmovements)]
pub struct NewStockMovement {
    pub product_id: i32,
    pub move_type: String,
    pub quantity: f64,
    pub origin: String,
}

pub struct StockMovementBuilder {
    product_id: i32,
    move_type: String,
    quantity: f64,
    origin: String,
}

pub enum MoveType {
    StockInput,
    StockOutput,
    StockTransfer,
}

impl StockMovementBuilder {
    pub fn new(movement: NewStockMovement) -> Self {
        Self {
            product_id: movement.product_id,
            move_type: movement.move_type,
            quantity: movement.quantity,
            origin: movement.origin,
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

    pub fn build(self) -> NewStockMovement {
        NewStockMovement {
            product_id: self.product_id,
            move_type: self.move_type,
            quantity: self.quantity,
            origin: self.origin,
        }
    }
}
