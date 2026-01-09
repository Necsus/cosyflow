from pydantic import BaseModel, Field
from typing import Optional
from datetime import datetime


class NewsBase(BaseModel):
    title: str = Field(..., max_length=255)
    content: str
    excerpt: Optional[str] = None
    image_url: Optional[str] = Field(None, max_length=500)
    category_id: Optional[int] = None


class NewsCreate(NewsBase):
    slug: str = Field(..., max_length=255)


class NewsUpdate(BaseModel):
    title: Optional[str] = Field(None, max_length=255)
    slug: Optional[str] = Field(None, max_length=255)
    content: Optional[str] = None
    excerpt: Optional[str] = None
    image_url: Optional[str] = Field(None, max_length=500)
    category_id: Optional[int] = None


class NewsResponse(NewsBase):
    id: int
    slug: str
    created_at: datetime
    updated_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class NewsList(BaseModel):
    total: int
    items: list[NewsResponse]
