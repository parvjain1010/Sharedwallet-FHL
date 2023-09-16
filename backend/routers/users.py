from __future__ import annotations
from typing import List

from fastapi import Depends, FastAPI, HTTPException,APIRouter
from sqlalchemy.orm import Session

from backend import models
from backend import crud
import backend.schemas.users as user_schema
import backend.schemas.groups as group_schema
import backend.schemas.upi as upi_schema
from backend.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)
router = APIRouter(
    prefix='/users',
    tags=['users'],
    responses={404: {'description': 'Not found'}},
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/create-users",response_model=user_schema.User)
def create_user(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=user.email)
    if db_user:
        raise HTTPException(status_code=400, detail="Email already registered")
    
    db_user_new = crud.create_user(db=db, user=user)
    crud.create_wallet(db=db,user_id=db_user_new.id)
    return db_user_new

@router.post("/update-user")
def update_user(user: user_schema.User, db: Session = Depends(get_db)):
    return crud.update_user(db=db, user=user)

@router.get("/all-users", response_model=List[user_schema.User])
def get_allusers(db: Session = Depends(get_db)):
    return crud.get_allusers(db=db)

@router.get("/get-user-by-email/{email}", response_model=user_schema.User)
def get_allusers(email:str, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_email(db, email=email)
    if db_user is None:
        raise HTTPException(status_code=400, detail="No user found for current email")
    return db_user


@router.get("/get-user-by-id/{user_id}", response_model=user_schema.User)
def get_allusers(user_id:int, db: Session = Depends(get_db)):
    db_user = crud.get_user_by_user_id(db, user_id=user_id)
    if db_user is None:
        raise HTTPException(status_code=400, detail="No user found for current email")
    return db_user

@router.post("/authorise-user")
def authorise_users(user: user_schema.UserCreate, db: Session = Depends(get_db)):
    return crud.authorize_users(db=db, user= user)

@router.get("/all-groups/{user_id}", response_model=List[group_schema.Group])
def get_all_groups_for_user(user_id:int, db: Session = Depends(get_db)):
    return crud.get_all_groups_for_user(db=db, user_id =user_id)

@router.get("/all-upis/{user_id}", response_model=List[upi_schema.UPI])
def get_all_upis_for_user(user_id:int, db: Session = Depends(get_db)):
    return crud.get_all_upis_for_user(db=db, user_id =user_id)