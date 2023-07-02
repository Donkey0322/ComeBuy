from . import pool_handler

async def get_foreign_key(table, condition) -> int:
    sql = f'''
    select id from {table}
    where name = '{condition}'
    '''
    row = await pool_handler.pool.fetchrow(sql)
    id = row['id']
    return id

async def update(data: object):
    for key in data.keys():
        if(data[key]):
            sql = f"""
            update {key}
            set name = '{data[key][1]}'
            where name = '{data[key][0]}'
            """
            await pool_handler.pool.execute(sql)

async def new(data: object):
    for key in data.keys():
        if(data[key]):
            if(data[key]["new"]):
                if(key == 'stores'):
                    region_id = await get_foreign_key(table = 'regions', condition = data["regions"]["value"])
                    county_id = await get_foreign_key(table = 'counties', condition = data["counties"]["value"])
                    district_id = await get_foreign_key(table = 'districts', condition = data["districts"]["value"])
                    sql = f"""
                    insert into {key} (name, region, county, district, comebuy_id)
                    values ('{data[key]["value"][0]}', {region_id}, {county_id}, {district_id}, '{data[key]["value"][1]}')
                    """
                elif(key == 'drinks'):
                    category_id = await get_foreign_key(table = 'categories', condition = data["categories"]["value"])
                    sql = f"""
                    insert into {key} (name, category, status, comebuy_id)
                    values ('{data[key]["value"][0]}', {category_id}, 1, '{data[key]["value"][1]}')
                    """
                else:
                    sql = f"""
                    insert into {key} (name)
                    values ('{data[key]["value"]}')
                    """
                await pool_handler.pool.execute(sql)
    