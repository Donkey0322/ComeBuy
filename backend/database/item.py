from typing import List
from datetime import timedelta
from . import pool_handler


async def get(data: object, case: str, case_table: str, time: str, table_query: str, place: List[str]) -> object:
    place_str = f"('{place[0]}')" if len(place) == 1 else tuple(place)
    drink_str = f"('{data.drink[0]}')" if len(data.drink) == 1 else tuple(data.drink)
    sweet_str = (f"('{data.sweets[0]}')" if len(data.sweets) == 1 else tuple(data.sweets)) if data.sweets else ''
    ice_str = (f"('{data.ices[0]}')" if len(data.ices)== 1 else tuple(data.ices)) if data.ices else ''
    a = []
    if(data.toppings):
        for topping in data.toppings:
            a.append(f"'{topping}' = any(a.topping)")
    if(data.tastes):
        for taste in data.tastes:
             a.append(f"'{taste}' = any(a.taste)")
    a.append('s2.name in {}'.format(sweet_str) if data.sweets else None)
    a.append('i.name in {}'.format(ice_str) if data.ices else None)
    q = ' or '.join([x for x in a if x is not None])
    if (time == 'hour'):
        table_query = table_query.replace('day', 'hour')
    sql = f"""
        select * from
            (select  a.date, st.name as location, d.name as drink,
                    i.name as ices,
                    s2.name as sweets,
                    a.topping as toppings,
                    a.taste as tastes,
                    a.price, a.amount,
                    {'case when st.drink = d.name then st.price else null end as total_price,' if data.part else 'st.price as total_price,'} 
                    {'case when st.drink = d.name then st.amount else null end as total_amount,' if data.part else 'st.amount as total_amount,'}  
                    {'case when st.drink = d.name then round(a.price*1.0/st.price, 4) else null end as price_proportion,' 
                        if data.part 
                        else 'round(a.price*1.0/st.price, 4) as price_proportion,'} 
                    {'case when st.drink = d.name then round(a.amount*1.0/st.amount, 4) else null end as amount_proportion' 
                        if data.part 
                        else 'round(a.amount*1.0/st.amount, 4) as amount_proportion'}   
            from (
                select s.id as id, s.name as name, 
                       {'d.name as drink,' if data.part else ''}
                       sum(a.price) as price, sum(a.amount) as amount
                    from {table_query} a
                    join {case_table} s on a.{case} = s.id
                    {'join drinks d on d.id = a.drink' if data.part else ''}
                    where s.name in {place_str} and a.date between '{str(data.start_date)}' and '{str(data.end_date)}' 
                          {'and d.name in {}'.format(drink_str) if data.part else ''}
                    group by s.name, s.id {',d.id' if data.part else ''}
                ) as st
            join {table_query} a on st.id = a.{case}
            left join sweets s2 on a.sweet = s2.id
            left join ices i on a.ice = i.id
            join drinks d on d.id = a.drink
            where d.name in {drink_str} and a.date between '{str(data.start_date)}' and '{str(data.end_date)}'
                {'and ({})'.format(q) if q else ''}
                {'and a.hour >= {} and a.hour < {}'.format(data.start_hour, data.end_hour) if time == 'hour' else ''}
            order by st.name, d.name, a.date) as T
        where T.total_price is not null
    """
    result = await pool_handler.pool.fetch(sql)
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
               {'s2.name as constraint,' if key in ['ices','sweets'] else 'a.constraint,' if key else ''}
               a.price, a.amount,
               case
                   when a.date between st.start_date and st.end_date
                        {'and st.drink = d.name' if data.part else ''}
                   then st.price
                   else null
               end as total_price,
               case
                   when a.date between st.start_date and st.end_date
                        {'and st.drink = d.name' if data.part else ''}
                   then st.amount
                   else null
               end as total_amount
        from(
            select id, name, {'drink,' if data.part else ''} min(date) as start_date, max(date) as end_date, sum(price) as price, sum(amount) as amount 
            from(
                select *, (lead(date, 0, '{str(data.end_date)}') OVER (PARTITION BY name order by date) - '{str(data.end_date)}' ) * -1 as rn 
                from(
                    select s.id as id, s.name as name, a.date,
                    {'d2.name as drink,' if data.part else ''}
                    sum(a.price) as price, sum(a.amount) as amount
                    from {table_query} a
                    join {case_table} s on a.{case} = s.id
                    {'join drinks d2 on a.drink = d2.id' if data.part else ''}
                    where s.name in {place_str} 
                          and a.date between '{str(start_date)}' and '{str(data.end_date)}'
                          {'and d2.name in {}'.format(drink_str) if data.part else ''}
                    group by s.name, s.id, a.date{',d2.id' if data.part else ''}
                    order by s.name, a.date
                ) as f1
            ) as f2
            group by rn/{interval+1}, id, name{',drink' if data.part else ''}
        ) as st
        {'join {} a on a.{} = st.id'.format(table_query, case) if key in ['ices','sweets'] 
          else 'join (select unnest({}) as constraint,* from {} a) a on a.{} = st.id'.format(key[:-1], table_query, case) if key
          else 'join {} a on a.{} = st.id'.format(table_query, case)}
        join drinks d on a.drink = d.id
        {'join {} s2 on a.{} = s2.id'.format(key, key[:-1]) if key in ['ices','sweets'] else '' if key else ''}
        where d.name in {drink_str} 
              and a.date between '{str(start_date)}' and '{str(data.end_date)}' 
              {'and s2.name in {}'.format(key_str) if key in ['ices','sweets'] else 'and a.constraint in {}'.format(key_str) if key else ''}
              {'and a.hour >= {} and a.hour < {}'.format(data.start_hour, data.end_hour) if time == 'hour' else ''}
        order by st.name) as T
    where T.total_price is not null 
    group by T.start_date, T.name, T.drink, T.end_date, T.total_price, T.total_amount {',T.constraint' if key else ''}
    order by T.name;
    '''
    result = await pool_handler.pool.fetch(sql)
    return result


async def line(data: object, case: str, case_table: str, time: str, table_query: str, place: List[str], year: int, key=None) -> object:
    start_date = data.start_date.strftime("%m-%d")
    end_date = data.end_date.strftime("%m-%d")
    end_year = int(data.end_date.strftime("%Y"))
    start_year = int(end_year)-year+1
    place_str = f"('{place[0]}')" if len(place) == 1 else tuple(place)
    drink_str = f"('{data.drink[0]}')" if len(data.drink) == 1 else tuple(data.drink)
    key_str = (f"('{dict(data)[key][0]}')" if len(dict(data)[key]) == 1 else tuple(dict(data)[key])) if key else ''
    if (time == 'hour'):
        table_query = table_query.replace('day', 'hour')
    sql = f'''
    select  T.name as location, T.drink, T.year,
            {'T.constraint as constraint,' if key else ''}
            sum(T.price) as price, sum(T.amount) as amount,
            T.total_price, T.total_amount,
            round(sum(T.price)*100.0/T.total_price, 2) as price_proportion,
            round(sum(T.amount)*100.0/T.total_amount, 2) as amount_proportion
    from(
        select  st.name as name, d.name as drink, st.year, a.date,
                {'s2.name as constraint,' if key in ['ices','sweets'] else 'a.constraint,' if key else ''}
                a.price, a.amount,
                case
                when '{str(start_date)}' > '{str(end_date)}'
                    then case
                            when to_char(a.date::date, 'MM-DD') between '{str(start_date)}' and '12-31'
                            then case
                                    when date_part('year', a.date::date) = st.year - 1
                                         {'and st.drink = d.name' if data.part else ''}
                                    then st.price
                                    else null
                                end
                            else case
                                    when date_part('year', a.date::date) = st.year
                                         {'and st.drink = d.name' if data.part else ''}
                                    then st.price
                                    else null
                                end
                        end
                    else case
                            when date_part('year', a.date::date) = st.year
                                 {'and st.drink = d.name' if data.part else ''}
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
                                         {'and st.drink = d.name' if data.part else ''}
                                    then st.amount
                                    else null
                                end
                            else case
                                    when date_part('year', a.date::date) = st.year
                                         {'and st.drink = d.name' if data.part else ''}
                                    then st.amount
                                    else null
                                end
                        end
                    else case
                            when date_part('year', a.date::date) = st.year
                                 {'and st.drink = d.name' if data.part else ''}
                            then st.amount
                            else null
                        end
                end as total_amount
        from(
            select  s.id, s.name, 
            {'d2.name as drink,' if data.part else ''}
            sum(price) as price, sum(amount) as amount,
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
                {'join drinks d2 on a.drink = d2.id' if data.part else ''}
                where case
                        when '{str(start_date)}' > '{str(end_date)}'
                            then to_char(a.date::date, 'MM-DD') between '{str(start_date)}' and '12-31'
                                or to_char(a.date::date, 'MM-DD') between '01-01' and '{str(end_date)}'
                        else
                            to_char(a.date::date, 'MM-DD') between '{str(start_date)}' and '{str(end_date)}'
                        end
                and s.name in {place_str}
                {'and d2.name in {}'.format(drink_str) if data.part else ''}
                group by year, s.id, s.name, a.{case}{',d2.id' if data.part else ''}
                order by a.{case}
            )as st
        {'join {} a on a.{} = st.id'.format(table_query, case) if key in ['ices','sweets'] 
          else 'join (select unnest({}) as constraint,* from {} a) a on a.{} = st.id'.format(key[:-1], table_query, case) if key
          else 'join {} a on a.{} = st.id'.format(table_query, case)}
        join drinks d on a.drink = d.id
        {'join {} s2 on a.{} = s2.id'.format(key, key[:-1]) if key in ['ices','sweets'] else '' if key else ''}
        where d.name in {drink_str}
            {'and s2.name in {}'.format(key_str) if key in ['ices','sweets'] else 'and a.constraint in {}'.format(key_str) if key else ''}
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
    result = await pool_handler.pool.fetch(sql)
    return result
