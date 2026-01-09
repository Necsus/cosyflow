from pydantic import BaseModel, Field
from typing import Optional


class CategoryBase(BaseModel):
    name: str = Field(..., max_length=100)
    description: Optional[str] = Field(None, max_length=255)


class CategoryCreate(CategoryBase):
    slug: str = Field(..., max_length=100)


class CategoryResponse(CategoryBase):
    id: int
    slug: str

    class Config:
        from_attributes = True
