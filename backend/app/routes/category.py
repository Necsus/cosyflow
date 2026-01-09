from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ..database import get_db
from ..business.category_business import CategoryBusiness
from ..schemas.category import CategoryCreate, CategoryResponse

router = APIRouter(prefix="/api/categories", tags=["categories"])


@router.get("", response_model=list[CategoryResponse])
def get_all_categories(db: Session = Depends(get_db)):
    business = CategoryBusiness(db)
    return business.get_all_categories()


@router.get("/{category_id}", response_model=CategoryResponse)
def get_category_by_id(category_id: int, db: Session = Depends(get_db)):
    business = CategoryBusiness(db)
    return business.get_category_by_id(category_id)


@router.get("/slug/{slug}", response_model=CategoryResponse)
def get_category_by_slug(slug: str, db: Session = Depends(get_db)):
    business = CategoryBusiness(db)
    return business.get_category_by_slug(slug)


@router.post("", response_model=CategoryResponse, status_code=201)
def create_category(category_data: CategoryCreate, db: Session = Depends(get_db)):
    business = CategoryBusiness(db)
    return business.create_category(category_data)


@router.delete("/{category_id}")
def delete_category(category_id: int, db: Session = Depends(get_db)):
    business = CategoryBusiness(db)
    return business.delete_category(category_id)
