-- Your SQL goes here
CREATE TABLE
    sales (
        id integer not null primary key autoincrement,
        total_gross decimal(10, 2) not null,
        total_net decimal(10, 2) not null,
        payment_method VARCHAR(50) not null,
        status varchar(10) not null default ('open'),
        created_at DateTime null default (DateTime (CURRENT_TIMESTAMP, 'localtime')),
        updated_at DateTime null
    );

CREATE TRIGGER update_sales_updated_at AFTER
UPDATE ON sales FOR EACH ROW BEGIN
UPDATE sales
SET
    updated_at = DateTime (CURRENT_TIMESTAMP, 'localtime')
WHERE
    id = NEW.id;

END