use chrono::NaiveDateTime;
use pdcommon::models::sale_items::SaleItems;
use serde::{Deserialize, Serialize};

#[derive(Deserialize, Debug)]
pub struct SaleItemRequest {
    pub id: Option<i32>,
    pub sale_id: i32,
    pub product_id: i32,
    pub quantity: f64,
    pub unit_price: f64,
    pub subtotal: f64,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Serialize, Debug)]
pub struct SaleItemResponse {
    pub id: i32,
    pub sale_id: i32,
    pub product_id: i32,
    pub quantity: f64,
    pub unit_price: f64,
    pub subtotal: f64,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

impl From<SaleItemRequest> for SaleItems {
    fn from(value: SaleItemRequest) -> Self {
        Self {
            id: value.id.unwrap_or_default(),
            sale_id: value.sale_id,
            product_id: value.product_id,
            quantity: value.quantity,
            unit_price: value.unit_price,
            subtotal: value.subtotal,
            created_at: value.created_at,
            updated_at: value.updated_at,
        }
    }
}

impl From<SaleItems> for SaleItemResponse {
    fn from(value: SaleItems) -> Self {
        Self {
            id: value.id,
            sale_id: value.sale_id,
            product_id: value.product_id,
            quantity: value.quantity,
            unit_price: value.unit_price,
            subtotal: value.subtotal,
            created_at: value.created_at,
            updated_at: value.updated_at,
        }
    }
}

impl SaleItemResponse {
    pub fn collection(items: Vec<SaleItems>) -> Vec<Self> {
        items.into_iter().map(SaleItemResponse::from).collect()
    }
}
