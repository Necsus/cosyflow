# Guide d'installation CozyFlow

## Prérequis

- Python 3.12+
- Node.js 20+
- PostgreSQL 16+ (ou Docker)

## Installation avec Docker (Recommandé)

1. Cloner le repository
```bash
git clone <repository-url>
cd cosyflow
```

2. Copier les fichiers d'environnement
```bash
cp backend/.env.example backend/.env
cp frontend/.env.example frontend/.env
```

3. Lancer avec Docker Compose
```bash
docker-compose up --build
```

L'application sera accessible à :
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Documentation API: http://localhost:8000/docs

## Installation manuelle

### Backend

1. Créer un environnement virtuel Python
```bash
cd backend
python -m venv venv
```

2. Activer l'environnement virtuel
```bash
# Windows
venv\Scripts\activate

# Linux/Mac
source venv/bin/activate
```

3. Installer les dépendances
```bash
pip install -r requirements.txt
```

4. Configurer les variables d'environnement
```bash
cp .env.example .env
# Éditer .env avec vos paramètres PostgreSQL
```

5. Créer la base de données
```bash
# Se connecter à PostgreSQL et créer la base
createdb cozyflow
```

6. Lancer les migrations
```bash
alembic upgrade head
```

7. Démarrer le serveur
```bash
uvicorn app.main:app --reload
```

### Frontend

1. Installer les dépendances
```bash
cd frontend
npm install
```

2. Configurer les variables d'environnement
```bash
cp .env.example .env
```

3. Lancer le serveur de développement
```bash
npm run dev
```

## Structure du projet

```
cosyflow/
├── backend/
│   ├── app/
│   │   ├── routes/      # Endpoints API
│   │   ├── business/    # Logique métier
│   │   ├── dal/         # Data Access Layer
│   │   ├── models/      # Modèles SQLAlchemy
│   │   └── schemas/     # Schémas Pydantic
│   ├── alembic/         # Migrations de base de données
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── components/  # Composants React
    │   ├── pages/       # Pages de l'application
    │   ├── services/    # Services API
    │   └── styles/      # Styles CSS/Tailwind
    └── package.json
```

## Commandes utiles

### Backend

```bash
# Créer une nouvelle migration
alembic revision --autogenerate -m "description"

# Appliquer les migrations
alembic upgrade head

# Revenir en arrière
alembic downgrade -1

# Lancer les tests
pytest

# Formater le code
black .
```

### Frontend

```bash
# Lancer en dev
npm run dev

# Build pour production
npm run build

# Preview du build
npm run preview

# Linter
npm run lint
```

## Variables d'environnement

### Backend (.env)
```
DATABASE_URL=postgresql://user:password@localhost:5432/cozyflow
SECRET_KEY=your-secret-key
ENVIRONMENT=development
```

### Frontend (.env)
```
VITE_API_URL=http://localhost:8000
```

## Thème Cozy

Le design utilise une palette de couleurs chaleureuses et apaisantes :

- **Cream** (#FFF8E7) - Fond principal
- **Beige** (#F5E6D3) - Fond secondaire
- **Peach** (#FFD4B2) - Accents doux
- **Coral** (#FFAB91) - Actions principales
- **Brown** (#8B7355) - Textes
- **Dark Brown** (#5D4E37) - Titres

Les composants utilisent des bordures arrondies, des ombres douces et des transitions fluides pour créer une expérience utilisateur relaxante et accueillante.
