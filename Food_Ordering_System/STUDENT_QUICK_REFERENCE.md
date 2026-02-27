# QuickBite — Student Quick Reference Card
## Handy Cheat Sheet for All Four Stages

---

## STAGE 1 — Models & Scaffolding

### Your Three Core Models

| Model | Key Fields |
|-------|-----------|
| `Dish` | title, description, dish_type, unit_price, is_available |
| `CustomerOrder` | buyer_name, placed_at, order_status, amount_due |
| `OrderLine` | customer_order (FK), dish (FK), qty, locked_price |

### Relationships
- A **CustomerOrder** has many **OrderLines**
- A **Dish** can appear in many **OrderLines**
- An **OrderLine** belongs to one CustomerOrder and one Dish

### Framework Commands at a Glance

**Laravel:**
```bash
php artisan make:model Dish -m
php artisan make:model CustomerOrder -m
php artisan make:model OrderLine -m
php artisan make:controller DishController --resource
php artisan migrate
```

**Django:**
```bash
python manage.py startapp catalog
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
python manage.py runserver
```

**ASP.NET Core:**
```bash
dotnet new mvc -n QuickBite
dotnet ef migrations add InitialSetup
dotnet ef database update
dotnet run
```

---

## STAGE 2 — Bootstrap Styling

### Bootstrap CDN Block (paste into your base template `<head>`)
```html
<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
```

### Bootstrap CDN JS (paste before `</body>`)
```html
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
```

### Component Quick Reference

| Component | Key Classes |
|-----------|------------|
| Navbar | `navbar navbar-expand-lg navbar-dark bg-dark` |
| Card | `card`, `card-body`, `card-title`, `card-text` |
| Grid Row | `container > .row > .col-md-4 .col-sm-6` |
| Input | `form-control` |
| Button | `btn btn-primary` / `btn btn-danger` |
| Table | `table table-striped table-hover` |
| Alert | `alert alert-success` / `alert alert-danger` |

### Responsive Grid Pattern for Dishes
```html
<div class="container">
  <div class="row">
    {% for dish in dishes %}
    <div class="col-12 col-sm-6 col-md-4 col-lg-3 mb-4">
      <div class="card h-100">
        <div class="card-body">
          <h5 class="card-title">{{ dish.title }}</h5>
          <p class="card-text">{{ dish.description }}</p>
          <span class="fw-bold">${{ dish.unit_price }}</span>
        </div>
      </div>
    </div>
    {% endfor %}
  </div>
</div>
```

---

## STAGE 3 — HTTP Methods

### Which Verb to Use

| Action | Verb | Endpoint example |
|--------|------|-----------------|
| View list | GET | `/dishes` |
| View one | GET | `/dishes/4` |
| Create | POST | `/dishes` |
| Replace all fields | PUT | `/dishes/4` |
| Update one field | PATCH | `/dishes/4` |
| Remove | DELETE | `/dishes/4` |

### PUT/DELETE from HTML Forms
HTML forms only support GET and POST. For PUT and DELETE, add this hidden field:
```html
<form method="POST" action="/dishes/4">
  {% csrf_token %}           <!-- Django -->
  @csrf                      <!-- Laravel -->
  <input type="hidden" name="_method" value="DELETE">
  <button type="submit">Delete</button>
</form>
```

### Idempotency Summary

| Verb | Idempotent? |
|------|------------|
| GET | ✅ Yes |
| PUT | ✅ Yes |
| DELETE | ✅ Yes |
| POST | ❌ No |
| PATCH | ⚠️ Usually yes |

### Status Codes to Return

| Situation | Code |
|-----------|------|
| Fetch success | 200 |
| Record created | 201 |
| Delete success (no body) | 204 |
| Bad input | 400 |
| Not logged in | 401 |
| No permission | 403 |
| Record not found | 404 |
| Validation error | 422 |
| Server crash | 500 |

---

## STAGE 4 — URI Design

### URI Rules (Memorise These)

✅ **DO:** Use plural nouns
```
/dishes         /customer-orders        /buyers
```

❌ **DON'T:** Use singular or verbs
```
/dish          /getOrder        /createBuyer
```

✅ **DO:** Show hierarchy in paths
```
/customer-orders/5/lines          → all lines in order 5
/buyers/3/customer-orders         → all orders by buyer 3
/dish-types/2/dishes              → all dishes of type 2
```

✅ **DO:** Use query strings for filtering
```
/dishes?dish_type=mains
/customer-orders?order_status=waiting&limit=10
```

### Full URI Quick-Check Table

| Method | URI | Action |
|--------|-----|--------|
| GET | /dishes | List all |
| POST | /dishes | Create new |
| GET | /dishes/:id | Get one |
| PUT | /dishes/:id | Update one |
| DELETE | /dishes/:id | Remove one |
| GET | /dish-types/:id/dishes | Dishes in a type |
| GET | /customer-orders | List all orders |
| POST | /customer-orders | Place new order |
| GET | /customer-orders/:id | Get one order |
| PUT | /customer-orders/:id | Update status |
| DELETE | /customer-orders/:id | Cancel order |
| GET | /customer-orders/:id/lines | Lines in order |
| POST | /customer-orders/:id/lines | Add line to order |
| DELETE | /customer-orders/:id/lines/:lineId | Remove line |

---

## SUBMISSION CHECKLIST

- [ ] GitHub repo named `quickbite-web-portal`
- [ ] `README.md` with setup steps
- [ ] Stage 1: 3 models, relationships, CRUD working
- [ ] Stage 2: Bootstrap on all pages, responsive
- [ ] Stage 3: Correct HTTP verbs, proper status codes
- [ ] `REST_API_DOCUMENTATION.md` complete
- [ ] Stage 4: All URIs plural, no verbs, nested hierarchy
- [ ] `API_ENDPOINTS.md` complete
- [ ] Git tags: `stage-1` through `stage-4`
- [ ] Push to GitHub and submit URL

---

## GRADING AT A GLANCE

| Stage | Points |
|-------|--------|
| Stage 1 — Modeling | 50 |
| Stage 2 — Bootstrap | 60 |
| Stage 3 — REST Methods | 60 |
| Stage 4 — URI Design | 50 |
| Bonus (Git + Docs) | 10 |
| **Total** | **230** |

---
*QuickBite Student Reference — Good luck! 🍔*
