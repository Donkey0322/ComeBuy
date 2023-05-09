from typing import List
from datetime import date, timedelta

#import exceptions as exc  # noqa

import asyncpg

from . import pool_handler


async def get(data: object, case: str, case_table: str, time: str, table_query: str, place: List[str]) -> object:
    place_str = f"('{place[0]}')" if len(place) == 1 else tuple(place)
    drink_str = f"('{data.drink[0]}')" if len(data.drink) == 1 else tuple(data.drink) 
    topping_str = (f"('{data.toppings[0]}')" if len(data.toppings) == 1 else tuple(data.toppings)) if data.toppings else ''
    sweet_str = (f"('{data.sweets[0]}')" if len(data.sweets) == 1 else tuple(data.sweets)) if data.sweets else ''
    ice_str = (f"('{data.ices[0]}')" if len(data.ices) == 1 else tuple(data.ices)) if data.ices else ''
    taste_str = (f"('{data.tastes[0]}')" if len(data.tastes) == 1 else tuple(data.tastes)) if data.tastes else ''
    a = ['s2.name in {}'.format(sweet_str) if data.sweets else None,
        'i.name in {}'.format(ice_str) if data.ices else None,
        't.name in {}'.format(topping_str) if data.toppings else None,
        't2.name in {}'.format(taste_str) if data.tastes else None]
    q = ' or '.join([x for x in a if x is not None])
    if(time == 'hour'):
        table_query = table_query.replace('day', 'hour')
    sql = f"""
        select  a.date, st.name as location, d.name as drink,
                {'i.name as ice,' if data.ices else ''}
                {'s2.name as sweet,' if data.sweets else ''}
                {'t.name as topping,' if data.toppings else ''}
                {'t2.name as taste,' if data.tastes else ''}
                a.price, a.amount, st.price as total_price, st.amount as total_amount,
                round(a.price*1.0/st.price, 4) as price_proportion, round(a.amount*1.0/st.amount, 4) as amount_proportion
        from (
            select s.id as id, s.name as name, sum(a.price) as price, sum(a.amount) as amount
                from {table_query} a
                join {case_table} s on a.{case} = s.id
                where s.name in {place_str} and a.date between '{str(data.start_date)}' and '{str(data.end_date)}' 
                group by s.name, s.id
            ) as st
        join {table_query} a on st.id = a.{case}
        {'join sweets s2 on a.sweet = s2.id' if data.sweets else ''}
        {'join ices i on a.ice = i.id' if data.ices else ''}
        {'join toppings t on a.topping = t.id' if data.toppings else ''}
        {'join tastes t2 on a.taste = t2.id' if data.tastes else ''}
        join drinks d on d.id = a.drink
        where d.name in {drink_str} and a.date between '{str(data.start_date)}' and '{str(data.end_date)}'
              {'and ({})'.format(q) if q else ''}
              {'and a.hour >= {} and a.hour < {}'.format(data.start_hour, data.end_hour) if time == 'hour' else ''}
        order by st.name, d.name, a.date
    """
    try:
        result = await pool_handler.pool.fetch(sql)
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    return result


async def bar(data: object, case: str, case_table: str, time: str, table_query: str, place: List[str], interval: str, period: int, key=None) -> object:
    start_date = data.start_date - timedelta(days=(interval+1)*(period-1))
    drink_str = f"('{data.drink[0]}')" if len(data.drink) == 1 else tuple(data.drink)
    place_str = f"('{place[0]}')" if len(place) == 1 else tuple(place)
    key_str = (f"('{dict(data)[key][0]}')" if len(dict(data)[key]) == 1 else tuple(dict(data)[key])) if key else ''
    if (time == 'hour'):
        table_query = table_query.replace('day', 'hour')
    sql = f'''
    select  T.name as location, T.start_date, T.end_date, T.drink,
            {'T.constraint as constraint,' if key else ''}
            sum(T.price) as price, sum(T.amount) as amount,
            T.total_price, T.total_amount,
            round(sum(T.price)*100/T.total_price, 2) as price_proportion, round(sum(T.amount)*100/T.total_amount, 2) as amount_proportion
    from(
        select st.name as name, st.start_date, st.end_date, d.name as drink, 
               {'s2.name as constraint,' if key else ''}
               a.price, a.amount,
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
                select *, (lead(date, 0, '{str(data.end_date)}') OVER (PARTITION BY name order by date) - '{str(data.end_date)}' ) * -1 as rn 
                from(
                    select s.id as id, s.name as name, a.date, sum(a.price) as price, sum(a.amount) as amount
                    from {table_query} a
                    join {case_table} s on a.{case} = s.id
                    where s.name in {place_str} 
                          and a.date between '{str(start_date)}' and '{str(data.end_date)}'
                    group by s.name, s.id, a.date
                    order by s.name, a.date
                ) as f1
            ) as f2
            group by rn/{interval+1}, id, name
        ) as st
        join {table_query} a on a.{case} = st.id
        join drinks d on a.drink = d.id
        {'join {} s2 on a.{} = s2.id'.format(key, key[:-1]) if key else ''}
        where d.name in {drink_str} 
              and a.date between '{str(start_date)}' and '{str(data.end_date)}' 
              {'and s2.name in {}'.format(key_str) if key else ''}
              {'and a.hour >= {} and a.hour < {}'.format(data.start_hour, data.end_hour) if time == 'hour' else ''}
        order by st.name) as T
    where T.total_price is not null 
    group by T.start_date, T.name, T.drink, T.end_date, T.total_price, T.total_amount {',T.constraint' if key else ''}
    order by T.name;
    '''
    try:
        result = await pool_handler.pool.fetch(sql)
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    return result


async def line(data: object, case: str, case_table: str, time: str, table_query: str, place: List[str], year: int, key=None) -> object:
    start_date = data.start_date.strftime("%m-%d")
    end_date = data.end_date.strftime("%m-%d")
    end_year = int(data.end_date.strftime("%Y"))
    start_year = int(end_year)-year+1
    place_str = f"('{place[0]}')" if len(place) == 1 else tuple(place)
    drink_str = f"('{data.drink[0]}')" if len(data.drink) == 1 else tuple(data.drink)
    key_str = (f"('{dict(data)[key][0]}')" if len(dict(data)[key]) == 1 else tuple(dict(data)[key])) if key else ''
    if(time == 'hour'):
        table_query = table_query.replace('day', 'hour')

    sql=f'''
    select  T.name as location, T.drink, T.year,
            {'T.constraint as constraint,' if key else ''}
            sum(T.price) as price, sum(T.amount) as amount,
            T.total_price, T.total_amount,
            round(sum(T.price)*100.0/T.total_price, 2) as price_proportion,
            round(sum(T.amount)*100.0/T.total_amount, 2) as amount_proportion
    from(
        select  st.name as name, d.name as drink, st.year, a.date,
                {'s2.name as constraint,' if key else ''}
                a.price, a.amount,
                case
                when '{str(start_date)}' > '{str(end_date)}'
                    then case
                            when to_char(a.date::date, 'MM-DD') between '{str(start_date)}' and '12-31'
                            then case
                                    when date_part('year', a.date::date) = st.year - 1
                                    then st.price
                                    else null
                                end
                            else case
                                    when date_part('year', a.date::date) = st.year
                                    then st.price
                                    else null
                                end
                        end
                    else case
                            when date_part('year', a.date::date) = st.year
                            then st.price
                            else null
                        end
                end as total_price,
                case
                when '{str(start_date)}' > '{str(end_date)}'
                    then case
                            when to_char(a.date::date, 'MM-DD') between '{str(start_date)}' and '12-31'
                            then case
                                    when date_part('year', a.date::date) = st.year - 1
                                    then st.amount
                                    else null
                                end
                            else case
                                    when date_part('year', a.date::date) = st.year
                                    then st.amount
                                    else null
                                end
                        end
                    else case
                            when date_part('year', a.date::date) = st.year
                            then st.amount
                            else null
                        end
                end as total_amount
        from(
            select  s.id, s.name, sum(price) as price, sum(amount) as amount,
            case
                when '{str(start_date)}' > '{str(end_date)}'
                    then case
                                when to_char(a.date::date, 'MM-DD') between '{str(start_date)}' and '12-31'
                                    then date_part('year', a.date::date) + 1
                                else date_part('year', a.date::date)
                                end
                    else
                            date_part('year', a.date::date)
                    end as year
                from {table_query} a
                join {case_table} s on a.{case} = s.id
                where case
                        when '{str(start_date)}' > '{str(end_date)}'
                            then to_char(a.date::date, 'MM-DD') between '{str(start_date)}' and '12-31'
                                or to_char(a.date::date, 'MM-DD') between '01-01' and '{str(end_date)}'
                        else
                            to_char(a.date::date, 'MM-DD') between '{str(start_date)}' and '{str(end_date)}'
                        end
                and s.name in {place_str}
                group by year, s.id, s.name, a.{case}
                order by a.{case}
            )as st
        join {table_query} a on st.id = a.{case}
        join drinks d on a.drink = d.id
        {'join {} s2 on a.{} = s2.id'.format(key, key[:-1]) if key else ''}
        where d.name in {drink_str}
            {'and s2.name in {}'.format(key_str) if key else ''}
            and case
                when '{str(start_date)}' > '{str(end_date)}'
                    then to_char(a.date::date, 'MM-DD') between '{str(start_date)}' and '12-31'
                        or to_char(a.date::date, 'MM-DD') between '01-01' and '{str(end_date)}'
                else
                    to_char(a.date::date, 'MM-DD') between '{str(start_date)}' and '{str(end_date)}'
                end
            {'and a.hour >= {} and a.hour < {}'.format(data.start_hour, data.end_hour) if time == 'hour' else ''}
            ) as T
            where total_price is not null and T.year between {start_year} and {end_year}
            group by T.name, T.drink, T.year, T.total_price, T.total_amount{',T.constraint' if key else ''}
            order by T.name, T.drink;
        '''

    try:
        result = await pool_handler.pool.fetch(sql)
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    return result
