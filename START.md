# Guide de démarrage rapide CozyFlow

## Option 1: Tout avec Docker (le plus simple)

```bash
docker-compose up --build
```

Puis accédez à:
- Frontend: http://localhost:5173
- Backend API: http://localhost:8000
- Documentation API: http://localhost:8000/docs

## Option 2: Développement manuel (PostgreSQL + Python + Node)

### Étape 1: Lancer PostgreSQL avec Docker

```bash
docker-compose -f docker-compose.db.yml up -d
```

Cela lance uniquement la base de données PostgreSQL sur le port 5432.

### Étape 2: Installer et lancer le Backend

```bash
cd backend

# Créer l'environnement virtuel
python -m venv venv

# Activer l'environnement (Windows)
venv\Scripts\activate

# Installer les dépendances
pip install -r requirements.txt

# Copier le fichier .env
copy .env.example .env

# Lancer le serveur
uvicorn app.main:app --reload
```

Le backend sera accessible sur http://localhost:8000

### Étape 3: Installer et lancer le Frontend

Dans un nouveau terminal:

```bash
cd frontend

# Installer les dépendances
npm install

# Copier le fichier .env
copy .env.example .env

# Lancer le serveur de développement
npm run dev
```

Le frontend sera accessible sur http://localhost:5173

## Vérifications

### Vérifier que PostgreSQL fonctionne

```bash
docker ps
```

Vous devriez voir `cozyflow-db` dans la liste.

### Vérifier le backend

Ouvrez http://localhost:8000/health dans votre navigateur.
Vous devriez voir: `{"status": "healthy"}`

### Vérifier la documentation API

Ouvrez http://localhost:8000/docs pour voir la documentation interactive Swagger.

## Résolution de problèmes

### PostgreSQL ne démarre pas

```bash
# Arrêter tous les conteneurs
docker-compose -f docker-compose.db.yml down

# Supprimer les volumes
docker volume rm cozyflow_postgres_data

# Redémarrer
docker-compose -f docker-compose.db.yml up -d
```

### Port 5432 déjà utilisé

Si vous avez déjà PostgreSQL installé localement:
- Arrêtez votre PostgreSQL local
- Ou modifiez le port dans docker-compose.db.yml (ex: "5433:5432")

### Erreur d'encodage Python

Assurez-vous que votre fichier .env est encodé en UTF-8.

### Le backend ne se connecte pas à la DB

Vérifiez que PostgreSQL est bien démarré:
```bash
docker logs cozyflow-db
```

## Commandes utiles

### Backend

```bash
# Créer une migration
cd backend
alembic revision --autogenerate -m "description"

# Appliquer les migrations
alembic upgrade head
```

### Docker

```bash
# Voir les logs
docker-compose logs -f

# Arrêter tout
docker-compose down

# Redémarrer un service
docker-compose restart backend

# Voir les conteneurs actifs
docker ps
```

## Prochaines étapes

1. Créez des catégories via l'API: http://localhost:8000/docs
2. Ajoutez des articles de news
3. Explorez l'interface frontend
4. Personnalisez le design selon vos besoins

Bon développement cozy ! ☕
