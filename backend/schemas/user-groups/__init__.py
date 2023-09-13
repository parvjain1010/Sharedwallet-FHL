from pydantic import BaseModel



class userGroupBase(BaseModel):
    user_id: int
    group_id: int


class userGroup(userGroupBase):
    id: int

    class Config:
        orm_mode = True