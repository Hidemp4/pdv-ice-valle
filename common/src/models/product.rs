use crate::models::category::Category;
use diesel::prelude::*;

#[derive(Insertable, Queryable, QueryableByName, Selectable, AsChangeset, Associations)]
#[diesel(table_name = crate::models::schema::products)]
#[diesel(belongs_to(Category))]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Product {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub category_id: Option<i32>,
    pub price: f64,
    pub sku: String,
    pub created_at: Option<chrono::NaiveDateTime>,
    pub updated_at: Option<chrono::NaiveDateTime>,
}

#[derive(Insertable)]
#[diesel(table_name = crate::models::schema::products)]
pub struct NewProduct {
    pub name: String,
    pub description: Option<String>,
    pub sku: String,
    pub price: f64,
}

#[derive(Insertable)]
#[diesel(table_name = crate::models::schema::products)]
pub struct NewProductWithCategory {
    pub name: String,
    pub description: Option<String>,
    pub category_id: Option<i32>,
    pub sku: String,
    pub price: f64,
}

#[derive(Debug)]
pub struct ProductBuilder {
    name: String,
    description: Option<String>,
    catagory_id: Option<i32>,
    sku: String,
    price: f64,
}

impl ProductBuilder {
    pub fn new(
        name: impl Into<String>,
        description: impl Into<String>,
        sku: impl Into<String>,
        price: f64,
    ) -> Self {
        Self {
            name: name.into(),
            description: Some(description.into()),
            catagory_id: None,
            sku: sku.into(),
            price,
        }
    }

    pub fn name(mut self, name: impl Into<String>) -> Self {
        self.name = name.into();
        self
    }

    pub fn sku(mut self, sku: impl Into<String>) -> Self {
        self.sku = sku.into();
        self
    }

    pub fn price(mut self, price: f64) -> Self {
        self.price = price;
        self
    }

    pub fn description(mut self, description: impl Into<String>) -> Self {
        self.description = Some(description.into());
        self
    }

    pub fn category(mut self, category_id: Option<i32>) -> Self {
        self.catagory_id = category_id;
        self
    }

    pub fn get_category(&self) -> Option<i32> {
        self.catagory_id
    }

    pub fn build_category(self) -> NewProductWithCategory {
        NewProductWithCategory {
            name: self.name,
            description: self.description,
            category_id: self.catagory_id,
            sku: self.sku,
            price: self.price,
        }
    }

    pub fn build(self) -> NewProduct {
        NewProduct {
            name: self.name,
            description: self.description,
            sku: self.sku,
            price: self.price,
        }
    }
}
