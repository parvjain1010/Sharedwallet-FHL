from sqlalchemy.orm import Session
from backend import models
import backend.schemas.users as user_schema
import backend.schemas.upi as upi_schema


# User cruds

def create_user(db: Session, user: user_schema.UserCreate):
    db_user = models.User(
        email = user.email,
        password = user.password,
        name = user.name,
        phone_number = user.phone_number
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

def update_user(db: Session, user: user_schema.User):
    db_user = db.query(models.User).filter(models.User.id == user.id).first()

    if db_user:
        # Update user data with the provided values
        for attr, value in user.dict().items():
            setattr(db_user, attr, value)

        db.commit()
        db.refresh(db_user)

    return db_user

def authorize_users(db: Session, user: user_schema.UserCreate):
    db_user = db.query(models.User).filter(models.User.email == user.email).first()
    if db_user is None:
        return -1
    elif db_user.password != user.password:
        return -1
    else:
        return db_user.id

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_user_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_allusers(db: Session):
    return db.query(models.User).all()


# UPI Cruds

def create_upi(db: Session, upi: upi_schema.UPIBase):
    db_upi = models.UPI(
        user_id = upi.user_id,
        group_id = upi.group_id,
        upi_id = upi.upi_id
    )
    db.add(db_upi)
    db.commit()
    db.refresh(db_upi)
    return db_upi

def get_upi_by_upi_id(db: Session, upi_id: str):
    return db.query(models.UPI).filter(models.UPI.upi_id == upi_id).first()