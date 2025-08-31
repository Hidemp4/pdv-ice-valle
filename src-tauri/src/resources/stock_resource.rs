use chrono::NaiveDateTime;
use pdcommon::models::stock::Stock;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Debug)]
pub struct StockResponse {
    pub id: i32,
    pub product_id: i32,
    pub quantity: Option<f64>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Deserialize, Debug)]
pub struct StockRequest {
    pub id: Option<i32>,
    pub product_id: i32,
    pub quantity: Option<f64>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

impl From<StockRequest> for Stock {
    fn from(value: StockRequest) -> Self {
        Self {
            id: value.id.unwrap_or_default(),
            product_id: value.product_id,
            quantity: value.quantity,
            created_at: value.created_at,
            updated_at: value.updated_at,
        }
    }
}

impl From<Stock> for StockResponse {
    fn from(value: Stock) -> Self {
        Self {
            id: value.id,
            product_id: value.product_id,
            quantity: value.quantity,
            created_at: value.created_at,
            updated_at: value.updated_at,
        }
    }
}

impl StockResponse {
    pub fn collection(items: Vec<Stock>) -> Vec<Self> {
        items.into_iter().map(StockResponse::from).collect()
    }
}
