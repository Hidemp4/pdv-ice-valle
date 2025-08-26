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
    fn test_product_builder() {
        let product = ProductBuilder::new("Biscoito traquinas", "TEST001", 2000).build();

        assert_eq!(product.name, "Biscoito traquinas");
        assert_eq!(product.sku, "TEST001");
        assert_eq!(product.stock, 2000);
    }

    #[test]
    fn test_create_new_product() {
        let product = ProductBuilder::new("Biscoito traquinas", "TEST001", 2000);

        let service = ProductService::new(self::pool());
        let product = service.create(product);

        assert_eq!(product.name, "Biscoito traquinas");
        assert_eq!(product.sku, "TEST001");
        assert_eq!(product.stock, 2000);
    }
}
