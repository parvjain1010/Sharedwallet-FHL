from __future__ import annotations


from fastapi import FastAPI
import logging
from fastapi.routing import APIRoute
from fastapi.middleware.cors import CORSMiddleware

from starlette.responses import RedirectResponse

from backend.routers import users
from backend.routers import transactions
from backend.routers import groups
from backend.routers import wallet
from backend.routers import upi

app = FastAPI()

app.include_router(users.router)
app.include_router(upi.router)
app.include_router(transactions.router)
app.include_router(groups.router)
app.include_router(wallet.router)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
