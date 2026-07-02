from fastapi import FastAPI, HTTPException, status, Response, APIRouter, Depends
from sqlalchemy.orm import Session
from ..import schemas
from ..import models
from ..database import get_db
from passlib.context import CryptContext

router = APIRouter(tags=['Seller'])


pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")
@router.post('/seller')
def create_seller(request: schemas.Seller, db: Session = Depends(get_db)):
    hashedpassword = pwd_context.hash(request.password)
    new_seller = models.Seller(
        username=request.username, email=request.email, password=hashedpassword
    )
    db.add(new_seller)
    db.commit()
    db.refresh(new_seller)
    return request


@router.get('/seller')
def show_seller(db: Session = Depends(get_db)):
    seller = db.query(models.Seller).all()
    return seller

@router.get('/seller/{id}')
def seller(id, response: Response, db: Session = Depends(get_db)):
    seller = db.query(models.Seller).filter(models.Seller.id == id).first()
    if not seller:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='Seller not Found')
    return seller

@router.delete('/seller/{id}')
def delete(id, db: Session = Depends(get_db)):
    db.query(models.Seller).filter(models.Seller.id ==
                                    id).delete(synchronize_session=False)
    db.commit()
    return {"Seller deleted"}

@router.put('/seller/{id}')
def update(id, request: schemas.Seller, db: Session = Depends(get_db)):
    seller = db.query(models.Seller).filter(models.Seller.id == id)
    if not seller.first():
        pass
    hashed_password = pwd_context.hash(request.password)
    seller.update({
        "username": request.username,
        "email": request.email,
        "password": hashed_password
    })
    db.commit()
    return {"Seller Updated Successfully"}