from fastapi import APIRouter, Depends, Query
from sqlalchemy.orm import Session
from ..database import get_db
from ..business.news_business import NewsBusiness
from ..schemas.news import NewsCreate, NewsUpdate, NewsResponse, NewsList

router = APIRouter(prefix="/api/news", tags=["news"])


@router.get("", response_model=NewsList)
def get_all_news(
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    business = NewsBusiness(db)
    return business.get_all_news(skip=skip, limit=limit)


@router.get("/category/{category_id}", response_model=NewsList)
def get_news_by_category(
    category_id: int,
    skip: int = Query(0, ge=0),
    limit: int = Query(20, ge=1, le=100),
    db: Session = Depends(get_db),
):
    business = NewsBusiness(db)
    return business.get_news_by_category(category_id, skip=skip, limit=limit)


@router.get("/{news_id}", response_model=NewsResponse)
def get_news_by_id(news_id: int, db: Session = Depends(get_db)):
    business = NewsBusiness(db)
    return business.get_news_by_id(news_id)


@router.get("/slug/{slug}", response_model=NewsResponse)
def get_news_by_slug(slug: str, db: Session = Depends(get_db)):
    business = NewsBusiness(db)
    return business.get_news_by_slug(slug)


@router.post("", response_model=NewsResponse, status_code=201)
def create_news(news_data: NewsCreate, db: Session = Depends(get_db)):
    business = NewsBusiness(db)
    return business.create_news(news_data)


@router.put("/{news_id}", response_model=NewsResponse)
def update_news(news_id: int, news_data: NewsUpdate, db: Session = Depends(get_db)):
    business = NewsBusiness(db)
    return business.update_news(news_id, news_data)


@router.delete("/{news_id}")
def delete_news(news_id: int, db: Session = Depends(get_db)):
    business = NewsBusiness(db)
    return business.delete_news(news_id)
