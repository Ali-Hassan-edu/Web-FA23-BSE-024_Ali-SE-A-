# GRADING RUBRIC & ASSESSMENT GUIDE
## Food Ordering System - Complete Project

---

## OVERALL PROJECT STRUCTURE

This is a **4-phase, 230-point project** divided as follows:
- **Phase 1 (15%)**: Models & Scaffolding - 50 points
- **Phase 2 (20%)**: Bootstrap Integration - 60 points
- **Phase 3 (25%)**: REST Principles & Method Selection - 60 points
- **Phase 4 (20%)**: Resource & URI Design - 50 points
- **Bonus (5%)**: Git History & Documentation - 10 points
- **TOTAL**: 230 points (100%)

---

## PHASE 1: MODELS & VIEW GENERATORS (50 POINTS)
**Duration: 1 week**

### Assessment Breakdown

#### 1. Data Models (15 points)
**What to grade:**
- [ ] MenuItem model exists with all required fields (name, description, category, price, available_status)
- [ ] Order model exists with all required fields (customer_name, order_date, status, total_price)
- [ ] OrderItem model exists with all required fields (order_id FK, menu_item_id FK, quantity, price_at_purchase)
- [ ] Models follow framework conventions (naming, inheritance, etc.)
- [ ] Database column types are appropriate (VARCHAR, DECIMAL, BOOLEAN, DATETIME, etc.)

**Scoring:**
- All 3 models with all fields: 15 points
- 2 models complete, 1 incomplete: 10 points
- Only 1 or 2 models present: 5 points
- No models or serious issues: 0 points

#### 2. Relationships (10 points)
**What to grade:**
- [ ] Order has many OrderItems (one-to-many)
- [ ] MenuItem has many OrderItems (one-to-many)
- [ ] OrderItem belongs to Order (foreign key)
- [ ] OrderItem belongs to MenuItem (foreign key)
- [ ] Relationships are bidirectional where needed
- [ ] ON DELETE CASCADE properly configured for referential integrity

**Scoring:**
- All relationships properly defined with cascades: 10 points
- Most relationships working, minor issues: 7 points
- Some relationships missing or incorrect: 4 points
- Major relationship issues: 0 points

#### 3. Database Setup (10 points)
**What to grade:**
- [ ] Database configured (MySQL, PostgreSQL, or SQLite)
- [ ] Migrations created correctly (Laravel) or models registered (Django)
- [ ] Migrations/migrations run without errors
- [ ] Tables created in database
- [ ] .env or configuration files properly set up
- [ ] Initial data can be inserted successfully

**Scoring:**
- Database fully functional, migrations run: 10 points
- Database works with minor migration issues: 8 points
- Database created but with manual fixes needed: 5 points
- Database not set up or major errors: 0 points

#### 4. CRUD Functionality (10 points)
**What to grade:**
- [ ] Create operations work for all 3 models
- [ ] Read operations work (view all, view single)
- [ ] Update operations work
- [ ] Delete operations work
- [ ] All forms properly route to correct controllers
- [ ] Form submissions persist data to database

**Testing Process:**
1. Create a menu item → Check database
2. Read menu item list → Verify data displays
3. Update menu item → Verify changes saved
4. Delete menu item → Verify removed from database
5. Repeat for Order and OrderItem

**Scoring:**
- All CRUD operations fully functional: 10 points
- 3 operations work, 1 has minor issues: 8 points
- 2 operations work reliably: 5 points
- 1 or fewer operations working: 0 points

#### 5. Code Quality (5 points)
**What to grade:**
- [ ] Code follows framework conventions
- [ ] Comments explain complex logic
- [ ] DRY principle followed (no code duplication)
- [ ] Proper variable/function naming
- [ ] Error handling for invalid input

**Scoring:**
- Professional code with good organization: 5 points
- Mostly clean code with some issues: 3 points
- Working but poorly organized: 1 point
- Messy or hard to follow: 0 points

---

## PHASE 2: BOOTSTRAP INTEGRATION (60 POINTS)
**Duration: 1 week**

### Assessment Breakdown

#### 1. Bootstrap Implementation (10 points)
**What to grade:**
- [ ] Bootstrap 5 CDN links correctly included in layout
- [ ] Bootstrap CSS loaded before custom CSS
- [ ] Bootstrap JS and Popper.js loaded
- [ ] All pages inherit from base layout
- [ ] No bootstrap conflicts with custom styles

**Scoring:**
- Bootstrap fully integrated, no issues: 10 points
- Bootstrap works with minor style conflicts: 8 points
- Bootstrap partially implemented: 5 points
- Bootstrap not properly integrated: 0 points

#### 2. Grid System Usage (10 points)
**What to grade:**
- [ ] container class used correctly
- [ ] row and col-* classes properly implemented
- [ ] 12-column system understood (col-12, col-md-6, col-lg-4, etc.)
- [ ] Responsive breakpoints used (col-sm, col-md, col-lg, col-xl)
- [ ] Nested columns work correctly
- [ ] No hardcoded widths or width: %; using Bootstrap instead

**Scoring:**
- Excellent grid implementation: 10 points
- Grid works well with minor issues: 8 points
- Grid partially implemented: 5 points
- Grid not properly used: 0 points

#### 3. Cards Display (10 points)
**What to grade:**
- [ ] Menu items displayed in Bootstrap Card components
- [ ] Cards show: image (if available), name, description, price
- [ ] Cards responsive (4 per row desktop, 2 tablet, 1 mobile)
- [ ] Action buttons (View, Edit, Delete) on each card
- [ ] Card styling is clean and professional
- [ ] Images properly sized within cards

**Testing:**
- Desktop: 3-4 cards per row
- Tablet (768px): 2 cards per row
- Mobile (320px): 1 card per row, full width

**Scoring:**
- All cards displayed beautifully, responsive: 10 points
- Cards work with minor responsive issues: 8 points
- Cards displayed but poorly styled: 5 points
- Cards not properly implemented: 0 points

#### 4. Forms & Buttons (10 points)
**What to grade:**
- [ ] All input fields use form-control class
- [ ] Form groups properly spaced with form-group
- [ ] Labels associated with inputs (for/id attributes)
- [ ] Buttons use btn, btn-primary, btn-danger classes
- [ ] Button sizes appropriate (btn-sm, btn-lg as needed)
- [ ] Form validation messages display (Bootstrap alerts)
- [ ] Submit buttons clearly labeled

**Scoring:**
- All forms perfectly styled: 10 points
- Forms styled well with minor issues: 8 points
- Forms functional but basic styling: 5 points
- Forms not properly styled: 0 points

#### 5. Responsive Design (15 points)
**What to grade:**
- [ ] Mobile viewport meta tag present
- [ ] Layout adapts to screen sizes
- [ ] Navigation responsive (hamburger menu on mobile)
- [ ] No horizontal scrolling on mobile
- [ ] Text readable on all devices
- [ ] Touch targets appropriate size
- [ ] Images scale properly

**Testing on actual devices/browsers:**
- iPhone 375px width
- iPad 768px width
- Desktop 1200px+ width

**Scoring:**
- Perfect responsive design on all devices: 15 points
- Works well on most devices: 12 points
- Mostly responsive with some issues: 9 points
- Only partially responsive: 5 points
- Not responsive: 0 points

#### 6. Professional Appearance (5 points)
**What to grade:**
- [ ] Color scheme is cohesive
- [ ] Typography is readable and consistent
- [ ] Spacing/padding/margins are consistent
- [ ] No jarring design choices
- [ ] Looks polished, not like default template

**Scoring:**
- Looks professional and polished: 5 points
- Looks good with minor issues: 3 points
- Adequate but generic: 1 point
- Looks poorly designed: 0 points

---

## PHASE 3: REST PRINCIPLES & METHOD SELECTION (60 POINTS)
**Duration: 1.5 weeks**

### Assessment Breakdown

#### 1. HTTP Method Selection (15 points)
**What to grade:**
- [ ] All retrieval operations use GET
- [ ] All create operations use POST
- [ ] All update operations use PUT or PATCH
- [ ] All delete operations use DELETE
- [ ] Form method overrides work (for PUT/DELETE through HTML forms)
- [ ] No incorrect method usage (e.g., GET to modify data)

**Verification:**
- Use browser developer tools to inspect requests
- Check form method and _method hidden fields
- Verify request headers

| Operation | Expected Method | Score if Wrong |
|-----------|-----------------|----------------|
| View menu items | GET | -2 points |
| Create menu item | POST | -3 points |
| Update menu item | PUT | -2 points |
| Delete menu item | DELETE | -3 points |
| View orders | GET | -2 points |
| Create order | POST | -3 points |

**Scoring:**
- All methods correct: 15 points
- 1-2 minor issues: 12 points
- 3-4 incorrect methods: 8 points
- More than 4 issues: 0 points

#### 2. Status Code Handling (10 points)
**What to grade:**
- [ ] 200 OK for successful GET, PUT, PATCH
- [ ] 201 Created for successful POST
- [ ] 204 No Content for successful DELETE
- [ ] 400 Bad Request for invalid input
- [ ] 404 Not Found for non-existent resources
- [ ] 500 Internal Server Error handling

**Verification:**
- Use curl or Postman to check response codes
- Check developer tools Network tab

**Scoring:**
- All status codes correct: 10 points
- Most correct with 1-2 issues: 8 points
- Some correct status codes: 5 points
- Incorrect or missing status codes: 0 points

#### 3. Statelessness Implementation (10 points)
**What to grade:**
- [ ] No session variables stored for clients
- [ ] Authentication uses tokens (JWT or session token)
- [ ] Tokens passed in request headers
- [ ] Each request is independent
- [ ] Server can serve requests in any order

**Documentation Required:**
- Explain how statelessness is implemented
- Show token structure (if JWT)
- Demonstrate request headers with token

**Scoring:**
- Perfect statelessness with clear explanation: 10 points
- Mostly stateless, well documented: 8 points
- Attempts statelessness, partial implementation: 5 points
- Doesn't understand or implement statelessness: 0 points

#### 4. Idempotency Analysis (15 points)
**What to grade:**
- [ ] All GET endpoints marked IDEMPOTENT
- [ ] All POST endpoints marked NOT IDEMPOTENT
- [ ] All PUT endpoints marked IDEMPOTENT
- [ ] All DELETE endpoints marked IDEMPOTENT
- [ ] Reasoning provided for each classification
- [ ] Examples show why non-idempotent operations need care
- [ ] Idempotency implications explained

**Scoring Breakdown:**
- Classification accuracy: 8 points
  - All correct: 8 pts
  - 1-2 errors: 5 pts
  - More errors: 2 pts
- Documentation quality: 7 points
  - Clear examples and reasoning: 7 pts
  - Adequate explanation: 5 pts
  - Minimal explanation: 2 pts

**Scoring:**
- Perfect analysis with clear examples: 15 points
- Mostly accurate with good explanation: 12 points
- Some classifications wrong or unclear: 8 points
- Major errors in analysis: 0 points

#### 5. Documentation (10 points)
**What to grade:**
- [ ] REST_API_DOCUMENTATION.md exists
- [ ] All endpoints documented with methods and URIs
- [ ] Request/response examples provided
- [ ] Query parameters documented
- [ ] Error responses shown
- [ ] curl examples for each endpoint
- [ ] Statelessness section complete
- [ ] Idempotency analysis included

**Scoring:**
- Complete, professional documentation: 10 points
- Most endpoints documented well: 8 points
- Partially documented: 5 points
- Minimal documentation: 2 points
- No documentation: 0 points

---

## PHASE 4: RESOURCE & URI DESIGN (50 POINTS)
**Duration: 1 week**

### Assessment Breakdown

#### 1. Plural Nouns Requirement (15 points)
**What to grade:**
- [ ] ZERO use of singular resource names in URIs
- [ ] All resources are plural: /menu-items, /orders, /customers, /categories
- [ ] No /menuitem, /order, /customer, /category (singular forms)
- [ ] Consistency across all endpoints

**Verification Process:**
- Extract all route definitions from application
- Check each URI path
- Verify plural naming throughout

**Deduction Table:**
- Each singular noun violation: -2 points
- 5+ violations: 0 points

**Scoring:**
- Perfect plural usage throughout: 15 points
- 1 singular error: 13 points
- 2-3 singular errors: 10 points
- 4-5 singular errors: 5 points
- 6+ singular errors: 0 points

#### 2. No Verbs in URIs (10 points)
**What to grade:**
- [ ] ZERO verbs in any URI
- [ ] No /create*, /read*, /update*, /delete*, /get*, /fetch*, /add*
- [ ] No /CreateMenuItem, /DeleteOrder, /GetMenuItems
- [ ] Actions defined by HTTP methods, not URI verbs

**Verification:**
- Scan all routes for action verbs
- Check controller action names don't leak into URIs

**Deduction:**
- Each verb in URI: -2 points
- 5+ verb violations: 0 points

**Scoring:**
- Zero verbs in any URI: 10 points
- 1 minor verb issue: 8 points
- 2-3 verb issues: 5 points
- 4+ verb issues: 0 points

#### 3. Hierarchical Structure (10 points)
**What to grade:**
- [ ] Sub-resources properly nested: /orders/:id/items
- [ ] Hierarchical depth appropriate (2-3 levels max)
- [ ] Relationships clear from URI structure
- [ ] Example: /customers/:id/orders (orders belong to customers)
- [ ] Example: /categories/:id/items (items belong to categories)

**Required Hierarchies:**
- /orders/:id/items (items in order)
- /categories/:id/items (items in category)
- /customers/:id/orders (orders by customer) - if implemented

**Scoring:**
- All hierarchies properly implemented: 10 points
- Most hierarchies correct: 8 points
- Some hierarchies missing: 5 points
- No hierarchical structure: 0 points

#### 4. API Endpoints List (10 points)
**What to grade:**
- [ ] API_ENDPOINTS.md or similar document exists
- [ ] Complete list of all endpoints
- [ ] HTTP method + URI for each endpoint
- [ ] Purpose/description of each endpoint
- [ ] Response codes listed
- [ ] Example requests and responses
- [ ] Organized by resource type

**Scoring:**
- Complete professional documentation: 10 points
- Most endpoints documented: 8 points
- Partially documented: 5 points
- Minimal documentation: 2 points
- Missing documentation: 0 points

#### 5. Code Implementation (5 points)
**What to grade:**
- [ ] All routes implemented with correct URIs
- [ ] Controllers properly handle each route
- [ ] Framework routing configuration correct
- [ ] No 404 errors on documented endpoints
- [ ] Endpoints functional and tested

**Scoring:**
- All endpoints work perfectly: 5 points
- Most endpoints functional: 4 points
- Some endpoints working: 2 points
- Endpoints not implemented: 0 points

---

## BONUS: GIT HISTORY & DOCUMENTATION (10 POINTS)

### Assessment Breakdown

#### 1. Meaningful Git Commits (5 points)
**What to grade:**
- [ ] Commits at least weekly per phase
- [ ] Commit messages descriptive (e.g., "Add MenuItem model and migration")
- [ ] Logical commit structure (not all code in one commit)
- [ ] Phase tags created (git tag phase-1, phase-2, etc.)
- [ ] .gitignore properly configured

**Commit Message Examples:**
- Good: "Add MenuItem model with relationships and migration"
- Bad: "update", "stuff", "final version"

**Scoring:**
- Excellent commit history: 5 points
- Good commits with some improvement needed: 4 points
- Adequate commits: 3 points
- Poor commit history: 1 point
- No meaningful commits: 0 points

#### 2. README.md (3 points)
**What to grade:**
- [ ] Project description
- [ ] Setup instructions (database, migrations)
- [ ] Framework installation steps
- [ ] How to run the application
- [ ] Contact information or notes

**Scoring:**
- Professional README: 3 points
- Adequate README: 2 points
- Minimal README: 1 point
- Missing README: 0 points

#### 3. Overall Documentation (2 points)
**What to grade:**
- [ ] Code comments in complex sections
- [ ] Database schema documented
- [ ] Model relationships documented

**Scoring:**
- Well documented code: 2 points
- Adequate documentation: 1 point
- Missing documentation: 0 points

---

## COMPLETE GRADING SUMMARY

### Points by Phase
| Phase | Component | Points |
|-------|-----------|--------|
| 1 | Models & Scaffolding | 50 |
| 2 | Bootstrap Integration | 60 |
| 3 | REST Principles | 60 |
| 4 | URI Design | 50 |
| Bonus | Git & Documentation | 10 |
| **TOTAL** | | **230** |

### Converting to Letter Grade
- 220-230 points: A (95-100%)
- 207-219 points: A- (90-94%)
- 194-206 points: B+ (85-89%)
- 181-193 points: B (80-84%)
- 168-180 points: B- (75-79%)
- 155-167 points: C+ (70-74%)
- 142-154 points: C (65-69%)
- Below 142: F (<65%)

---

## ASSESSMENT NOTES

### Critical Failures (Automatic 0 for that section)
- Application doesn't run or crashes on startup
- Database not configured or migrations fail
- CRUD operations don't work
- No code submitted to GitHub

### Warning Signs
- Copied code without understanding
- Magic strings or hardcoded values
- SQL injection vulnerabilities
- No error handling
- Security issues (passwords in code)

### Excellence Indicators
- Code is clean and follows conventions
- Thoughtful error handling
- Clear explanations in documentation
- Goes beyond requirements (additional features)
- Professional presentation

---

## RUBRIC FOR INSTRUCTORS

### Grading Process
1. Check if application runs (if not, limited credit possible)
2. Score Phase 1 components (database, models, CRUD)
3. Score Phase 2 components (Bootstrap, responsiveness)
4. Score Phase 3 components (HTTP methods, REST compliance)
5. Score Phase 4 components (URI design, documentation)
6. Award bonus points for excellent Git history

### Deductions
- For Phase 1 issues carrying to later phases: Deduct points in Phase 1, not later
- For broken CRUD: Must fix Phase 1 to pass Phase 2
- For missing endpoints: Cannot achieve full Phase 3/4 grades

### Notes for Instructors
- Students must understand REST principles, not just implement them
- Emphasize that URIs identify resources, HTTP methods define actions
- Statelessness is critical for scalability
- Idempotency understanding prevents data inconsistencies

---

