-- Your SQL goes here
create TABLE
    categories (
        id integer not null primary key autoincrement,
        name varchar(255) not null,
        description text null,
        created_at DateTime null default (DateTime (CURRENT_TIMESTAMP, 'localtime')),
        updated_at DateTime null
    );

CREATE TRIGGER update_categories_updated_at AFTER
UPDATE ON categories FOR EACH ROW BEGIN
UPDATE categories
SET
    updated_at = DateTime (CURRENT_TIMESTAMP, 'localtime')
WHERE
    id = NEW.id;

END;