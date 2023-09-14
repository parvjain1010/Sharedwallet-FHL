from __future__ import annotations


from fastapi import FastAPI
import logging
from fastapi.routing import APIRoute
from starlette.responses import RedirectResponse

from backend.routers import users

app = FastAPI()

app.include_router(users.router)
