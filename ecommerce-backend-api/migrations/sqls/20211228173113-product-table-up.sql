CREATE TABLE product (
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY, 
    name VARCHAR(100), 
    description TEXT, 
    price DECIMAL(10,2)
);