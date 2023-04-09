from typing import List
from datetime import date, timedelta

#import exceptions as exc  # noqa

import asyncpg

from . import pool_handler


def group_by_time_period(start_date: date, end_date: date, period_days: int, included_dates: List[date]) -> List[date]:
    """
    將指定時間區間按照指定天數分組，並包含指定的日期。
    """
    result = []
    current_date = start_date
    while current_date <= end_date:
        # 如果當前日期是指定的日期之一，則將其加入結果中。
        if current_date in included_dates:
            result.append(current_date)
            included_dates.remove(current_date)
        # 將當前日期加入當前組中。
        current_group = [current_date]
        current_date += timedelta(days=1)
        # 如果當前組的日期數已經達到指定天數，或者已經到了時間區間的結尾，則將當前組加入結果中。
        while len(current_group) < period_days and current_date <= end_date:
            if current_date in included_dates:
                result.append(current_date)
                included_dates.remove(current_date)
            current_group.append(current_date)
            current_date += timedelta(days=1)
        result.append(current_group)
    return result

async def get(data: object, case: str, case_table:str, time:str, table_tmp:str, table_query:str, place:List[str]) -> object:
    place_str = f"('{place[0]}')" if len(place) == 1 else tuple(place)
    if(time == 'hour'):
        table_query = table_query.replace('day', 'hour')
    params = (
        table_tmp,
        table_query,
        case_table,
        case,
        place_str,
        str(data.end_date),
        str(data.start_date),
    )
    sql = """
        create view %s as
        select s.id as id, s.name as name, sum(a.price) as price, sum(a.amount) as amount
        from %s a
        join %s s on a.%s = s.id
        where s.name in %s and a.date <= DATE '%s' and a.date >= DATE '%s'
        group by s.name, s.id;
    """
    try:
        print(sql % params)
        await pool_handler.pool.execute(sql % params)
    except asyncpg.exceptions.UniqueViolationError:
        return "db failed"
    params = (
        case,
        table_query,
        table_tmp,
        case,
        data.drink,
    )
    print(params)
    sql = """
        select st.name as %s, d.name as drink, a.price, a.amount, round(a.price*100.00/st.price, 2) as price_proportion, round(a.amount*100.00/st.amount,2) as amount_proportion 
        from %s a
        join %s st on st.id = a.%s
        join drinks d on d.id = a.drink
        where d.name = '%s' {}
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
        return "db result failed"
    params = (
        table_tmp,
    )
    sql = """
        drop view %s
    """
    try:
        print(sql % params)
        await pool_handler.pool.execute(sql % params)
    except asyncpg.exceptions.UniqueViolationError:
        return "db delete failed"
    return result

        
