use chrono::NaiveDateTime;
use diesel::{prelude::{AsChangeset, Insertable, Queryable, QueryableByName}, Selectable};

#[derive(Insertable, Queryable, QueryableByName, Selectable, AsChangeset)]
#[diesel(table_name = crate::models::schema::saleitems)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct SaleItems {
    pub id: i32,
    pub sale_id: i32,
    pub product_id: i32,
    pub quantity: f64,
    pub unit_price: f64,
    pub subtotal: f64,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Insertable)]
#[diesel(table_name = crate::models::schema::saleitems)]
pub struct NewSaleItems {
    pub sale_id: i32,
    pub product_id: i32,
    pub quantity: f64,
    pub unit_price: f64,
    pub subtotal: f64,
}

pub struct SaleItemsBuilder {
    sale_id: i32,
    product_id: i32,
    quantity: f64,
    unit_price: f64,
    subtotal: f64,
}

impl SaleItemsBuilder {
    pub fn new(sale_item: NewSaleItems) -> Self {
        Self {
            sale_id: sale_item.sale_id,
            product_id: sale_item.product_id,
            quantity: sale_item.quantity,
            unit_price: sale_item.unit_price,
            subtotal: sale_item.subtotal,
        }
    }

    pub fn sale_id(mut self, sale_id: i32) -> Self {
        self.sale_id = sale_id;
        self
    }

    pub fn product_id(mut self, product_id: i32) -> Self {
        self.product_id = product_id;
        self
    }

    pub fn quantity(mut self, quantity: f64) -> Self {
        self.quantity = quantity;
        self
    }

    pub fn unit_price(mut self, unit_price: f64) -> Self {
        self.unit_price = unit_price;
        self
    }

    pub fn subtotal(mut self, subtotal: f64) -> Self {
        self.subtotal = subtotal;
        self
    }
}
