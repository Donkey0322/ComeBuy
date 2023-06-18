INSERT INTO regions (name)
VALUES ('北區'),
       ('南區'),
       ('中區'),
       ('東區'),
       ('離島'),
       ('全台');

INSERT INTO counties (name)
VALUES ('新北市'),
       ('台北市'),
       ('桃園市'),
       ('基隆市'),
       ('新竹市'),
       ('台南市'),
       ('高雄市'),
       ('屏東縣'),
       ('彰化縣'),
       ('花蓮縣'),
       ('宜蘭縣'),
       ('澎湖縣'),
       ('金門縣');

INSERT INTO districts (name)
VALUES ('新店區'),
       ('三重區'),
       ('板橋區'),
       ('三峽區'),
       ('淡水區'),
       ('泰山區'),
       ('樹林區'),
       ('汐止區'),
       ('林口區'),
       ('八里區'),
       ('蘆洲區'),
       ('五股區'),
       ('深坑區'),
       ('土城區'),
       ('新莊區'),
       ('永和區'),
       ('中和區'),
       ('安樂區'),
       ('暖暖區'),
       ('七堵區'),
       ('仁愛區'),
       ('中正區'),
       ('桃園區'),
       ('八德區'),
       ('大園區'),
       ('楊梅區'),
       ('龜山區'),
       ('觀音區'),
       ('大溪區'),
       ('蘆竹區'),
       ('龍潭區'),
       ('平鎮區'),
       ('中壢區'),
       ('松山區'),
       ('信義區'),
       ('大同區'),
       ('北投區'),
       ('士林區'),
       ('內湖區'),
       ('中山區'),
       ('大安區'),
       ('文山區'),
       ('南港區'),
       ('北區'),
       ('東區'),
       ('善化區'),
       ('三民區'),
       ('屏東市'),
       ('潮州鎮'),
       ('彰化市'),
       ('花蓮市'),
       ('玉里鎮'),
       ('宜蘭市'),
       ('羅東鎮'),
       ('員山鄉'),
       ('壯圍鄉'),
       ('五結鄉'),
       ('冬山鄉'),
       ('頭城鎮'),
       ('礁溪鄉'),
       ('馬公市'),
       ('金門');

INSERT INTO status (name)
VALUES ('販賣中'),
       ('已下架');

INSERT INTO sweets (name)
VALUES ('正常糖'),
       ('少糖'),
       ('半糖'),
       ('微糖'),
       ('1分'),
       ('無糖'),
       ('多蜜'),
       ('少蜜'),
       ('半蜜'),
       ('微蜜');

INSERT INTO ices (name)
VALUES ('正常冰'),
       ('少冰'),
       ('半冰'),
       ('微冰'),
       ('去冰'),
       ('溫品'),
       ('熱品');

INSERT INTO categories (name)
VALUES ('原葉鮮萃茶'),
       ('鮮萃茶拿鐵'),
       ('奶茶/特調'),
       ('鮮調果茶'),
       ('果然系列'),
       ('特調咖啡'),
       ('研磨咖啡'),
       ('湛盧咖啡'),
       ('夏季季節限定'),
       ('冬季季節限定'),
       ('隱藏商品'),
       ('冷泡茶');

insert into stores(region, county, district, name, comebuy_id) values (1, 1, 1, '新店光明店', 'A0001');
insert into stores(region, county, district, name, comebuy_id) values (4, 10, 51, '花蓮中山店', 'C0001');

insert into drinks (name, category, status, comebuy_id) values ('鮮萃大麥紅茶', 1, 1, 'AC001');
insert into drinks (name, category, status, comebuy_id) values ('海神', 1, 1, 'AC002');

insert into toppings(name) values ('珍珠');
insert into toppings(name) values ('椰果');
insert into toppings(name) values ('布丁');
insert into toppings(name) values ('新雙Q');
insert into toppings(name) values ('小芋圓');
insert into toppings(name) values ('荔枝凍');
insert into toppings(name) values ('仙草凍');
insert into toppings(name) values ('小紫蘇');
insert into toppings(name) values ('鬥陣');
insert into toppings(name) values ('愛玉');
insert into toppings(name) values ('迷你珍珠');
insert into toppings(name) values ('蘆薈');
insert into toppings(name) values ('粉條');
insert into toppings(name) values ('紫米');
insert into toppings(name) values ('寒天晶球');
insert into toppings(name) values ('雙Q條');
insert into toppings(name) values ('搖果樂');

insert into tastes(name) values ('換奶綠');
insert into tastes(name) values ('去料');
insert into tastes(name) values ('去籽');
insert into tastes(name) values ('多籽');
insert into tastes(name) values ('少酸');
insert into tastes(name) values ('多酸');
insert into tastes(name) values ('少奶');
insert into tastes(name) values ('多奶');
insert into tastes(name) values ('芋');
insert into tastes(name) values ('粉');
insert into tastes(name) values ('紅茶');
insert into tastes(name) values ('綠茶');
insert into tastes(name) values ('改小珍');
insert into tastes(name) values ('改鬥陣');
