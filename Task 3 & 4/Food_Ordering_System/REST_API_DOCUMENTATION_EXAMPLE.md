# REST API DOCUMENTATION TEMPLATE
## Food Ordering System - Phase 3

This document demonstrates how students should document their REST API following REST principles. Students must create a similar document for their chosen framework (Laravel, Django, or ASP.NET Core).

---

## 1. STATELESSNESS IMPLEMENTATION

### Overview
Statelessness is a core REST principle ensuring that every HTTP request contains all necessary information for the server to process it. The server maintains no session state for specific clients.

### Our Implementation

#### Authentication Token Mechanism
In a production system, we would implement JWT (JSON Web Tokens) or session tokens:

```
Client Request:
GET /orders/5 HTTP/1.1
Host: api.example.com
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
Content-Type: application/json

Server Response:
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 5,
  "customer_name": "John Doe",
  "order_date": "2025-02-26T10:30:00Z",
  "status": "pending",
  "total_price": 45.99
}
```

#### Key Points
- **Token in Headers**: Authentication token is passed in `Authorization` header with each request
- **No Server-Side Sessions**: Server doesn't store client state in memory
- **Self-Contained Requests**: Each request has all information needed (token + data)
- **Scalability**: Enables horizontal scaling since any server instance can process the request

#### Practical Example
When updating an order status, the client must:
1. Include their authentication token in the request header
2. Include the order ID in the URL path
3. Include the new status in the request body

The server processes this request without relying on any previously stored session data about this client.

---

## 2. COMPLETE API ENDPOINT DOCUMENTATION

### Menu Items Endpoints

#### GET /menu-items
**Purpose**: Retrieve all menu items

**HTTP Method**: GET

**Authentication**: Not required for public viewing

**Request Example**:
```bash
curl -X GET http://localhost:3000/menu-items \
  -H "Content-Type: application/json"
```

**Query Parameters** (optional):
- `category`: Filter by category (appetizers, entrees, desserts, beverages)
- `available`: Filter by availability (true/false)
- `limit`: Results per page (default: 20)
- `offset`: Pagination offset (default: 0)

**Successful Response (200 OK)**:
```json
{
  "count": 15,
  "data": [
    {
      "id": 1,
      "name": "Caesar Salad",
      "description": "Fresh romaine with parmesan and croutons",
      "category": "appetizers",
      "price": 8.99,
      "available_status": true,
      "created_at": "2025-02-20T14:30:00Z"
    },
    {
      "id": 2,
      "name": "Grilled Salmon",
      "description": "Atlantic salmon with seasonal vegetables",
      "category": "entrees",
      "price": 22.50,
      "available_status": true,
      "created_at": "2025-02-21T09:15:00Z"
    }
  ]
}
```

---

#### GET /menu-items/:id
**Purpose**: Retrieve a specific menu item

**HTTP Method**: GET

**Request Example**:
```bash
curl -X GET http://localhost:3000/menu-items/1 \
  -H "Content-Type: application/json"
```

**Successful Response (200 OK)**:
```json
{
  "id": 1,
  "name": "Caesar Salad",
  "description": "Fresh romaine with parmesan and croutons",
  "category": "appetizers",
  "price": 8.99,
  "available_status": true,
  "created_at": "2025-02-20T14:30:00Z"
}
```

**Error Response (404 Not Found)**:
```json
{
  "error": "Menu item not found",
  "status": 404
}
```

---

#### POST /menu-items
**Purpose**: Create a new menu item

**HTTP Method**: POST

**Authentication**: Required (Admin)

**Request Example**:
```bash
curl -X POST http://localhost:3000/menu-items \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Chocolate Cake",
    "description": "Decadent chocolate cake with frosting",
    "category": "desserts",
    "price": 6.99,
    "available_status": true
  }'
```

**Request Body**:
```json
{
  "name": "string (required)",
  "description": "string (required)",
  "category": "string (required)",
  "price": "number (required)",
  "available_status": "boolean (optional, defaults to true)"
}
```

**Successful Response (201 Created)**:
```json
{
  "id": 20,
  "name": "Chocolate Cake",
  "description": "Decadent chocolate cake with frosting",
  "category": "desserts",
  "price": 6.99,
  "available_status": true,
  "created_at": "2025-02-26T12:00:00Z"
}
```

**Error Response (400 Bad Request)**:
```json
{
  "errors": {
    "name": ["Name is required"],
    "price": ["Price must be a number"]
  }
}
```

---

#### PUT /menu-items/:id
**Purpose**: Update an entire menu item

**HTTP Method**: PUT

**Authentication**: Required (Admin)

**Request Example**:
```bash
curl -X PUT http://localhost:3000/menu-items/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "name": "Caesar Salad with Chicken",
    "description": "Fresh romaine with grilled chicken",
    "category": "entrees",
    "price": 14.99,
    "available_status": true
  }'
```

**Successful Response (200 OK)**:
```json
{
  "id": 1,
  "name": "Caesar Salad with Chicken",
  "description": "Fresh romaine with grilled chicken",
  "category": "entrees",
  "price": 14.99,
  "available_status": true,
  "updated_at": "2025-02-26T12:05:00Z"
}
```

---

#### DELETE /menu-items/:id
**Purpose**: Delete a menu item

**HTTP Method**: DELETE

**Authentication**: Required (Admin)

**Request Example**:
```bash
curl -X DELETE http://localhost:3000/menu-items/1 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Successful Response (204 No Content)**:
```
[Empty response body]
```

---

### Orders Endpoints

#### GET /orders
**Purpose**: Retrieve all orders

**HTTP Method**: GET

**Query Parameters**:
- `status`: Filter by status (pending, preparing, ready, delivered, cancelled)
- `customer_name`: Filter by customer name
- `limit`: Results per page
- `offset`: Pagination offset

**Request Example**:
```bash
curl -X GET "http://localhost:3000/orders?status=pending&limit=10" \
  -H "Content-Type: application/json"
```

**Successful Response (200 OK)**:
```json
{
  "count": 5,
  "data": [
    {
      "id": 1,
      "customer_name": "John Doe",
      "order_date": "2025-02-26T10:30:00Z",
      "status": "pending",
      "total_price": 45.99,
      "items": [
        {
          "id": 1,
          "menu_item_id": 2,
          "quantity": 2,
          "price_at_purchase": 22.50
        }
      ]
    }
  ]
}
```

---

#### GET /orders/:id
**Purpose**: Retrieve a specific order with all items

**HTTP Method**: GET

**Request Example**:
```bash
curl -X GET http://localhost:3000/orders/1 \
  -H "Content-Type: application/json"
```

**Successful Response (200 OK)**:
```json
{
  "id": 1,
  "customer_name": "John Doe",
  "order_date": "2025-02-26T10:30:00Z",
  "status": "pending",
  "total_price": 45.99,
  "items": [
    {
      "id": 101,
      "menu_item_id": 2,
      "menu_item": {
        "id": 2,
        "name": "Grilled Salmon",
        "price": 22.50
      },
      "quantity": 2,
      "price_at_purchase": 22.50
    }
  ]
}
```

---

#### POST /orders
**Purpose**: Create a new order

**HTTP Method**: POST

**Request Example**:
```bash
curl -X POST http://localhost:3000/orders \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "Jane Smith",
    "status": "pending",
    "total_price": 35.98
  }'
```

**Request Body**:
```json
{
  "customer_name": "string (required)",
  "status": "string (optional, defaults to pending)",
  "total_price": "number (required)"
}
```

**Successful Response (201 Created)**:
```json
{
  "id": 10,
  "customer_name": "Jane Smith",
  "order_date": "2025-02-26T13:45:00Z",
  "status": "pending",
  "total_price": 35.98
}
```

---

#### PUT /orders/:id
**Purpose**: Update an order (typically to change status)

**HTTP Method**: PUT

**Request Example**:
```bash
curl -X PUT http://localhost:3000/orders/1 \
  -H "Content-Type: application/json" \
  -d '{
    "customer_name": "John Doe",
    "status": "ready",
    "total_price": 45.99
  }'
```

**Successful Response (200 OK)**:
```json
{
  "id": 1,
  "customer_name": "John Doe",
  "order_date": "2025-02-26T10:30:00Z",
  "status": "ready",
  "total_price": 45.99,
  "updated_at": "2025-02-26T13:50:00Z"
}
```

---

#### DELETE /orders/:id
**Purpose**: Cancel an order

**HTTP Method**: DELETE

**Request Example**:
```bash
curl -X DELETE http://localhost:3000/orders/1
```

**Successful Response (204 No Content)**:
```
[Empty response body]
```

---

### Hierarchical Order Items Endpoints

#### GET /orders/:id/items
**Purpose**: Retrieve all items in a specific order

**HTTP Method**: GET

**Request Example**:
```bash
curl -X GET http://localhost:3000/orders/1/items \
  -H "Content-Type: application/json"
```

**Successful Response (200 OK)**:
```json
[
  {
    "id": 101,
    "menu_item_id": 2,
    "quantity": 2,
    "price_at_purchase": 22.50
  },
  {
    "id": 102,
    "menu_item_id": 5,
    "quantity": 1,
    "price_at_purchase": 18.99
  }
]
```

---

#### POST /orders/:id/items
**Purpose**: Add an item to an existing order

**HTTP Method**: POST

**Request Example**:
```bash
curl -X POST http://localhost:3000/orders/1/items \
  -H "Content-Type: application/json" \
  -d '{
    "menu_item_id": 3,
    "quantity": 1,
    "price_at_purchase": 12.99
  }'
```

**Successful Response (201 Created)**:
```json
{
  "id": 103,
  "order_id": 1,
  "menu_item_id": 3,
  "quantity": 1,
  "price_at_purchase": 12.99
}
```

---

#### DELETE /orders/:id/items/:itemId
**Purpose**: Remove an item from an order

**HTTP Method**: DELETE

**Request Example**:
```bash
curl -X DELETE http://localhost:3000/orders/1/items/101
```

**Successful Response (204 No Content)**:
```
[Empty response body]
```

---

## 3. IDEMPOTENCY CLASSIFICATION

### Definition
An operation is **idempotent** if calling it multiple times produces the same result as calling it once.

### Complete Endpoint Classification

| Endpoint | Method | Idempotent | Reason |
|----------|--------|-----------|--------|
| /menu-items | GET | **YES** | Returns same data regardless of call frequency |
| /menu-items | POST | **NO** | Each call creates a new unique item |
| /menu-items/:id | GET | **YES** | Returns same item data |
| /menu-items/:id | PUT | **YES** | Replaces item with same values each time |
| /menu-items/:id | DELETE | **YES** | Second delete returns 404 but has same effect |
| /orders | GET | **YES** | Returns current orders (data changes but operation is idempotent) |
| /orders | POST | **NO** | Each call creates a new unique order |
| /orders/:id | GET | **YES** | Returns same order data |
| /orders/:id | PUT | **YES** | Replaces order with same values each time |
| /orders/:id | DELETE | **YES** | Second delete returns 404 but has same effect |
| /orders/:id/items | GET | **YES** | Returns same items for that order |
| /orders/:id/items | POST | **NO** | Each call adds a duplicate item |
| /orders/:id/items/:itemId | DELETE | **YES** | Second delete returns 404 but has same effect |

### Critical Non-Idempotent Examples

#### Example 1: Creating Duplicate Orders
```
First Call:
POST /orders
{ "customer_name": "John", "total_price": 50.00 }
Response: Order ID 1 created

Second Call (Identical):
POST /orders
{ "customer_name": "John", "total_price": 50.00 }
Response: Order ID 2 created (DIFFERENT RESULT!)

Issue: Same request creates different resource. NOT IDEMPOTENT.
```

#### Example 2: Adding Duplicate Items
```
First Call:
POST /orders/1/items
{ "menu_item_id": 5, "quantity": 1, "price_at_purchase": 12.99 }
Response: OrderItem ID 101 created

Second Call (Identical):
POST /orders/1/items
{ "menu_item_id": 5, "quantity": 1, "price_at_purchase": 12.99 }
Response: OrderItem ID 102 created (DUPLICATE!)

Issue: Same request creates another item. NOT IDEMPOTENT.
```

### Idempotent Examples

#### Example 1: Updating Same Values
```
First Call:
PUT /menu-items/1
{ "name": "Caesar Salad", "price": 8.99 }
Response: Item updated with ID 1

Second Call (Identical):
PUT /menu-items/1
{ "name": "Caesar Salad", "price": 8.99 }
Response: Item still has same values

Result: Same state after each call. IDEMPOTENT.
```

#### Example 2: Deleting Already-Deleted Resource
```
First Call:
DELETE /menu-items/5
Response: 204 No Content (Successfully deleted)

Second Call (Identical):
DELETE /menu-items/5
Response: 404 Not Found (Already deleted)

Result: Final state is same (item doesn't exist). IDEMPOTENT.
```

---

## HTTP STATUS CODE REFERENCE

### Success Responses

| Status | Code | Usage |
|--------|------|-------|
| OK | 200 | Successful GET, PUT, PATCH requests returning data |
| Created | 201 | Successful POST request creating new resource |
| No Content | 204 | Successful DELETE request or PUT with no response |
| Accepted | 202 | Request accepted for processing (async operations) |

### Redirect Responses

| Status | Code | Usage |
|--------|------|-------|
| Moved Permanently | 301 | Resource permanently moved |
| Found | 302 | Temporary redirect |
| Not Modified | 304 | Cached response still valid |

### Client Error Responses

| Status | Code | Usage |
|--------|------|-------|
| Bad Request | 400 | Invalid parameters, malformed JSON, validation errors |
| Unauthorized | 401 | Authentication required or failed |
| Forbidden | 403 | Authenticated but lacks permission |
| Not Found | 404 | Resource doesn't exist |
| Conflict | 409 | Request conflicts with current state |
| Unprocessable Entity | 422 | Validation failed with detailed errors |

### Server Error Responses

| Status | Code | Usage |
|--------|------|-------|
| Internal Server Error | 500 | Unexpected server error |
| Not Implemented | 501 | Endpoint not implemented |
| Service Unavailable | 503 | Server temporarily unavailable |

---

## CONCLUSION

This documentation demonstrates:
1. **Statelessness**: Every request includes authentication token; server maintains no session state
2. **Complete API Reference**: All endpoints documented with requests and responses
3. **Idempotency Analysis**: Clear classification of idempotent vs. non-idempotent operations

Students must create similar documentation for their implementation.

---
