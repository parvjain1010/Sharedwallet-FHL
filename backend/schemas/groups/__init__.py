from pydantic import BaseModel



class GroupBase(BaseModel):
    name: str


class Group(GroupBase):
    id: int

    class Config:
        orm_mode = True