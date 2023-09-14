from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class WalletType(Enum):
    USER = 'UserWallet'
    GROUP = 'GroupWallet'


class WalletBase(BaseModel):
    balance: float
    user_id: int
    group_id: int

class Wallet(WalletBase):
    id: int

    class Config:
        orm_mode = True