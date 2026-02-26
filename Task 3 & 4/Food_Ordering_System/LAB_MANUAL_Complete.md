# ONLINE FOOD ORDERING SYSTEM
## Complete Laboratory Manual & Assignment
### Undergraduate Web Development Course

---

## TABLE OF CONTENTS
1. Course Overview & Learning Objectives
2. Project Overview
3. PHASE 1: Models & View Generators (Scaffolding)
4. PHASE 2: Bootstrap Integration
5. PHASE 3: REST Principles & Method Selection
6. PHASE 4: Resource & URI Design
7. Submission Requirements & Grading Rubric
8. Helpful Resources

---

## COURSE OVERVIEW & LEARNING OBJECTIVES

This comprehensive laboratory course teaches fundamental concepts in modern web application development through the construction of a fully functional Online Food Ordering System. Students will progress through four distinct phases, each building upon the previous to create a production-ready web application that adheres to industry best practices.

### Core Learning Outcomes
- Understand and implement MVC (Model-View-Controller) architectural patterns using professional frameworks
- Generate database models and CRUD operations using framework scaffolding tools
- Design responsive user interfaces using Bootstrap's grid system and components
- Implement proper HTTP method selection and RESTful API design principles
- Demonstrate understanding of statelessness in web applications
- Design resource-oriented URIs following REST conventions
- Identify and document idempotent operations in API endpoints

### Framework Options
Students may choose ONE of the following MVC frameworks:
- **Laravel (PHP)** — Recommended for beginners; excellent scaffolding and documentation
- **Django (Python)** — Strong ORM and built-in admin interface
- **ASP.NET Core (C#)** — Enterprise-grade framework with powerful tooling

---

## PROJECT OVERVIEW

The Online Food Ordering System is a three-tier web application where customers browse restaurant menus, place orders, and track their status. This project encompasses all critical aspects of modern web development: data modeling, user interface design, API development, and architectural principles.

### System Requirements

| Feature | Description |
|---------|-------------|
| Menu Management | Administrators can create, read, update, delete (CRUD) menu items with details like name, description, price, and category |
| Order Processing | Customers can place orders, view order history, and track order status |
| Responsive Design | Interface must work seamlessly on desktop, tablet, and mobile devices |
| RESTful API | All operations must conform to REST principles with proper HTTP methods |
| Data Persistence | All data must be stored in a relational database (PostgreSQL, MySQL, or SQLite) |

### Data Models

Your system must include at minimum the following entities:

- **MenuItem**: id, name, description, category, price, available_status
- **Order**: id, customer_name, order_date, status, total_price
- **OrderItem**: id, order_id (FK), menu_item_id (FK), quantity, price_at_purchase
- **Optional: Customer**: id, name, email, phone, address (for enhanced functionality)

---

## PHASE 1: Models & View Generators (Scaffolding)
**Duration: 1 week | Weight: 15% of project grade**

### Learning Objectives
- Generate database models using framework ORM tools
- Set up appropriate database relationships (one-to-many, many-to-many)
- Use scaffolding to auto-generate basic CRUD views
- Understand MVC separation of concerns

### Step-by-Step Instructions

#### 1. Project Setup
1. Choose your MVC framework (Laravel, Django, or ASP.NET Core)
2. Create a new project using the framework's CLI tool
3. Configure database connection (MySQL, PostgreSQL, or SQLite)
4. Initialize version control (git) and create initial commit

#### 2. Define Models

**Laravel: Using Artisan Generator**
```bash
php artisan make:model MenuItem -m
php artisan make:model Order -m
php artisan make:model OrderItem -m
```
- Edit migration files in `database/migrations/` to define table structure
- Define relationships in model classes using Eloquent ORM
- Run: `php artisan migrate`

**Django: Using Django Models**
```bash
python manage.py startapp menu
```
- Define MenuItem, Order, and OrderItem models in `models.py`
- Register models in `admin.py` for Django admin interface
- Run migrations:
  ```bash
  python manage.py makemigrations
  python manage.py migrate
  ```

**ASP.NET Core: Using Entity Framework**
```bash
dotnet new mvc -n FoodOrderingSystem
```
- Define entity classes: MenuItem, Order, OrderItem in Models folder
- Create DbContext derived class
- Run migrations:
  ```bash
  dotnet ef migrations add InitialCreate
  dotnet ef database update
  ```

#### 3. Generate CRUD Scaffolding

**Laravel: Artisan Resource Generator**
```bash
php artisan make:controller MenuItemController --resource
php artisan make:controller OrderController --resource
```
- This creates controllers with index, show, create, store, edit, update, destroy methods
- Create blade templates in `resources/views/menu-items/` and `resources/views/orders/`

**Django: Django Admin & Class-Based Views**
- Use Django's built-in admin interface for initial CRUD operations
- Create views using generic class-based views (ListView, CreateView, UpdateView, DeleteView)
- Generate basic HTML templates using Django's template engine

**ASP.NET Core: Scaffolding Tool**
```bash
dotnet aspnet-codegenerator controller -name MenuItemsController -m MenuItem -dc AppDbContext --useDefaultLayout --referenceScriptLibraries
```
- This auto-generates controller and Razor views for full CRUD

### Deliverables for Phase 1
- A working application with database configured and migrations run
- Three models (MenuItem, Order, OrderItem) with proper relationships defined
- Plain HTML CRUD templates auto-generated by framework scaffolding (no styling yet)
- All CRUD operations functional (Create, Read, Update, Delete for each model)
- Git commits showing progression of work

### Assessment Criteria
- Models correctly represent system requirements (15 points)
- Relationships properly defined (10 points)
- Database migrations run successfully (10 points)
- CRUD operations fully functional (10 points)
- Code organization and comments (5 points)
- **Total: 50 points**

---

## PHASE 2: Bootstrap Integration
**Duration: 1 week | Weight: 20% of project grade**

### Learning Objectives
- Implement Bootstrap framework in existing application
- Use Bootstrap's 12-column grid system for responsive layouts
- Style components using Bootstrap utilities and components
- Create mobile-first responsive designs
- Understand CSS frameworks and component-based design

### Required Bootstrap Components

You **MUST** use the following Bootstrap components throughout your application:

| Component | Usage |
|-----------|-------|
| Navbar | Navigation menu at top of every page with brand name and links |
| Cards | Display menu items with image, name, description, price, and action buttons |
| Grid System | Use container, row, and col classes to create responsive 12-column layouts |
| Forms | Style all input fields, textareas, selects with Bootstrap form classes |
| Buttons | Use btn, btn-primary, btn-danger, etc. for all interactive elements |
| Tables | Responsive tables for displaying orders and menu items lists |
| Alerts | Display success, error, and information messages |
| Modals (Optional) | Confirm delete actions or display item details |

### Step-by-Step Instructions

#### 1. Include Bootstrap in Layout Template
Add Bootstrap CDN links to your base/master layout file. All pages should inherit from this template:
- Add Bootstrap CSS CDN link in `<head>` section
- Add Bootstrap JavaScript CDN link at end of `<body>`
- Add Popper.js dependency (required for some Bootstrap components)

#### 2. Create Responsive Navigation
- Implement navbar with brand name, logo, and navigation links
- Make navbar sticky or fixed for consistent navigation
- Include hamburger menu for mobile devices (Bootstrap handles this automatically)

#### 3. Design Menu Display Page
- Create responsive grid layout using Bootstrap `col-md`, `col-lg` classes
- Display each menu item in a Card component
- Each card must show: image, item name, description, price, and buttons
- Cards should be 3-4 per row on desktop, 1-2 on tablet, 1 on mobile
- Add button for adding item to order and for editing (admin) or deleting

#### 4. Style Forms
- Apply Bootstrap `form-control` class to all input elements
- Use `form-group` div for proper spacing
- Create forms for creating/editing menu items and orders
- Submit buttons should use `btn btn-primary` class

#### 5. Implement Orders Display
- Use Bootstrap table classes for displaying orders
- Make tables responsive with `table-responsive` wrapper
- Display: Order ID, Customer Name, Order Date, Total Price, Status
- Include action buttons for viewing, editing, and deleting orders

### Responsive Design Requirements

Your application **MUST** be fully responsive and tested on:
- Mobile devices (min-width: 320px)
- Tablets (min-width: 768px)
- Desktop computers (min-width: 1200px)

### Deliverables for Phase 2
- All Phase 1 deliverables + Bootstrap styling
- Professional-looking interface using Bootstrap components
- Fully responsive design tested on multiple screen sizes
- All required Bootstrap components implemented
- Consistent styling across all pages
- Git commits documenting styling changes

### Assessment Criteria
- Bootstrap properly integrated (5 points)
- Grid system correctly used (10 points)
- All required components implemented (15 points)
- Responsive design quality (10 points)
- Professional appearance (10 points)
- **Total: 60 points**

---

## PHASE 3: REST Principles & Method Selection
**Duration: 1.5 weeks | Weight: 25% of project grade**

### Learning Objectives
- Understand and apply HTTP methods correctly (GET, POST, PUT, DELETE, PATCH)
- Map user interface actions to appropriate HTTP verbs
- Understand REST architectural constraints including statelessness
- Identify and document idempotent operations
- Design and implement proper request/response handling

### REST Principles Overview

#### 1. Statelessness

Every HTTP request must contain all information needed to understand and process the request. The server does **NOT** store client context between requests.

**Implementation in Your Application:**
- If implementing authentication, use session tokens or JWT (JSON Web Tokens)
- Client must include authentication token in request headers (e.g., `Authorization: Bearer <token>`)
- Each request is independent; server processes request based solely on data provided
- No session variables stored server-side for specific clients

#### 2. HTTP Method Selection

| Method | Purpose | Description |
|--------|---------|-------------|
| GET | Retrieve | Safe and idempotent. Retrieves data without side effects. Never use to modify data. |
| POST | Create | Submits data to create new resource. NOT idempotent (repeated calls create multiple resources). |
| PUT | Replace | Replaces entire resource. Idempotent (repeated calls produce same result). |
| PATCH | Partial Update | Updates part of a resource. Less common; many frameworks use POST or PUT instead. |
| DELETE | Remove | Deletes resource. Idempotent (deleting already-deleted resource returns same result). |

#### 3. Idempotency

An operation is **idempotent** if making the same request multiple times produces the same result as making it once, without unintended side effects.

**Idempotent operations in your Food Ordering System:**
- `GET /menu-items` → Always returns same menu items (with current data)
- `GET /menu-items/:id` → Always returns same item
- `PUT /menu-items/:id` → Update always sets item to same state (idempotent)
- `DELETE /menu-items/:id` → Deleting same item twice has no additional side effects

**NOT idempotent operations:**
- `POST /orders` → Creates new order each time; calling twice creates two orders
- `POST /orders/:id/items` → Adds item each time; calling twice adds two copies

### Implementation Requirements

#### 1. Framework-Specific HTTP Method Routing

**Laravel (routes/web.php): Use Route Resource Definitions**
```php
Route::resource('menu-items', MenuItemController);
```
This automatically maps HTTP methods to controller actions.

**Django (urls.py): Use ViewSets or Explicit Method Handlers**
- Define view methods that handle specific HTTP methods: `get()`, `post()`, `put()`, `delete()`
- Or use REST framework ViewSets with @action decorators

**ASP.NET Core: Use HTTP Method Attributes**
- `[HttpGet]`, `[HttpPost]`, `[HttpPut]`, `[HttpDelete]` attributes on controller actions

#### 2. Form Method Override

HTML forms only natively support GET and POST. For PUT and DELETE, use method override:
- Add hidden input: `<input type="hidden" name="_method" value="PUT">`
- Submit as POST, framework converts to PUT
- Same approach for DELETE operations

#### 3. Request/Response Handling
- All successful operations return appropriate HTTP status codes
- Errors return meaningful status codes (400, 404, 500)
- Redirect to appropriate page after operations
- Display flash messages for operation results

### HTTP Method Mapping for Food Ordering System

| Action | HTTP Method | Endpoint | Idempotent? |
|--------|-------------|----------|------------|
| View all menu items | GET | /menu-items | Yes |
| View single item | GET | /menu-items/:id | Yes |
| Add new menu item | POST | /menu-items | No |
| Edit menu item | PUT/PATCH | /menu-items/:id | Yes |
| Delete menu item | DELETE | /menu-items/:id | Yes |
| View all orders | GET | /orders | Yes |
| View single order | GET | /orders/:id | Yes |
| Create order | POST | /orders | No |
| Update order status | PUT/PATCH | /orders/:id | Yes |
| Cancel order | DELETE | /orders/:id | Yes |

### Documentation Requirements

Create a detailed documentation file (`REST_API_DOCUMENTATION.md`) that includes:

#### 1. Statelessness Explanation
- Explain how your application implements stateless design
- Describe authentication mechanism (if implemented)
- Show examples of how clients pass authentication tokens/credentials with requests

#### 2. Complete API Endpoint Documentation
For **EACH** endpoint, document:
- HTTP Method (GET, POST, PUT, DELETE, PATCH)
- URI/Path
- Purpose
- Request parameters/body
- Response format (success and error)
- Example curl request

#### 3. Idempotency Analysis
- List ALL endpoints
- Mark each as IDEMPOTENT or NOT IDEMPOTENT
- Explain reasoning for each classification
- Provide examples of why non-idempotent operations require special handling

### Deliverables for Phase 3
- All Phase 2 deliverables + REST implementation
- Correct HTTP methods mapped to all UI actions
- REST_API_DOCUMENTATION.md with complete API specification
- Statelessness explanation with concrete examples
- Idempotency classification for all endpoints
- All operations return appropriate HTTP status codes
- Git commits documenting API changes

### Assessment Criteria
- Correct HTTP method selection (10 points)
- Proper status code handling (5 points)
- Statelessness implementation (5 points)
- Idempotency analysis accuracy (10 points)
- Documentation completeness (5 points)
- **Total: 60 points**

---

## PHASE 4: Resource & URI Design
**Duration: 1 week | Weight: 20% of project grade**

### Learning Objectives
- Design resource-oriented URI naming conventions
- Use plural nouns exclusively in URI paths
- Implement hierarchical resource relationships in URIs
- Avoid verbs in URIs (actions defined by HTTP methods)
- Understand REST resource modeling best practices

### REST URI Design Rules

#### RULE 1: Use Plural Nouns (MANDATORY)

All URIs must use plural nouns to represent collections. This is a **STRICT requirement**.

**Correct ✓ (use these)**
- `/menu-items`
- `/orders`
- `/customers`
- `/categories`

**Incorrect ✗ (DO NOT use these)**
- `/menuitem` (singular)
- `/order` (singular)
- `/getMenu` (verb)
- `/createOrder` (verb)
- `/fetchCustomers` (verb)

#### RULE 2: Avoid Verbs in URIs

Actions (create, read, update, delete) are represented by HTTP methods (POST, GET, PUT, DELETE), NOT in the URI. The URI identifies **what** the resource is; the HTTP method defines the action.

**Correct ✓ (use these)**
- `POST /orders` (create order)
- `GET /orders/:id` (read order)
- `PUT /orders/:id` (update order)
- `DELETE /orders/:id` (delete order)

**Incorrect ✗ (DO NOT use these)**
- `/createOrder`
- `/readOrder`
- `/updateOrder`
- `/deleteOrder`
- `/getOrderStatus`

#### RULE 3: Hierarchical Resource Relationships

Use hierarchical paths to represent relationships between resources. This shows how resources are related.

**Examples (for your Food Ordering System)**
- `/customers/5/orders` (all orders for customer 5)
- `/customers/5/orders/12` (order 12 for customer 5)
- `/orders/12/items` (all items in order 12)
- `/menu-items/3/reviews` (all reviews for menu item 3)
- `/categories/5/items` (all items in category 5)

### Complete URI Design for Food Ordering System

| HTTP | URI | Description |
|------|-----|-------------|
| GET | /menu-items | Retrieve all menu items |
| GET | /menu-items/:id | Retrieve specific menu item |
| POST | /menu-items | Create new menu item |
| PUT | /menu-items/:id | Update menu item |
| DELETE | /menu-items/:id | Delete menu item |
| GET | /categories | Retrieve all categories |
| GET | /categories/:id/items | Items in specific category |
| GET | /orders | Retrieve all orders |
| GET | /orders/:id | Retrieve specific order |
| POST | /orders | Create new order |
| PUT | /orders/:id | Update order (change status, etc) |
| DELETE | /orders/:id | Cancel/delete order |
| GET | /orders/:id/items | Get all items in an order |
| POST | /orders/:id/items | Add item to order |
| DELETE | /orders/:id/items/:itemId | Remove item from order |
| GET | /customers | Retrieve all customers |
| GET | /customers/:id/orders | Orders for specific customer |

### URI Design Best Practices

1. **Use Lowercase**: URIs should be lowercase. `/menu-items` NOT `/MenuItems` or `/MENU-ITEMS`
2. **Use Hyphens for Readability**: For multi-word resources, use hyphens: `/menu-items`, `/order-items` NOT `/menuItems` or `/menu_items`
3. **Keep URIs Short and Simple**: Avoid deep nesting. Generally limit to 2-3 levels: `/resources/:id/sub-resources`
4. **Use Query Parameters for Filtering**: For filtering and pagination, use query parameters: `/orders?status=pending&limit=10&offset=0`

### Documentation Deliverable

Create a file called `API_ENDPOINTS.md` with a complete list of all REST API endpoints in your application.

**Example Structure:**
1. List all endpoints with HTTP method and URI
2. Verify each uses plural nouns
3. Verify no verbs in URIs
4. Show hierarchical relationships
5. Include brief description of each endpoint
6. Provide example requests and responses

### Deliverables for Phase 4
- All Phase 3 deliverables + URI redesign
- Complete list of all REST API endpoints
- All URIs follow REST naming conventions (plural, no verbs)
- Hierarchical resource relationships properly implemented
- API_ENDPOINTS.md documentation file
- All routes updated in framework configuration
- Git commits showing URI refactoring

### Assessment Criteria
- All URIs use plural nouns (15 points)
- No verbs in URIs (10 points)
- Hierarchical structure properly implemented (5 points)
- API_ENDPOINTS.md completeness (5 points)
- Code implementation (5 points)
- **Total: 50 points**

---

## SUBMISSION REQUIREMENTS & GRADING RUBRIC

### How to Submit Your Project

Submit all four phases in a single GitHub repository. Organize as follows:

1. Create a GitHub repository named `food-ordering-system`
2. Organize code following your framework's conventions
3. Create `README.md` with project setup instructions
4. Create `DOCUMENTATION.md` with all required documentation
5. Include `REST_API_DOCUMENTATION.md` from Phase 3
6. Include `API_ENDPOINTS.md` from Phase 4
7. Make meaningful git commits throughout the project
8. Tag each phase completion: `git tag phase-1`, `git tag phase-2`, etc.
9. Push to GitHub and submit repository link

### Complete Grading Rubric

| Category | Points | Criteria |
|----------|--------|----------|
| **PHASE 1: Models & Scaffolding** | **50** | Models created, relationships defined, CRUD functional |
| - Data Models | 15 | Correct model structure matching requirements |
| - Relationships | 10 | Foreign keys and relationships properly defined |
| - Database Setup | 10 | Database configured, migrations successful |
| - CRUD Functionality | 10 | All Create, Read, Update, Delete operations work |
| - Code Quality | 5 | Proper organization, comments, conventions |
| **PHASE 2: Bootstrap Integration** | **60** | Professional UI with responsive design |
| - Bootstrap Implementation | 10 | Bootstrap properly integrated, all required components used |
| - Grid System | 10 | 12-column grid properly implemented with col-* classes |
| - Cards Display | 10 | Menu items displayed in styled cards with images, pricing |
| - Forms & Buttons | 10 | All forms styled with Bootstrap classes, buttons functional |
| - Responsive Design | 15 | Works flawlessly on mobile, tablet, desktop |
| - Professional Appearance | 5 | Clean, polished design without generic look |
| **PHASE 3: REST Principles** | **60** | Proper HTTP methods, statelessness, documentation |
| - HTTP Methods | 15 | Correct GET, POST, PUT, DELETE method usage |
| - Status Codes | 10 | Appropriate HTTP status codes in responses |
| - Statelessness | 10 | Clear explanation of how statelessness is achieved |
| - Idempotency Analysis | 15 | All endpoints classified as idempotent/non-idempotent |
| - Documentation | 10 | Complete REST_API_DOCUMENTATION.md with examples |
| **PHASE 4: URI Design** | **50** | Resource-oriented URIs with hierarchy |
| - Plural Nouns | 15 | ALL URIs use plural nouns (e.g., /menu-items) |
| - No Verbs | 10 | Zero verbs in URIs; actions defined by HTTP methods |
| - Hierarchical Structure | 10 | Relationships shown in URI paths |
| - API Endpoints List | 10 | Complete API_ENDPOINTS.md with all endpoints |
| - Code Implementation | 5 | All routes implemented correctly in framework |
| **BONUS: Git & Documentation** | **10** | Meaningful commits, README.md quality |
| **TOTAL POSSIBLE** | **230** | |

### Final Submission Checklist

Before submitting, verify you have completed:

- [ ] GitHub repository created and pushed
- [ ] README.md with setup instructions
- [ ] Database schema documentation
- [ ] REST_API_DOCUMENTATION.md with statelessness & idempotency
- [ ] API_ENDPOINTS.md with complete endpoint list
- [ ] Application runs without errors
- [ ] All CRUD operations functional
- [ ] Responsive design tested on mobile/tablet/desktop
- [ ] All HTML forms use POST method (with _method for PUT/DELETE)
- [ ] All URIs use plural nouns with NO verbs
- [ ] Git commits with meaningful messages

---

## HELPFUL RESOURCES

### Framework Documentation
- **Laravel**: https://laravel.com/docs
- **Django**: https://docs.djangoproject.com
- **ASP.NET Core**: https://docs.microsoft.com/en-us/aspnet/core/

### Bootstrap
- **Bootstrap 5 Documentation**: https://getbootstrap.com/docs/5.0/
- **Grid System**: https://getbootstrap.com/docs/5.0/layout/grid/
- **Components**: https://getbootstrap.com/docs/5.0/components/

### REST API Design
- **RESTful API Design Best Practices**: https://restfulapi.net/
- **HTTP Methods Guide**: https://developer.mozilla.org/en-US/docs/Web/HTTP/Methods
- **REST Architectural Constraints**: https://www.ics.uci.edu/~fielding/pubs/dissertation/rest_arch_style.htm

### General Web Development
- **MDN Web Docs**: https://developer.mozilla.org/
- **Git & GitHub**: https://github.com/resources/articles/github-default-branch

---

**End of Lab Manual**
