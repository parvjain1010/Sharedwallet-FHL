from pydantic import BaseModel



class userGroupBase(BaseModel):
    user_id: int
    group_id: int
    status: bool


class userGroup(userGroupBase):
    id: int

    class Config:
        orm_mode = True