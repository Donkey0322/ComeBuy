import database as db
from datetime import date, datetime, timedelta
from typing import List
from fastapi import APIRouter, Depends, Request, responses, Body
from pydantic import BaseModel

router = APIRouter(
    tags=['item'],
    default_response_class=responses.JSONResponse,
)


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
    toppings: List[str]=None
    tastes: List[str]=None
    sweets: List[str]=None
    ices: List[str]=None
    part: bool=None
    

def make_global(*args, **kwargs):
    global_data = globals()
    for key, value in kwargs.items():
        global_data[key] = value
    
def check_contain(d):
    count = 0
    keys = ['ices', 'sweets', 'tastes', 'toppings']  
    for key in dict(d).keys():
        if(key in keys):
            if(dict(d)[key]):
                count += 1
            else:
                keys.remove(key)
    return count, keys

def make_period(d, period):
    interval = (d.end_date - d.start_date).days
    period_date = []
    for i in range(period):
        period_start = d.start_date - timedelta(days=(interval+1)*i)
        period_end = d.end_date - timedelta(days=(interval+1)*i)
        period_date.append([period_start, period_end])
    return interval, period_date
    
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
    
    if result and len(list(result[0].keys())) > 9:
        l = [data.ices, data.sweets, data.tastes, data.toppings]
        constraints = []
        for sublist in l:
            if(sublist):
                for item in sublist:
                    constraints.append(item)
        record_dict = [dict(record) for record in result]
        keys = ['ices', 'sweets', 'tastes', 'toppings'] 
        for row in record_dict:
            set1 = set(row.values())
            set2 = set(constraints)
            intersection = set1 & set2
            intersection = list(intersection)
            row['constraints'] = intersection
            row['all'] = [] 
            for key in keys:
                if(row[key]):
                    row['all'].append(row[key])
        result = [{key: record[key] for key in record.keys() if key not in keys} for record in record_dict] 
    return result


@router.post('/bar_item')
async def bar_item(period: int = Body(..., embed=True)):
    global_data = globals()
    interval, period_date = make_period(global_data['data'], period)         
    count, keys = check_contain(global_data['data'])

    if(count != 0):
        records = []
        for i in range(count):
            record = await db.item.bar(data=global_data['data'], case=global_data['case'],
                                        case_table=global_data['case_table'], time=global_data['time'],
                                        table_query=global_data['table_query'], place=global_data['place'],
                                        interval=interval, period=period, key=keys[i])
            records.extend(record)
    else:
        records = await db.item.bar(data=global_data['data'], case=global_data['case'],
                                        case_table=global_data['case_table'], time=global_data['time'],
                                        table_query=global_data['table_query'], place=global_data['place'],
                                        interval=interval, period=period)

    
    result = [dict(record) for record in records]
    
    for i in result:
        for j in period_date:
            if j[0] <= i['start_date'] <= j[1]:
                i['start_date'] = j[0]
                i['end_date'] = j[1]
  
    return result


@router.post('/line_item')
async def line_item(year: int = Body(..., embed=True)):
    global_data = globals()
    count, keys = check_contain(global_data['data'])
    if(count != 0):
        result = []
        for i in range(count):
            record = await db.item.line(data=global_data['data'], case=global_data['case'],
                                        case_table=global_data['case_table'], time=global_data['time'],
                                        table_query=global_data['table_query'], place=global_data['place'],
                                        year=year, key=keys[i])
            result.extend(record)
    else:
        result = await db.item.line(data=global_data['data'], case=global_data['case'],
                                        case_table=global_data['case_table'], time=global_data['time'],
                                        table_query=global_data['table_query'], place=global_data['place'],
                                        year=year)
            
    return result
