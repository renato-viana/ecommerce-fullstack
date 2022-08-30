CREATE TABLE "order" (
    id integer NOT NULL GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,   
    status VARCHAR(100),
    user_id integer NOT NULL,
    
    FOREIGN KEY (user_id) REFERENCES user_account (id)  
);

