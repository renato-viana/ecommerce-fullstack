/*Products*/
INSERT INTO product (id, name, description, price)
    VALUES (DEFAULT, 'Nintendo Switch OLED', 'Nintendo''s Switch OLED model shines in handheld mode thanks to the console''s vibrant new display.', 350);
INSERT INTO product (id, name, description, price)
    VALUES (DEFAULT, 'Lenovo - Yoga 7i 16', 'Lenovo - Yoga 7i 16" 2.5K Touch 2-in-1 Laptop - Intel Evo Platform - Core i5-1240P - 8GB Memory - 256GB SSD - Storm Grey', 599.99);

/*Users*/
INSERT INTO user_account (id, name, email, password_digest) 
    VALUES (DEFAULT, 'Renato', 'renatoviana30@gmail.com', '$2b$10$K5mHYJsMioEOJtRi8IRIge4HMTeOz7YhsUc6k1Y2KnhfvoI/TvqJC');

/*Order*/
INSERT INTO "order" (id, status, user_id) 
    VALUES (DEFAULT, 'Active', 1);

/*Order_Item*/
INSERT INTO order_item (id, quantity, order_id, product_id) 
    VALUES (DEFAULT, 1, 1, 1);

INSERT INTO order_item (id, quantity, order_id, product_id) 
    VALUES (DEFAULT, 3, 1, 2);