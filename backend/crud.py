from sqlalchemy.orm import Session
from backend import models
import backend.schemas.users as user_schema


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

def get_user_by_email(db: Session, email: str):
    return db.query(models.User).filter(models.User.email == email).first()

def get_user_by_user_id(db: Session, user_id: int):
    return db.query(models.User).filter(models.User.id == user_id).first()

def get_allusers(db: Session):
    return db.query(models.User).all()