# CozyFlow

Une application web de news et astuces pour le monde du cozy gaming.

## Architecture

### Backend (FastAPI + PostgreSQL)
- **Routes**: Endpoints API REST
- **Business**: Logique métier
- **DAL**: Data Access Layer pour PostgreSQL

### Frontend (React + Tailwind CSS)
- Design cozy gaming avec des tons chauds et apaisants
- Interface moderne et responsive

## Démarrage

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate  # ou venv\Scripts\activate sur Windows
pip install -r requirements.txt
uvicorn app.main:app --reload
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Docker
```bash
docker-compose up
```
