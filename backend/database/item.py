from typing import List
from datetime import date, timedelta

#import exceptions as exc  # noqa

import asyncpg

from . import pool_handler


async def get(data: object, case: str, case_table: str, time: str, table_query: str, place: List[str]) -> object:
    place_str = f"('{place[0]}')" if len(place) == 1 else tuple(place)
    drink_str = f"('{data.drink[0]}')" if len(data.drink) == 1 else tuple(data.drink)
    if(time == 'hour'):
        table_query = table_query.replace('day', 'hour')
    params = (
        table_query,
        case_table,
        case,
        place_str,
        str(data.start_date),
        str(data.end_date),
        table_query,
        case,
        drink_str,
        str(data.start_date),
        str(data.end_date),
    )
    sql = """
        select  a.date, st.name as location, d.name as drink, a.price, a.amount, 
                st.price as total_price, st.amount as total_amount,
                round(a.price*1.0/st.price, 4) as price_proportion, round(a.amount*1.0/st.amount, 4) as amount_proportion
        from (
            select s.id as id, s.name as name, sum(a.price) as price, sum(a.amount) as amount
                from %s a
                join %s s on a.%s = s.id
                where s.name in %s and a.date between '%s' and '%s' 
                group by s.name, s.id
            ) as st
        join %s a on st.id = a.%s
        join drinks d on d.id = a.drink
        where d.name in %s and a.date between '%s' and '%s'{}
        order by st.name
    """
    if time == 'hour':
        sql = sql.format("and a.hour >= %s and a.hour < %s")
        params += (data.start_hour, data.end_hour)
    else:
        sql = sql.format("")
    try:
        print(sql % params)
        result = await pool_handler.pool.fetch(sql % params)
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    return result


async def bar(data: object, case: str, case_table: str, time: str, table_query: str, place: List[str], interval: str, period: int) -> object:
    start_date = data.start_date - timedelta(days=(interval+1)*(period-1))
    drink_str = f"('{data.drink[0]}')" if len(data.drink) == 1 else tuple(data.drink)
    place_str = f"('{place[0]}')" if len(place) == 1 else tuple(place)
    if (time == 'hour'):
        table_query = table_query.replace('day', 'hour')
    params = (
        str(data.end_date),
        str(data.end_date),
        table_query,
        case_table,
        case,
        place_str,
        str(start_date),
        str(data.end_date),
        interval+1,
        table_query,
        case,
        drink_str,
        str(start_date),
        str(data.end_date),
    )
    sql = '''
    select  T.name as location, T.start_date, T.end_date, T.drink,
            sum(T.price) as price, sum(T.amount) as amount,
            T.total_price, T.total_amount,
            round(sum(T.price)/T.total_price, 4) as price_proportion, round(sum(T.amount)/T.total_amount, 4) as amount_proportion
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
                    select s.id as id, s.name as name, a.date, sum(a.price) as price, sum(a.amount) as amount
                    from %s a
                    join %s s on a.%s = s.id
                    where s.name in %s 
                          and a.date between '%s' and '%s'
                    group by s.name, s.id, a.date
                    order by s.name, a.date
                ) as st
            ) as T
            group by rn/%s, id, name
        ) as st
        join %s a on a.%s = st.id
        join drinks d on a.drink = d.id
        where d.name in %s 
              and a.date between '%s' and '%s' {}
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
        result = await pool_handler.pool.fetch(sql % params)
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    return result


async def line(data: object, case: str, case_table: str, time: str, table_query: str, place: List[str], year: int) -> object:
    start_date = data.start_date.strftime("%m-%d")
    end_date = data.end_date.strftime("%m-%d")
    end_year = int(data.end_date.strftime("%Y"))
    start_year = int(end_year)-year+1
    place_str = f"('{place[0]}')" if len(place) == 1 else tuple(place)
    drink_str = f"('{data.drink[0]}')" if len(data.drink) == 1 else tuple(data.drink)
    if(time == 'hour'):
        table_query = table_query.replace('day', 'hour')
    params = (
        str(start_date),
        str(end_date),
        str(start_date),
        str(start_date),
        str(end_date),
        str(start_date),
        str(start_date),
        str(end_date),
        str(start_date),
        table_query,
        case_table,
        case,
        str(start_date),
        str(end_date),
        str(start_date),
        str(end_date),
        str(start_date),
        str(end_date),
        place_str,
        case,
        case,
        table_query,
        case,
        drink_str,
        str(start_date),
        str(end_date),
        str(start_date),
        str(end_date),
        str(start_date),
        str(end_date),
    )
    sql='''
    select  T.name as location, T.drink, T.year, sum(T.price) as price, sum(T.amount) as amount,
            T.total_price, T.total_amount,
            round(sum(T.price)*1.0/T.total_price, 4) as price_proportion,
            round(sum(T.amount)*1.0/T.total_amount, 4) as amount_proportion
    from(
        select  st.name as name, d.name as drink, st.year, a.date, a.price, a.amount,
                case
                when '%s' > '%s'
                    then case
                            when to_char(a.date::date, 'MM-DD') between '%s' and '12-31'
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
                when '%s' > '%s'
                    then case
                            when to_char(a.date::date, 'MM-DD') between '%s' and '12-31'
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
                when '%s' > '%s'
                    then case
                                when to_char(a.date::date, 'MM-DD') between '%s' and '12-31'
                                    then date_part('year', a.date::date) + 1
                                else date_part('year', a.date::date)
                                end
                    else
                            date_part('year', a.date::date)
                    end as year
                from %s a
                join %s s on a.%s = s.id
                where case
                        when '%s' > '%s'
                            then to_char(a.date::date, 'MM-DD') between '%s' and '12-31'
                                or to_char(a.date::date, 'MM-DD') between '01-01' and '%s'
                        else
                            to_char(a.date::date, 'MM-DD') between '%s' and '%s'
                        end
                and s.name in %s
                group by year, s.id, s.name, a.%s
                order by a.%s
            )as st
        join %s a on st.id = a.%s
        join drinks d on a.drink = d.id
        where d.name in %s
            and case
                when '%s' > '%s'
                    then to_char(a.date::date, 'MM-DD') between '%s' and '12-31'
                        or to_char(a.date::date, 'MM-DD') between '01-01' and '%s'
                else
                    to_char(a.date::date, 'MM-DD') between '%s' and '%s'
                end
            {}
    '''
    if time == 'hour':
        sql = sql.format('''and a.hour >= %s and a.hour < %s
                )as T
                where total_price is not null and T.year between %s and %s
                group by T.name, T.drink, T.year, T.total_price, T.total_amount
                order by T.name, T.drink;''')
        params += (data.start_hour, data.end_hour, start_year, end_year)
    else:
        sql = sql.format('''
                )as T
                where total_price is not null and T.year between %s and %s
                group by T.name, T.drink, T.year, T.total_price, T.total_amount
                order by T.name, T.drink;''')
        params += (start_year, end_year)
    try:
        result = await pool_handler.pool.fetch(sql % params)
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    return result
