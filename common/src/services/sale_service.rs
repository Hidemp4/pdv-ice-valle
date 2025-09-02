use core::fmt;
use std::{collections::HashMap, error, sync::Arc};

use diesel::result::Error;

use crate::{
    infrastructure::DbPool,
    models::{
        sale::{Sale, SaleBuilder, SaleStatus},
        sale_items::{SaleItems, SaleItemsBuilder},
        stock_movement::{MoveType, StockMovementBuilder},
    },
    repositories::sale_repository::{DSaleRepository, SaleRepository},
    services::{
        sale_items_service::SaleItemsService, stock_movements_service::StockMovementService,
        stock_service::StockService,
    },
};

pub struct SaleService {
    repository: DSaleRepository,
    saleitem_service: SaleItemsService,
    movement_service: StockMovementService,
    stock_service: StockService,
}

#[derive(Debug, Clone)]
pub enum SalesError {
    ProductLowStock(String),
    SaleItemsError(String),
    SaleError(String),
    ProcessSaleError(Vec<SalesError>),
}

impl fmt::Display for SalesError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            SalesError::SaleError(msg) => write!(f, "Sale service error: {}", msg),
            SalesError::ProductLowStock(msg) => write!(f, "Low product stock: {}", msg),
            SalesError::SaleItemsError(msg) => write!(f, "Error on sale items {}", msg),
            SalesError::ProcessSaleError(errs) => {
                write!(f, "Error to process sale \n")?;
                for err in errs {
                    writeln!(f, "- {}", err)?;
                }
                Ok(())
            }
        }
    }
}

impl error::Error for SalesError {}
impl From<Error> for SalesError {
    fn from(value: Error) -> Self {
        SalesError::SaleError(value.to_string())
    }
}

impl SaleService {
    pub fn new(pool: Arc<DbPool>) -> Self {
        let repository = DSaleRepository::new(pool.clone());
        let stock_service = StockService::new(pool.clone());
        let saleitem_service = SaleItemsService::new(pool.clone());
        let movement_service = StockMovementService::new(pool.clone());

        Self {
            repository,
            saleitem_service,
            movement_service,
            stock_service,
        }
    }

    pub fn all(&self) -> Result<Vec<Sale>, Error> {
        self.repository.all()
    }

    pub fn create(
        &self,
        sale_builder: SaleBuilder,
        saleitems: Vec<SaleItems>,
    ) -> Result<Sale, SalesError> {
        let sale = &sale_builder.build();
        let mut errors: Vec<SalesError> = vec![];

        let mut grouped_items: HashMap<i32, SaleItems> = HashMap::new();
        for item in saleitems {
            grouped_items
                .entry(item.product_id)
                .and_modify(|e| {
                    e.quantity += item.quantity;
                })
                .or_insert(item);
        }

        let saleitems: Vec<SaleItems> = grouped_items.into_values().collect();
        match self.repository.save(sale) {
            Ok(data) => {
                for item in saleitems {
                    let items_builder = SaleItemsBuilder::new(
                        item.sale_id,
                        item.product_id,
                        item.quantity,
                        item.unit_price,
                        item.subtotal,
                    );

                    let stock = self.stock_service.get_by_product_id(item.product_id)?;
                    if item.quantity > stock.quantity {
                        errors.push(SalesError::ProductLowStock(format!(
                            "product: {}",
                            item.product_id
                        )));
                        break;
                    }

                    let movements_builder = StockMovementBuilder::new(
                        item.product_id,
                        MoveType::StockOutput,
                        item.quantity,
                        "sale",
                    )
                    .reference_id(data.id);

                    self.movement_service.create(movements_builder)?;
                    let created_item = self.saleitem_service.create(items_builder)?;

                    self.stock_service.update_quantity(
                        created_item.product_id,
                        stock.quantity - created_item.quantity,
                    )?;
                }

                if !errors.is_empty() {
                    Err(SalesError::ProcessSaleError(errors))
                } else {
                    self.update_status(data.id, SaleStatus::SaleClosed)?;
                    Ok(data)
                }
            }
            Err(err) => Err(SalesError::SaleError(format!(
                "Failed to create a sale: {}",
                err.to_string()
            ))),
        }
    }

    pub fn update(&self, sale: &Sale) -> Result<Sale, Error> {
        self.repository.update(sale)
    }

    pub fn update_status(&self, sale_id: i32, status: SaleStatus) -> Result<Sale, Error> {
        let status = match status {
            SaleStatus::SaleOpen => "SaleOpen",
            SaleStatus::SaleClosed => "SaleClosed",
            SaleStatus::SaleCanceled => "SaleCanceled",
        };

        self.repository.update_status(sale_id, String::from(status))
    }

    pub fn get(&self, sale_id: i32) -> Result<Sale, Error> {
        self.repository.find_by_id(sale_id)
    }
}
