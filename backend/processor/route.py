import fastapi

def register_routers(app: fastapi.FastAPI):
    from . import (
        item,
        data,
    )

    app.include_router(item.router)
    app.include_router(data.router)
    
