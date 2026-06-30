from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from ..import schemas
from passlib.context import CryptContext
from ..database import get_db
from ..import models
from datetime import datetime, timedelta
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from ..schemas import TokenData

SECRET_KEY = "fa51f1e4edce8b56c5d7930216a75cc95fb25afba49f1a6e128f5527985a0da1"
ALGORITHM = "HS256"
ASSESS_TOKEN_EXPIRE_MINUTES = 20

router = APIRouter()

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
oauth2_scheme = OAuth2PasswordBearer(tokenUrl='login')


def genrate_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ASSESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt


@router.post('/login')
# def login(request: schemas.Login, db: Session = Depends(get_db) ):
def login(request: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    seller = db.query(models.Seller).filter(
        models.Seller.username == request.username).first()

    if not seller:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='User not foud/Invalid user')

    if not pwd_context.verify(request.password, seller.password):
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND, detail='Password Not Match')
    access_token = genrate_token(data={'sub': seller.username})
    return {"access_token": access_token, "token_type": "bearer"}
    # return request

# def get_current_user(token:str = Depends(oauth2_scheme)):
#     print("Received Token:", token)
#     credentials_excception = HTTPException(
#         status_code=status.HTTP_401_UNAUTHORIZED,
#         detail="Invalid auth credentials",
#         headers={'www-Authenticate':"Bearer"},
#     )
#     try:
#         paylod = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
#         username: str = paylod.get('sub')
#         if username is None:
#             raise credentials_excception
#         token_data = TokenData(username=username)
#     except JWTError:
#         raise credentials_excception


def get_current_user(token: str = Depends(oauth2_scheme)):

    print("Received Token:", token)
    credentials_excception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Invalid auth credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )

    try:
        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )
        username: str = payload.get("sub")
        if username is None:
            raise credentials_excception

        token_data = TokenData(
            username=username
        )
    except JWTError:
        raise credentials_excception

    return token_data
