import database as db
from typing import List
from fastapi import APIRouter,  responses
from pydantic import BaseModel

router = APIRouter(
    tags=['manipulate'],
    default_response_class=responses.JSONResponse,
)

class UpdateInput(BaseModel):
    counties: List[str]=None
    districts: List[str]=None
    regions: List[str]=None
    stores: List[str]=None
    drinks: List[str]=None
    categories: List[str]=None
    toppings: List[str]=None
    tastes: List[str]=None
    sweets: List[str]=None
    ices: List[str]=None
    
class CreateInput(BaseModel):
    counties: dict=None
    districts: dict=None
    regions: dict=None
    stores: dict=None
    categories: dict=None
    drinks: dict=None
    toppings: dict=None
    tastes: dict=None
    sweets: dict=None
    ices: dict=None


@router.post('/update', status_code=200)
async def update(data: UpdateInput):
    data = data.dict()
    await db.manipulate.update(data=data) 
    return {"status": "success"}

@router.post('/new', status_code=200)
async def update(data: CreateInput):
    data = data.dict()
    await db.manipulate.new(data=data) 
    return {"status": "success"}
