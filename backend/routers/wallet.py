from __future__ import annotations
from typing import List

from fastapi import Depends, FastAPI, HTTPException,APIRouter
from sqlalchemy.orm import Session

from backend import models
from backend import crud
import backend.schemas.transactions as transaction_schema
import backend.schemas.wallets as wallet_schema
from backend.database import SessionLocal, engine
from datetime import datetime

models.Base.metadata.create_all(bind=engine)
router = APIRouter(
    prefix='/wallet',
    tags=['wallet'],
    responses={404: {'description': 'Not found'}},
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.get("/get-all-wallets/", response_model=List[wallet_schema.Wallet])
def get_wallet_balance( db: Session = Depends(get_db)):
    return crud.get_wallets(db)

@router.get("/get-balance/{wallet_id}", response_model=float)
def get_wallet_balance(wallet_id:int, db: Session = Depends(get_db)):
    db_wallet = crud.get_wallet_by_wallet_id(db, wallet_id =wallet_id)
    if db_wallet is None:
        raise HTTPException(status_code=400, detail="Wallet doesnt exist anymore")
    return db_wallet.balance

@router.get("/get-balance_for_group/{group_id}", response_model=float)
def get_wallet_balance_for_group(group_id:int, db: Session = Depends(get_db)):
    db_wallet = crud.get_wallet_by_group_id(db, group_id =group_id)
    if db_wallet is None:
        raise HTTPException(status_code=400, detail="Wallet doesnt exist anymore")
    return db_wallet.balance

@router.get("/get-balance_for_user/{user_id}", response_model=float)
def get_wallet_balance_for_user(user_id:int, db: Session = Depends(get_db)):
    db_wallet = crud.get_wallet_by_user_id(db, user_id =user_id)
    if db_wallet is None:
        raise HTTPException(status_code=400, detail="Wallet doesnt exist anymore")
    return db_wallet.balance

@router.post("/add_money_to_personal_wallet/")
def add_money_to_personal_wallet(user_id: int, balance: float, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_user_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User does not exist")
    db_wallet = crud.get_wallet_by_user_id(db = db, user_id=user_id)
    crud.update_wallet_balance(db=db, wallet_id=db_wallet.id, amount= balance)

@router.post("/add_money_to_personal_wallet/")
def add_money_to_personal_wallet(user_id: int, balance: float, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_user_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User does not exist")
    db_wallet = crud.get_wallet_by_user_id(db = db, user_id=user_id)
    crud.update_wallet_balance(db=db, wallet_id=db_wallet.id, amount= balance)
    crud.create_transaction(db=db,transaction=transaction_schema.TransactionBase(
        title="Money added to Personal Wallet",
        amount = balance,
        transaction_date= datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        user_id=user_id,
        target_wallet_id=db_wallet.id,
        source_wallet_id= None
    ))

@router.post("/add_money_to_group_wallet/")
def add_money_to_group_wallet(user_id: int, group_id: int, balance: float, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_user_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User does not exist")
    
    db_group = crud.get_group_by_groupid(db, group_id=group_id)
    if db_group is None:
        raise HTTPException(status_code=400, detail="Group does not exist")
    db_wallet = crud.get_wallet_by_group_id(db = db, group_id=group_id)
    crud.update_wallet_balance(db=db, wallet_id=db_wallet.id, amount= balance)

    crud.create_transaction(db=db,transaction=transaction_schema.TransactionBase(
        title="Money added to Group Wallet",
        amount = balance,
        transaction_date= datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        user_id=user_id,
        target_wallet_id=db_wallet.id,
        source_wallet_id= None
    ))

@router.post("/transfer_money_to_group_wallet/")
def transfer_money_to_group_wallet(user_id: int, group_id: int, balance: float, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_user_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User does not exist")
    
    db_group = crud.get_group_by_groupid(db, group_id=group_id)
    if db_group is None:
        raise HTTPException(status_code=400, detail="Group does not exist")
    db_wallet_group = crud.get_wallet_by_group_id(db = db, group_id=group_id)
    db_wallet_user = crud.get_wallet_by_user_id(db = db, user_id=user_id)
    if db_wallet_user.balance<balance:
        raise HTTPException(status_code=400, detail="Not Enough Balance")
    crud.update_wallet_balance(db=db, wallet_id=db_wallet_user.id, amount= -1*balance)
    crud.update_wallet_balance(db=db, wallet_id=db_wallet_group.id, amount= balance)

    crud.create_transaction(db=db,transaction=transaction_schema.TransactionBase(
        title="Money transferred from personal wallet to group wallet",
        amount = balance,
        transaction_date= datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        user_id=user_id,
        target_wallet_id=db_wallet_group.id,
        source_wallet_id= db_wallet_user.id
    ))

@router.post("/transfer_money_to_user_wallet/")
def transfer_money_to_user_wallet(source_user_id: int, target_user_id: int, balance: float, db: Session = Depends(get_db)):
    db_user_source = crud.get_user_by_user_id(db, user_id=source_user_id)
    if db_user_source is None:
        raise HTTPException(status_code=400, detail="Source User does not exist")
    
    db_user_target = crud.get_user_by_user_id(db, user_id=target_user_id)
    if db_user_target is None:
        raise HTTPException(status_code=400, detail="Target User does not exist")
    db_wallet_target = crud.get_wallet_by_user_id(db = db, user_id=target_user_id)
    db_wallet_source = crud.get_wallet_by_user_id(db = db, user_id=source_user_id)
    if db_wallet_source.balance<balance:
        raise HTTPException(status_code=400, detail="Not Enough Balance")
    crud.update_wallet_balance(db=db, wallet_id=db_wallet_source.id, amount= -1*balance)
    crud.update_wallet_balance(db=db, wallet_id=db_wallet_target.id, amount= balance)

    crud.create_transaction(db=db,transaction=transaction_schema.TransactionBase(
        title="Money transferred between personal wallets",
        amount = balance,
        transaction_date= datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        user_id=source_user_id,
        target_wallet_id=db_wallet_target.id,
        source_wallet_id= db_wallet_source.id
    ))

@router.post("/transfer_money_back_to_user_wallet/")
def transfer_money_back_to_user_wallet(group_id: int, user_id: int, balance: float, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_user_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User does not exist")
    
    db_group = crud.get_group_by_groupid(db, group_id=group_id)
    if db_group is None:
        raise HTTPException(status_code=400, detail="Group does not exist")
    db_wallet_target = crud.get_wallet_by_user_id(db = db, user_id=user_id)
    db_wallet_source = crud.get_wallet_by_group_id(db = db, group_id=group_id)
    if db_wallet_source.balance<balance:
        raise HTTPException(status_code=400, detail="Not Enough Balance")
    crud.update_wallet_balance(db=db, wallet_id=db_wallet_source.id, amount= -1*balance)
    crud.update_wallet_balance(db=db, wallet_id=db_wallet_target.id, amount= balance)

    crud.create_transaction(db=db,transaction=transaction_schema.TransactionBase(
        title="Money transferred from group wallet to personal wallet",
        amount = balance,
        transaction_date= datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        user_id=user_id,
        target_wallet_id=db_wallet_target.id,
        source_wallet_id= db_wallet_source.id
    ))

@router.post("/remove_money_from_personal_wallet/")
def remove_money_from_personal_wallet(user_id: int, balance: float, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_user_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User does not exist")
    db_wallet = crud.get_wallet_by_user_id(db = db, user_id=user_id)
    if db_wallet.balance<balance:
        raise HTTPException(status_code=400, detail="Not Enough Balance")
    crud.update_wallet_balance(db=db, wallet_id=db_wallet.id, amount= -1*balance)
    crud.create_transaction(db=db,transaction=transaction_schema.TransactionBase(
        title="Money withdrawn from Personal Wallet",
        amount = balance,
        transaction_date= datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        user_id=user_id,
        target_wallet_id=None,
        source_wallet_id= db_wallet.id
    ))