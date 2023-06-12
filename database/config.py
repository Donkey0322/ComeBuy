import os
from dotenv import dotenv_values

env_values = {
    **dotenv_values(".env"),
    **os.environ,
}

class DBConfig:
    host = env_values.get('PG_HOST')
    port = env_values.get('PG_PORT')
    username = env_values.get('PG_USERNAME')
    password = env_values.get('PG_PASSWORD')
    db_name = env_values.get('PG_DBNAME')
    max_pool_size = int(env_values.get('PG_MAX_POOL_SIZE', 20))

db_config = DBConfig()

