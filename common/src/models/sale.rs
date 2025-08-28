use chrono::NaiveDateTime;
use diesel::{prelude::{AsChangeset, Insertable, QueryableByName}, Selectable};

#[derive(Insertable, QueryableByName, Selectable, AsChangeset)]
#[diesel(table_name = crate::models::schema::sales)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Sale {
    pub id: i32,
    pub total_gross: f64,
    pub total_net: f64,
    pub payment_method: String,
    pub status: String,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Insertable)]
#[diesel(table_name = crate::models::schema::sales)]
pub struct NewSale {
    pub total_gross: f64,
    pub total_net: f64,
    pub payment_method: String,
    pub status: Option<String>,
}

pub struct SaleBuilder {
    total_gross: f64,
    total_net: f64,
    payment_method: String,
    status: Option<String>,
}

impl SaleBuilder {
    pub fn new(total_gross: f64, total_net: f64, payment_method: String) -> Self {
        Self {
            total_gross,
            total_net,
            payment_method,
            status: Some(String::from("open")),
        }
    }

    pub fn total_gross(mut self, total_gross: f64) -> Self {
        self.total_gross = total_gross;
        self
    }

    pub fn total_net(mut self, total_net: f64) -> Self {
        self.total_net = total_net;
        self
    }

    pub fn payment_method(mut self, payment_method: impl Into<String>) -> Self {
        self.payment_method = payment_method.into();
        self
    }

    pub fn status(mut self, status: impl Into<String>) -> Self {
        self.status = Some(status.into());
        self
    }
}
