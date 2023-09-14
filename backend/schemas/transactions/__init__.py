from pydantic import BaseModel
from datetime import datetime

class TransactionBase(BaseModel):
    title: str
    amount: float
    transaction_date : str
    group_id : int | None = None
    user_id : int
    target_wallet_id : int
    source_wallet_id : int

class Transaction(TransactionBase):
    id: int
    
    

    class Config:
        orm_mode = True