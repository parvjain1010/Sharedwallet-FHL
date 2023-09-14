from pydantic import BaseModel
from datetime import datetime

class TransactionBase(BaseModel):
    title: str
    amount: float
    transaction_date : str

class Transaction(TransactionBase):
    transaction_id: int
    group_id : int | None = None
    user_id : int
    

    class Config:
        orm_mode = True