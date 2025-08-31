// @generated automatically by Diesel CLI.

diesel::table! {
    categories (id) {
        id -> Integer,
        name -> Text,
        description -> Nullable<Text>,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    products (id) {
        id -> Integer,
        name -> Text,
        description -> Nullable<Text>,
        category_id -> Nullable<Integer>,
        sku -> Text,
        price -> Double,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    saleitems (id) {
        id -> Integer,
        sale_id -> Integer,
        product_id -> Integer,
        quantity -> Double,
        unit_price -> Double,
        subtotal -> Double,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    sales (id) {
        id -> Integer,
        total_gross -> Double,
        total_net -> Double,
        payment_method -> Text,
        status -> Text,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    stock (id) {
        id -> Integer,
        product_id -> Integer,
        quantity -> Nullable<Double>,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::table! {
    stockmovements (id) {
        id -> Integer,
        product_id -> Integer,
        move_type -> Text,
        quantity -> Double,
        origin -> Text,
        created_at -> Nullable<Timestamp>,
        updated_at -> Nullable<Timestamp>,
    }
}

diesel::joinable!(products -> categories (category_id));
diesel::joinable!(saleitems -> products (product_id));
diesel::joinable!(saleitems -> sales (sale_id));
diesel::joinable!(stock -> products (product_id));
diesel::joinable!(stockmovements -> products (product_id));

diesel::allow_tables_to_appear_in_same_query!(
    categories,
    products,
    saleitems,
    sales,
    stock,
    stockmovements,
);
