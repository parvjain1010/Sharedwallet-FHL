from pydantic import BaseModel
from datetime import datetime
from enum import Enum

class UPIBase(BaseModel):
    upi_id: str
    user_id: int | None = None
    group_id: int

class UPI(UPIBase):
    id: int

    class Config:
        orm_mode = True