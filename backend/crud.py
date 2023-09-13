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

def get_user(db: Session):
    return db.query(models.User).all()