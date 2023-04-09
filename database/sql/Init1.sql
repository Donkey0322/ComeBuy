-- CREATE TYPE sweet AS ENUM (
--     '正常糖',
--     '少糖',
--     '半糖',
--     '微糖',
--     '1分',
--     '微蜜',
--     '少蜜',
--     '半蜜',
--     '多蜜'
-- );

-- CREATE TYPE ice AS ENUM (
--     '正常冰',
--     '少冰',
--     '半冰',
--     '微冰',
--     '去冰',
--     '溫品',
--     '熱品'
-- );

-- CREATE TYPE taste AS ENUM (
--     '換奶綠',
--     '去籽',
--     '去料',
--     '多籽',
--     '少酸',
--     '多酸',
--     '少奶',
--     '多奶',
--     '芋圓',
--     '粉條',
--     '紅茶',
--     '綠茶',
--     '改小珍',
--     '改鬥陣'
-- );

-- CREATE TYPE topping AS ENUM (
--     '珍珠',
--     '小紫蘇',
--     '新雙Q',
--     '椰果',
--     '雙Q條',
--     '粉條',
--     '小芋圓',
--     '愛玉風味凍',
--     '搖果樂',
--     '蘆薈',
--     '寒天晶球',
--     '荔枝凍',
--     '仙草凍',
--     '布丁',
--     '紫米',
--     '檸檬',
--     '鮮奶'
-- );

-- CREATE TYPE region AS ENUM (
--     '北區',
--     '南區',
--     '中區',
--     '東區',
--     '離島'
-- );

-- CREATE TYPE county AS ENUM (
--     '新北市',
--     '臺北市',
--     '桃園市',
--     '基隆市',
--     '新竹市',
--     '台南市',
--     '高雄市',
--     '屏東縣',
--     '彰化縣',
--     '花蓮縣',
--     '宜蘭縣',
--     '澎湖縣',
--     '金門縣' 
-- );

-- CREATE TYPE district AS ENUM (
--     '新店區',
--     '三重區',
--     '板橋區',
--     '三峽區',
--     '淡水區',
--     '泰山區',
--     '樹林區',
--     '汐止區',
--     '林口區',
--     '八里區',
--     '蘆洲區',
--     '五股區',
--     '深坑區',
--     '土城區',
--     '新莊區',
--     '永和區',
--     '中和區',
--     '安樂區',
--     '暖暖區',
--     '七堵區',
--     '仁愛區',
--     '中正區',
--     '桃園區',
--     '八德區',
--     '大園區',
--     '楊梅區',
--     '龜山區',
--     '觀音區',
--     '大溪區',
--     '蘆竹區',
--     '龍潭區',
--     '平鎮區',
--     '中壢區',
--     '松山區',
--     '信義區',
--     '大同區',
--     '北投區',
--     '士林區',
--     '內湖區',
--     '中山區',
--     '大安區',
--     '文山區',
--     '南港區',
--     '北區',
--     '東區',
--     '善化區',
--     '三民區',
--     '屏東市',
--     '潮州鎮',
--     '彰化市',
--     '花蓮市',
--     '玉里鎮',
--     '宜蘭市',
--     '羅東鎮',
--     '員山鄉',
--     '壯圍鄉',
--     '五結鄉',
--     '冬山鄉',
--     '頭城鎮',
--     '礁溪鄉',
--     '馬公市',
--     '金門'
-- );

-- CREATE TYPE status AS ENUM (
--     '販賣中',
--     '已下架'
-- );

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
    id        SERIAL      PRIMARY KEY,
    name      VARCHAR     NOT NULL,
    category  VARCHAR     NOT NULL,
    status    INTEGER     NOT NULL    REFERENCES status(id)
);

CREATE TABLE stores(
    id         SERIAL     PRIMARY KEY,
    region     INTEGER    NOT NULL     REFERENCES regions(id),
    county     INTEGER    NOT NULL     REFERENCES counties(id),
    district   INTEGER    NOT NULL     REFERENCES districts(id),
    name       VARCHAR    NOT NULL
);

CREATE TABLE sales(                                              
    id         SERIAL      PRIMARY KEY,
    store      INTEGER     NOT NULL     REFERENCES stores(id),          
    date       DATE        NOT NULL,                                    -- YYYY/MM/DD
    time       time        NOT NULL,                                    -- HH:MM:SS
    drink      INTEGER     NOT NULL     REFERENCES drinks(id),
    ice        INTEGER     REFERENCES ices(id),
    sweet      INTEGER     REFERENCES sweets(id),                                           
    price      INTEGER     NOT NULL,
    amount     INTEGER     NOT NULL
);

CREATE TABLE sales_toppings(
    id         SERIAL      PRIMARY KEY,
    record     INTEGER     NOT NULL     REFERENCES sales(id),
    topping    INTEGER     NOT NULL     REFERENCES toppings(id)
);

CREATE TABLE sales_tastes(
    id         SERIAL      PRIMARY KEY,
    record     INTEGER     NOT NULL     REFERENCES sales(id),
    taste      INTEGER     NOT NULL     REFERENCES tastes(id)
);

CREATE TABLE aggregateSalesHour(
    id         SERIAL      PRIMARY KEY,
    store      INTEGER     NOT NULL    REFERENCES stores(id), 
    date       DATE        NOT NULL,                                    -- YYYY/MM/DD
    hour       INTEGER     NOT NULL,
    drink      INTEGER     NOT NULL    REFERENCES drinks(id),
    ice        INTEGER     REFERENCES ices(id),
    sweet      INTEGER     REFERENCES sweets(id),
    topping    INTEGER     REFERENCES toppings(id),
    taste      INTEGER     REFERENCES tastes(id),
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
    topping    INTEGER     REFERENCES toppings(id),
    taste      INTEGER     REFERENCES tastes(id),
    price      INTEGER     NOT NULL,                                    -- total
    amount     INTEGER     NOT NULL
);

-- CREATE TABLE aggregateSalesMonth(
--     id         SERIAL      PRIMARY KEY,
--     store      INTEGER     NOT NULL    REFERENCES stores(id), 
--     year       VARCHAR     NOT NULL,                                    -- YYYY
--     month      VARCHAR     NOT NULL,                                    -- MM
--     drink      INTEGER     NOT NULL    REFERENCES drinks(id),
--     ice        INTEGER     REFERENCES ices(id),
--     sweet      INTEGER     REFERENCES sweets(id),
--     topping    INTEGER     REFERENCES toppings(id),
--     taste      INTEGER     REFERENCES tastes(id),
--     price      INTEGER     NOT NULL,                                    -- total
--     amount     INTEGER     NOT NULL
-- );

CREATE TABLE aggregateSalesHourDistrict(
    id         SERIAL      PRIMARY KEY,
    district   INTEGER     NOT NULL    REFERENCES districts(id), 
    date       DATE        NOT NULL,                                    -- YYYY/MM/DD
    hour       INTEGER     NOT NULL,
    drink      INTEGER     NOT NULL    REFERENCES drinks(id),
    ice        INTEGER     REFERENCES ices(id),
    sweet      INTEGER     REFERENCES sweets(id),
    topping    INTEGER     REFERENCES toppings(id),
    taste      INTEGER     REFERENCES tastes(id),
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
    topping    INTEGER     REFERENCES toppings(id),
    taste      INTEGER     REFERENCES tastes(id),
    price      INTEGER     NOT NULL,                                    -- total
    amount     INTEGER     NOT NULL
);

-- CREATE TABLE aggregateSalesMonthDistrict(
--     id         SERIAL      PRIMARY KEY,
--     district   INTEGER     NOT NULL    REFERENCES districts(id),  
--     year       VARCHAR     NOT NULL,                                    -- YYYY
--     month      VARCHAR     NOT NULL,                                    -- MM
--     drink      INTEGER     NOT NULL    REFERENCES drinks(id),
--     ice        INTEGER     REFERENCES ices(id),
--     sweet      INTEGER     REFERENCES sweets(id),
--     topping    INTEGER     REFERENCES toppings(id),
--     taste      INTEGER     REFERENCES tastes(id),
--     price      INTEGER     NOT NULL,                                    -- total
--     amount     INTEGER     NOT NULL
-- );


CREATE TABLE aggregateSalesHourCounty(
    id         SERIAL      PRIMARY KEY,
    county     INTEGER     NOT NULL    REFERENCES counties(id), 
    date       DATE        NOT NULL,                                    -- YYYY/MM/DD
    hour       INTEGER     NOT NULL,
    drink      INTEGER     NOT NULL    REFERENCES drinks(id),
    ice        INTEGER     REFERENCES ices(id),
    sweet      INTEGER     REFERENCES sweets(id),
    topping    INTEGER     REFERENCES toppings(id),
    taste      INTEGER     REFERENCES tastes(id),
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
    topping    INTEGER     REFERENCES toppings(id),
    taste      INTEGER     REFERENCES tastes(id),
    price      INTEGER     NOT NULL,                                    -- total
    amount     INTEGER     NOT NULL
);

-- CREATE TABLE aggregateSalesMonthCounty(
--     id         SERIAL      PRIMARY KEY,
--     county     INTEGER     NOT NULL    REFERENCES counties(id),   
--     year       VARCHAR     NOT NULL,                                    -- YYYY
--     month      VARCHAR     NOT NULL,                                    -- MM
--     drink      INTEGER     NOT NULL    REFERENCES drinks(id),
--     ice        INTEGER     REFERENCES ices(id),
--     sweet      INTEGER     REFERENCES sweets(id),
--     topping    INTEGER     REFERENCES toppings(id),
--     taste      INTEGER     REFERENCES tastes(id),
--     price      INTEGER     NOT NULL,                                    -- total
--     amount     INTEGER     NOT NULL
-- );

CREATE TABLE aggregateSalesHourRegion(
    id         SERIAL      PRIMARY KEY,
    region     INTEGER     NOT NULL    REFERENCES regions(id), 
    date       DATE        NOT NULL,                                    -- YYYY/MM/DD
    hour       INTEGER     NOT NULL,
    drink      INTEGER     NOT NULL    REFERENCES drinks(id),
    ice        INTEGER     REFERENCES ices(id),
    sweet      INTEGER     REFERENCES sweets(id),
    topping    INTEGER     REFERENCES toppings(id),
    taste      INTEGER     REFERENCES tastes(id),
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
    topping    INTEGER     REFERENCES toppings(id),
    taste      INTEGER     REFERENCES tastes(id),
    price      INTEGER     NOT NULL,                                    -- total
    amount     INTEGER     NOT NULL
);

-- CREATE TABLE aggregateSalesMonthRegion(
--     id         SERIAL      PRIMARY KEY,
--     region     INTEGER     NOT NULL    REFERENCES regions(id),   
--     year       VARCHAR     NOT NULL,                                    -- YYYY
--     month      VARCHAR     NOT NULL,                                    -- MM
--     drink      INTEGER     NOT NULL    REFERENCES drinks(id),
--     ice        INTEGER     REFERENCES ices(id),
--     sweet      INTEGER     REFERENCES sweets(id),
--     topping    INTEGER     REFERENCES toppings(id),
--     taste      INTEGER     REFERENCES tastes(id),
--     price      INTEGER     NOT NULL,                                    -- total
--     amount     INTEGER     NOT NULL
-- );