# QuickBite REST API Documentation
## Stage 3 — HTTP Methods, Statelessness & Idempotency

---

## SECTION 1: STATELESS DESIGN

### What Stateless Means
A REST API is *stateless* when the server doesn't hold onto any information about the client between requests. Every request must include all the context needed to process it: identity, intent, and data.

This is the opposite of traditional session-based web apps where the server stores "who is logged in." With stateless APIs, the client carries its own identity with each call, typically as a token in the request header.

### Why It Matters
- **Scalability**: Multiple server instances can handle requests without sharing session state
- **Reliability**: No session expiry issues between requests
- **Simplicity**: Servers are easier to reason about when they have no memory between calls

### How QuickBite Implements Statelessness

Every admin action (creating/modifying dishes or updating orders) requires a JWT (JSON Web Token) sent in the `Authorization` header. The token encodes who the user is, so the server never needs to look up session data.

**Example — Updating an Order's Status:**

```http
PUT /customer-orders/7 HTTP/1.1
Host: quickbite.local
Authorization: Bearer eyJhbGciOiJIUzI1NiJ9.eyJ1c2VyX2lkIjoxfQ.abc123
Content-Type: application/json

{
  "buyer_name": "Ayesha Khan",
  "order_status": "in_kitchen",
  "amount_due": 1250.00
}
```

**Server Response:**

```http
HTTP/1.1 200 OK
Content-Type: application/json

{
  "id": 7,
  "buyer_name": "Ayesha Khan",
  "order_status": "in_kitchen",
  "amount_due": "1250.00",
  "placed_at": "2026-02-26T09:00:00Z"
}
```

The server processed this purely from the token + request body. No session lookup occurred.

---

## SECTION 2: FULL API ENDPOINT REFERENCE

### Base URL: `http://localhost:8000`

---

### DISHES

---

#### GET /dishes
Retrieves the full list of dishes in the catalog.

**Authentication:** Not required

**Query Parameters:**

| Parameter | Type | Description |
|-----------|------|-------------|
| dish_type | string | Filter by type: `starters`, `mains`, `sweets`, `drinks` |
| available | boolean | `true` = show only available dishes |
| limit | integer | Max results per page (default: 20) |
| offset | integer | Number of records to skip (default: 0) |

**Example Request:**
```bash
curl -X GET "http://localhost:8000/dishes?dish_type=mains&available=true" \
  -H "Accept: application/json"
```

**Success Response — 200 OK:**
```json
{
  "total": 8,
  "data": [
    {
      "id": 1,
      "title": "Beef Biryani",
      "description": "Slow-cooked rice with marinated beef and whole spices",
      "dish_type": "mains",
      "unit_price": "850.00",
      "is_available": true,
      "added_at": "2026-01-15T11:00:00Z"
    },
    {
      "id": 2,
      "title": "Chicken Karahi",
      "description": "Wok-cooked chicken in a spiced tomato gravy",
      "dish_type": "mains",
      "unit_price": "750.00",
      "is_available": true,
      "added_at": "2026-01-16T09:30:00Z"
    }
  ]
}
```

---

#### GET /dishes/:id
Fetches one dish by its ID.

**Authentication:** Not required

**Path Parameters:**
- `id` (required) — The integer ID of the dish

**Example Request:**
```bash
curl -X GET http://localhost:8000/dishes/1 \
  -H "Accept: application/json"
```

**Success Response — 200 OK:**
```json
{
  "id": 1,
  "title": "Beef Biryani",
  "description": "Slow-cooked rice with marinated beef and whole spices",
  "dish_type": "mains",
  "unit_price": "850.00",
  "is_available": true,
  "added_at": "2026-01-15T11:00:00Z"
}
```

**Error Response — 404 Not Found:**
```json
{
  "error": "Dish not found",
  "code": 404
}
```

---

#### POST /dishes
Creates a new dish in the catalog.

**Authentication:** Required (Admin token)

**Request Body:**

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| title | string | Yes | Max 200 chars |
| description | string | Yes | |
| dish_type | string | Yes | One of: starters, mains, sweets, drinks |
| unit_price | number | Yes | Must be ≥ 0 |
| is_available | boolean | No | Defaults to `true` |

**Example Request:**
```bash
curl -X POST http://localhost:8000/dishes \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Gulab Jamun",
    "description": "Soft milk-solid dumplings soaked in rosewater syrup",
    "dish_type": "sweets",
    "unit_price": 150,
    "is_available": true
  }'
```

**Success Response — 201 Created:**
```json
{
  "id": 12,
  "title": "Gulab Jamun",
  "description": "Soft milk-solid dumplings soaked in rosewater syrup",
  "dish_type": "sweets",
  "unit_price": "150.00",
  "is_available": true,
  "added_at": "2026-02-26T14:00:00Z"
}
```

**Error Response — 422 Unprocessable Entity:**
```json
{
  "errors": {
    "title": ["The title field is required."],
    "unit_price": ["The unit price must be a number."]
  }
}
```

---

#### PUT /dishes/:id
Replaces an existing dish with new data. All fields must be provided.

**Authentication:** Required (Admin)

**Example Request:**
```bash
curl -X PUT http://localhost:8000/dishes/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -d '{
    "title": "Beef Biryani (Family Size)",
    "description": "Large portion of slow-cooked biryani for 2-3 people",
    "dish_type": "mains",
    "unit_price": 1400,
    "is_available": true
  }'
```

**Success Response — 200 OK:**
```json
{
  "id": 1,
  "title": "Beef Biryani (Family Size)",
  "unit_price": "1400.00",
  "modified_at": "2026-02-26T14:10:00Z"
}
```

---

#### DELETE /dishes/:id
Permanently removes a dish from the catalog.

**Authentication:** Required (Admin)

**Example Request:**
```bash
curl -X DELETE http://localhost:8000/dishes/12 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Success Response — 204 No Content:**
```
(empty body)
```

**Error Response — 404 Not Found:**
```json
{
  "error": "Dish not found",
  "code": 404
}
```

---

### CUSTOMER ORDERS

---

#### GET /customer-orders
Returns all orders, with optional filtering.

**Authentication:** Not required

**Query Parameters:**

| Parameter | Description |
|-----------|-------------|
| order_status | Filter by status: `waiting`, `in_kitchen`, `out_for_delivery`, `completed`, `voided` |
| buyer_name | Search by buyer name (partial match) |
| limit | Results per page |
| offset | Pagination offset |

**Example Request:**
```bash
curl -X GET "http://localhost:8000/customer-orders?order_status=waiting" \
  -H "Accept: application/json"
```

**Success Response — 200 OK:**
```json
{
  "total": 3,
  "data": [
    {
      "id": 1,
      "buyer_name": "Hamza Raza",
      "placed_at": "2026-02-26T10:00:00Z",
      "order_status": "waiting",
      "amount_due": "1600.00",
      "lines": [
        { "dish_id": 1, "qty": 2, "locked_price": "850.00" }
      ]
    }
  ]
}
```

---

#### GET /customer-orders/:id
Returns one order with all its line items.

**Example Request:**
```bash
curl -X GET http://localhost:8000/customer-orders/1
```

**Success Response — 200 OK:**
```json
{
  "id": 1,
  "buyer_name": "Hamza Raza",
  "placed_at": "2026-02-26T10:00:00Z",
  "order_status": "waiting",
  "amount_due": "1600.00",
  "lines": [
    {
      "id": 101,
      "dish_id": 1,
      "dish": { "id": 1, "title": "Beef Biryani", "unit_price": "850.00" },
      "qty": 2,
      "locked_price": "850.00"
    }
  ]
}
```

---

#### POST /customer-orders
Places a new customer order.

**Authentication:** Not required (public endpoint)

**Example Request:**
```bash
curl -X POST http://localhost:8000/customer-orders \
  -H "Content-Type: application/json" \
  -d '{
    "buyer_name": "Sara Ahmed",
    "order_status": "waiting",
    "amount_due": 900
  }'
```

**Success Response — 201 Created:**
```json
{
  "id": 15,
  "buyer_name": "Sara Ahmed",
  "placed_at": "2026-02-26T15:00:00Z",
  "order_status": "waiting",
  "amount_due": "900.00"
}
```

> **Note:** This endpoint is NOT idempotent. Sending the same request twice creates two separate orders.

---

#### PUT /customer-orders/:id
Updates an order (typically to change its status).

**Example Request:**
```bash
curl -X PUT http://localhost:8000/customer-orders/15 \
  -H "Content-Type: application/json" \
  -d '{
    "buyer_name": "Sara Ahmed",
    "order_status": "in_kitchen",
    "amount_due": 900
  }'
```

**Success Response — 200 OK:**
```json
{
  "id": 15,
  "buyer_name": "Sara Ahmed",
  "order_status": "in_kitchen",
  "amount_due": "900.00",
  "updated_at": "2026-02-26T15:10:00Z"
}
```

---

#### DELETE /customer-orders/:id
Cancels (removes) an order.

**Example Request:**
```bash
curl -X DELETE http://localhost:8000/customer-orders/15 \
  -H "Authorization: Bearer YOUR_TOKEN"
```

**Success — 204 No Content**

---

### ORDER LINES (Hierarchical)

---

#### GET /customer-orders/:id/lines
Returns all dish lines within a given order.

```bash
curl -X GET http://localhost:8000/customer-orders/1/lines
```

**Success — 200 OK:**
```json
[
  { "id": 101, "dish_id": 1, "qty": 2, "locked_price": "850.00" },
  { "id": 102, "dish_id": 4, "qty": 1, "locked_price": "200.00" }
]
```

---

#### POST /customer-orders/:id/lines
Adds a dish line to an existing order.

```bash
curl -X POST http://localhost:8000/customer-orders/1/lines \
  -H "Content-Type: application/json" \
  -d '{ "dish_id": 3, "qty": 1, "locked_price": 150 }'
```

**Success — 201 Created:**
```json
{ "id": 103, "customer_order_id": 1, "dish_id": 3, "qty": 1, "locked_price": "150.00" }
```

> **Note:** NOT idempotent. Calling this twice adds the same dish twice.

---

#### DELETE /customer-orders/:id/lines/:lineId
Removes a specific line from an order.

```bash
curl -X DELETE http://localhost:8000/customer-orders/1/lines/103
```

**Success — 204 No Content**

---

## SECTION 3: IDEMPOTENCY ANALYSIS

### Definition
An API call is **idempotent** if repeating it any number of times results in the same system state as running it just once — with no unintended duplicates or side effects.

### Full Endpoint Table

| Method | Endpoint | Idempotent | Reasoning |
|--------|----------|-----------|-----------|
| GET | /dishes | **YES** | Reading data never changes state |
| POST | /dishes | **NO** | Each call inserts a new dish row |
| GET | /dishes/:id | **YES** | Same dish returned every time |
| PUT | /dishes/:id | **YES** | Calling with identical data leaves the record unchanged |
| DELETE | /dishes/:id | **YES** | The dish is gone after the first call; second call has same end state |
| GET | /customer-orders | **YES** | Retrieval only |
| POST | /customer-orders | **NO** | Each call creates a distinct order |
| GET | /customer-orders/:id | **YES** | Same order returned every time |
| PUT | /customer-orders/:id | **YES** | Repeated updates produce the same result |
| DELETE | /customer-orders/:id | **YES** | End result: order doesn't exist |
| GET | /customer-orders/:id/lines | **YES** | Read-only |
| POST | /customer-orders/:id/lines | **NO** | Each call appends another line |
| DELETE | /customer-orders/:id/lines/:lineId | **YES** | End result: line is absent |

### Illustrated Examples

#### Non-Idempotent: Placing Two Orders
```
First call:
POST /customer-orders
{ "buyer_name": "Hamza", "amount_due": 850 }
→ Creates Order #20

Second call (identical):
POST /customer-orders
{ "buyer_name": "Hamza", "amount_due": 850 }
→ Creates Order #21  ← DIFFERENT OUTCOME!
```
Conclusion: The same request produced a different resource. **Not idempotent.**

#### Idempotent: Updating the Same Order Twice
```
First call:
PUT /customer-orders/20
{ "buyer_name": "Hamza", "order_status": "completed", "amount_due": 850 }
→ Order #20 status = "completed"

Second call (identical):
PUT /customer-orders/20
{ "buyer_name": "Hamza", "order_status": "completed", "amount_due": 850 }
→ Order #20 status = "completed"  ← SAME OUTCOME
```
Conclusion: No difference between one call and many. **Idempotent.**

#### Idempotent: Deleting a Record That's Already Gone
```
First call:
DELETE /dishes/12
→ 204 No Content (dish removed)

Second call:
DELETE /dishes/12
→ 404 Not Found

Final state both times: dish #12 does not exist. **Idempotent.**
```

---

## HTTP STATUS CODE QUICK GUIDE

| Code | Meaning | When to Use |
|------|---------|------------|
| 200 | OK | Successful GET, PUT |
| 201 | Created | Successful POST |
| 204 | No Content | Successful DELETE |
| 400 | Bad Request | Malformed input |
| 401 | Unauthorized | No or invalid token |
| 403 | Forbidden | Valid token but not permitted |
| 404 | Not Found | Resource doesn't exist |
| 409 | Conflict | Duplicate or state conflict |
| 422 | Unprocessable | Validation failure with detail |
| 500 | Server Error | Unexpected backend failure |

---

*End of QuickBite REST API Documentation*
