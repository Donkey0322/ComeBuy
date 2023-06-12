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
       ('無糖');

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

insert into drinks (name, category, status) values ('鮮萃大麥紅茶', 1, 1);
insert into drinks (name, category, status) values ('海神', 1, 1);
insert into drinks (name, category, status) values ('玩火', 1, 1);
insert into drinks (name, category, status) values ('四季春', 1, 1);
insert into drinks (name, category, status) values ('烏龍綠茶', 1, 1);
insert into drinks (name, category, status) values ('碧螺春', 1, 1);
insert into drinks (name, category, status) values ('金萱茶', 1, 1);
insert into drinks (name, category, status) values ('玫瑰普洱', 1, 1);
insert into drinks (name, category, status) values ('茉莉烏龍', 1, 1);
insert into drinks (name, category, status) values ('斯里蘭卡烏瓦紅茶', 1, 1);
insert into drinks (name, category, status) values ('熟滄觀音', 1, 1);
insert into drinks (name, category, status) values ('東方美人', 1, 1);
insert into drinks (name, category, status) values ('文山包種', 1, 1);
insert into drinks (name, category, status) values ('白桃蜜烏龍', 1, 1);
insert into drinks (name, category, status) values ('洛神蜜香紅茶', 1, 1);
insert into drinks (name, category, status) values ('桂花四季春', 1, 1);
insert into drinks (name, category, status) values ('紅茶拿鐵', 2, 1);
insert into drinks (name, category, status) values ('觀音拿鐵', 2, 1);
insert into drinks (name, category, status) values ('金萱拿鐵', 2, 1);
insert into drinks (name, category, status) values ('烏龍拿鐵', 2, 1);
insert into drinks (name, category, status) values ('絕代雙Q奶茶', 3, 1);
insert into drinks (name, category, status) values ('招牌奶茶', 3, 1);
insert into drinks (name, category, status) values ('黃金奶綠', 3, 1);
insert into drinks (name, category, status) values ('珍珠奶茶', 3, 1);
insert into drinks (name, category, status) values ('鮮萃大麥奶茶', 3, 1);
insert into drinks (name, category, status) values ('海神奶茶', 3, 1);
insert into drinks (name, category, status) values ('玩火奶茶', 3, 1);
insert into drinks (name, category, status) values ('玫瑰普洱奶茶', 3, 1);
insert into drinks (name, category, status) values ('粉條奶茶', 3, 1);
insert into drinks (name, category, status) values ('仙草凍奶茶', 3, 1);
insert into drinks (name, category, status) values ('桂花奶綠', 3, 1);
insert into drinks (name, category, status) values ('港式厚奶', 3, 1);
insert into drinks (name, category, status) values ('觀音厚奶', 3, 1);
insert into drinks (name, category, status) values ('經典可可', 3, 1);
insert into drinks (name, category, status) values ('宇治抹茶', 3, 1);
insert into drinks (name, category, status) values ('抹茶拿鐵', 3, 1);
insert into drinks (name, category, status) values ('迷你珍珠奶茶', 3, 1);
insert into drinks (name, category, status) values ('錫蘭紅茶', 4, 1);
insert into drinks (name, category, status) values ('茉莉綠茶', 4, 1);
insert into drinks (name, category, status) values ('蜂蜜紅/綠茶', 4, 1);
insert into drinks (name, category, status) values ('玉荷冰綠', 4, 1);
insert into drinks (name, category, status) values ('檸檬冰茶(紅/綠)', 4, 1);
insert into drinks (name, category, status) values ('梅果茶', 4, 1);
insert into drinks (name, category, status) values ('養樂多綠茶', 4, 1);
insert into drinks (name, category, status) values ('百香搖果樂', 4, 1);
insert into drinks (name, category, status) values ('蘋果冰茶', 4, 1);
insert into drinks (name, category, status) values ('鳳梨冰茶', 4, 1);
insert into drinks (name, category, status) values ('芭樂檸檬綠', 4, 1);
insert into drinks (name, category, status) values ('超桔霸氣飲', 5, 1);
insert into drinks (name, category, status) values ('蜂蜜蘆薈', 5, 1);
insert into drinks (name, category, status) values ('金桔檸檬', 5, 1);
insert into drinks (name, category, status) values ('荔枝玉露', 5, 1);
insert into drinks (name, category, status) values ('纖美小紫蘇', 5, 1);
insert into drinks (name, category, status) values ('芭樂多多', 5, 1);
insert into drinks (name, category, status) values ('特調咖啡', 6, 1);
insert into drinks (name, category, status) values ('莊園拿鐵(12oz/16oz)', 7, 1);
insert into drinks (name, category, status) values ('精品招牌咖啡(12oz/16oz)', 7, 1);
insert into drinks (name, category, status) values ('經典美式咖啡(12oz/16oz)', 7, 1);
insert into drinks (name, category, status) values ('咖啡冰沙(16oz)', 7, 1);
insert into drinks (name, category, status) values ('美式經典(12oz)', 8, 1);
insert into drinks (name, category, status) values ('原味拿鐵(12oz)', 8, 1);
insert into drinks (name, category, status) values ('咖啡冰沙(16oz)', 8, 1);
insert into drinks (name, category, status) values ('檸檬愛玉', 9, 1);
insert into drinks (name, category, status) values ('百香果冰沙', 9, 1);
insert into drinks (name, category, status) values ('金芒果優酪', 9, 1);
insert into drinks (name, category, status) values ('葡萄柚綠茶', 9, 1);
insert into drinks (name, category, status) values ('七巧歐蕾', 9, 1);
insert into drinks (name, category, status) values ('青檸香柚QQ', 9, 1);
insert into drinks (name, category, status) values ('桂圓紅棗', 10, 1);
insert into drinks (name, category, status) values ('暖薑茶', 10, 1);
insert into drinks (name, category, status) values ('暖薑奶茶', 10, 1);
insert into drinks (name, category, status) values ('熱檸茶', 10, 1);
insert into drinks (name, category, status) values ('熱桔茶', 10, 1);
insert into drinks (name, category, status) values ('紫米奶茶', 10, 1);
insert into drinks (name, category, status) values ('紫米可可', 10, 1);
insert into drinks (name, category, status) values ('黑糖薑汁可可', 10, 1);
insert into drinks (name, category, status) values ('百香冰茶', 11, 1);
insert into drinks (name, category, status) values ('蜂蜜檸檬', 11, 1);
insert into drinks (name, category, status) values ('珍珠鮮奶', 11, 1);
insert into drinks (name, category, status) values ('直火烏龍奶茶', 11, 1);
insert into drinks (name, category, status) values ('檸檬觀音', 11, 1);
insert into drinks (name, category, status) values ('檸檬原汁', 11, 1);
insert into drinks (name, category, status) values ('檸檬多多', 11, 1);
insert into drinks (name, category, status) values ('仙草凍拿鐵', 11, 1);
insert into drinks (name, category, status) values ('茉莉烏龍拿鐵', 11, 1);
insert into drinks (name, category, status) values ('四季春拿鐵', 11, 1);
insert into drinks (name, category, status) values ('玫瑰普洱拿鐵', 11, 1);
insert into drinks (name, category, status) values ('文山拿鐵', 11, 1);
insert into drinks (name, category, status) values ('海神拿鐵', 11, 1);
insert into drinks (name, category, status) values ('玩火拿鐵', 11, 1);
insert into drinks (name, category, status) values ('大麥拿鐵', 11, 1);
insert into drinks (name, category, status) values ('四季春(冷泡茶)', 12, 1);
insert into drinks (name, category, status) values ('蜜香紅茶(冷泡茶)', 12, 1);
insert into drinks (name, category, status) values ('東方美人(冷泡茶)', 12, 1);

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
