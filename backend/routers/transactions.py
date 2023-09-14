from __future__ import annotations
from typing import List

from fastapi import Depends, FastAPI, HTTPException,APIRouter
from sqlalchemy.orm import Session

from backend import models
from backend import crud
import backend.schemas.transactions as transactions_schema
from backend.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)
router = APIRouter(
    prefix='/transactions',
    tags=['transactions'],
    responses={404: {'description': 'Not found'}},
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.get("/all-transactions", response_model=List[transactions_schema.Transaction])
def get_alltransactions(db: Session = Depends(get_db)):
    return crud.get_alltransactions(db=db)