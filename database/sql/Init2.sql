INSERT INTO regions (name)
VALUES ('北區'),
       ('南區'),
       ('中區'),
       ('東區'),
       ('離島');

INSERT INTO counties (name)
VALUES ('新北市'),
       ('臺北市'),
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
       ('微蜜'),
       ('少蜜'),
       ('半蜜'),
       ('多蜜');

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

insert into stores(region, county, district, name) values (1, 1, 1, '新店光明店');
insert into stores(region, county, district, name) values (1, 1, 1, '新店中正(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 1, 1, '新店大豐店');
insert into stores(region, county, district, name) values (1, 1, 2, '三重自強店');
insert into stores(region, county, district, name) values (1, 1, 2, '三重長壽店');
insert into stores(region, county, district, name) values (1, 1, 2, '三重溪尾店');
insert into stores(region, county, district, name) values (1, 1, 2, '三重文化店');
insert into stores(region, county, district, name) values (1, 1, 2, '三重五華店');
insert into stores(region, county, district, name) values (1, 1, 2, '三重中華店');
insert into stores(region, county, district, name) values (1, 1, 2, '三重大同店');
insert into stores(region, county, district, name) values (1, 1, 2, '三重力行(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 1, 3, '板橋文德店');
insert into stores(region, county, district, name) values (1, 1, 3, '板橋華興店');
insert into stores(region, county, district, name) values (1, 1, 3, '板橋民治店');
insert into stores(region, county, district, name) values (1, 1, 3, '板橋中正店');
insert into stores(region, county, district, name) values (1, 1, 3, '板橋民生店');
insert into stores(region, county, district, name) values (1, 1, 3, '亞東科大店');
insert into stores(region, county, district, name) values (1, 1, 3, '板橋松柏店');
insert into stores(region, county, district, name) values (1, 1, 3, '板橋遠百店');
insert into stores(region, county, district, name) values (1, 1, 3, '亞東醫院店');
insert into stores(region, county, district, name) values (1, 1, 3, '板橋重慶店');
insert into stores(region, county, district, name) values (1, 1, 3, '板橋四雅店');
insert into stores(region, county, district, name) values (1, 1, 4, '三峽光明店');
insert into stores(region, county, district, name) values (1, 1, 4, '三峽北大店');
insert into stores(region, county, district, name) values (1, 1, 5, '淡水沙崙店');
insert into stores(region, county, district, name) values (1, 1, 5, '淡水中正店');
insert into stores(region, county, district, name) values (1, 1, 5, '淡水竹圍店');
insert into stores(region, county, district, name) values (1, 1, 5, '淡水北新店');
insert into stores(region, county, district, name) values (1, 1, 6, '泰山全興店');
insert into stores(region, county, district, name) values (1, 1, 6, '泰山明志店');
insert into stores(region, county, district, name) values (1, 1, 7, '樹林太元店');
insert into stores(region, county, district, name) values (1, 1, 7, '樹林博愛店');
insert into stores(region, county, district, name) values (1, 1, 7, '樹林金門店');
insert into stores(region, county, district, name) values (1, 1, 7, '新北樹林店');
insert into stores(region, county, district, name) values (1, 1, 8, '汐止大同店');
insert into stores(region, county, district, name) values (1, 1, 8, '汐止忠孝店');
insert into stores(region, county, district, name) values (1, 1, 9, '林口文化店');
insert into stores(region, county, district, name) values (1, 1, 10, '八里中山店');
insert into stores(region, county, district, name) values (1, 1, 11, '蘆洲信義店');
insert into stores(region, county, district, name) values (1, 1, 11, '蘆洲復興(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 1, 11, '蘆洲長安店');
insert into stores(region, county, district, name) values (1, 1, 12, '五股新成泰(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 1, 13, '深坑埔新店');
insert into stores(region, county, district, name) values (1, 1, 14, '土城延吉店');
insert into stores(region, county, district, name) values (1, 1, 14, '土城光明店');
insert into stores(region, county, district, name) values (1, 1, 15, '新莊西盛店');
insert into stores(region, county, district, name) values (1, 1, 15, '新莊新泰店');
insert into stores(region, county, district, name) values (1, 1, 15, '新莊化成(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 1, 15, '新莊福壽店');
insert into stores(region, county, district, name) values (1, 1, 15, '新莊化成店');
insert into stores(region, county, district, name) values (1, 1, 15, '新莊中和店');
insert into stores(region, county, district, name) values (1, 1, 15, '新莊輔大店');
insert into stores(region, county, district, name) values (1, 1, 15, '輔大文園店');
insert into stores(region, county, district, name) values (1, 1, 15, '新莊新莊(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 1, 15, '新莊中港(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 1, 15, '新莊後港店');
insert into stores(region, county, district, name) values (1, 1, 16, '永和民生店');
insert into stores(region, county, district, name) values (1, 1, 16, '永和頂溪店');
insert into stores(region, county, district, name) values (1, 1, 16, '永和得和店');
insert into stores(region, county, district, name) values (1, 1, 17, '中和南山(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 1, 17, '中和大勇店');
insert into stores(region, county, district, name) values (1, 1, 17, '中和宜安店');
insert into stores(region, county, district, name) values (1, 1, 17, '中和民安店');
insert into stores(region, county, district, name) values (1, 1, 17, '中和遠東廣場店');
insert into stores(region, county, district, name) values (1, 1, 17, '中和南華店');
insert into stores(region, county, district, name) values (1, 1, 17, '中和環球店');
insert into stores(region, county, district, name) values (1, 1, 17, '中和中山店');
insert into stores(region, county, district, name) values (1, 1, 17, '中和民享店');
insert into stores(region, county, district, name) values (1, 1, 17, '中和中安店');
insert into stores(region, county, district, name) values (1, 4, 18, '基隆安一店');
insert into stores(region, county, district, name) values (1, 4, 19, '基隆暖暖店');
insert into stores(region, county, district, name) values (1, 4, 20, '基隆七堵店');
insert into stores(region, county, district, name) values (1, 4, 21, '基隆廟口(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 4, 22, '基隆新豐店');
insert into stores(region, county, district, name) values (1, 4, 22, '基隆海洋店');
insert into stores(region, county, district, name) values (1, 3, 23, '桃園桃鶯店');
insert into stores(region, county, district, name) values (1, 3, 23, '桃園中山店');
insert into stores(region, county, district, name) values (1, 3, 23, '桃園寶山店');
insert into stores(region, county, district, name) values (1, 3, 23, '桃園中正店');
insert into stores(region, county, district, name) values (1, 3, 24, '八德福國店');
insert into stores(region, county, district, name) values (1, 3, 24, '八德義勇店');
insert into stores(region, county, district, name) values (1, 3, 25, '大園菓林店');
insert into stores(region, county, district, name) values (1, 3, 25, '大園中正東店');
insert into stores(region, county, district, name) values (1, 3, 26, '楊梅大成店');
insert into stores(region, county, district, name) values (1, 3, 26, '楊梅文化店');
insert into stores(region, county, district, name) values (1, 3, 26, '桃園埔心(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 3, 27, '龜山德明店');
insert into stores(region, county, district, name) values (1, 3, 27, '林口長庚店');
insert into stores(region, county, district, name) values (1, 3, 27, '林口復興(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 3, 27, '桃園迴龍店');
insert into stores(region, county, district, name) values (1, 3, 28, '觀音成功店');
insert into stores(region, county, district, name) values (1, 3, 29, '大溪得勝(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 3, 30, '桃園南崁店');
insert into stores(region, county, district, name) values (1, 3, 31, '桃園龍潭店');
insert into stores(region, county, district, name) values (1, 3, 32, '平鎮南豐店');
insert into stores(region, county, district, name) values (1, 3, 33, '中壢中原店');
insert into stores(region, county, district, name) values (1, 3, 33, '中壢龍東店');
insert into stores(region, county, district, name) values (1, 3, 33, '桃園青埔店');
insert into stores(region, county, district, name) values (1, 3, 33, '中壢民族店');
insert into stores(region, county, district, name) values (1, 3, 33, '中壢威尼斯店');
insert into stores(region, county, district, name) values (1, 3, 33, '中壢 sogo (研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 34, '新東店');
insert into stores(region, county, district, name) values (1, 2, 34, '台北西松店');
insert into stores(region, county, district, name) values (1, 2, 34, '慶城店');
insert into stores(region, county, district, name) values (1, 2, 34, '新東(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 35, '台北中坡店');
insert into stores(region, county, district, name) values (1, 2, 35, '台北永春店');
insert into stores(region, county, district, name) values (1, 2, 35, '北醫店');
insert into stores(region, county, district, name) values (1, 2, 35, '台北市府(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 35, '台北永吉(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 36, '台北延三店');
insert into stores(region, county, district, name) values (1, 2, 36, '台北圓山店');
insert into stores(region, county, district, name) values (1, 2, 37, '台北明德店');
insert into stores(region, county, district, name) values (1, 2, 37, '石牌國中店');
insert into stores(region, county, district, name) values (1, 2, 37, '北投吉利店');
insert into stores(region, county, district, name) values (1, 2, 37, '北投奇岩店');
insert into stores(region, county, district, name) values (1, 2, 37, '北投榮總(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 37, '北投溫泉(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 37, '石牌致遠(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 37, '石牌裕民店');
insert into stores(region, county, district, name) values (1, 2, 38, '台北德行東店');
insert into stores(region, county, district, name) values (1, 2, 38, '士林大南(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 38, '士林美崙(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 38, '台北芝山店');
insert into stores(region, county, district, name) values (1, 2, 38, '台北天母店');
insert into stores(region, county, district, name) values (1, 2, 38, '士林文化店');
insert into stores(region, county, district, name) values (1, 2, 38, '社子延平店');
insert into stores(region, county, district, name) values (1, 2, 39, '台北江南店');
insert into stores(region, county, district, name) values (1, 2, 39, '台北葫州店');
insert into stores(region, county, district, name) values (1, 2, 39, '台北內湖(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 39, '西湖(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 40, '台北龍江店');
insert into stores(region, county, district, name) values (1, 2, 40, '大直北安店');
insert into stores(region, county, district, name) values (1, 2, 40, '台北民權西店');
insert into stores(region, county, district, name) values (1, 2, 40, '台北復錦店');
insert into stores(region, county, district, name) values (1, 2, 40, '林森欣欣(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 40, '台北錦州(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 41, '科技大樓店');
insert into stores(region, county, district, name) values (1, 2, 41, '台北安居店');
insert into stores(region, county, district, name) values (1, 2, 41, '台北科大店');
insert into stores(region, county, district, name) values (1, 2, 41, '忠孝 sogo 店');
insert into stores(region, county, district, name) values (1, 2, 42, '台北景興店');
insert into stores(region, county, district, name) values (1, 2, 42, '台北木柵店');
insert into stores(region, county, district, name) values (1, 2, 42, '景美景中店');
insert into stores(region, county, district, name) values (1, 2, 42, '木柵世新(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 22, '台北忠孝東店');
insert into stores(region, county, district, name) values (1, 2, 22, '台北衡陽店');
insert into stores(region, county, district, name) values (1, 2, 22, '台北汀州店');
insert into stores(region, county, district, name) values (1, 2, 22, '台北公館店');
insert into stores(region, county, district, name) values (1, 2, 22, '台北南陽(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 22, '台北光華(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 2, 43, '南港昆陽(研磨咖啡)店');
insert into stores(region, county, district, name) values (1, 5, 45, '新竹民族店');
insert into stores(region, county, district, name) values (1, 5, 44, '新竹光華(研磨咖啡)店');
insert into stores(region, county, district, name) values (2, 6, 46, '台南善化店');
insert into stores(region, county, district, name) values (2, 7, 47, '高雄熱河店');
insert into stores(region, county, district, name) values (2, 8, 48, '屏東林森店');
insert into stores(region, county, district, name) values (2, 8, 49, '潮州興隆店');
insert into stores(region, county, district, name) values (3, 9, 50, '彰化民生店');
insert into stores(region, county, district, name) values (4, 10, 51, '花蓮中山店');
insert into stores(region, county, district, name) values (4, 10, 51, '花蓮新港店');
insert into stores(region, county, district, name) values (4, 10, 52, '花蓮玉里店');
insert into stores(region, county, district, name) values (4, 11, 53, '宜蘭舊城店');
insert into stores(region, county, district, name) values (4, 11, 53, '宜蘭復興店');
insert into stores(region, county, district, name) values (4, 11, 53, '宜蘭中山店');
insert into stores(region, county, district, name) values (4, 11, 54, '羅東羅商店');
insert into stores(region, county, district, name) values (4, 11, 54, '羅東站前店');
insert into stores(region, county, district, name) values (4, 11, 54, '羅東夜市店');
insert into stores(region, county, district, name) values (4, 11, 55, '宜蘭員山店');
insert into stores(region, county, district, name) values (4, 11, 56, '宜蘭壯圍店');
insert into stores(region, county, district, name) values (4, 11, 57, '宜蘭五結店');
insert into stores(region, county, district, name) values (4, 11, 58, '宜蘭冬山店');
insert into stores(region, county, district, name) values (4, 11, 59, '宜蘭頭城店');
insert into stores(region, county, district, name) values (4, 11, 60, '宜蘭礁溪店');
insert into stores(region, county, district, name) values (5, 12, 61, '澎湖三多店');
insert into stores(region, county, district, name) values (5, 12, 61, '澎湖中華(研磨咖啡)店');
insert into stores(region, county, district, name) values (5, 12, 61, '澎湖中正(研磨咖啡)店');
insert into stores(region, county, district, name) values (5, 13, 62, '金門復興店');
