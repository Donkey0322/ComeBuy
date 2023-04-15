import database as db
from datetime import date, datetime, timedelta
from typing import List
from fastapi import APIRouter, Depends, Request, responses, Body
from pydantic import BaseModel

router = APIRouter(
    tags=['item'],
    default_response_class=responses.JSONResponse,
)


def make_global(*args, **kwargs):
    global_data = globals()
    for key, value in kwargs.items():
        global_data[key] = value


class SearchInput(BaseModel):
    start_date: date=None 
    end_date: date=None 
    start_hour: int=None
    end_hour: int=None
    counties: List[str]=None
    districts: List[str]=None
    regions: List[str]=None
    stores: List[str]=None
    drink: List[str]=None
    
@router.post('/search_item')
async def get_item(data: SearchInput):
    if (data.start_date is None):
        data.start_date = datetime.now().date() - timedelta(days=6)
        data.end_date = datetime.now().date()
    if (data.regions):
        case = 'region'
        case_table = 'regions'
        table_query = 'aggregatesalesdayregion'
        place = data.regions
    elif (data.counties):
        case = 'county'
        case_table = 'counties'
        table_query = 'aggregatesalesdaycounty'
        place = data.counties
    elif (data.districts):
        case = 'district'
        case_table = 'districts'
        table_query = 'aggregatesalesdaydistrict'
        place = data.districts
    else:
        case = 'store'
        case_table = 'stores'
        table_query = 'aggregatesalesday'
        place = data.stores
    if (data.start_hour):
        time = 'hour'
    else:
        time = 'day'
    make_global(data=data, case=case, case_table=case_table,
                time=time, table_query=table_query, place=place)
    global_data = globals()
    result = await db.item.get(data=global_data['data'], case=global_data['case'],
                               case_table=global_data['case_table'], time=global_data['time'],
                               table_query=global_data['table_query'], place=global_data['place'])
    return result


@router.post('/bar_item')
async def bar_item(period: int = Body(..., embed=True)):
    global_data = globals()
    interval = (global_data['data'].end_date -
                global_data['data'].start_date).days
    period_date = []

    for i in range(period):
        period_start = global_data['data'].start_date - \
            timedelta(days=(interval+1)*i)
        period_end = global_data['data'].end_date - \
            timedelta(days=(interval+1)*i)
        period_date.append([period_start, period_end])

    records = await db.item.bar(data=global_data['data'], case=global_data['case'],
                                case_table=global_data['case_table'], time=global_data['time'],
                                table_query=global_data['table_query'], place=global_data['place'],
                                interval=interval, period=period)

    record_list = [list(record) for record in records]
    for i in record_list:
        for j in period_date:
            if j[0] <= i[1] <= j[1]:
                i[1] = j[0]
                i[2] = j[1]
                
    keys = ['location', 'start_date', 'end_date', 'drink', 'price', 'amount','total_price', 'total_amount', 'price_proportion', 'amount_proportion']
    result = []
    for i in record_list:
        D = dict(zip(keys, i))
        result.append(D)

    return result


@router.post('/line_item')
async def line_item(year: int = Body(..., embed=True)):
    global_data = globals()
    print(year)
    result = await db.item.line(data=global_data['data'], case=global_data['case'],
                                case_table=global_data['case_table'], time=global_data['time'],
                                table_query=global_data['table_query'], place=global_data['place'],
                                year=year)
    return result
