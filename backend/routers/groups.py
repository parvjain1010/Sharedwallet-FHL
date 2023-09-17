from __future__ import annotations
from typing import List

from fastapi import Depends, FastAPI, HTTPException,APIRouter
from sqlalchemy.orm import Session

from backend import models
from backend import crud
import backend.schemas.groups as group_schema
import backend.schemas.users as user_schema
from backend.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)
router = APIRouter(
    prefix='/groups',
    tags=['groups'],
    responses={404: {'description': 'Not found'}},
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/create-group/", response_model=group_schema.Group)
def create_group(user_id: int, group: group_schema.GroupBase, db: Session = Depends(get_db)):
    db_group = crud.create_group(db=db, group = group)
    crud.create_wallet(db=db,group_id=db_group.id)
    crud.add_admin_for_group(db=db,group_id=db_group.id,user_id=user_id)
    crud.add_user_group(db=db,group_id=db_group.id, user_id = user_id)
    return db_group

@router.get("/get-group/{group_id}", response_model=group_schema.Group)
def get_group(group_id: int, db: Session = Depends(get_db)):
    return crud.get_group_by_groupid(db, group_id)

@router.get("/get-group-members/{group_id}")
def get_group_members(group_id: int, db: Session = Depends(get_db)):
    return crud.get_group_members(db, group_id)

@router.get("/all-user-groups/{user_id}")
def get_all_user_groups(user_id:int, db: Session = Depends(get_db)):
    db_usergroups = crud.get_all_user_groups(db, user_id)
    # return [ug.group_id for ug in db_usergroups]
    return db_usergroups

@router.post("/add-members/{group_id}")
def add_members(group_id:int, members: List[int], db: Session = Depends(get_db)):
    db_group = try_get_entity(db, group_id)
    for member in members:
        db_user = try_get_entity(db, member)
        crud.add_user_group(db=db,group_id=group_id, user_id = member)

    return True

@router.get("/remove-member/{group_id}/{user_id}", response_model=bool)
def remove_member(group_id: int, user_id: int, db: Session = Depends(get_db)):
    db_group = try_get_entity(db, group_id)
    db_user = try_get_entity(db, user_id)
    return crud.remove_member_from_group(db,group_id=group_id, user_id = user_id)

@router.get("/add-admin/{group_id}/{user_id}", response_model=bool)
def add_admin(group_id: int, user_id: int, db: Session = Depends(get_db)):
    db_group = try_get_entity(db, group_id)
    db_user = try_get_entity(db, user_id)
    return crud.add_admin_for_group(db,group_id=group_id, user_id = user_id)

@router.get("/remove-admin/{group_id}/{user_id}", response_model=bool)
def remove_member(group_id: int, user_id: int, db: Session = Depends(get_db)):
    db_group = try_get_entity(db, group_id)
    db_user = try_get_entity(db, user_id)
    return crud.remove_admin_from_group(db,group_id=group_id, user_id = user_id)

@router.post("/make-payment/{group_id}/{user_id}")
def make_payment(group_id: int, user_id: int, title:str, amount:float, users: List[int], splits:List[float], receiver_upi_id:str="", db: Session = Depends(get_db)):
    db_group = try_get_entity(db, group_id)
    return crud.make_payment_from_group_wallet(db, group_id, user_id, title, amount, transaction_date, receiver_upi_id, users, splits)

@router.get("/wallet-details/{group_id}")
def wallet_details(group_id: int, db: Session = Depends(get_db)):
    db_group = try_get_entity(db, group_id)
    return crud.get_wallet_details(db, group_id=group_id)

@router.get("/get-splits/{group_id}")
def get_splits(group_id: int, db: Session = Depends(get_db)):
    db_group = try_get_entity(db, group_id)
    return crud.get_group_splits(db, group_id)

@router.get("/get-user-splits/{group_id}/{user_id}")
def get_user_splits(group_id: int, user_id:int, db: Session = Depends(get_db)):
    db_group = try_get_entity(db, group_id)
    db_user = try_get_entity(db, user_id)
    return crud.get_user_splits(db, group_id, user_id)

@router.get("/list-expenses/{group_id}")
def list_expenses(group_id: int, db: Session = Depends(get_db)):
    db_group = try_get_entity(db, group_id)
    return crud.get_group_expenses(db, group_id)

@router.get("/list-deposits/{group_id}")
def list_deposits(group_id: int, db: Session = Depends(get_db)):
    db_group = try_get_entity(db, group_id)
    return crud.get_group_depoits(db, group_id)



# Helper methods

def try_get_entity(db, entity_id, entity_type="group"):
    entity = None
    if entity_type == "group":
        entity = crud.get_group_by_groupid(db, group_id=entity_id)
    elif entity_type == "user":
        entity = crud.get_user_by_user_id(db, user_id=entity_id)
    else:
        raise Exception(f"Invalid entity_type : {entity_type}")
    
    if entity is None:
        raise HTTPException(status_code=400, detail=f"{entity_type} doesnt exist")
    
    return entity
    