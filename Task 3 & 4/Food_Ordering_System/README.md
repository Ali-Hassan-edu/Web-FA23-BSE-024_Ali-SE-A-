# 🍔 Online Food Ordering System

> A complete undergraduate web development project built across 4 phases — covering MVC frameworks, Bootstrap 5, REST API design, and URI architecture.

---

## 📦 Package Overview

| Item | Detail |
|------|--------|
| **Total Documents** | 8 |
| **Total Points** | 230 |
| **Estimated Time** | 40–50 hours |
| **REST Endpoints** | 31 (min. 25 required) |
| **Frameworks** | Laravel, Django, ASP.NET Core |
| **Version** | 1.0 — February 2025 |

---

## 🚀 Quick Start

### For Instructors
1. Start with `PACKAGE_INDEX_MASTER.md` for the full course structure
2. Set up GitHub Classroom for assignment distribution
3. Share `LAB_MANUAL_Complete.md` with students
4. Import `GRADING_RUBRIC_COMPLETE.md` into your grading system (max 230 pts)

### For Students
1. Read `STUDENT_QUICK_REFERENCE.md` *(15 min)*
2. Read `LAB_MANUAL_Complete.md` Phase 1 *(30 min)*
3. Choose your framework: Laravel, Django, or ASP.NET Core
4. Follow the framework-specific starter code
5. Build phase by phase

---

## 🗂️ Package Contents

| File | Best For | Size |
|------|----------|------|
| `PACKAGE_INDEX_MASTER.md` | Instructors planning the course | ~15 KB |
| `LAB_MANUAL_Complete.md` | Students doing the project | ~24 KB |
| `STUDENT_QUICK_REFERENCE.md` | Quick lookups during development | ~12 KB |
| `GRADING_RUBRIC_COMPLETE.md` | Grading and scoring | ~18 KB |
| `REST_API_DOCUMENTATION_EXAMPLE.md` | Understanding REST principles | ~14 KB |
| `API_ENDPOINTS_REFERENCE.md` | URI design guidance (31 endpoints) | ~14 KB |
| `LARAVEL_STARTER_CODE.md` | Laravel students in Phase 1 | ~20 KB |
| `DJANGO_STARTER_CODE.md` | Django students in Phase 1 | ~20 KB |

---

## 📋 Four Phases

### Phase 1 — Models & Scaffolding *(Week 1 · 50 pts)*
- Create `MenuItem`, `Order`, `OrderItem` models
- Set up database with proper relationships
- Generate CRUD scaffolding
- **Deliverable:** Functional but unstyled application

### Phase 2 — Bootstrap Integration *(Week 2 · 60 pts)*
- Integrate Bootstrap 5 framework
- Implement 12-column grid system
- Use Cards, Navbar, Forms, Tables
- Test on mobile (320px), tablet (768px), desktop (1200px+)
- **Deliverable:** Professional, responsive interface

### Phase 3 — REST Principles *(Week 3 · 60 pts)*
- Map UI actions to HTTP methods (`GET`, `POST`, `PUT`, `DELETE`)
- Implement statelessness (tokens in headers)
- Classify endpoints by idempotency
- Write comprehensive REST API documentation
- **Deliverable:** Well-documented REST API

### Phase 4 — URI Design *(Week 4 · 50 pts)*
- Use plural nouns only: `/menu-items`, `/orders`, `/customers`
- No verbs in URIs — no `/create`, `/delete`, `/get`
- Implement hierarchical resources: `/orders/:id/items`
- **Deliverable:** RESTful API endpoints (25+ minimum)

### Bonus — Git & Documentation *(+10 pts)*
- Meaningful commits and phase tags
- Professional README
- Code comments on complex logic

---

## 🛠️ Tech Stack

**Required:**
- Framework: Laravel, Django, or ASP.NET Core
- Bootstrap 5
- Git + GitHub
- Database: PostgreSQL, MySQL, or SQLite
- IDE: VS Code, PhpStorm, PyCharm, or Visual Studio

**Recommended:**
- curl or Postman (API testing)
- DBeaver (database GUI)
- GitHub Desktop

**Optional:**
- Docker, Lighthouse, Prettier

---

## ⚡ Critical Rules

### URI Design
```
✅ GET    /menu-items
✅ POST   /orders
✅ PUT    /orders/:id
✅ DELETE /customers/:id
✅ GET    /orders/:id/items

❌ GET    /menuitem          ← singular
❌ POST   /createOrder       ← verb
❌ DELETE /order/:id/deleteItem  ← verb
```

### HTTP Methods
| Method | Purpose | Idempotent? |
|--------|---------|-------------|
| `GET` | Retrieve data | ✅ Yes |
| `POST` | Create new resource | ❌ No |
| `PUT` | Replace entire resource | ✅ Yes |
| `DELETE` | Remove resource | ✅ Yes |

---

## ✅ Pre-Submission Checklist

**Application**
- [ ] Runs without errors
- [ ] All CRUD operations work
- [ ] Forms submit and persist data

**Design**
- [ ] Bootstrap properly integrated
- [ ] Responsive on mobile (320px), tablet (768px), desktop (1200px+)
- [ ] No horizontal scroll on mobile

**REST API**
- [ ] Correct HTTP methods used throughout
- [ ] Status codes: 200, 201, 204, 400, 404
- [ ] Statelessness demonstrated

**URI Design**
- [ ] Zero singular nouns in URIs
- [ ] Zero verbs in URIs
- [ ] Hierarchical structure (`/orders/:id/items`)
- [ ] 25+ endpoints documented

**Version Control**
- [ ] `README.md` with setup instructions
- [ ] `REST_API_DOCUMENTATION.md` complete
- [ ] `API_ENDPOINTS.md` with all endpoints
- [ ] Phase tags: `phase-1`, `phase-2`, `phase-3`, `phase-4`
- [ ] Pushed to GitHub

---

## 📊 Grading Summary

| Phase | Points | Weight |
|-------|--------|--------|
| Phase 1 — Models | 50 | 15% |
| Phase 2 — Bootstrap | 60 | 20% |
| Phase 3 — REST API | 60 | 25% |
| Phase 4 — URI Design | 50 | 20% |
| Bonus — Git & Docs | +10 | 5% |
| **Total** | **230** | **100%** |

---

## 🔗 Official Docs

- [Laravel](https://laravel.com/docs) · [Django](https://docs.djangoproject.com) · [ASP.NET Core](https://docs.microsoft.com/aspnet/core)
- [Bootstrap 5](https://getbootstrap.com/docs) · [REST API Guide](https://restfulapi.net) · [MDN HTTP](https://developer.mozilla.org/en-US/docs/Web/HTTP)
- [Git Docs](https://git-scm.com/doc) · [GitHub Classroom](https://classroom.github.com)

---

## 🧠 Common Issues

| Problem | Solution |
|---------|----------|
| App won't start | Check DB config, run migrations |
| Bootstrap not loading | Check CDN links, verify internet |
| CRUD failing | Debug model relationships and controller |
| Responsive broken | Use DevTools (F12), test on real devices |

---

## 📝 License

Designed for **educational use** in undergraduate CS and web development programs.
- ✅ Use as-is for your course
- ✅ Modify to match your curriculum
- ✅ Share with colleagues
- ✅ Adapt for different frameworks

---
