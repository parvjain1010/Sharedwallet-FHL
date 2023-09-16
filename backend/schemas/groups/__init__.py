from pydantic import BaseModel



class GroupBase(BaseModel):
    name: str
    description : str | None
    budget: int | None = 0
    expense_type: str | None = "One Time"

class Group(GroupBase):
    id: int

    class Config:
        orm_mode = True