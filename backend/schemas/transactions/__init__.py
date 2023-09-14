from pydantic import BaseModel
from datetime import datetime

class TransactionBase(BaseModel):
    title: str
    amount: float
    transaction_date : str
    user_id : int
    target_wallet_id : int | None
    source_wallet_id : int | None

class Transaction(TransactionBase):
    id: int
    
    class Config:
        orm_mode = True