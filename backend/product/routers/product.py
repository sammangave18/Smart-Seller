from fastapi import FastAPI, HTTPException, status, Response, APIRouter, Depends
from sqlalchemy.orm import Session
from .login import get_current_user
from ..import schemas
from ..import models
from ..database import get_db

router = APIRouter(tags=['Product'])

@router.get('/test')
def test():
    return {"message": "API Working"}

@router.get('/product')
def Products(db: Session = Depends(get_db), current_user: schemas.Seller = Depends(get_current_user)):
    products = db.query(models.Product).all()
    return products


@router.get('/product/{id}')
def Product(id, response: Response, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == id).first()
    if not product:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND,
                            detail='Product not Found')
    return product


@router.post('/product')
def add(request: schemas.Product, db: Session = Depends(get_db)):
    new_product = models.Product(
        name=request.name, description=request.description, price=request.price
    )
    db.add(new_product)
    db.commit()
    db.refresh(new_product)
    return request


@router.put('/product/{id}')
def update(id, request: schemas.Product, db: Session = Depends(get_db)):
    product = db.query(models.Product).filter(models.Product.id == id)
    if not product.first():
        pass
    product.update(request.dict())
    db.commit()
    return {"Product Updated Successfully"}


@router.delete('/product/{id}')
def delete(id, db: Session = Depends(get_db)):
    db.query(models.Product).filter(models.Product.id ==
                                    id).delete(synchronize_session=False)
    db.commit()
    return {"Product deleted"}

