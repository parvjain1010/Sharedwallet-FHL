from __future__ import annotations
from sqlalchemy import Boolean, Column, ForeignKey, Integer, String, Float
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.schemas.wallets import WalletType
from enum import Enum
from backend.database import Base


class Group(Base):
    __tablename__ = "groups"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)

class GroupAdmin(Base):
    __tablename__ = "group-admins"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    group_id = Column(Integer) 
    name = Column(String)


class splitTransactions(Base):
    __tablename__ = "split-transactions"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    group_id = Column(Integer)
    transaction_id = Column(Integer)
    your_split = Column(Float)

class Transaction(Base):
    __tablename__ = "transactions"

    transaction_id = Column(Integer, primary_key=True, index=True)
    group_id = Column(Integer)
    user_id = Column(Integer)
    title = Column(String, unique=True, index=True)
    amount = Column(Float)
    transaction_date = Column(String)

class userGroup(Base):
    __tablename__ = "user-groups"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer)
    group_id = Column(Integer)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True)
    password = Column(String)
    name = Column(String)
    phone_number = Column(String)


class Wallet(Base):
    __tablename__ = "wallets"

    id = Column(Integer, primary_key=True, index=True)
    wallet_type = Column(String)
    balance = Column(Integer)