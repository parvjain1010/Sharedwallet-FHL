from pydantic import BaseModel



class GroupAdminBase(BaseModel):
    group_id: int
    user_id: int


class GroupAdmin(GroupAdminBase):
    id: int

    class Config:
        orm_mode = True