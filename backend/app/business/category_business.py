from sqlalchemy.orm import Session
from fastapi import HTTPException, status
from ..dal.category_dal import CategoryDAL
from ..schemas.category import CategoryCreate, CategoryResponse


class CategoryBusiness:
    def __init__(self, db: Session):
        self.dal = CategoryDAL(db)

    def get_all_categories(self) -> list[CategoryResponse]:
        categories = self.dal.get_all()
        return [CategoryResponse.model_validate(cat) for cat in categories]

    def get_category_by_id(self, category_id: int) -> CategoryResponse:
        category = self.dal.get_by_id(category_id)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Category with id {category_id} not found",
            )
        return CategoryResponse.model_validate(category)

    def get_category_by_slug(self, slug: str) -> CategoryResponse:
        category = self.dal.get_by_slug(slug)
        if not category:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Category with slug '{slug}' not found",
            )
        return CategoryResponse.model_validate(category)

    def create_category(self, category_data: CategoryCreate) -> CategoryResponse:
        existing_category = self.dal.get_by_slug(category_data.slug)
        if existing_category:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail=f"Category with slug '{category_data.slug}' already exists",
            )

        category = self.dal.create(category_data)
        return CategoryResponse.model_validate(category)

    def delete_category(self, category_id: int) -> dict:
        success = self.dal.delete(category_id)
        if not success:
            raise HTTPException(
                status_code=status.HTTP_404_NOT_FOUND,
                detail=f"Category with id {category_id} not found",
            )
        return {"message": "Category deleted successfully"}
