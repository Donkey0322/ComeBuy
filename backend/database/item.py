from typing import List
from datetime import date, timedelta

#import exceptions as exc  # noqa

import asyncpg

from . import pool_handler

async def get(data: object, case: str, case_table:str, time:str, table_query:str, place:List[str]) -> object: 
    place_str = f"('{place[0]}')" if len(place) == 1 else tuple(place)
    if(time == 'hour'):
        table_query = table_query.replace('day', 'hour')
    params = (
        case,
        table_query,
        case_table,
        case,
        place_str,
        str(data.end_date),
        str(data.start_date),
        table_query,
        case,
        data.drink,
        str(data.end_date),
        str(data.start_date),
    )
    sql = """
        select st.name as %s, d.name as drink, a.price, a.amount, round(a.price*100.00/st.price, 2) as price_proportion, round(a.amount*100.00/st.amount,2) as amount_proportion
        from (
            select s.id as id, s.name as name, sum(a.price) as price, sum(a.amount) as amount
                from %s a
                join %s s on a.%s = s.id
                where s.name in %s and a.date <= DATE '%s' and a.date >= DATE '%s'
                group by s.name, s.id
            ) as st
        join %s a on st.id = a.%s
        join drinks d on d.id = a.drink
        where d.name = '%s' and a.date <= DATE '%s' and a.date >= DATE '%s'{}
        order by st.name
    """
    if time == 'hour':
        sql = sql.format("and a.hour >= %s and a.hour < %s")
        params += (data.start_hour, data.end_hour)
    else:
        sql = sql.format("")
    try:
        # print(sql % params)
        result = await pool_handler.pool.fetch(sql % params)
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    return result

async def bar(data: object, case: str, case_table:str, time:str, table_query:str, place:List[str], interval:str, period:str) -> object: 
    start_date = data.start_date - timedelta(days=(interval+1)*(period-1))
    place_str = f"('{place[0]}')" if len(place) == 1 else tuple(place)
    if(time == 'hour'):
        table_query = table_query.replace('day', 'hour')
    params = (
        case,
        str(data.end_date),
        str(data.end_date),
        table_query,
        case_table,
        case,
        place_str,
        str(data.end_date),
        str(start_date),
        interval+1,
        table_query,
        case,
        data.drink,
        str(data.end_date),
        str(start_date),
    )
    sql = '''
    select  T.name as %s, T.start_date, T.end_date, T.drink,
            sum(T.price) as price, sum(T.amount) as amount,
            round(sum(T.price)*100/T.total_price, 2) as price_proportion, round(sum(T.amount)*100/T.total_amount, 2) as amount_proportion
    from(
        select st.name as name, st.start_date, st.end_date, d.name as drink, a.price, a.amount,
            case
                when a.date between st.start_date and st.end_date
                then st.price
                else null
            end as total_price,
            case
                when a.date between st.start_date and st.end_date
                then st.amount
                else null
            end as total_amount
        from(
            select id, name, min(date) as start_date, max(date) as end_date, sum(price) as price, sum(amount) as amount 
            from(
                select *, (lead(date, 0, '%s') OVER (PARTITION BY name order by date) - '%s' ) * -1 as rn 
                from(
                    select s.id as id, s.name as name, a.date,  sum(a.price) as price, sum(a.amount) as amount
                    from %s a
                    join %s s on a.%s = s.id
                    where s.name in %s and a.date <= DATE '%s' and a.date >= DATE '%s'
                    group by s.name, s.id, a.date
                    order by s.name, a.date
                ) as st
            ) as T
            group by rn/%s, id, name
        ) as st
        join %s a on a.%s = st.id
        join drinks d on a.drink = d.id
        where d.name = '%s' and a.date <= DATE '%s' and a.date >= DATE '%s' {}
        order by st.name) as T
    where T.total_price is not null
    group by T.start_date, T.name, T.drink, T.end_date, T.total_price, T.total_amount 
    order by T.name;
    '''
    if time == 'hour':
        sql = sql.format("and a.hour >= %s and a.hour < %s")
        params += (data.start_hour, data.end_hour)
    else:
        sql = sql.format("")
    try:
        # print(sql % params)
        result = await pool_handler.pool.fetch(sql % params)
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    return result
    
    

        
