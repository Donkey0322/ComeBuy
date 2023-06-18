import pandas as pd
import psycopg2
from config import db_config

conn = psycopg2.connect(
    host=db_config.host,
    port=db_config.port,
    user=db_config.username,
    password=db_config.password,
    database=db_config.db_name,
)
cursor = conn.cursor()

def query(q, conn):
    try:
        cursor = conn.cursor()
        cursor.execute(q)
        cursor.close()
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print('err', error)

def query2(q, s, conn):
    try:
        cursor = conn.cursor()
        cursor.execute(q,s)
        cursor.close()
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print('err', error)

def select(q, conn):
    try:
        cursor = conn.cursor()
        cursor.execute(q)
        r = cursor.fetchall()
        cursor.close()
        conn.commit()
        return(r)
    except (Exception, psycopg2.DatabaseError) as error:
        print('err', error)

# 此 function 會將塞進來的表格進行統計後分別匯入 8 張 aggregate 的表
def insert(df):
    for i in ['store', 'district', 'county', 'region']:
        aggregateHour = df.groupby([i, 'date', 'time', 'drink', 'taste', 'topping'], as_index=False, dropna=False)[['price', 'amount']].sum()
        aggregateDay = df.groupby([i, 'date', 'drink', 'taste', 'topping'], as_index=False, dropna=False)[['price', 'amount']].sum()
        dataHourTW = []
        dataDayTW = []

        # 這裡是在統計全台的資料，會一起放在 aggregateRegion 的表中
        if i == 'region':
            sql = 'select id from regions  where name = \'全台\''
            TWid = (select(sql, conn)[0][0])
            aggregateHourTW = df.groupby(['date', 'time', 'drink', 'taste', 'topping'], as_index=False, dropna=False)[['price', 'amount']].sum()
            aggregateDayTW = df.groupby(['date', 'drink', 'taste', 'topping'], as_index=False, dropna=False)[['price', 'amount']].sum()
            aggregateHourTW.insert(loc=0, column='region', value=[TWid]*len(aggregateHourTW))
            aggregateDayTW.insert(loc=0, column='region', value=[TWid]*len(aggregateDayTW))
            aggregateDayTW = aggregateDayTW.fillna(psycopg2.extensions.AsIs('NULL'))
            aggregateHourTW = aggregateHourTW.fillna(psycopg2.extensions.AsIs('NULL'))
            dataHourTW = aggregateHourTW.values.tolist()
            dataDayTW = aggregateDayTW.values.tolist()

        aggregateDay = aggregateDay.fillna(psycopg2.extensions.AsIs('NULL'))
        data = aggregateDay.values.tolist()
        data.extend(dataDayTW)
        args = ','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s,%s)", i).decode('utf-8')
                    for i in data)
        if i == 'store':
            sql = "INSERT INTO aggregateSalesDay" + " (" + i + ", date, drink, taste, topping, price, amount) VALUES " + (args)
        else:
            sql = "INSERT INTO aggregateSalesDay" + i + " (" + i + ", date, drink, taste, topping, price, amount) VALUES " + (args)
        query(sql, conn)
        
        aggregateHour = aggregateHour.fillna(psycopg2.extensions.AsIs('NULL'))
        data = aggregateHour.values.tolist()
        data.extend(dataHourTW)
        args = ','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s,%s,%s)", i).decode('utf-8')
                    for i in data)
        print(args)
        if i == 'store':
            sql = "INSERT INTO aggregateSalesHour" + " (" + i + " ,date, hour, drink, taste, topping, price, amount) VALUES " + (args)
        else:
            sql = "INSERT INTO aggregateSalesHour" + i + " (" + i + " ,date, hour, drink, taste, topping, price, amount) VALUES " + (args)
        print(sql)
        query(sql, conn)


# 取出資料庫中的資料（如 id, comebuy_id)等
sql = 'select * from tempsales'
temp_sales = select(sql, conn)
sql = 'select stores.comebuy_id, stores.id from stores'
stores = select(sql, conn)
stores = {i[0]: i[1] for i in stores}
sql = 'select drinks.comebuy_id, drinks.id from drinks'
drinks = select(sql, conn)
drinks = {i[0]: i[1] for i in drinks}
sql = 'select s.id, s.region, s.county, s.district from stores s'
stores_detail = select(sql, conn)
stores_detail_df = pd.DataFrame(stores_detail, columns =['id', 'region', 'county', 'district'])

# 將 tempSales 中的 store, drink 對應到資料庫中的 id，若無對應的 id 則會移除該筆資料
temp_sales_df = pd.DataFrame(temp_sales, columns =['id', 'store', 'time', 'drink', 'taste', 'topping', 'price', 'amount']).drop(columns=['id'])
temp_sales_df['store'] = temp_sales_df['store'].apply(lambda x: stores[x] if x in stores.keys() else False)
temp_sales_df['drink'] = temp_sales_df['drink'].apply(lambda x: drinks[x] if x in drinks.keys() else False)
temp_sales_df = temp_sales_df[temp_sales_df.store != False]
temp_sales_df = temp_sales_df[temp_sales_df.drink != False]

# 將資料放入 sales 這張表中
cursor = conn.cursor()
data_list = temp_sales_df.values.tolist()
args = ','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s,%s)", i).decode('utf-8')
                for i in data_list)
sql = "INSERT INTO sales (store, time, drink, taste, topping, price, amount) VALUES " + (args)
query(sql, conn)

temp_sales_df['date'] = temp_sales_df['time'].apply(lambda x: x.date())
temp_sales_df['time'] = temp_sales_df['time'].apply(lambda x: x.hour)
temp_sales_df = temp_sales_df[['store', 'date', 'time', 'drink', 'taste', 'topping', 'price', 'amount']]

temp_all_df = pd.merge(temp_sales_df, stores_detail_df, left_on="store", right_on="id", how='left').drop(['id'], axis=1)

insert(temp_all_df)
# 執行完成後會將 tempsales 中的資料清除
query('DELETE FROM tempSales', conn)
conn.close()
print('done')