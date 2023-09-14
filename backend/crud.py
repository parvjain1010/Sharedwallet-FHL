from sqlalchemy.orm import Session
from backend import models
import backend.schemas.users as user_schema
import backend.schemas.upi as upi_schema
import backend.schemas.transactions as transaction_schema
import backend.schemas.wallets as wallet_schema
import backend.schemas.groups as group_schema


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

# Transaction crud
def get_alltransactions(db: Session):
    return db.query(models.Transaction).all()

def get_transaction_by_id(db: Session, id: int):
    return db.query(models.Transaction).filter(models.Transaction.id == id).first()

def get_transaction_for_group(db: Session, group_id: int):
    return db.query(models.Transaction).filter(models.Transaction.group_id == group_id).all()

def get_transaction_for_user(db: Session, user_id: int):
    return db.query(models.Transaction).filter(models.Transaction.user_id == user_id).all()

def create_transaction(db: Session, transaction: transaction_schema.TransactionBase):
    db_transaction = models.Transaction(
        title = transaction.title,
        amount = transaction.amount,
        transaction_date = transaction.transaction_date,
        user_id = transaction.user_id,
        target_wallet_id = transaction.target_wallet_id,
        source_wallet_id = transaction.source_wallet_id
    )
    db.add(db_transaction)
    db.commit()
    db.refresh(db_transaction)
    return db_transaction

def update_transaction(db: Session, transaction: transaction_schema.Transaction):
    db_transaction = db.query(models.Transaction).filter(models.Transaction.id == transaction.id).first()

    if db_transaction:
        # Update user data with the provided values
        for attr, value in transaction.dict().items():
            setattr(db_transaction, attr, value)

        db.commit()
        db.refresh(db_transaction)

    return db_transaction


def remove_transaction(db: Session, transaction_id: int):
    items_to_delete = db.query(models.Transaction).filter(models.Transaction.id == transaction_id).all()

    # Loop through the matching items and delete them
    for item in items_to_delete:
        db.delete(item)

    # Commit the changes to the database
    db.commit()
    return True



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

def remove_upi_id(db: Session, upi_id: str):
    items_to_delete = db.query(models.UPI).filter(models.UPI.upi_id == upi_id).all()

    # Loop through the matching items and delete them
    for item in items_to_delete:
        db.delete(item)

    # Commit the changes to the database
    db.commit()
    return True

def get_upi_by_upi_id(db: Session, upi_id: str):
    return db.query(models.UPI).filter(models.UPI.upi_id == upi_id).first()

# Group CRUD

def create_group(db: Session, group: group_schema.Group):
    db_group = models.Group(
        name = group.name
    )
    db.add(db_group)
    db.commit()
    db.refresh(db_group)
    return db_group

def add_user_group(db: Session, group_id : int, user_id: int):
    db_user_group = models.userGroup(
        user_id = user_id,
        group_id = group_id,
        status = True
    )
    db.add(db_user_group)
    db.commit()
    db.refresh(db_user_group)

def get_group_by_groupid(db: Session, group_id : int):
    return db.query(models.Group).filter(models.Group.id == group_id).first()

def remove_member_from_group(db: Session, group_id: int, user_id : int):
    items_to_delete = db.query(models.userGroup).filter(models.userGroup.user_id == user_id and models.userGroup.group_id == group_id).all()

    # Loop through the matching items and delete them
    for item in items_to_delete:
        db.delete(item)

    # Commit the changes to the database
    db.commit()
    return True

def add_admin_for_group(db: Session, group_id : int, user_id: int):
    db_admin = db.query(models.GroupAdmin).filter(models.GroupAdmin.user_id == user_id and models.GroupAdmin.group_id == group_id).first()
    if db_admin is None:
        db_admin_group = models.GroupAdmin(
            user_id = user_id,
            group_id = group_id,
        )
        db.add(db_admin_group)
        db.commit()
        db.refresh(db_admin_group)

        return True
    return True

def remove_admin_from_group(db: Session, group_id: int, user_id : int):
    items_to_delete = db.query(models.GroupAdmin).filter(models.GroupAdmin.user_id == user_id and models.GroupAdmin.group_id == group_id).all()

    # Loop through the matching items and delete them
    for item in items_to_delete:
        db.delete(item)

    # Commit the changes to the database
    db.commit()
    return True

# Wallet cruds
def get_wallets(db: Session):
    return db.query(models.Wallet).all()

def create_wallet(db: Session, group_id : int| None = None, user_id: int | None = None):
    
    db_wallet = models.Wallet(
        user_id = user_id,
        group_id = group_id,
        balance = 0
    )
    db.add(db_wallet)
    db.commit()
    db.refresh(db_wallet)

    return db_wallet

def get_wallet_by_wallet_id(db: Session, wallet_id : int):
    return db.query(models.Wallet).filter(models.Wallet.id == wallet_id).first()

def get_wallet_by_user_id(db: Session, user_id : int):
    return db.query(models.Wallet).filter(models.Wallet.user_id == user_id).first()

def get_wallet_by_group_id(db: Session, group_id : int):
    return db.query(models.Wallet).filter(models.Wallet.group_id == group_id).first()

def update_wallet_balance(db: Session, wallet_id: int, amount: float):
    # Query the database to retrieve the wallet by wallet_id
    db_wallet = db.query(models.Wallet).filter(models.Wallet.id == wallet_id).first()

    if db_wallet:
        # Update the wallet's balance with the provided value
        db_wallet.balance = db_wallet.balance + amount

        db.commit()
        db.refresh(db_wallet)

    return db_wallet



