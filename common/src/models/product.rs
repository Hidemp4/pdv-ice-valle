use diesel::prelude::*;

#[derive(Insertable, Queryable, Selectable)]
#[diesel(table_name = crate::models::schema::products)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Product {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub barcode: f64,
    pub stock: i64,
    pub created_at: Option<String>,
    pub updated_at: Option<String>,
}

#[derive(Insertable)]
#[diesel(table_name = crate::models::schema::products)]
pub struct NewProduct {
    pub name: String,
    pub description: Option<String>,
    pub barcode: f64,
    pub stock: i64,
}

pub struct ProductBuilder {
    name: String,
    description: Option<String>,
    barcode: f64,
    stock: i64,
}

impl ProductBuilder {
    pub fn new(name: String, barcode: f64, stock: i64) -> Self {
        Self {
            name,
            description: None,
            barcode,
            stock,
        }
    }

    pub fn name(mut self, name: String) -> Self {
        self.name = name;
        self
    }

    pub fn barcode(mut self, barcode: f64) -> Self {
        self.barcode = barcode;
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
            barcode: self.barcode,
            stock: self.stock,
        }
    }
}
