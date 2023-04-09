import fastapi

def register_routers(app: fastapi.FastAPI):
    from . import (
        item,
    )

    app.include_router(item.router)
    
