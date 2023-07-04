import pandas as pd
import psycopg2


class color:
    PURPLE = '\033[95m'
    CYAN = '\033[96m'
    DARKCYAN = '\033[36m'
    BLUE = '\033[94m'
    GREEN = '\033[92m'
    YELLOW = '\033[93m'
    RED = '\033[91m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'
    END = '\033[0m'
    
def ice(icedict):
    if(icedict["冰塊"]):
        return icedict["冰塊"]
    elif any(("冰" in m or "熱" in m or "溫" in m) for m in icedict["口味"]):
        return next((value for value in icedict["口味"] if ("冰" in value or "熱" in value or "溫" in value)), "")
    else:
        return "正常冰"
    
def sweet(sweetdict):
    if(sweetdict["甜度"]):
        return sweetdict["甜度"]
    elif any(("糖" in m or "蜜" in m) for m in sweetdict["口味"]):
        return next((value for value in sweetdict["口味"] if ("糖" in value or "蜜" in value)), "")
    else:
        return "正常糖"
    
def query(q, conn):
    try:
        cursor = conn.cursor()
        cursor.execute(q)
        cursor.close()
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print('err', error)
        cursor.execute('ROLLBACK')
        raise
        

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
        cursor.execute('ROLLBACK')
        raise
        

# 此 function 會將塞進來的表格進行統計後分別匯入 8 張 aggregate 的表
def insert(df):
    for i in ['store', 'district', 'county', 'region']:
        aggregateHour = df.groupby([i, 'date', 'time', 'drink', 'ice', 'sweet', 'taste', 'topping'], as_index=False, dropna=False)[['price', 'amount']].sum()
        aggregateDay = df.groupby([i, 'date', 'drink', 'ice', 'sweet', 'taste', 'topping'], as_index=False, dropna=False)[['price', 'amount']].sum()
        dataHourTW = []
        dataDayTW = []

        # 這裡是在統計全台的資料，會一起放在 aggregateRegion 的表中
        if i == 'region':
            sql = 'select id from regions  where name = \'全台\''
            TWid = (select(sql, conn)[0][0])
            aggregateHourTW = df.groupby(['date', 'time', 'drink', 'ice', 'sweet', 'taste', 'topping'], as_index=False, dropna=False)[['price', 'amount']].sum()
            aggregateDayTW = df.groupby(['date', 'drink', 'ice', 'sweet', 'taste', 'topping'], as_index=False, dropna=False)[['price', 'amount']].sum()
            aggregateDayTW['topping'] = aggregateDayTW['topping'].apply(lambda x: x.split("/")).apply(lambda x: sorted([f for f in x if f]))
            aggregateDayTW['taste'] = aggregateDayTW['taste'].apply(lambda x: x.split("/")).apply(lambda x: sorted([f for f in x if f]))
            aggregateHourTW['topping'] = aggregateHourTW['topping'].apply(lambda x: x.split("/")).apply(lambda x: sorted([f for f in x if f]))
            aggregateHourTW['taste'] = aggregateHourTW['taste'].apply(lambda x: x.split("/")).apply(lambda x: sorted([f for f in x if f]))
            aggregateHourTW.insert(loc=0, column='region', value=[TWid]*len(aggregateHourTW))
            aggregateDayTW.insert(loc=0, column='region', value=[TWid]*len(aggregateDayTW))
            aggregateDayTW = aggregateDayTW.fillna(psycopg2.extensions.AsIs('NULL'))
            aggregateHourTW = aggregateHourTW.fillna(psycopg2.extensions.AsIs('NULL'))
            dataHourTW = aggregateHourTW.values.tolist()
            dataDayTW = aggregateDayTW.values.tolist()
            

        aggregateDay['topping'] = aggregateDay['topping'].apply(lambda x: x.split("/")).apply(lambda x: sorted([f for f in x if f]))
        aggregateDay['taste'] = aggregateDay['taste'].apply(lambda x: x.split("/")).apply(lambda x: sorted([f for f in x if f]))
        aggregateDay = aggregateDay.fillna(psycopg2.extensions.AsIs('NULL'))
        data = aggregateDay.values.tolist()
        data.extend(dataDayTW)
        args = ','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s,%s,%s,%s)", i).decode('utf-8')
                    for i in data)
        if i == 'store':
            sql = "INSERT INTO aggregateSalesDay" + " (" + i + ", date, drink, ice, sweet, taste, topping, price, amount) VALUES " + (args)
        else:
            sql = "INSERT INTO aggregateSalesDay" + i + " (" + i + ", date, drink, ice, sweet, taste, topping, price, amount) VALUES " + (args)
        query(sql, conn)
        
        aggregateHour['topping'] = aggregateHour['topping'].apply(lambda x: x.split("/")).apply(lambda x: sorted([f for f in x if f]))
        aggregateHour['taste'] = aggregateHour['taste'].apply(lambda x: x.split("/")).apply(lambda x: sorted([f for f in x if f]))
        aggregateHour = aggregateHour.fillna(psycopg2.extensions.AsIs('NULL'))
        data = aggregateHour.values.tolist()
        data.extend(dataHourTW)
        args = ','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", i).decode('utf-8')
                    for i in data)
        if i == 'store':
            sql = "INSERT INTO aggregateSalesHour" + " (" + i + " ,date, hour, drink, ice, sweet, taste, topping, price, amount) VALUES " + (args)
        else:
            sql = "INSERT INTO aggregateSalesHour" + i + " (" + i + " ,date, hour, drink, ice, sweet, taste, topping, price, amount) VALUES " + (args)
        query(sql, conn)


conn = psycopg2.connect(
    host="localhost",
    database="comebuy_db",
    port='5433',
    user="dev",
    password="dev")
cursor = conn.cursor()


# 取出資料庫中的資料（如 id, comebuy_id)等
sql = 'select * from tempSales'
temp_sales = select(sql, conn)
sql = 'select * from sweets'
sweets = select(sql, conn)
sweets = {i[1]: i[0] for i in sweets}
sql = 'select * from ices'
ices = select(sql, conn)
ices = {i[1]: i[0] for i in ices}
sql = 'select stores.comebuy_id, stores.id from stores'
stores = select(sql, conn)
stores = {i[0]: i[1] for i in stores}
sql = 'select drinks.comebuy_id, drinks.id from drinks'
drinks = select(sql, conn)
drinks = {i[0]: i[1] for i in drinks}
sql = 'select s.id, s.region, s.county, s.district from stores s'
stores_detail = select(sql, conn)
stores_detail_df = pd.DataFrame(stores_detail, columns =['id', 'region', 'county', 'district'])


df = pd.DataFrame(temp_sales, columns =['id', '分店代號', 'time', '代號', '口味', '加料', '銷售金額', '銷售數量']).drop(columns=['id']).dropna(subset = ["口味"]).fillna("")
df = df[["分店代號", 'time', "代號", "口味", "加料", "銷售數量", "銷售金額"]]

df = df.rename(columns = {"口味": "甜口冰"})


df["甜口冰 new"] = df["甜口冰"].apply(lambda x: x.split("/"))
df["口味"] = df["甜口冰 new"].apply(lambda x: x[0])
df["冰塊"] = df["甜口冰 new"].apply(lambda x: x[1])
df["甜度"] = df["甜口冰 new"].apply(lambda x: x[2])
df["長度"] = df["甜口冰 new"].apply(lambda x: len(x))
    

df_flavor = df[["口味"]]
df_flavor = df_flavor[df_flavor["口味"] != ""]
df_flavor["口味"] = df_flavor["口味"].apply(lambda x: x.split(","))

df["口味"] = df["口味"].apply(lambda x: x.split(","))

flavor = {}
for i in df_flavor['口味'].values:
    for j in i:
        if(j in flavor):
            flavor[j] += 1
        else:
            flavor[j] = 1


df["冰塊"] = df[["口味", "冰塊"]].apply(lambda x: ice(x), axis = 1)
df["甜度"] = df[["口味", "甜度"]].apply(lambda x: sweet(x), axis = 1)
df["口味"] = df["口味"].apply(lambda x: sorted([f for f in x if f and (not "糖" in f and not "蜜" in f and not "冰" in f and not "熱" in f and not "溫" in f)]))

df["加料"] = df["加料"].apply(lambda x: x.split("/")).apply(lambda x: sorted([f for f in x if f]))



df = df[["分店代號", "time", "代號", "冰塊", "甜度", "口味", "加料", "銷售金額", "銷售數量"]].rename(columns = {"分店代號":"store",
                                                                                                         "time":"time",
                                                                                                         "代號": "drink",
                                                                                                         "冰塊":"ice",
                                                                                                         "甜度":"sweet",
                                                                                                         "口味":"taste",
                                                                                                         "加料":"topping",
                                                                                                         "銷售金額":"price",
                                                                                                         "銷售數量":"amount"})


temp_sales_df = df
# 將 tempSales 中的 store, drink 對應到資料庫中的 id，若無對應的 id 則會跳出錯誤訊息，請先新增 id 或移除該交易再匯入資料
apply_list = [['sweet', sweets, '甜度'], ['ice', ices, '冰塊'], ['store', stores, '門市'], ['drink', drinks, '飲品']]
for ll in apply_list:
    try:
        temp_sales_df[ll[0]] = temp_sales_df[ll[0]].apply(lambda x: ll[1][x])
    except KeyError as error:
        print('有不存在資料庫的的' + ll[2], error, "，請先新增該選項或移除該筆交易後再匯入資料")
        raise(error)


# 將資料放入 sales 這張表中
data_list = temp_sales_df.values.tolist()
args = ','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s,%s,%s,%s)", i).decode('utf-8')
                for i in data_list)
sql = "INSERT INTO sales (store, time, drink, ice, sweet, taste, topping, price, amount) VALUES " + (args)
query(sql, conn)


temp_sales_df['date'] = temp_sales_df['time'].apply(lambda x: x.date())
temp_sales_df['time'] = temp_sales_df['time'].apply(lambda x: x.hour)
temp_sales_df = temp_sales_df[['store', 'date', 'time', 'drink', 'ice', 'sweet', 'taste', 'topping', 'price', 'amount']]
temp_all_df = pd.merge(temp_sales_df, stores_detail_df, left_on="store", right_on="id", how='left').drop(['id'], axis=1)


temp_all_df['taste'] = temp_all_df['taste'].apply(lambda x: '/'.join(x) if type(x) == list else x)
temp_all_df['topping'] = temp_all_df['topping'].apply(lambda x: '/'.join(x) if type(x) == list else x)


insert(temp_all_df)
# 執行完成後會將 tempsales 中的資料清除
query('DELETE FROM tempSales', conn)
conn.close()
print('done')