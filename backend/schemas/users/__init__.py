from pydantic import BaseModel



class UserBase(BaseModel):
    email: str
    name: str | None = None
    phone_number: str | None = None


class UserCreate(UserBase):
    password: str


class User(UserBase):
    id: int

    class Config:
        orm_mode = True