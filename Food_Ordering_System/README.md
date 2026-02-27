# Food_Ordering_System

A web-based food ordering system built as part of an undergraduate Web Development laboratory assignment. Customers browse a live dish catalog, place orders, and track their status. Managers administer the menu through a secure backend panel.

---

## Tech Stack

Choose one MVC framework to build this project:

| Framework | Language | Best For |
|-----------|----------|---------|
| Laravel | PHP | Beginners, fast scaffolding |
| Django | Python | ORM power, built-in admin |
| ASP.NET Core | C# | Enterprise-scale apps |

Database: SQLite (development) / MySQL or PostgreSQL (production)

---

## Project Structure

```
Food_Ordering_System/
├── LAB_MANUAL.md                  ← Full assignment guide (4 stages)
├── STUDENT_QUICK_REFERENCE.md     ← Cheat sheet for quick lookups
├── DJANGO_STARTER_CODE.md         ← Ready-to-use Django code
├── LARAVEL_STARTER_CODE.md        ← Ready-to-use Laravel code
├── REST_API_DOCUMENTATION.md      ← Stage 3 documentation template
├── API_ENDPOINTS.md               ← Stage 4 URI reference
└── README.md                      ← This file
```

---

## Getting Started

### Option A — Django (Python)

```bash
# 1. Clone or download this repo
git clone <your-repo-url>
cd quickbite

# 2. Create virtual environment
python -m venv env
source env/bin/activate   # Windows: env\Scripts\activate

# 3. Install dependencies
pip install django djangorestframework

# 4. Start project
django-admin startproject quickbite_project .
python manage.py startapp catalog

# 5. Configure settings and run
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

Visit: http://localhost:8000/dishes/

---

### Option B — Laravel (PHP)

```bash
# 1. Requires PHP 8.1+ and Composer
composer create-project laravel/laravel quickbite
cd quickbite

# 2. Set up environment
cp .env.example .env
php artisan key:generate

# 3. Configure DB in .env, then migrate
php artisan migrate

# 4. Serve the app
php artisan serve
```

Visit: http://localhost:8000/dishes

---

## Four-Stage Assignment Summary

| Stage | Topic | Duration | Weight |
|-------|-------|----------|--------|
| 1 | Database Models & Scaffolding | 1 week | 15% |
| 2 | Bootstrap Responsive UI | 1 week | 20% |
| 3 | REST & HTTP Methods | 1.5 weeks | 25% |
| 4 | RESTful URI Design | 1 week | 20% |

See `LAB_MANUAL.md` for full instructions.

---

## Core Features

- **Dish Catalog** — Browse, filter, create, edit, and delete dishes
- **Order Management** — Place and track customer orders through multiple statuses
- **Admin Panel** — Secure backend for restaurant managers
- **REST API** — All operations exposed through RESTful endpoints
- **Responsive Design** — Mobile, tablet, and desktop support via Bootstrap 5

---

## Data Models

```
Dish
  id | title | description | dish_type | unit_price | is_available

CustomerOrder
  id | buyer_name | placed_at | order_status | amount_due

OrderLine
  id | customer_order_id (FK) | dish_id (FK) | qty | locked_price
```

---

## Submission

1. Push all code to GitHub: `git push origin main`
2. Tag each stage: `git tag stage-1 && git push --tags`
3. Submit your GitHub repository link on the course portal

---

## Useful Links

- [Laravel Documentation](https://laravel.com/docs)
- [Django Documentation](https://docs.djangoproject.com)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3)
- [HTTP Methods — MDN](https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods)
- [RESTful API Design](https://restfulapi.net)
