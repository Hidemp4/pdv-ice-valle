pub mod infrastructure;
pub mod models;
pub mod repositories;
pub mod services;

#[cfg(test)]
mod test {
    use std::sync::Arc;

    use crate::{
        infrastructure::DbPool,
        models::product::{self, Product, ProductBuilder},
        services::product_service::ProductService,
    };

    fn pool() -> Arc<DbPool> {
        Arc::new(super::infrastructure::db_pool("test.db"))
    }

    #[test]
    fn test_product_builder() {
        let product =
            ProductBuilder::new("Biscoito traquinas", "xxx", "BISC-20G-001", 8.99, 2000).build();

        assert_eq!(product.name, "Biscoito traquinas");
        assert_eq!(product.sku, "BISC-20G-001");
        assert_eq!(product.stock, 2000);
    }

    #[test]
    fn test_create_new_product() {
        let product = ProductBuilder::new("Biscoito traquinas", "xxx", "BISC-20G-001", 8.99, 2000);
        let service = ProductService::new(self::pool());
        let product = service.create(product).unwrap();

        assert_eq!(
            product.name, "Biscoito traquinas",
            "O nome do produto é igual ao nome esperado."
        );
        assert_eq!(
            product.sku, "BISC-20G-001",
            "A sku do produto é igual a sku esperada."
        );
        assert_eq!(
            product.stock, 2000,
            "A quantidade do produto é igual a quantidade esperada."
        );
    }

    #[test]
    fn test_update_product() {
        let service = ProductService::new(self::pool());
        let product = ProductBuilder::new("Biscoito traquinas", "xxx", "BISC-20G-002", 8.99, 2000);
        service.create(product).unwrap();

        let product = service.get_by_sku("BISC-20G-002").unwrap();

        let new_data = Product {
            id: product.id,
            name: "Biscoito 2.0".into(),
            description: product.description,
            sku: "BISC-20G-003".into(), // is-some
            stock: product.stock,
            price: product.price,
            created_at: product.created_at,
            updated_at: product.updated_at,
        };

        service.update(product.id, &new_data).unwrap();
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
