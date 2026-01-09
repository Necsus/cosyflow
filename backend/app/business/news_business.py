from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from ..dal.news_dal import NewsDAL
from ..schemas.news import NewsCreate, NewsUpdate, NewsResponse, NewsList


class NewsBusiness:
    def __init__(self, db: Session):
        self.dal = NewsDAL(db)

    def get_all_news(self, skip: int = 0, limit: int = 20) -> NewsList:
        items, total = self.dal.get_all(skip=skip, limit=limit)
        return NewsList(total=total, items=[NewsResponse.model_validate(item) for item in items])

    def get_news_by_id(self, news_id: int) -> NewsResponse:
        news = self.dal.get_by_id(news_id)
        if not news:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"News with id {news_id} not found",
            )
        return NewsResponse.model_validate(news)

    def get_news_by_slug(self, slug: str) -> NewsResponse:
        news = self.dal.get_by_slug(slug)
        if not news:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"News with slug '{slug}' not found",
            )
        return NewsResponse.model_validate(news)

    def get_news_by_category(
        self, category_id: int, skip: int = 0, limit: int = 20
    ) -> NewsList:
        items, total = self.dal.get_by_category(category_id, skip=skip, limit=limit)
        return NewsList(total=total, items=[NewsResponse.model_validate(item) for item in items])

    def create_news(self, news_data: NewsCreate) -> NewsResponse:
        existing_news = self.dal.get_by_slug(news_data.slug)
        if existing_news:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"News with slug '{news_data.slug}' already exists",
            )

        news = self.dal.create(news_data)
        return NewsResponse.model_validate(news)

    def update_news(self, news_id: int, news_data: NewsUpdate) -> NewsResponse:
        if news_data.slug:
            existing_news = self.dal.get_by_slug(news_data.slug)
            if existing_news and existing_news.id != news_id:
                raise HTTPException(
                    status_code=status.HTTP_400_BAD_REQUEST,
                    detail=f"News with slug '{news_data.slug}' already exists",
                )

        news = self.dal.update(news_id, news_data)
        if not news:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"News with id {news_id} not found",
            )
        return NewsResponse.model_validate(news)

    def delete_news(self, news_id: int) -> dict:
        success = self.dal.delete(news_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"News with id {news_id} not found",
            )
        return {"message": "News deleted successfully"}
