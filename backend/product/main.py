from fastapi import FastAPI, HTTPException, status, Response
# from sqlalchemy.sql.functions import mode
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import sessionmaker, declarative_base, Session
from .import schemas
from .import models
from .database import engine, SessionLocal
from fastapi.params import Depends
from .database import get_db
from .routers import product, sellers, login
# from passlib.context import CryptContext
from fastapi.middleware.cors import CORSMiddleware
from .routers import ai

app = FastAPI(
    title='Product API'
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
         "http://localhost:4200",
        "http://localhost:42001",
        "http://localhost:56597",
        "http://127.0.0.1:4200",
        "http://127.0.0.1:56597",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
# pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
app.include_router(product.router)
app.include_router(sellers.router)
app.include_router(login.router)
app.include_router(ai.router)
models.Base.metadata.create_all(engine)



