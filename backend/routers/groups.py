from __future__ import annotations
from typing import List

from fastapi import Depends, FastAPI, HTTPException,APIRouter
from sqlalchemy.orm import Session

from backend import models
from backend import crud
import backend.schemas.groups as group_schema
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
    return db_group

@router.post("/add-members/{group_id}")
def add_members(group_id:int, members: List[int], db: Session = Depends(get_db)):
    db_group = crud.get_group_by_groupid(db, group_id=group_id)
    if db_group is None:
        raise HTTPException(status_code=400, detail="Group doesnt exist anymore")
    for member in members:
        db_user = crud.get_user_by_user_id(db, user_id=member)
        if db_user is None:
            raise HTTPException(status_code=400, detail="User doesnt exist anymore")
        crud.add_user_group(db=db,group_id=group_id, user_id = member)

    return True

@router.get("/remove-member/{group_id}/{user_id}", response_model=bool)
def remove_member(group_id: int, user_id: int, db: Session = Depends(get_db)):
    db_group = crud.get_group_by_groupid(db, group_id=group_id)
    if db_group is None:
        raise HTTPException(status_code=400, detail="Group doesnt exist anymore")
    db_user = crud.get_user_by_user_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User doesnt exist anymore")
    return crud.remove_member_from_group(db,group_id=group_id, user_id = user_id)

@router.get("/add-admin/{group_id}/{user_id}", response_model=bool)
def add_admin(group_id: int, user_id: int, db: Session = Depends(get_db)):
    db_group = crud.get_group_by_groupid(db, group_id=group_id)
    if db_group is None:
        raise HTTPException(status_code=400, detail="Group doesnt exist anymore")
    db_user = crud.get_user_by_user_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User doesnt exist anymore")
    return crud.add_admin_for_group(db,group_id=group_id, user_id = user_id)

@router.get("/remove-admin/{group_id}/{user_id}", response_model=bool)
def remove_member(group_id: int, user_id: int, db: Session = Depends(get_db)):
    db_group = crud.get_group_by_groupid(db, group_id=group_id)
    if db_group is None:
        raise HTTPException(status_code=400, detail="Group doesnt exist anymore")
    db_user = crud.get_user_by_user_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="User doesnt exist anymore")
    return crud.remove_admin_from_group(db,group_id=group_id, user_id = user_id)