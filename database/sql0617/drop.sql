DROP TABLE tempSales, sales, aggregateSalesHour, aggregateSalesDay,
            aggregateSalesHourDistrict, aggregateSalesDayDistrict, 
            aggregateSalesHourCounty, aggregateSalesDayCounty, 
            aggregateSalesHourRegion, aggregateSalesDayRegion;

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
    taste      VARCHAR,                                             
    topping    VARCHAR,                                     
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
    taste      VARCHAR,                                               
    topping    VARCHAR,                                                                                       
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
    taste      VARCHAR,                                         
    topping    VARCHAR,                                                                                        
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
    taste      VARCHAR,                                              
    topping    VARCHAR,                                                                                        
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
    taste      VARCHAR,                                          
    topping    VARCHAR,                                                                                   
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
    taste      VARCHAR,
    topping    VARCHAR,                                                                        
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
    taste      VARCHAR,                                               
    topping    VARCHAR,                                                                                          
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
    taste      VARCHAR,
    topping    VARCHAR,                                           
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
    taste      VARCHAR,                           
    topping    VARCHAR,                                                                      
    price      INTEGER     NOT NULL,                                    -- total
    amount     INTEGER     NOT NULL
);

