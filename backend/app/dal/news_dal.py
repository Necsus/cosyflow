from sqlalchemy.orm import Session
from typing import Optional
from ..models.news import News
from ..schemas.news import NewsCreate, NewsUpdate


class NewsDAL:
    def __init__(self, db: Session):
        self.db = db

    def get_all(self, skip: int = 0, limit: int = 20) -> tuple[list[News], int]:
        query = self.db.query(News)
        total = query.count()
        items = query.order_by(News.created_at.desc()).offset(skip).limit(limit).all()
        return items, total

    def get_by_id(self, news_id: int) -> Optional[News]:
        return self.db.query(News).filter(News.id == news_id).first()

    def get_by_slug(self, slug: str) -> Optional[News]:
        return self.db.query(News).filter(News.slug == slug).first()

    def get_by_category(
        self, category_id: int, skip: int = 0, limit: int = 20
    ) -> tuple[list[News], int]:
        query = self.db.query(News).filter(News.category_id == category_id)
        total = query.count()
        items = query.order_by(News.created_at.desc()).offset(skip).limit(limit).all()
        return items, total

    def create(self, news_data: NewsCreate) -> News:
        db_news = News(**news_data.model_dump())
        self.db.add(db_news)
        self.db.commit()
        self.db.refresh(db_news)
        return db_news

    def update(self, news_id: int, news_data: NewsUpdate) -> Optional[News]:
        db_news = self.get_by_id(news_id)
        if not db_news:
            return None

        update_data = news_data.model_dump(exclude_unset=True)
        for field, value in update_data.items():
            setattr(db_news, field, value)

        self.db.commit()
        self.db.refresh(db_news)
        return db_news

    def delete(self, news_id: int) -> bool:
        db_news = self.get_by_id(news_id)
        if not db_news:
            return False

        self.db.delete(db_news)
        self.db.commit()
        return True
