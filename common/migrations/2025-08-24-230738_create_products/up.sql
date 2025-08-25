-- Your SQL goes here
CREATE TABLE
    products (
        id integer not null primary key autoincrement,
        name varchar(255) not null,
        description text null,
        barcode numeric not null,
        stock bigint not null,
        created_at DateTime not null default (now ()),
        updated_at DateTime null
    )