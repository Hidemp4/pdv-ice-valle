-- Your SQL goes here
CREATE TABLE
    stockmovements (
        id integer not null primary key autoincrement,
        product_id int not null,
        move_type varchar(10) not null,
        quantity numeric not null,
        origin varchar(100) not null,
        reference_id integer null,
        created_at DateTime null default (DateTime (CURRENT_TIMESTAMP, 'localtime')),
        updated_at DateTime null,
        FOREIGN KEY (product_id) References products (id),
        FOREIGN KEY (reference_id) References sales (id)
    );

CREATE TRIGGER update_stockmovements_updated_at AFTER
UPDATE ON stockmovements FOR EACH ROW BEGIN
UPDATE stockmovements
SET
    updated_at = DateTime (CURRENT_TIMESTAMP, 'localtime')
WHERE
    id = NEW.id;

END