from pydantic import BaseModel



class splitTransactionBase(BaseModel):
    user_id: str
    group_id: str
    transaction_id: str
    your_split: float


class splitTransaction(splitTransactionBase):
    id: int

    class Config:
        orm_mode = True