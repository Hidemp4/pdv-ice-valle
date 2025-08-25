// @generated automatically by Diesel CLI.

diesel::table! {
    products (id) {
        id -> Integer,
        name -> Text,
        description -> Nullable<Text>,
        barcode -> Double,
        stock -> BigInt,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}
