pub mod infrastructure;
pub mod models;
pub mod repositories;
pub mod services;

#[cfg(test)]
mod test {
    use crate::{
        infrastructure::DbPool, models::product::ProductBuilder,
        services::product_service::ProductService,
    };

    use super::*;

    fn pool() -> DbPool {
        super::infrastructure::db_pool("test.db")
    }

    #[test]
    fn build_product() {
        let product =
            ProductBuilder::new("Biscoito traquinas".into(), 93030100130013.0, 2000).build();

        assert_eq!(product.name, "Biscoito traquinas");
        assert_eq!(product.barcode, 93030100130013.0);
        assert_eq!(product.stock, 2000);
    }

    #[test]
    fn create_new_product() {
        let product = ProductBuilder::new("Biscoito traquinas".into(), 93030100130013.0, 2000);

        let service = ProductService::new(self::pool());
        let product = service.create(product);

        assert_eq!(product.name, "Biscoito traquinas");
        assert_eq!(product.barcode, 93030100130013.0);
        assert_eq!(product.stock, 2000);
    }
}
