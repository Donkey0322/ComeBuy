import processor.route
from config import app_config
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

app = FastAPI(
    title=app_config.title,
    docs_url=app_config.docs_url,
    redoc_url=app_config.redoc_url,
)

origins = [
    'http://localhost',
    'http://localhost:3000',
    'http://localhost:3006',
    'http://localhost:21404',
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event('startup')
async def app_startup():
    from config import db_config

    from database import pool_handler
    await pool_handler.initialize(db_config=db_config)


@app.on_event('shutdown')
async def app_shutdown():
    from database import pool_handler
    await pool_handler.close()


processor.route.register_routers(app)


class SPAStaticFiles(StaticFiles):
    async def get_response(self, path: str, scope):
        response = await super().get_response(path, scope)
        if response.status_code == 404:
            response = await super().get_response('.', scope)
        return response


app.mount('/', SPAStaticFiles(directory='../frontend/build',
          html=True), name='build')
