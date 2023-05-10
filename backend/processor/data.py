import database as db
from fastapi import APIRouter, responses
from collections import defaultdict

router = APIRouter(
    tags=['data'],
    default_response_class=responses.JSONResponse,
)

@router.get('/data')
async def get_data():
    data = await db.data.get()
    result = defaultdict(dict)
    for item in data['places']:
        region = item["region"]
        county = item["county"]
        district = item["district"]
        store = item["store"]
        result['全台'].setdefault(region, {})
        result['全台'][region].setdefault(county, {})
        result['全台'][region][county].setdefault(district, [])
        result['全台'][region][county][district].append(store)
    for item in data['drinks']:
        category = item['category']
        drink = item['drink']
        result['飲品'].setdefault(category, [])
        result['飲品'][category].append(drink)
    for item in data['sweets']:
        result.setdefault('甜度', [])
        result['甜度'].append(item['name'])
    for item in data['ices']:
        result.setdefault('冰塊', [])
        result['冰塊'].append(item['name'])
    for item in data['toppings']:
        result.setdefault('加料', [])
        result['加料'].append(item['name'])
    for item in data['tastes']:
        result.setdefault('口味', [])
        result['口味'].append(item['name'])
    return result
