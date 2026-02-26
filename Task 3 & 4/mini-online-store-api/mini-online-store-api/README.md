# 🛒 Mini Online Store API
### Express.js Lab Project — Scalable MVC Architecture

---

## 📁 Folder Structure

```
mini-online-store-api/
├── app.js                  ← Entry point, server setup, middleware mounting
├── package.json
├── routes/
│   ├── products.js         ← GET /products
│   └── users.js            ← GET /users/:id | POST /users
├── controllers/
│   ├── productController.js ← Business logic for products
│   └── userController.js    ← Business logic for users
└── middleware/
    ├── logger.js            ← Logs every request (global)
    └── auth.js              ← Token check (applied to /users only)
```

---

## 🚀 Setup & Run

```bash
# 1. Install dependencies
npm install

# 2. Start server (production)
npm start

# 3. Start with auto-reload (development)
npm run dev
```

Server runs at: **http://localhost:3000**

---

## 🔌 API Endpoints

### Public Routes (no token needed)

| Method | Endpoint      | Description                       |
|--------|---------------|-----------------------------------|
| GET    | `/`           | Welcome message + route overview  |
| GET    | `/products`   | Get all products                  |

**Optional Query Params for `/products`:**
```
GET /products?inStock=true
GET /products?category=Electronics
GET /products?inStock=true&category=Electronics
```

---

### Protected Routes (requires header: `x-auth-token: mysecrettoken`)

| Method | Endpoint       | Description                     |
|--------|----------------|---------------------------------|
| GET    | `/users/:id`   | Get a user by ID (req.params)   |
| POST   | `/users`       | Create a new user (req.body)    |

**POST /users — Request Body Example:**
```json
{
  "name": "Dan Brown",
  "email": "dan@store.com",
  "role": "customer"
}
```

---

## 🧪 Testing with curl

```bash
# Get all products
curl http://localhost:3000/products

# Filter products
curl "http://localhost:3000/products?inStock=true&category=Electronics"

# Get user by ID (requires auth header)
curl -H "x-auth-token: mysecrettoken" http://localhost:3000/users/1

# Create a user
curl -X POST http://localhost:3000/users \
  -H "Content-Type: application/json" \
  -H "x-auth-token: mysecrettoken" \
  -d '{"name":"Dan Brown","email":"dan@store.com"}'

# Test 401 Unauthorized (no token)
curl http://localhost:3000/users/1

# Test 404 Not Found
curl http://localhost:3000/somefakeroute
```

---

## 🍽️ The Restaurant Analogy

| Code Concept         | Restaurant Analogy                                      |
|----------------------|---------------------------------------------------------|
| `app.js`             | The Restaurant Manager — sets up all the rules         |
| `express.Router()`   | Section Waiter — handles one area of the restaurant    |
| `logger` middleware  | The Host — logs every guest at the door                |
| `auth` middleware    | The Bouncer — guards the VIP lounge                    |
| Controller functions | The Chef — actually prepares the dish (response)       |
| `next()`             | Passing the order slip to the next staff member        |
| 404 handler          | "Sorry, that dish isn't on our menu"                   |

---

## 💡 Key Concepts Learned

1. **MVC Pattern** — Routes, Controllers, and Middleware are separated by responsibility
2. **express.Router()** — Modular routing for scalable, maintainable code
3. **Middleware Chain** — Global vs. route-specific middleware application
4. **req.params** — Dynamic URL segments (`/users/:id`)
5. **req.body** — Receiving JSON data in POST requests
6. **req.query** — Optional filter parameters (`?inStock=true`)
7. **Error Handling** — Centralized 404 and 500 error middleware
