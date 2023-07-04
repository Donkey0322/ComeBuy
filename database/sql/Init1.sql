CREATE TABLE status(
    id        SERIAL      PRIMARY KEY,
    name      VARCHAR     NOT NULL
);

CREATE TABLE regions(
    id        SERIAL      PRIMARY KEY,
    name      VARCHAR     NOT NULL
);

CREATE TABLE counties(
    id        SERIAL      PRIMARY KEY,
    name      VARCHAR     NOT NULL
);

CREATE TABLE districts(
    id        SERIAL      PRIMARY KEY,
    name      VARCHAR     NOT NULL
);

CREATE TABLE sweets(                           -- 標準糖
    id        SERIAL      PRIMARY KEY,
    name      VARCHAR     NOT NULL
);

CREATE TABLE ices(
    id        SERIAL      PRIMARY KEY,
    name      VARCHAR     NOT NULL
);

CREATE TABLE tastes(                           -- 紅都改成紅茶，粉都改成粉條
    id        SERIAL      PRIMARY KEY,
    name      VARCHAR     NOT NULL
);

CREATE TABLE toppings(
    id        SERIAL      PRIMARY KEY,
    name      VARCHAR     NOT NULL
);

CREATE TABLE categories(
    id        SERIAL      PRIMARY KEY,
    name      VARCHAR     NOT NULL
);

CREATE TABLE drinks(
    id          SERIAL      PRIMARY KEY,
    name        VARCHAR     NOT NULL,
    category    INTEGER     NOT NULL    REFERENCES categories(id),
    status      INTEGER     NOT NULL    REFERENCES status(id),
    comebuy_id  VARCHAR     NOT NULL
);

CREATE TABLE stores(
    id          SERIAL     PRIMARY KEY,
    region      INTEGER    NOT NULL     REFERENCES regions(id),
    county      INTEGER    NOT NULL     REFERENCES counties(id),
    district    INTEGER    NOT NULL     REFERENCES districts(id),
    name        VARCHAR    NOT NULL,
    comebuy_id  VARCHAR    NOT NULL
);

CREATE TABLE tempSales(                                              
    id         SERIAL      PRIMARY KEY,
    store      VARCHAR     NOT NULL,          
    time       TIMESTAMP   NOT NULL,                                    -- YYYY/MM/DD HH:MM:SS
    drink      VARCHAR     NOT NULL,    
    taste      VARCHAR,                                                 -- xx/xx/xx
    topping    VARCHAR,                                                 -- xx/xx/xx
    price      INTEGER     NOT NULL,                                    -- total
    amount     INTEGER     NOT NULL
);

CREATE TABLE sales(                                              
    id         SERIAL      PRIMARY KEY,
    store      INTEGER     NOT NULL     REFERENCES stores(id),          
    time       TIMESTAMP   NOT NULL,                                      -- YYYY/MM/DD HH:MM:SS
    drink      INTEGER     NOT NULL     REFERENCES drinks(id),
    ice        INTEGER     REFERENCES ices(id),
    sweet      INTEGER     REFERENCES sweets(id),
    taste      VARCHAR[],                                             
    topping    VARCHAR[],                                     
    price      INTEGER     NOT NULL,
    amount     INTEGER     NOT NULL
);

CREATE TABLE aggregateSalesHour(
    id         SERIAL      PRIMARY KEY,
    store      INTEGER     NOT NULL    REFERENCES stores(id), 
    date       DATE        NOT NULL,                                    -- YYYY/MM/DD
    hour       INTEGER     NOT NULL,
    drink      INTEGER     NOT NULL    REFERENCES drinks(id),
    ice        INTEGER     REFERENCES ices(id),
    sweet      INTEGER     REFERENCES sweets(id),
    taste      VARCHAR[],                                               
    topping    VARCHAR[],                                                                                       
    price      INTEGER     NOT NULL,                                    -- total
    amount     INTEGER     NOT NULL
);

CREATE TABLE aggregateSalesDay(
    id         SERIAL      PRIMARY KEY,
    store      INTEGER     NOT NULL    REFERENCES stores(id), 
    date       DATE        NOT NULL,                                    -- YYYY/MM/DD
    drink      INTEGER     NOT NULL    REFERENCES drinks(id),
    ice        INTEGER     REFERENCES ices(id),
    sweet      INTEGER     REFERENCES sweets(id),
    taste      VARCHAR[],                                         
    topping    VARCHAR[],                                                                                        
    price      INTEGER     NOT NULL,                                    -- total
    amount     INTEGER     NOT NULL
);

CREATE TABLE aggregateSalesHourDistrict(
    id         SERIAL      PRIMARY KEY,
    district   INTEGER     NOT NULL    REFERENCES districts(id), 
    date       DATE        NOT NULL,                                    -- YYYY/MM/DD
    hour       INTEGER     NOT NULL,
    drink      INTEGER     NOT NULL    REFERENCES drinks(id),
    ice        INTEGER     REFERENCES ices(id),
    sweet      INTEGER     REFERENCES sweets(id),
    taste      VARCHAR[],                                              
    topping    VARCHAR[],                                                                                        
    price      INTEGER     NOT NULL,                                    -- total
    amount     INTEGER     NOT NULL
);

CREATE TABLE aggregateSalesDayDistrict(
    id         SERIAL      PRIMARY KEY,
    district   INTEGER     NOT NULL    REFERENCES districts(id),  
    date       DATE        NOT NULL,                                    -- YYYY/MM/DD
    drink      INTEGER     NOT NULL    REFERENCES drinks(id),
    ice        INTEGER     REFERENCES ices(id),
    sweet      INTEGER     REFERENCES sweets(id),
    taste      VARCHAR[],                                          
    topping    VARCHAR[],                                                                                   
    price      INTEGER     NOT NULL,                                    -- total
    amount     INTEGER     NOT NULL
);

CREATE TABLE aggregateSalesHourCounty(
    id         SERIAL      PRIMARY KEY,
    county     INTEGER     NOT NULL    REFERENCES counties(id), 
    date       DATE        NOT NULL,                                    -- YYYY/MM/DD
    hour       INTEGER     NOT NULL,
    drink      INTEGER     NOT NULL    REFERENCES drinks(id),
    ice        INTEGER     REFERENCES ices(id),
    sweet      INTEGER     REFERENCES sweets(id),
    taste      VARCHAR[],
    topping    VARCHAR[],                                                                        
    price      INTEGER     NOT NULL,                                    -- total
    amount     INTEGER     NOT NULL
);

CREATE TABLE aggregateSalesDayCounty(
    id         SERIAL      PRIMARY KEY,
    county     INTEGER     NOT NULL    REFERENCES counties(id),   
    date       DATE        NOT NULL,                                    -- YYYY/MM/DD
    drink      INTEGER     NOT NULL    REFERENCES drinks(id),
    ice        INTEGER     REFERENCES ices(id),
    sweet      INTEGER     REFERENCES sweets(id),
    taste      VARCHAR[],                                               
    topping    VARCHAR[],                                                                                          
    price      INTEGER     NOT NULL,                                    -- total
    amount     INTEGER     NOT NULL
);

CREATE TABLE aggregateSalesHourRegion(
    id         SERIAL      PRIMARY KEY,
    region     INTEGER     NOT NULL    REFERENCES regions(id), 
    date       DATE        NOT NULL,                                    -- YYYY/MM/DD
    hour       INTEGER     NOT NULL,
    drink      INTEGER     NOT NULL    REFERENCES drinks(id),
    ice        INTEGER     REFERENCES ices(id),
    sweet      INTEGER     REFERENCES sweets(id),
    taste      VARCHAR[],
    topping    VARCHAR[],                                           
    price      INTEGER     NOT NULL,                                    -- total
    amount     INTEGER     NOT NULL
);

CREATE TABLE aggregateSalesDayRegion(
    id         SERIAL      PRIMARY KEY,
    region     INTEGER     NOT NULL    REFERENCES regions(id),   
    date       DATE        NOT NULL,                                    -- YYYY/MM/DD
    drink      INTEGER     NOT NULL    REFERENCES drinks(id),
    ice        INTEGER     REFERENCES ices(id),
    sweet      INTEGER     REFERENCES sweets(id),
    taste      VARCHAR[],                           
    topping    VARCHAR[],                                                                      
    price      INTEGER     NOT NULL,                                    -- total
    amount     INTEGER     NOT NULL
);

