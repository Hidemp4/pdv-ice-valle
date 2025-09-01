-- Your SQL goes here
CREATE TABLE
    stock (
        id integer not null primary key autoincrement,
        product_id int not null,
        quantity numeric not null,
        created_at DateTime null default (DateTime (CURRENT_TIMESTAMP, 'localtime')),
        updated_at DateTime null,
        FOREIGN KEY (product_id) REFERENCES products (id)
    );

CREATE TRIGGER update_stock_updated_at AFTER
UPDATE ON stock FOR EACH ROW BEGIN
UPDATE stock
SET
    updated_at = DateTime (CURRENT_TIMESTAMP, 'localtime')
WHERE
    id = NEW.id;

END