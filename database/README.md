## 資料庫架設

1. 須先安裝 PostgreSQL 並建立一個 database。
2. 在 .env 中放入資料庫的連線資料。
3. 在此資料夾下依序執行 createTable.py, insertStore.py 兩個檔案
```bash
/database
python createTable.py
python insertTable.py
```
4. 接著將銷售資料匯入資料庫中的 tempSales 這個 table
- 資料庫的欄位如下：
  - id: 此設定為 serial number 匯入時無需匯入此欄位，資料型態為整數。
  - store: 此為門市之中文名稱，請符合本資料庫之設定名稱，詳見下方說明。
  - date: 銷售日期，資料型態為 date。
  - time: 銷售時間，資料型態為 time。
  - drink: 銷售飲品之中文名稱，請符合本資料庫之設定名稱，品項以 comebuy 方提供之菜單為準（不包含周邊商品、桶茶、派對盒），詳見下方說明。
  - ice: 冰量，請符合本資料庫之設定名稱，詳見下方說明。
  - sweet: 甜度，請符合本資料庫之設定名稱，詳見下方說明。
  - taste: 口味，此欄位可為空，若有多於一種口味，兩種口味之間請用 '/' 隔開。
  - topping: 加料，此欄位可為空，若有多於一種加料，兩種加料之間請用 '/' 隔開。
  - price: 訂單總價。
  - amount: 該筆訂單之飲料杯數。
- 補充說明： 
    - 目前本資料庫的門市以 /database/location.json 中的門市為主。
    - 飲品、冰量、甜度、口味、加料則以 /database/init2.sql 中為主。
    - 請勿匯入不存在於以上檔案中的資料。

5. 匯入完成後，在此資料夾下執行 aggregate.py
```bash
python aggregate.py
```
6. 後續若每週更新銷售紀錄則反覆步驟 4、5。


  
    
	
	
	
	
	
	
	
	
	
