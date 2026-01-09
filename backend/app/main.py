from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .routes import news_router, category_router
from .database import engine, Base

Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="CozyFlow API",
    description="API pour CozyFlow - News et astuces pour le monde du cozy gaming",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(news_router)
app.include_router(category_router)


@app.get("/")
def root():
    return {"message": "Welcome to CozyFlow API"}


@app.get("/health")
def health_check():
    return {"status": "healthy"}
