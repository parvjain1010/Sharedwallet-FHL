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

@router.get("/incoming-transactions-user/{user_id}", response_model=List[transactions_schema.Transaction])
def get_incoming_transactions_user(user_id: int, db: Session = Depends(get_db)):
    db_wallet=  crud.get_wallet_by_user_id(db=db, user_id=user_id)
    return crud.get_incoming_transactions(db=db, wallet_id = db_wallet.id)

@router.get("/outgoing-transactions-user/{user_id}", response_model=List[transactions_schema.Transaction])
def get_outgoing_transactions_user(user_id: int, db: Session = Depends(get_db)):
    db_wallet=  crud.get_wallet_by_user_id(db=db, user_id=user_id)
    return crud.get_outgoing_transactions(db=db, wallet_id = db_wallet.id)

@router.get("/incoming-transactions-group/{group_id}", response_model=List[transactions_schema.Transaction])
def get_incoming_transactions_group(group_id: int, db: Session = Depends(get_db)):
    db_wallet=  crud.get_wallet_by_group_id(db=db, group_id=group_id)
    return crud.get_incoming_transactions(db=db, wallet_id = db_wallet.id)

@router.get("/outgoing-transactions-group/{group_id}", response_model=List[transactions_schema.Transaction])
def get_outgoing_transactions_group(group_id: int, db: Session = Depends(get_db)):
    db_wallet=  crud.get_wallet_by_group_id(db=db, group_id=group_id)
    return crud.get_outgoing_transactions(db=db, wallet_id = db_wallet.id)




