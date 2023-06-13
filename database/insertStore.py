import json

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

def query(q, conn):
    try:
        cursor = conn.cursor()
        cursor.execute(q)
        cursor.close()
        conn.commit()
    except (Exception, psycopg2.DatabaseError) as error:
        print('err', error)


with open('location.json', encoding="utf-8") as json_file:
    stores = json.load(json_file)
    stores = stores["全台"]

sql = '''select * from regions'''
r = select(sql, conn)
regions = {i[1]: i[0] for i in r}
sql = '''select * from counties'''
r = select(sql, conn)
counties = {i[1]: i[0] for i in r}
sql = '''select * from districts'''
r = select(sql, conn)
districts = {i[1]: i[0] for i in r}

storeData = []
for region in stores.keys():
    if region in regions.keys():
        r = regions[region]
        for county in stores[region].keys():
            if county in counties.keys():
                c = counties[county]
                for dist in stores[region][county].keys():
                    if dist in districts.keys():
                        d = districts[dist]
                        for store in stores[region][county][dist]:
                            storeData.append((r, c, d, store))

args = ','.join(cursor.mogrify("(%s,%s,%s,%s)", i).decode('utf-8')
                    for i in storeData)
sql = 'insert into stores(region, county, district, name) values ' + args
query(sql, conn)
print('done')