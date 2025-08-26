-- Your SQL goes here
CREATE TABLE
    products (
        id integer not null primary key autoincrement,
        name varchar(255) not null,
        description text null,
        sku text unique not null,
        price decimal(12,2) not null,
        stock bigint not null,
        created_at DateTime null default (DateTime (CURRENT_TIMESTAMP, 'localtime')),
        updated_at DateTime null
    )