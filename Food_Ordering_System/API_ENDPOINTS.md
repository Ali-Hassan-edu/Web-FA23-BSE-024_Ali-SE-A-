# QuickBite — Complete API Endpoints Reference
## Stage 4: RESTful URI Design

---

## URI DESIGN PRINCIPLES — QUICK CHECK

Before listing endpoints, verify against these rules:

| Rule | Status |
|------|--------|
| All resource names are plural nouns | ✅ |
| No action verbs appear in any URI | ✅ |
| Nested paths show resource relationships | ✅ |
| All URIs use lowercase with hyphens | ✅ |
| HTTP methods define the action (not the URL) | ✅ |

---

## DISHES ENDPOINTS

| # | Method | URI | Description | Status Code |
|---|--------|-----|-------------|------------|
| 1 | GET | `/dishes` | List all dishes | 200 |
| 2 | GET | `/dishes?dish_type=mains` | Filter by dish type | 200 |
| 3 | GET | `/dishes?is_available=true` | Show only available dishes | 200 |
| 4 | GET | `/dishes/:id` | Get one dish by ID | 200 |
| 5 | POST | `/dishes` | Add a new dish | 201 |
| 6 | PUT | `/dishes/:id` | Replace a dish entirely | 200 |
| 7 | PATCH | `/dishes/:id` | Update one or more dish fields | 200 |
| 8 | DELETE | `/dishes/:id` | Remove a dish | 204 |

### Detailed Breakdown — Dishes

#### 1. GET /dishes
- **Purpose:** Retrieve the full dish catalog
- **Auth required:** No
- **Supported filters:** `dish_type`, `is_available`, `limit`, `offset`
- **Success:** 200 with array of dish objects

#### 2. GET /dishes?dish_type=mains
- **Purpose:** Return only dishes of a particular type
- **Auth required:** No
- **Query param:** `dish_type` — one of: `starters`, `mains`, `sweets`, `drinks`
- **Success:** 200 with filtered array

#### 3. GET /dishes?is_available=true
- **Purpose:** Return only dishes currently offered
- **Auth required:** No
- **Query param:** `is_available=true`
- **Success:** 200 with available dishes only

#### 4. GET /dishes/:id
- **Purpose:** Retrieve one specific dish
- **Auth required:** No
- **Path param:** `id` (integer, required)
- **Success:** 200 with dish object
- **Error:** 404 if dish not found

#### 5. POST /dishes
- **Purpose:** Add a new dish to the catalog
- **Auth required:** Yes (Admin)
- **Request body:** `title`, `description`, `dish_type`, `unit_price`, `is_available`
- **Success:** 201 with newly created dish
- **Error:** 422 on validation failure

#### 6. PUT /dishes/:id
- **Purpose:** Fully replace a dish record (all fields required)
- **Auth required:** Yes (Admin)
- **Path param:** `id` (required)
- **Request body:** All fields required
- **Success:** 200 with updated dish
- **Error:** 404 if not found, 422 on validation error

#### 7. PATCH /dishes/:id
- **Purpose:** Update specific fields of a dish
- **Auth required:** Yes (Admin)
- **Path param:** `id` (required)
- **Request body:** Any subset of dish fields
- **Success:** 200 with updated dish

#### 8. DELETE /dishes/:id
- **Purpose:** Permanently remove a dish
- **Auth required:** Yes (Admin)
- **Path param:** `id` (required)
- **Success:** 204 (no body)
- **Error:** 404 if not found

---

## DISH TYPES ENDPOINTS

| # | Method | URI | Description | Status Code |
|---|--------|-----|-------------|------------|
| 9 | GET | `/dish-types` | List all dish types | 200 |
| 10 | GET | `/dish-types/:id` | Get a specific type | 200 |
| 11 | GET | `/dish-types/:id/dishes` | All dishes in that type | 200 |
| 12 | POST | `/dish-types` | Create a new type | 201 |
| 13 | PUT | `/dish-types/:id` | Update a type | 200 |
| 14 | DELETE | `/dish-types/:id` | Remove a type | 204 |

### Detailed Breakdown — Dish Types

#### 9. GET /dish-types
- **Purpose:** Get all available food categories
- **Auth required:** No
- **Success:** 200 with list of types
- **Example response:**
  ```json
  [
    { "id": 1, "label": "Starters" },
    { "id": 2, "label": "Mains" },
    { "id": 3, "label": "Sweets" },
    { "id": 4, "label": "Drinks" }
  ]
  ```

#### 10. GET /dish-types/:id
- **Purpose:** Retrieve one type by ID
- **Auth required:** No
- **Error:** 404 if not found

#### 11. GET /dish-types/:id/dishes
- **Purpose:** Retrieve all dishes belonging to a type (hierarchical)
- **Auth required:** No
- **Example:** `GET /dish-types/2/dishes` → all Mains

#### 12–14: POST, PUT, DELETE /dish-types
- Same pattern as dishes — create, replace, and remove types
- All modifications require Admin auth

---

## CUSTOMER ORDERS ENDPOINTS

| # | Method | URI | Description | Status Code |
|---|--------|-----|-------------|------------|
| 15 | GET | `/customer-orders` | List all orders | 200 |
| 16 | GET | `/customer-orders?order_status=waiting` | Filter by status | 200 |
| 17 | GET | `/customer-orders/:id` | Get one order | 200 |
| 18 | POST | `/customer-orders` | Place a new order | 201 |
| 19 | PUT | `/customer-orders/:id` | Update an order | 200 |
| 20 | DELETE | `/customer-orders/:id` | Cancel an order | 204 |

### Detailed Breakdown — Customer Orders

#### 15. GET /customer-orders
- **Purpose:** Retrieve all placed orders
- **Auth required:** No
- **Supported filters:** `order_status`, `buyer_name`, `limit`, `offset`
- **Success:** 200 with array of orders including lines

#### 16. GET /customer-orders?order_status=waiting
- **Purpose:** Show only orders matching a given status
- **Statuses:** `waiting`, `in_kitchen`, `out_for_delivery`, `completed`, `voided`
- **Example:** `GET /customer-orders?order_status=in_kitchen`

#### 17. GET /customer-orders/:id
- **Purpose:** View a complete order with all its dish lines
- **Auth required:** No
- **Error:** 404 if not found

#### 18. POST /customer-orders
- **Purpose:** Submit a new customer order
- **Auth required:** No (customer-facing)
- **Request body:** `buyer_name`, `order_status`, `amount_due`
- **Success:** 201 with new order
- **⚠ Not idempotent** — two identical requests create two separate orders

#### 19. PUT /customer-orders/:id
- **Purpose:** Update order details (e.g., mark as `in_kitchen`)
- **Auth required:** Yes
- **Request body:** `buyer_name`, `order_status`, `amount_due` (all required)
- **Success:** 200 with updated order
- **✅ Idempotent** — sending the same update twice has no extra effect

#### 20. DELETE /customer-orders/:id
- **Purpose:** Cancel and remove an order
- **Auth required:** Yes
- **Success:** 204
- **✅ Idempotent** — the end state (order doesn't exist) is the same on repeat

---

## ORDER LINES ENDPOINTS (Nested Under Orders)

| # | Method | URI | Description | Status Code |
|---|--------|-----|-------------|------------|
| 21 | GET | `/customer-orders/:id/lines` | All dish lines in an order | 200 |
| 22 | GET | `/customer-orders/:id/lines/:lineId` | One specific line | 200 |
| 23 | POST | `/customer-orders/:id/lines` | Add a dish line to an order | 201 |
| 24 | PUT | `/customer-orders/:id/lines/:lineId` | Update a line's quantity | 200 |
| 25 | DELETE | `/customer-orders/:id/lines/:lineId` | Remove a line from the order | 204 |

### Detailed Breakdown — Order Lines

#### 21. GET /customer-orders/:id/lines
- **Purpose:** Return all dish lines belonging to a specific order
- **Example:** `GET /customer-orders/3/lines` → all items in order #3

#### 22. GET /customer-orders/:id/lines/:lineId
- **Purpose:** Return one specific dish line within one order
- **Example:** `GET /customer-orders/3/lines/101`

#### 23. POST /customer-orders/:id/lines
- **Purpose:** Add a dish to an existing order
- **Request body:** `dish_id`, `qty`, `locked_price`
- **Success:** 201
- **⚠ Not idempotent** — calling twice adds the same dish twice

#### 24. PUT /customer-orders/:id/lines/:lineId
- **Purpose:** Change the quantity of a specific line item
- **Request body:** `qty`, `locked_price`
- **Success:** 200
- **✅ Idempotent**

#### 25. DELETE /customer-orders/:id/lines/:lineId
- **Purpose:** Remove one dish from an order
- **Success:** 204
- **✅ Idempotent** — item is absent either way

---

## BUYERS ENDPOINTS (Optional Enhancement)

| # | Method | URI | Description | Status Code |
|---|--------|-----|-------------|------------|
| 26 | GET | `/buyers` | List all buyers | 200 |
| 27 | GET | `/buyers/:id` | Get one buyer | 200 |
| 28 | GET | `/buyers/:id/customer-orders` | Orders belonging to a buyer | 200 |
| 29 | POST | `/buyers` | Register a new buyer | 201 |
| 30 | PUT | `/buyers/:id` | Update buyer info | 200 |
| 31 | DELETE | `/buyers/:id` | Remove a buyer | 204 |

#### 28. GET /buyers/:id/customer-orders
- **Purpose:** Returns all orders placed by a specific buyer (hierarchical relationship)
- **Example:** `GET /buyers/5/customer-orders` → orders from buyer #5
- **Filters:** `order_status`, `limit`, `offset`

---

## IDEMPOTENCY SUMMARY TABLE

| Endpoint | Method | Idempotent | Why |
|----------|--------|-----------|-----|
| /dishes | GET | **YES** | Pure read |
| /dishes | POST | **NO** | New row on each call |
| /dishes/:id | GET | **YES** | Pure read |
| /dishes/:id | PUT | **YES** | Same state on repeat |
| /dishes/:id | DELETE | **YES** | Already absent = same result |
| /dish-types | GET | **YES** | Pure read |
| /dish-types/:id/dishes | GET | **YES** | Pure read |
| /customer-orders | GET | **YES** | Pure read |
| /customer-orders | POST | **NO** | New order on each call |
| /customer-orders/:id | GET | **YES** | Pure read |
| /customer-orders/:id | PUT | **YES** | Same state on repeat |
| /customer-orders/:id | DELETE | **YES** | Already absent = same result |
| /customer-orders/:id/lines | GET | **YES** | Pure read |
| /customer-orders/:id/lines | POST | **NO** | Appends new line each time |
| /customer-orders/:id/lines/:lineId | DELETE | **YES** | Already absent = same result |

---

## URI COMPLIANCE CHECKLIST

- [x] All resource names are **plural** (`dishes`, `customer-orders`, `dish-types`, `buyers`, `lines`)
- [x] **Zero verbs** in any URI path (actions are defined by HTTP methods)
- [x] **Hierarchical nesting** where appropriate (`/customer-orders/:id/lines`, `/buyers/:id/customer-orders`)
- [x] All URIs are **lowercase with hyphens** (`customer-orders`, `dish-types`)
- [x] **Query parameters** used for filtering (`?order_status=waiting`, `?dish_type=mains`)
- [x] HTTP method defines the operation — URI identifies the resource

---

## ENDPOINT COUNT SUMMARY

| Resource Group | Count |
|----------------|-------|
| Dishes | 8 |
| Dish Types | 6 |
| Customer Orders | 6 |
| Order Lines (nested) | 5 |
| Buyers (optional) | 6 |
| **Total** | **31** (25 required + 6 optional) |

---

*End of QuickBite API Endpoints Reference*
