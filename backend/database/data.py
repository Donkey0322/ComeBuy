#import exceptions as exc  # noqa

import asyncpg

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
    try:
        result = await pool_handler.pool.fetch(sql)
        data['places'] = result
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    
    sql = '''
    select distinct c.name as category, drinks.name as drink from drinks
    join categories c on drinks.category = c.id
    order by c.name;
    '''
    try:
        result = await pool_handler.pool.fetch(sql)
        data['drinks'] = result
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    
    sql = '''
    select distinct sweets.name from sweets;
    '''
    try:
        result = await pool_handler.pool.fetch(sql)
        data['sweets'] = result
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    
    sql = '''
    select distinct ices.name from ices;
    '''
    try:
        result = await pool_handler.pool.fetch(sql)
        data['ices'] = result
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    
    sql = '''
    select distinct toppings.name from toppings;
    '''
    try:
        result = await pool_handler.pool.fetch(sql)
        data['toppings'] = result
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    
    sql = '''
    select distinct tastes.name from tastes;
    '''
    try:
        result = await pool_handler.pool.fetch(sql)
        data['tastes'] = result
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    
    return data
    
    