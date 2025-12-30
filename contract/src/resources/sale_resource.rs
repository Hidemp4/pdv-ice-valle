use chrono::NaiveDateTime;
use pdcommon::models::sale::Sale;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Debug)]
pub struct SaleResponse {
    pub id: i32,
    pub total_gross: f64,
    pub total_net: f64,
    pub payment_method: String,
    pub status: String,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Deserialize, Debug)]
pub struct SaleRequest {
    pub id: Option<i32>,
    pub total_gross: f64,
    pub total_net: f64,
    pub payment_method: String,
    pub status: String,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

impl From<SaleRequest> for Sale {
    fn from(value: SaleRequest) -> Self {
        Self {
            id: value.id.unwrap_or_default(),
            total_gross: value.total_gross,
            total_net: value.total_net,
            payment_method: value.payment_method,
            status: value.status,
            created_at: value.created_at,
            updated_at: value.updated_at,
        }
    }
}

impl From<Sale> for SaleResponse {
    fn from(value: Sale) -> Self {
        Self {
            id: value.id,
            total_gross: value.total_gross,
            total_net: value.total_net,
            payment_method: value.payment_method,
            status: value.status,
            created_at: value.created_at,
            updated_at: value.updated_at,
        }
    }
}

impl SaleResponse {
    pub fn collection(sales: Vec<Sale>) -> Vec<Self> {
        sales.into_iter().map(SaleResponse::from).collect()
    }
}
