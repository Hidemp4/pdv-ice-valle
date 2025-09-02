use core::fmt;
use std::{error, sync::Arc};

use diesel::result::Error;

use crate::{
    infrastructure::DbPool,
    models::{
        sale::{Sale, SaleBuilder},
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
    ProcessSaleError(Vec<String>),
}

impl fmt::Display for SalesError {
    fn fmt(&self, f: &mut std::fmt::Formatter<'_>) -> std::fmt::Result {
        match self {
            SalesError::SaleError(msg) => write!(f, "Sale error: {}", msg),
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
        let mut errors: Vec<String> = vec![];
        let mut created_items: Vec<SaleItems> = vec![];

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

                    match self.stock_service.get_by_product_id(item.product_id) {
                        Ok(stock) => {
                            if item.quantity > stock.quantity {
                                errors.push(format!("The quantity of the selected product: {} is greater than the quantity available in stock", item.product_id));
                                break;
                            }
                        }
                        Err(err) => errors.push(err.to_string()),
                    };

                    let movements_builder = StockMovementBuilder::new(
                        item.product_id,
                        MoveType::StockOutput,
                        item.quantity,
                        "sale",
                    )
                    .reference_id(data.id);

                    match self.movement_service.create(movements_builder) {
                        Ok(_) => {}
                        Err(err) => errors.push(err.to_string()),
                    };

                    match self.saleitem_service.create(items_builder) {
                        Ok(item) => created_items.push(item),
                        Err(err) => errors.push(err.to_string()),
                    };
                }

                if !errors.is_empty() {
                    Err(SalesError::ProcessSaleError(errors))
                } else {
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

    pub fn get(&self, sale_id: i32) -> Result<Sale, Error> {
        self.repository.find_by_id(sale_id)
    }
}
