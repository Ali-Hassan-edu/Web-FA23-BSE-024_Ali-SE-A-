# STUDENT QUICK REFERENCE GUIDE
## Food Ordering System Project

---

## PROJECT AT A GLANCE

**Total Duration**: 4 weeks  
**Total Points**: 230  
**Phases**: 4 sequential phases + bonus

### Quick Timeline
- **Week 1**: Phase 1 - Models & Scaffolding (50 points)
- **Week 2**: Phase 2 - Bootstrap Integration (60 points)
- **Week 3**: Phase 3 - REST Principles (60 points)
- **Week 4**: Phase 4 - URI Design (50 points) + Bonus (10 points)

---

## CRITICAL REQUIREMENTS CHECKLIST

### Phase 1: Models & Scaffolding
- [ ] Choose framework: Laravel, Django, or ASP.NET Core
- [ ] Create MenuItem, Order, OrderItem models
- [ ] Set up database and run migrations
- [ ] Generate controllers with scaffolding tool
- [ ] All CRUD operations working
- [ ] Plain HTML (no styling yet)

### Phase 2: Bootstrap Integration
- [ ] Add Bootstrap CDN to all pages
- [ ] Create responsive grid layout
- [ ] Display menu items in Cards
- [ ] Style all forms with Bootstrap classes
- [ ] Navigation bar on every page
- [ ] Test on mobile (320px), tablet (768px), desktop (1200px+)

### Phase 3: REST Principles
- [ ] Map all actions to correct HTTP methods (GET, POST, PUT, DELETE)
- [ ] Return correct HTTP status codes (200, 201, 204, 400, 404)
- [ ] Implement authentication (tokens in headers)
- [ ] Document statelessness design
- [ ] Classify each endpoint as idempotent/non-idempotent
- [ ] Create REST_API_DOCUMENTATION.md

### Phase 4: URI Design
- [ ] ALL URIs use PLURAL nouns (never singular)
- [ ] ZERO verbs in URIs (no /create, /delete, /get, etc.)
- [ ] Hierarchical structure for relationships (/orders/:id/items)
- [ ] Consistent naming (lowercase, hyphens)
- [ ] Create API_ENDPOINTS.md with complete list

### Bonus: Git & Documentation
- [ ] Meaningful commit messages
- [ ] Phase tags (git tag phase-1, etc.)
- [ ] Complete README.md
- [ ] Code comments in complex sections

---

## FRAMEWORK QUICK START

### Laravel
```bash
composer create-project laravel/laravel food-ordering-system
cd food-ordering-system
php artisan make:model MenuItem -m
php artisan make:model Order -m
php artisan make:model OrderItem -m
php artisan migrate
```

### Django
```bash
python -m venv venv
source venv/bin/activate
pip install django
django-admin startproject config .
python manage.py startapp menu
python manage.py makemigrations
python manage.py migrate
python manage.py createsuperuser
```

### ASP.NET Core
```bash
dotnet new mvc -n FoodOrderingSystem
cd FoodOrderingSystem
dotnet ef migrations add InitialCreate
dotnet ef database update
```

---

## HTTP METHODS QUICK REFERENCE

| Action | HTTP Method | URI Example | Idempotent |
|--------|------------|-------------|-----------|
| View all | GET | /menu-items | YES |
| View one | GET | /menu-items/1 | YES |
| Create | POST | /menu-items | NO |
| Update | PUT | /menu-items/1 | YES |
| Delete | DELETE | /menu-items/1 | YES |

**Golden Rules:**
- GET = Read only (never modifies data)
- POST = Create (not idempotent)
- PUT = Replace (idempotent)
- DELETE = Remove (idempotent)

---

## REST URI DESIGN RULES

### ✓ CORRECT Examples
```
/menu-items              (plural noun)
/orders/5                (resource ID)
/orders/5/items          (hierarchical)
/menu-items?category=appetizers  (filtering)
/menu-items?limit=10&offset=20   (pagination)
```

### ✗ INCORRECT Examples
```
/menuitem               (singular - WRONG)
/getMenuItem            (verb - WRONG)
/createOrder            (verb - WRONG)
/menu-item/5/delete     (verb - WRONG)
/order_items            (underscore - use hyphen)
```

---

## BOOTSTRAP MUST-HAVES

### Navbar
```html
<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="/">Food Ordering</a>
  <button class="navbar-toggler" ...><!-- hamburger --></button>
  <div class="collapse navbar-collapse">
    <ul class="navbar-nav ml-auto">
      <li><a class="nav-link" href="/menu-items">Menu</a></li>
      <li><a class="nav-link" href="/orders">Orders</a></li>
    </ul>
  </div>
</nav>
```

### Cards
```html
<div class="card" style="width: 18rem;">
  <img class="card-img-top" src="..." alt="Menu Item">
  <div class="card-body">
    <h5 class="card-title">Item Name</h5>
    <p class="card-text">Description</p>
    <p class="card-text"><strong>$12.99</strong></p>
    <a href="#" class="btn btn-primary">View</a>
    <a href="#" class="btn btn-danger">Delete</a>
  </div>
</div>
```

### Grid
```html
<div class="container">
  <div class="row">
    <div class="col-md-4"><!-- 3 columns on medium screens --></div>
    <div class="col-md-4"><!-- 2 columns on tablet, 1 on mobile --></div>
    <div class="col-md-4"></div>
  </div>
</div>
```

---

## IDEMPOTENCY EXPLAINED

**Idempotent = Safe to call multiple times**

### GET /menu-items/1
- First call: Returns menu item 1
- Second call: Returns same menu item 1
- ✓ IDEMPOTENT

### POST /orders
- First call: Creates order #100
- Second call: Creates order #101
- ✗ NOT IDEMPOTENT

### PUT /menu-items/1
- First call: Sets item name to "Salad"
- Second call: Sets item name to "Salad" (same result)
- ✓ IDEMPOTENT

### DELETE /menu-items/1
- First call: Deletes item (returns 204)
- Second call: Item already gone (returns 404 but same final state)
- ✓ IDEMPOTENT

---

## STATELESSNESS SIMPLE EXPLANATION

**Statelessness = Server doesn't remember clients**

### How to implement:
1. Client sends request WITH authentication token
2. Server validates token
3. Server processes request
4. Server sends response
5. Server FORGETS this client existed

Example:
```
Request 1: GET /orders Authorization: Bearer abc123
Request 2: GET /orders Authorization: Bearer abc123
Request 3: GET /orders (fails - no token)
```

Each request is independent. Server has no "session" for this user.

---

## COMMON MISTAKES TO AVOID

❌ **WRONG**: Using singular nouns
```
/menuitem, /order, /category
```

❌ **WRONG**: Using verbs in URIs
```
/getMenu, /createOrder, /deleteItem
```

❌ **WRONG**: Wrong HTTP methods
```
GET /menu-items (create new item)  - Should be POST
POST /menu-items/5 (update item)   - Should be PUT
```

❌ **WRONG**: Hardcoded session state
```
Session['current_user'] = user_id
```

❌ **WRONG**: Storing authentication on server
```
sessions[client_id] = authenticated
```

---

## DOCUMENTATION TEMPLATES

### REST_API_DOCUMENTATION.md Template
```markdown
# REST API Documentation

## Statelessness Implementation
[Explain how you implemented it]

## Complete API Endpoints

### GET /menu-items
- Purpose: Retrieve all menu items
- Auth: None
- Example: curl http://localhost:3000/menu-items
- Response: 200 OK

[Continue for each endpoint...]

## Idempotency Analysis

| Endpoint | Method | Idempotent | Reason |
|----------|--------|-----------|--------|
| /menu-items | GET | YES | Returns same data |
[Continue...]
```

### API_ENDPOINTS.md Template
```markdown
# API Endpoints Reference

## Menu Items
| HTTP | URI | Purpose |
|------|-----|---------|
| GET | /menu-items | List all |
| POST | /menu-items | Create new |
| GET | /menu-items/:id | Get one |
| PUT | /menu-items/:id | Update |
| DELETE | /menu-items/:id | Delete |

[Continue for all resources...]
```

---

## TESTING YOUR API

### Using curl
```bash
# GET request
curl -X GET http://localhost:3000/menu-items

# POST request
curl -X POST http://localhost:3000/menu-items \
  -H "Content-Type: application/json" \
  -d '{"name":"Salad","price":8.99}'

# PUT request
curl -X PUT http://localhost:3000/menu-items/1 \
  -H "Content-Type: application/json" \
  -d '{"name":"Caesar Salad","price":9.99}'

# DELETE request
curl -X DELETE http://localhost:3000/menu-items/1
```

### Using Postman
1. Create new request
2. Select HTTP method (GET, POST, PUT, DELETE)
3. Enter URL
4. Add headers (Content-Type: application/json)
5. Add body for POST/PUT
6. Send and check response code

### Browser DevTools
1. Open F12
2. Go to Network tab
3. Perform action in application
4. Click request to see method, headers, body, response

---

## GIT WORKFLOW CHECKLIST

```bash
# Initial setup
git init
git add .
git commit -m "Initial project structure"

# After Phase 1
git add .
git commit -m "Complete Phase 1: Models and scaffolding"
git tag phase-1

# After Phase 2
git add .
git commit -m "Complete Phase 2: Bootstrap integration"
git tag phase-2

# After Phase 3
git add .
git commit -m "Complete Phase 3: REST API implementation"
git tag phase-3

# After Phase 4
git add .
git commit -m "Complete Phase 4: URI design refactoring"
git tag phase-4

# Push to GitHub
git remote add origin https://github.com/username/food-ordering-system.git
git push -u origin main
git push --tags
```

---

## SUBMISSION CHECKLIST

Before submitting, verify:

### Code
- [ ] Application runs without errors
- [ ] All CRUD operations work
- [ ] Responsive design works on mobile/tablet/desktop
- [ ] All HTTP methods correct
- [ ] All URIs use plural nouns
- [ ] No verbs in URIs

### Documentation
- [ ] README.md exists with setup instructions
- [ ] REST_API_DOCUMENTATION.md exists
- [ ] API_ENDPOINTS.md exists
- [ ] Code comments in complex sections
- [ ] Database schema documented

### Git
- [ ] Meaningful commit messages
- [ ] Phase tags created (phase-1 through phase-4)
- [ ] Pushed to GitHub
- [ ] No sensitive data in repo (.env files added to .gitignore)

### Testing
- [ ] Tested on multiple browsers (Chrome, Firefox, Safari)
- [ ] Tested on mobile device or mobile browser view
- [ ] All forms submit without errors
- [ ] All links work

---

## GRADING POINT BREAKDOWN

```
Phase 1 (50 pts)
├─ Models: 15 pts
├─ Relationships: 10 pts
├─ Database: 10 pts
├─ CRUD: 10 pts
└─ Code Quality: 5 pts

Phase 2 (60 pts)
├─ Bootstrap: 10 pts
├─ Grid System: 10 pts
├─ Cards: 10 pts
├─ Forms/Buttons: 10 pts
├─ Responsive: 15 pts
└─ Appearance: 5 pts

Phase 3 (60 pts)
├─ HTTP Methods: 15 pts
├─ Status Codes: 10 pts
├─ Statelessness: 10 pts
├─ Idempotency: 15 pts
└─ Documentation: 10 pts

Phase 4 (50 pts)
├─ Plural Nouns: 15 pts
├─ No Verbs: 10 pts
├─ Hierarchies: 10 pts
├─ Endpoints List: 10 pts
└─ Implementation: 5 pts

Bonus (10 pts)
├─ Git History: 5 pts
├─ README: 3 pts
└─ Code Comments: 2 pts

TOTAL: 230 pts
```

---

## HELPFUL RESOURCES

### Framework Docs
- Laravel: https://laravel.com/docs
- Django: https://docs.djangoproject.com
- ASP.NET Core: https://docs.microsoft.com/aspnet/core

### Bootstrap
- Official: https://getbootstrap.com
- Grid: https://getbootstrap.com/docs/5.0/layout/grid/

### REST API Design
- Best Practices: https://restfulapi.net
- HTTP Methods: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods

### Tools
- Curl: https://curl.se
- Postman: https://www.postman.com
- Git: https://git-scm.com

---

## GETTING HELP

1. **Framework Issues**: Check official documentation first
2. **Bootstrap Questions**: See Bootstrap docs, use inspector
3. **REST Concepts**: Review lab manual Phase 3 section
4. **URI Design**: Check API_ENDPOINTS_REFERENCE.md
5. **Git Issues**: Use `git status` and `git log`

---

**Last Updated**: February 2025  
**Total Project Hours**: ~40 hours  
**Difficulty**: Intermediate  
**Prerequisites**: Basic web development knowledge

---
