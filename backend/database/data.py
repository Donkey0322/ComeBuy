from . import pool_handler

async def get() -> object:
    data = {}
    sql = '''
    select distinct r.name as region, c.name as county, d.name as district, stores.name as store from stores
    join regions r on stores.region = r.id
    join counties c on stores.county = c.id
    join districts d on stores.district = d.id
    order by r.name;
    '''
    result = await pool_handler.pool.fetch(sql)
    data['places'] = result
    
    sql = '''
    select distinct c.name as category, drinks.name as drink from drinks
    join categories c on drinks.category = c.id
    order by c.name;
    '''
    result = await pool_handler.pool.fetch(sql)
    data['drinks'] = result
    
    sql = '''
    select distinct sweets.name from sweets;
    '''
    result = await pool_handler.pool.fetch(sql)
    data['sweets'] = result
    
    sql = '''
    select distinct ices.name from ices;
    '''
    result = await pool_handler.pool.fetch(sql)
    data['ices'] = result
    
    sql = '''
    select distinct toppings.name from toppings;
    '''
    result = await pool_handler.pool.fetch(sql)
    data['toppings'] = result
    
    sql = '''
    select distinct tastes.name from tastes;
    '''
    result = await pool_handler.pool.fetch(sql)
    data['tastes'] = result
    
    return data
    
    