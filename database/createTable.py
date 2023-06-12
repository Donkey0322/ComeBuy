import psycopg2
import os
from config import db_config

conn = psycopg2.connect(
    host=db_config.host,
    port=db_config.port,
    user=db_config.username,
    password=db_config.password,
    database=db_config.db_name,
)

sql_filenames = os.listdir('database/sql')
for filename in sql_filenames:
    with open(f'database/sql/{filename}', 'r', encoding='utf-8') as file:
        sqls = file.read().split(';')
        for sql in sqls[:-1]:
            if sql:
                conn.cursor().execute(sql)
                conn.commit()

conn.close()
print('done')