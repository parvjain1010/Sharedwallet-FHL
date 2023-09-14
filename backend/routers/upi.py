from __future__ import annotations
from typing import List

from fastapi import Depends, FastAPI, HTTPException,APIRouter
from sqlalchemy.orm import Session

from backend import models
from backend import crud
import backend.schemas.users as user_schema
import backend.schemas.upi as upi_schema
from backend.database import SessionLocal, engine

models.Base.metadata.create_all(bind=engine)
router = APIRouter(
    prefix='/upi',
    tags=['upi'],
    responses={404: {'description': 'Not found'}},
)


# Dependency
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()


@router.post("/add-upi/")
def add_upi(upi: upi_schema.UPIBase, db: Session = Depends(get_db)):
    db_upi = crud.get_upi_by_upi_id(db,upi_id=upi.upi_id)
    if db_upi:
        raise HTTPException(status_code=400, detail="This UPI has already been added")
    return crud.create_upi(db=db, upi = upi)

@router.get("/remove-upi/{upi_id}", response_model=bool)
def remove_upi(upi_id: str, db: Session = Depends(get_db)):
    db_upi = crud.get_upi_by_upi_id(db,upi_id=upi_id)
    if db_upi is None:
        raise HTTPException(status_code=400, detail="This UPI does not exist")
    return crud.remove_upi_id(db,upi_id=upi_id)