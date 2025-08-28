-- Your SQL goes here
CREATE TABLE
    saleitems (
        id integer not null primary key autoincrement,
        sale_id int not null,
        product_id int not null,
        quantity numeric,
        unit_price decimal(10, 2),
        subtotal decimal(10, 2),
        created_at DateTime null default (DateTime (CURRENT_TIMESTAMP, 'localtime')),
        updated_at DateTime null,
        FOREIGN KEY (sale_id) References sales (id),
        FOREIGN KEY (product_id) References products (id)
    );

CREATE TRIGGER update_saleitems_updated_at AFTER
UPDATE ON saleitems FOR EACH ROW BEGIN
UPDATE saleitems
SET
    updated_at = DateTime (CURRENT_TIMESTAMP, 'localtime')
WHERE
    id = NEW.id;

END