# Digitech Madagascar — Site Web Complet

> Stack : **React** (frontend) · **Node.js + Express (backend) · **MySQL** (base de données)


##  Structure du projet


digitech/
├── frontend/
│   ├── public/images/     ← logo.png, hero.jpg, acceuil.jpg, site.jpg
│   └── src/
│       ├── components/    ← Navbar, Hero, About, Services, Portfolio, Contact, Footer, Admin
│       ├── context/       ← AuthContext (JWT)
│       ├── hooks/         ← useToast
│       ├── pages/         ← Home.js
│       └── styles/        ← index.css
├── backend/
│   ├── config/db.js       ← Pool MySQL
│   ├── middleware/auth.js ← Vérification JWT
│   ├── routes/            ← auth, services, projects, contacts
│   ├── server.js
│   └── .env.example
└── database.sql           ← Schéma + données initiales



##  Installation

### 1. Base de données
```bash
mysql -u root -p < database.sql
```

### 2. Backend
```bash
cd backend
npm install
cp .env.example .env
# Remplir DB_HOST, DB_USER, DB_PASSWORD, JWT_SECRET
npm run dev
```


### 3. Frontend
```bash
cd frontend
npm install
npm start


---

## 🌐 API Routes

| Méthode | Route                   | Auth | Description          |
|---------|-------------------------|------|----------------------|
| GET     | /api/services           | Non  | Liste services       |
| POST    | /api/services           | Oui  | Ajouter service      |
| PUT     | /api/services/:id       | Oui  | Modifier service     |
| DELETE  | /api/services/:id       | Oui  | Supprimer service    |
| GET     | /api/projects           | Non  | Liste projets        |
| POST    | /api/projects           | Oui  | Ajouter projet       |
| DELETE  | /api/projects/:id       | Oui  | Supprimer projet     |
| POST    | /api/contacts           | Non  | Envoyer message      |
| GET     | /api/contacts           | Oui  | Lire messages        |
| PATCH   | /api/contacts/:id/lu    | Oui  | Marquer lu           |
| POST    | /api/auth/login         | Non  | Connexion admin      |



##  Fonctionnalités

- Hero dynamique avec animation de frappe typewriter
- Section À propos avec images et stats
- Services chargés depuis la BDD (fallback statique si API indisponible)
- Portfolio filtrable par catégorie + modal détail projet
- Formulaire de contact avec validation complète + toast
- Espace Admin JWT : login, dashboard, CRUD services/projets, messagerie
- Design responsive (mobile, tablette, desktop)
- Scroll to top, animations fadeUp


##  Contact Digitech

- **Email :** digitechservice02@gmail.com  
- **Tél :** +261 32 28 28 006  
- **Adresse :** 5.012.02 Rue de la Fayette, Diego Suarez, Antsiranana, Madagascar
