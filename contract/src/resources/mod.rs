use serde::Serialize;
pub mod category_resource;
pub mod product_resource;
pub mod sale_item_resource;
pub mod sale_resource;
pub mod stock_movement_resource;
pub mod stock_resource;

#[derive(Serialize)]
pub struct DataResponse<T> {
    pub success: bool,
    pub data: T,
}

impl<T> DataResponse<T> {
    pub fn success(data: T) -> Self {
        DataResponse {
            success: true,
            data: data,
        }
    }

    pub fn error(data: T) -> Self {
        DataResponse {
            success: false,
            data,
        }
    }
}
