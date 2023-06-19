## 資料庫架設

1. 須先安裝 PostgreSQL 並建立一個 database。
2. 在 .env 中放入資料庫的連線資料。
3. 在此資料夾下依序執行 createTable.py 兩個檔案
```bash
/database
python createTable.py
```
4. 接著將門市及飲品的資料匯入
- 門市的欄位如下：
  - id: 此設定為 serial number 匯入時無需匯入此欄位，資料型態為整數。
  - region: 此為門市之區域，資料型態為整數，請參照資料庫中 region 的 table。
  - county: 此為門市之縣市，資料型態為整數，請參照資料庫中 county 的 table。
  - district: 此為門市之鄉鎮市，資料型態為整數，請參照資料庫中 district 的 table。
  - name: 此為門市之中文名稱，僅用為畫面展示，店名更動可直接更改。
  - comebuy_id: 此為總公司資料庫中的門市 id。
- 飲品的欄位如下：
  - id: 此設定為 serial number 匯入時無需匯入此欄位，資料型態為整數。
  - name: 此為飲品名稱，僅用為畫面展示，店名更動可直接更改。。
  - category: 此為飲品類別，資料型態為整數，請參照資料庫中 category 的 table。
  - status: 此為飲品狀態，資料型態為整數，請參照資料庫中 status 的 table。
  - comebuy_id: 此為總公司資料庫中的飲品 id。
5. 接著將銷售資料匯入資料庫中的 tempSales 這個 table
- 資料庫的欄位如下：
  - id: 此設定為 serial number 匯入時無需匯入此欄位，資料型態為整數。
  - store: 此為總公司資料庫中的門市 id，若傳入之門市不存在於 store 的 table 中，該筆銷售紀錄將不會被存入資料庫。
  - time: 銷售日期時間，資料型態為 timestamp (e.g. yyyy/mm/dd hh:mm:ss)。
  - drink: 此為總公司資料庫中的飲品 id，若傳入之飲品不存在於 drink 的 table 中，該筆銷售紀錄將不會被存入資料庫。
  - taste: 口味，即總公司資料庫中的口味（e.g. 芋/去冰/半糖），資料型態為 varchar。
  - topping: 加料，資料型態為 varchar。
  - price: 訂單總價。
  - amount: 該筆訂單之飲料杯數。
- 範例如下：
```bash
INSERT INTO tempSales(store, time, drink, topping, taste, price, amount) VALUES ('C0001', '2023-01-06 15:10:00', 'AC002', '珍珠', '/去冰/半糖', 200, 4);
```

6. 匯入完成後，在此資料夾下執行 aggregate.py
```bash
python aggregate0617.py
```
7. 後續若每週更新銷售紀錄則反覆步驟 5、6。


  
    
	
	
	
	
	
	
	
	
	
