# API ENDPOINTS REFERENCE
## Food Ordering System - Phase 4

This document lists ALL REST API endpoints in the Food Ordering System. Students must create a similar document for their implementation.

---

## REST COMPLIANCE VERIFICATION

### Rules Check
- ✓ All URIs use **plural nouns** (no singular forms)
- ✓ **No verbs in URIs** (actions defined by HTTP methods)
- ✓ **Hierarchical structure** for related resources
- ✓ **Lowercase** URIs with hyphens for readability

---

## MENU ITEMS ENDPOINTS

| # | HTTP | URI | Purpose | Response Code |
|---|------|-----|---------|---------------|
| 1 | GET | `/menu-items` | List all menu items | 200 |
| 2 | GET | `/menu-items?category=entrees` | Filter items by category | 200 |
| 3 | GET | `/menu-items?available=true` | Filter available items | 200 |
| 4 | GET | `/menu-items/:id` | Get specific menu item | 200 |
| 5 | POST | `/menu-items` | Create new menu item | 201 |
| 6 | PUT | `/menu-items/:id` | Update menu item | 200 |
| 7 | PATCH | `/menu-items/:id` | Partial update menu item | 200 |
| 8 | DELETE | `/menu-items/:id` | Delete menu item | 204 |

### Breakdown by Resource: Menu Items

#### 1. GET /menu-items
- **Purpose**: Retrieve all menu items
- **Authentication**: No
- **Query Parameters**: category, available, limit, offset
- **Success Response**: 200 OK with array of items
- **Error Response**: 400 Bad Request

#### 2. GET /menu-items?category=entrees
- **Purpose**: Retrieve items filtered by category
- **Authentication**: No
- **Query Parameters**: category (required), limit, offset
- **Success Response**: 200 OK with filtered array
- **Error Response**: 400 Bad Request

#### 3. GET /menu-items?available=true
- **Purpose**: Retrieve only available items
- **Authentication**: No
- **Query Parameters**: available (required), limit, offset
- **Success Response**: 200 OK with available items
- **Error Response**: 400 Bad Request

#### 4. GET /menu-items/:id
- **Purpose**: Get a specific menu item by ID
- **Authentication**: No
- **Path Parameters**: id (required)
- **Success Response**: 200 OK with item details
- **Error Response**: 404 Not Found

#### 5. POST /menu-items
- **Purpose**: Create a new menu item
- **Authentication**: Yes (Admin)
- **Request Body**: name, description, category, price, available_status
- **Success Response**: 201 Created with new item
- **Error Response**: 400 Bad Request, 401 Unauthorized

#### 6. PUT /menu-items/:id
- **Purpose**: Completely update a menu item
- **Authentication**: Yes (Admin)
- **Path Parameters**: id (required)
- **Request Body**: name, description, category, price, available_status (all required)
- **Success Response**: 200 OK with updated item
- **Error Response**: 404 Not Found, 400 Bad Request

#### 7. PATCH /menu-items/:id
- **Purpose**: Partially update a menu item
- **Authentication**: Yes (Admin)
- **Path Parameters**: id (required)
- **Request Body**: Any of (name, description, category, price, available_status)
- **Success Response**: 200 OK with updated item
- **Error Response**: 404 Not Found, 400 Bad Request

#### 8. DELETE /menu-items/:id
- **Purpose**: Delete a menu item
- **Authentication**: Yes (Admin)
- **Path Parameters**: id (required)
- **Success Response**: 204 No Content
- **Error Response**: 404 Not Found

---

## CATEGORIES ENDPOINTS

| # | HTTP | URI | Purpose | Response Code |
|---|------|-----|---------|---------------|
| 9 | GET | `/categories` | List all categories | 200 |
| 10 | GET | `/categories/:id` | Get specific category | 200 |
| 11 | GET | `/categories/:id/items` | Get items in category | 200 |
| 12 | POST | `/categories` | Create new category | 201 |
| 13 | PUT | `/categories/:id` | Update category | 200 |
| 14 | DELETE | `/categories/:id` | Delete category | 204 |

### Breakdown by Resource: Categories

#### 9. GET /categories
- **Purpose**: List all food categories
- **Authentication**: No
- **Query Parameters**: limit, offset
- **Success Response**: 200 OK with array of categories
- **Example Response**:
  ```json
  [
    { "id": 1, "name": "Appetizers" },
    { "id": 2, "name": "Entrees" },
    { "id": 3, "name": "Desserts" }
  ]
  ```

#### 10. GET /categories/:id
- **Purpose**: Get a specific category
- **Authentication**: No
- **Path Parameters**: id (required)
- **Success Response**: 200 OK with category details
- **Error Response**: 404 Not Found

#### 11. GET /categories/:id/items
- **Purpose**: Get all menu items in a specific category (hierarchical)
- **Authentication**: No
- **Path Parameters**: id (required)
- **Query Parameters**: limit, offset, available
- **Success Response**: 200 OK with array of menu items
- **Example URL**: GET `/categories/1/items` → Returns all appetizer items

#### 12. POST /categories
- **Purpose**: Create new category
- **Authentication**: Yes (Admin)
- **Request Body**: name (required)
- **Success Response**: 201 Created
- **Error Response**: 400 Bad Request

#### 13. PUT /categories/:id
- **Purpose**: Update category
- **Authentication**: Yes (Admin)
- **Path Parameters**: id (required)
- **Request Body**: name (required)
- **Success Response**: 200 OK
- **Error Response**: 404 Not Found, 400 Bad Request

#### 14. DELETE /categories/:id
- **Purpose**: Delete category
- **Authentication**: Yes (Admin)
- **Path Parameters**: id (required)
- **Success Response**: 204 No Content
- **Error Response**: 404 Not Found

---

## ORDERS ENDPOINTS

| # | HTTP | URI | Purpose | Response Code |
|---|------|-----|---------|---------------|
| 15 | GET | `/orders` | List all orders | 200 |
| 16 | GET | `/orders?status=pending` | Filter orders by status | 200 |
| 17 | GET | `/orders/:id` | Get specific order | 200 |
| 18 | POST | `/orders` | Create new order | 201 |
| 19 | PUT | `/orders/:id` | Update order | 200 |
| 20 | DELETE | `/orders/:id` | Cancel order | 204 |

### Breakdown by Resource: Orders

#### 15. GET /orders
- **Purpose**: List all orders
- **Authentication**: No (ideally optional with filtering by own orders)
- **Query Parameters**: limit, offset, sort_by
- **Success Response**: 200 OK with array of orders
- **Pagination**: Include count, total, per_page fields

#### 16. GET /orders?status=pending
- **Purpose**: Filter orders by status
- **Authentication**: No
- **Query Parameters**: status (required: pending, preparing, ready, delivered, cancelled)
- **Success Response**: 200 OK with filtered orders
- **Example**: GET `/orders?status=ready` → Returns all ready orders

#### 17. GET /orders/:id
- **Purpose**: Get a specific order with all its items
- **Authentication**: No
- **Path Parameters**: id (required)
- **Success Response**: 200 OK with order details including items
- **Error Response**: 404 Not Found

#### 18. POST /orders
- **Purpose**: Create a new order
- **Authentication**: No (customer)
- **Request Body**: customer_name (required), status (optional), total_price (required)
- **Success Response**: 201 Created with new order
- **Error Response**: 400 Bad Request, 422 Unprocessable Entity
- **Note**: This is NOT idempotent - repeated calls create multiple orders

#### 19. PUT /orders/:id
- **Purpose**: Update an existing order (typically status change)
- **Authentication**: Yes
- **Path Parameters**: id (required)
- **Request Body**: customer_name, status, total_price (all required)
- **Success Response**: 200 OK with updated order
- **Error Response**: 404 Not Found, 400 Bad Request
- **Note**: This IS idempotent - multiple identical calls produce same result

#### 20. DELETE /orders/:id
- **Purpose**: Cancel an order
- **Authentication**: Yes
- **Path Parameters**: id (required)
- **Success Response**: 204 No Content
- **Error Response**: 404 Not Found
- **Note**: This IS idempotent - second delete still results in no order

---

## ORDER ITEMS ENDPOINTS (Hierarchical)

| # | HTTP | URI | Purpose | Response Code |
|---|------|-----|---------|---------------|
| 21 | GET | `/orders/:id/items` | Get all items in order | 200 |
| 22 | GET | `/orders/:id/items/:itemId` | Get specific item in order | 200 |
| 23 | POST | `/orders/:id/items` | Add item to order | 201 |
| 24 | PUT | `/orders/:id/items/:itemId` | Update item quantity | 200 |
| 25 | DELETE | `/orders/:id/items/:itemId` | Remove item from order | 204 |

### Breakdown by Resource: Order Items (Hierarchical)

#### 21. GET /orders/:id/items
- **Purpose**: Get all items in a specific order (hierarchical relationship)
- **Authentication**: No
- **Path Parameters**: order_id (required)
- **Query Parameters**: limit, offset
- **Success Response**: 200 OK with array of items in that order
- **Example**: GET `/orders/5/items` → Returns all items in order #5

#### 22. GET /orders/:id/items/:itemId
- **Purpose**: Get a specific item within a specific order
- **Authentication**: No
- **Path Parameters**: order_id (required), item_id (required)
- **Success Response**: 200 OK with item details
- **Error Response**: 404 Not Found
- **Example**: GET `/orders/5/items/101` → Returns item 101 from order 5

#### 23. POST /orders/:id/items
- **Purpose**: Add a menu item to an existing order
- **Authentication**: Yes
- **Path Parameters**: order_id (required)
- **Request Body**: menu_item_id (required), quantity (required), price_at_purchase (required)
- **Success Response**: 201 Created with new order item
- **Error Response**: 404 Not Found (order or menu item), 400 Bad Request
- **Note**: NOT idempotent - repeated calls add duplicate items

#### 24. PUT /orders/:id/items/:itemId
- **Purpose**: Update item quantity in an order
- **Authentication**: Yes
- **Path Parameters**: order_id (required), item_id (required)
- **Request Body**: quantity (required), price_at_purchase (required)
- **Success Response**: 200 OK with updated item
- **Error Response**: 404 Not Found, 400 Bad Request
- **Note**: IS idempotent - multiple identical calls produce same result

#### 25. DELETE /orders/:id/items/:itemId
- **Purpose**: Remove a specific item from an order
- **Authentication**: Yes
- **Path Parameters**: order_id (required), item_id (required)
- **Success Response**: 204 No Content
- **Error Response**: 404 Not Found
- **Example**: DELETE `/orders/5/items/101` → Removes item 101 from order 5
- **Note**: IS idempotent - second delete still results in item not being in order

---

## CUSTOMERS ENDPOINTS (Optional Enhancement)

| # | HTTP | URI | Purpose | Response Code |
|---|------|-----|---------|---------------|
| 26 | GET | `/customers` | List all customers | 200 |
| 27 | GET | `/customers/:id` | Get specific customer | 200 |
| 28 | GET | `/customers/:id/orders` | Get customer's orders | 200 |
| 29 | POST | `/customers` | Create new customer | 201 |
| 30 | PUT | `/customers/:id` | Update customer | 200 |
| 31 | DELETE | `/customers/:id` | Delete customer | 204 |

### Breakdown by Resource: Customers (Optional)

#### 26. GET /customers
- **Purpose**: List all customers
- **Authentication**: Yes (Admin)
- **Query Parameters**: limit, offset, search
- **Success Response**: 200 OK with array of customers

#### 27. GET /customers/:id
- **Purpose**: Get a specific customer's details
- **Authentication**: Yes
- **Path Parameters**: id (required)
- **Success Response**: 200 OK with customer details
- **Error Response**: 404 Not Found

#### 28. GET /customers/:id/orders
- **Purpose**: Get all orders for a specific customer (hierarchical)
- **Authentication**: Yes
- **Path Parameters**: customer_id (required)
- **Query Parameters**: limit, offset, status
- **Success Response**: 200 OK with array of customer's orders
- **Example**: GET `/customers/3/orders` → Returns all orders from customer 3
- **Note**: This demonstrates hierarchical resource relationships

#### 29-31: POST, PUT, DELETE /customers
- Similar patterns to menu items and orders

---

## SUMMARY: IDEMPOTENCY TABLE

| Endpoint | Method | Idempotent | Why |
|----------|--------|-----------|-----|
| /menu-items | GET | YES | Always returns same data |
| /menu-items | POST | NO | Creates new item each time |
| /menu-items/:id | GET | YES | Returns same item |
| /menu-items/:id | PUT | YES | Sets same state each time |
| /menu-items/:id | DELETE | YES | Result is same (item deleted) |
| /categories | GET | YES | Returns same categories |
| /categories/:id/items | GET | YES | Returns same items in category |
| /orders | GET | YES | Returns current orders |
| /orders | POST | NO | Creates new order each time |
| /orders/:id | GET | YES | Returns same order |
| /orders/:id | PUT | YES | Sets same state each time |
| /orders/:id | DELETE | YES | Result is same (order deleted) |
| /orders/:id/items | GET | YES | Returns same items in order |
| /orders/:id/items | POST | NO | Adds duplicate item each time |
| /orders/:id/items/:itemId | DELETE | YES | Result is same (item removed) |

---

## URI DESIGN COMPLIANCE CHECKLIST

- [x] All resource names are **plural** (menu-items, orders, categories, items, customers)
- [x] **No verbs** in URIs (no create, delete, update, get, etc.)
- [x] **Hierarchical structure** for related resources (orders/:id/items, categories/:id/items, customers/:id/orders)
- [x] **Lowercase** URIs with hyphens for compound words (menu-items, order-items)
- [x] HTTP methods define the action (GET=read, POST=create, PUT=update, DELETE=delete)
- [x] Consistent naming conventions across all endpoints
- [x] Query parameters for filtering and pagination (?status=pending, ?limit=10)

---

## TOTAL ENDPOINT COUNT

- Menu Items: 8 endpoints
- Categories: 6 endpoints  
- Orders: 6 endpoints
- Order Items (Hierarchical): 5 endpoints
- Customers (Optional): 6 endpoints

**Total: 31 endpoints** (25 required + 6 optional)

Each endpoint must be implemented and tested according to REST principles.

---
