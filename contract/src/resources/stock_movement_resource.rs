use chrono::NaiveDateTime;
use pdcommon::models::stock_movement::{MoveType, StockMovement};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Debug)]
pub struct StockMovementResponse {
    pub id: i32,
    pub product_id: i32,
    pub move_type: String,
    pub quantity: f64,
    pub origin: String,
    pub reference_id: Option<i32>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Deserialize, Debug)]
pub struct StockMovementRequest {
    pub id: Option<i32>,
    pub product_id: i32,
    pub move_type: MoveType,
    pub quantity: f64,
    pub origin: String,
    pub reference_id: Option<i32>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

impl From<StockMovementRequest> for StockMovement {
    fn from(value: StockMovementRequest) -> Self {
        Self {
            id: value.id.unwrap_or_default(),
            product_id: value.product_id,
            move_type: match value.move_type {
                MoveType::StockInput => String::from("StockInput"),
                MoveType::StockOutput => String::from("StockOuput"),
                MoveType::StockTransfer => String::from("StockTransfer"),
            },
            quantity: value.quantity,
            origin: value.origin,
            reference_id: value.reference_id,
            created_at: value.created_at,
            updated_at: value.updated_at,
        }
    }
}

impl From<StockMovement> for StockMovementResponse {
    fn from(value: StockMovement) -> Self {
        Self {
            id: value.id,
            product_id: value.product_id,
            move_type: value.move_type,
            quantity: value.quantity,
            origin: value.origin,
            reference_id: value.reference_id,
            created_at: value.created_at,
            updated_at: value.updated_at,
        }
    }
}

impl StockMovementResponse {
    pub fn collection(items: Vec<StockMovement>) -> Vec<Self> {
        items.into_iter().map(StockMovementResponse::from).collect()
    }
}
