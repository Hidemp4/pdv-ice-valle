pub mod infrastructure;
pub mod models;
pub mod repositories;
pub mod services;

#[cfg(test)]
mod test {
    use std::sync::Arc;

    use crate::{
        infrastructure::DbPool, models::product::ProductBuilder,
        services::product_service::ProductService,
    };

    fn pool() -> Arc<DbPool> {
        Arc::new(super::infrastructure::db_pool("test.db"))
    }

    #[test]
    fn test_product_builder() {
        let product = ProductBuilder::new("Biscoito", "xxx", "BISC-20G-001", 8.99, 2000).build();

        assert_eq!(product.name, "Biscoito traquinas");
        assert_eq!(product.sku, "TEST001");
        assert_eq!(product.stock, 2000);
    }

    #[test]
    fn test_create_new_product() {
        let product = ProductBuilder::new("Biscoito", "xxx", "BISC-20G-001", 8.99, 2000);
        let service = ProductService::new(self::pool());
        let product = service.create(product).unwrap();

        assert_eq!(
            product.name, "Biscoito traquinas",
            "O nome do produto é igual ao nome esperado."
        );
        assert_eq!(
            product.sku, "TEST001",
            "A sku do produto é igual a sku esperada."
        );
        assert_eq!(
            product.stock, 2000,
            "A quantidade do produto é igual a quantidade esperada."
        );
    }

    #[test]
    fn test_find_product_by_sku() {
        let product = ProductBuilder::new("Coca cola", "xxx", "COCA-2L-002", 8.99, 2000);

        let service = ProductService::new(self::pool());
        service.create(product).unwrap();

        let qproduct = service.get_by_sku("COCA-2L-002");
        match qproduct {
            Ok(product) => {
                assert_eq!(product.sku, "COCA-2L-002");
            }
            Err(err) => {
                println!("Ocorreu um erro: {}", err);
            }
        }
    }
}
