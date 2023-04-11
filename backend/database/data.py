from typing import List

#import exceptions as exc  # noqa

import asyncpg

from . import pool_handler

async def get() -> object:
    data = {}
    sql = '''
    select r.name as region, c.name as county, d.name as district, stores.name as store  from stores
    join regions r on stores.region = r.id
    join counties c on stores.county = c.id
    join districts d on stores.district = d.id;
    '''
    try:
        result = await pool_handler.pool.fetch(sql)
        data['places'] = result
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    
    sql = '''
    select c.name as category, drinks.name as drink from drinks
    join categories c on drinks.category = c.id;
    '''
    try:
        result = await pool_handler.pool.fetch(sql)
        data['drinks'] = result
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    
    sql = '''
    select sweets.name from sweets;
    '''
    try:
        result = await pool_handler.pool.fetch(sql)
        data['sweets'] = result
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    
    sql = '''
    select ices.name from ices;
    '''
    try:
        result = await pool_handler.pool.fetch(sql)
        data['ices'] = result
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    
    return data
    
    