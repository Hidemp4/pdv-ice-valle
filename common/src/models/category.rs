use chrono::NaiveDateTime;
use diesel::{
    Selectable,
    prelude::{AsChangeset, Insertable, QueryableByName},
};

#[derive(Insertable, QueryableByName, Selectable, AsChangeset)]
#[diesel(table_name = crate::models::schema::categories)]
#[diesel(check_for_backend(diesel::sqlite::Sqlite))]
pub struct Category {
    pub id: i32,
    pub name: String,
    pub description: Option<String>,
    pub created_at: Option<NaiveDateTime>,
    pub updated_at: Option<NaiveDateTime>,
}

#[derive(Insertable)]
#[diesel(table_name = crate::models::schema::categories)]
pub struct NewCategory {
    pub name: String,
    pub description: Option<String>,
}

pub struct CategoryBuilder {
    name: String,
    description: Option<String>,
}

impl CategoryBuilder {
    pub fn new(name: impl Into<String>) -> Self {
        Self {
            name: name.into(),
            description: None,
        }
    }

    pub fn name(mut self, name: impl Into<String>) -> Self {
        self.name = name.into();
        self
    }

    pub fn description(mut self, description: impl Into<String>) -> Self {
        self.description = Some(description.into());
        self
    }

    pub fn build(self) -> NewCategory {
        NewCategory {
            name: self.name,
            description: self.description,
        }
    }
}
