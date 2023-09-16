from __future__ import annotations
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float, BOOLEAN
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.schemas.wallets import WalletType
from enum import Enum
from backend.database import Base


class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    description = Column(String, nullable=True)
    expense_type = Column(String, default="One Time")
    budget = Column(Integer, default=0)

class GroupAdmin(Base):
    __tablename__ = "group-admins"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    group_id = Column(Integer) 


class splitTransactions(Base):
    __tablename__ = "split-transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    group_id = Column(Integer)
    transaction_id = Column(Integer)
    your_split = Column(Float)

class Transaction(Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    source_wallet_id = Column(Integer, nullable= True)
    target_wallet_id = Column(Integer, nullable= True)
    title = Column(String)
    amount = Column(Float)
    transaction_date = Column(String)

class userGroup(Base):
    __tablename__ = "user-groups"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    group_id = Column(Integer)
    status = Column(BOOLEAN)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    name = Column(String, nullable=True)
    phone_number = Column(String, nullable=True)

class UPI(Base):
    __tablename__ = "upi"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, nullable=True)
    group_id = Column(Integer, nullable= True)
    upi_id = Column(String)


class Wallet(Base):
    __tablename__ = "wallets"

    id = Column(Integer, primary_key=True, index=True)
    balance = Column(Integer)
    user_id = Column(Integer, nullable=True)
    group_id = Column(Integer, nullable=True)