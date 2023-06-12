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


def split_tolist(target):
    if target:
        target = target.split('/')
        target.sort()
        return target
    return target

def insert(df):
    for i in ['store', 'district', 'county', 'region']:
        aggregateHour = df.groupby([i, 'date', 'time', 'drink', 'ice', 'sweet', 'taste', 'topping'], as_index=False)[['price', 'amount']].sum()
        aggregateDay = df.groupby([i, 'date', 'drink', 'ice', 'sweet', 'taste', 'topping'], as_index=False)[['price', 'amount']].sum()
        dataHourTW = []
        dataDayTW = []
        if i == 'region':
            aggregateHourTW = df.groupby(['date', 'time', 'drink', 'ice', 'sweet', 'taste', 'topping'], as_index=False)[['price', 'amount']].sum()
            aggregateDayTW = df.groupby(['date', 'drink', 'ice', 'sweet', 'taste', 'topping'], as_index=False)[['price', 'amount']].sum()
            aggregateDayTW['topping'] = aggregateDayTW['topping'].apply(lambda x: split_tolist(x) if type(x) == str else None)
            aggregateDayTW['taste'] = aggregateDayTW['taste'].apply(lambda x: split_tolist(x) if type(x) == str else None)
            aggregateHourTW['topping'] = aggregateHourTW['topping'].apply(lambda x: split_tolist(x) if type(x) == str else None)
            aggregateHourTW['taste'] = aggregateHourTW['taste'].apply(lambda x: split_tolist(x) if type(x) == str else None)
            aggregateHourTW.insert(loc=0, column='region', value=['6']*len(aggregateHourTW))
            aggregateDayTW.insert(loc=0, column='region', value=['6']*len(aggregateDayTW))
            dataHourTW = list(aggregateHourTW.itertuples(index=False, name=None))
            dataDayTW = list(aggregateDayTW.itertuples(index=False, name=None))
   
        aggregateDay['topping'] = aggregateDay['topping'].apply(lambda x: split_tolist(x) if type(x) == str else None)
        aggregateDay['taste'] = aggregateDay['taste'].apply(lambda x: split_tolist(x) if type(x) == str else None)
        data = list(aggregateDay.itertuples(index=False, name=None))
        data.extend(dataDayTW)
        # args = ','.join(cursor.mogrify(f"({', '.join(['%s' for _ in data[i]])})", i).decode('utf-8')
        #             for i in data)
        args = ','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s,%s,%s,%s)", i).decode('utf-8')
                    for i in data)
        if i == 'store':
            sql = "INSERT INTO aggregateSalesDay" + " (" + i + ", date, drink, ice, sweet, taste, topping, price, amount) VALUES " + (args)
        else:
            sql = "INSERT INTO aggregateSalesDay" + i + " (" + i + ", date, drink, ice, sweet, taste, topping, price, amount) VALUES " + (args)
        query(sql, conn)
        
        aggregateHour['topping'] = aggregateHour['topping'].apply(lambda x: split_tolist(x) if type(x) == str else None)
        aggregateHour['taste'] = aggregateHour['taste'].apply(lambda x: split_tolist(x) if type(x) == str else None)
        data = list(aggregateHour.itertuples(index=False, name=None))
        data.extend(dataHourTW)
        # args = ','.join(cursor.mogrify(f"({', '.join(['%s' for _ in data[i]])})", i).decode('utf-8')
        #             for i in data)
        args = ','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", i).decode('utf-8')
                    for i in data)
        if i == 'store':
            sql = "INSERT INTO aggregateSalesHour" + " (" + i + " ,date, hour, drink, ice, sweet, taste, topping, price, amount) VALUES " + (args)
        else:
            sql = "INSERT INTO aggregateSalesHour" + i + " (" + i + " ,date, hour, drink, ice, sweet, taste, topping, price, amount) VALUES " + (args)
        query(sql, conn)

sql = 'select * from tempSales'
temp_sales = select(sql, conn)
sql = 'select * from sweets'
sweets = select(sql, conn)
sweets = {i[1]: i[0] for i in sweets}
sql = 'select * from ices'
ices = select(sql, conn)
ices = {i[1]: i[0] for i in ices}
sql = 'select stores.id, stores.name from stores'
stores = select(sql, conn)
stores = {i[1]: i[0] for i in stores}
sql = 'select drinks.id, drinks.name from drinks'
drinks = select(sql, conn)
drinks = {i[1]: i[0] for i in drinks}
sql = 'select s.id, s.region, s.county, s.district from stores s'
stores_detail = select(sql, conn)

stores_detail_df = pd.DataFrame(stores_detail, columns =['id', 'region', 'county', 'district'])

temp_sales_df = pd.DataFrame(temp_sales, columns =['id', 'store', 'date', 'time', 'drink', 'ice', 'sweet', 'taste', 'topping', 'price', 'amount']).drop(columns=['id'])
temp_sales_df['sweet'] = temp_sales_df['sweet'].apply(lambda x: sweets[x])
temp_sales_df['ice'] = temp_sales_df['ice'].apply(lambda x: ices[x])
temp_sales_df['store'] = temp_sales_df['store'].apply(lambda x: stores[x])
temp_sales_df['drink'] = temp_sales_df['drink'].apply(lambda x: drinks[x])
temp_sales_df['taste'] = temp_sales_df['taste'].apply(lambda x: split_tolist(x))
temp_sales_df['topping'] = temp_sales_df['topping'].apply(lambda x: split_tolist(x))

data_list = temp_sales_df.values.tolist()
args = ','.join(cursor.mogrify("(%s,%s,%s,%s,%s,%s,%s,%s,%s,%s)", i).decode('utf-8')
                for i in data_list)
sql = "INSERT INTO sales (store, date, time, drink, ice, sweet, taste, topping, price, amount) VALUES " + (args)
query(sql, conn)

temp_sales_df['time'] = temp_sales_df['time'].apply(lambda x: x.hour)

temp_all_df = pd.merge(temp_sales_df, stores_detail_df, left_on="store", right_on="id", how='left').drop(['id'], axis=1)
temp_all_df = temp_all_df.fillna(value=0)
temp_all_df['taste'] = temp_all_df['taste'].apply(lambda x: '/'.join(x) if type(x) == list else x)
temp_all_df['topping'] = temp_all_df['topping'].apply(lambda x: '/'.join(x) if type(x) == list else x)

insert(temp_all_df)
query('DELETE FROM tempSales', conn)
conn.close()
print('done')
