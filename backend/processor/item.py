import database as db
from datetime import date, datetime, timedelta
from typing import List
from fastapi import APIRouter, Depends, Request, responses
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
    county: List[str]=None
    districts: List[str]=None
    regions: List[str]=None
    stores: List[str]=None
    drink: str
    
@router.get('/search_item')
async def test(data: SearchInput):
    if(data.start_date is None):
        data.start_date=datetime.now().date() - timedelta(days=7)
        data.end_date=datetime.now().date()
    if(data.regions):
        case = 'region'
        case_table = 'regions'
        table_tmp = 'region_tmp'
        table_query = 'aggregatesalesdayregion'
        place=data.regions
    elif(data.county):
        case = 'county'
        case_table = 'counties'
        table_tmp = 'county_tmp'
        table_query = 'aggregatesalesdaycounty'
        place=data.county
    elif(data.districts):
        case = 'district'
        case_table = 'districts'
        table_tmp = 'district_tmp'
        table_query = 'aggregatesalesdaydistrict'
        place=data.districts
    else:
        case = 'store'
        case_table = 'stores'
        table_tmp = 'store_tmp'
        table_query = 'aggregatesalesday'
        place=data.stores
    if(data.start_hour):
        time = 'hour'
    else:
        time = 'day'
    result = await db.item.get(data=data, case=case, case_table=case_table, time=time, table_tmp=table_tmp, table_query=table_query, place=place)
    return result

@router.get('/bar_item')
async def test(data: SearchInput):
    result = await db.item.get(data=data)
    return result

@router.get('/line_item')
async def test(data: SearchInput):
    result = await db.item.get(data=data)
    return result