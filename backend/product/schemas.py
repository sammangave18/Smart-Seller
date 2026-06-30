from typing import Optional
from pydantic import BaseModel


class Product (BaseModel):
    name: str
    description: str
    price: int


class Seller (BaseModel):
    username: str
    email: str
    password: str


class Login (BaseModel):
    username: str
    password: str


class Token (BaseModel):
    assess_token: str
    token_type: str


class TokenData (BaseModel):
    username: Optional[str] = None
