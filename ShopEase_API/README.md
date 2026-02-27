# 🛍️ ShopEase Catalog API

> A production-style **Express.js REST API** demonstrating **MVC Architecture**, custom **Middleware**, and modular **Express Router** — built as a backend lab project.

---

## 📁 Project Structure

```
ShopEase_API/
├── server.js                        ← Main entry point & server listener
├── package.json                     ← Dependencies & npm scripts
│
├── routes/
│   ├── catalog.js                   ← Public routes   → GET /catalog
│   └── accounts.js                  ← Protected routes → /accounts
│
├── controllers/
│   ├── catalogController.js         ← Business logic for catalog items
│   └── accountController.js         ← Business logic for user accounts
│
└── middleware/
    ├── logger.js                    ← Logs every incoming request (global)
    └── auth.js                      ← API key guard (accounts only)
```

---

## ⚙️ Prerequisites

Make sure the following are installed on your machine:

- [Node.js](https://nodejs.org) `v16` or higher
- npm (comes bundled with Node.js)

Verify your installation:
```bash
node -v
npm -v
```

---

## 🚀 Getting Started

**1. Install dependencies**
```bash
npm install
```

**2. Start the development server**
```bash
npm run dev
```

**3. Or start in production mode**
```bash
npm start
```

The server will start at:
```
http://localhost:4000
```

---

## 🔌 API Endpoints

### 🟢 Public — No Authentication Required

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/` | API index & health check |
| `GET` | `/catalog` | Retrieve all catalog items |
| `GET` | `/catalog?available=true` | Filter by availability |
| `GET` | `/catalog?category=Computing` | Filter by category |
| `GET` | `/catalog?maxPrice=2000` | Filter by maximum price |

**Example — Get all available Computing items:**
```
GET /catalog?category=Computing&available=true
```

---

### 🔒 Protected — API Key Required

All `/accounts` routes require the following request header:

```
x-api-key: shopease-secret-2026
```

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/accounts/:id` | Get a single account by ID |
| `POST` | `/accounts` | Register a new account |

**Example — Get account with ID 2:**
```
GET /accounts/2
Header → x-api-key: shopease-secret-2026
```

**Example — Create a new account:**
```
POST /accounts
Header → x-api-key: shopease-secret-2026
Content-Type: application/json

{
  "fullName": "Sara Ahmed",
  "email": "sara@example.com",
  "role": "customer"
}
```

---

## ❌ Error Responses

| Scenario | HTTP Status | Trigger |
|----------|-------------|---------|
| No API key provided | `401 Unauthorized` | Missing `x-api-key` header |
| Wrong API key | `403 Forbidden` | Invalid key value |
| Resource not found | `404 Not Found` | Unknown ID or route |
| Missing required fields | `400 Bad Request` | Incomplete POST body |
| Duplicate email | `409 Conflict` | Email already registered |

---

## 🧩 Architecture Overview

This project follows the **MVC (Model-View-Controller)** pattern with a clear separation of concerns:

```
Incoming Request
       │
       ▼
  server.js          ← Initialises app, mounts middleware & routers
       │
       ▼
  middleware/         ← logger.js (global) → auth.js (accounts only)
       │
       ▼
  routes/             ← Directs request to the correct controller function
       │
       ▼
  controllers/        ← Contains all business logic, sends response
```

### Why `express.Router()`?

Rather than defining every route in `server.js`, each resource owns its route file:

- `server.js` stays clean — it only mounts routers
- Each router file is independently maintainable
- Adding new endpoints never touches the entry point
- Different team members can own different route files

---

## 🛡️ Middleware Details

### `logger.js` — Global Request Logger
Applied to **every request** via `app.use(requestLogger)`.  
Prints the HTTP method, route path, and timestamp to the console.

```
📋 [26/02/2026, 09:15:42 am]  GET    /catalog
📋 [26/02/2026, 09:15:50 am]  POST   /accounts
```

### `auth.js` — API Key Guard
Applied **only to `/accounts`** via `app.use("/accounts", verifyAccess, accountsRouter)`.  
Checks the `x-api-key` header before the request reaches any account route.

---

## 🏨 Component Analogy (Hotel Model)

| Layer | Hotel Role | Responsibility |
|-------|-----------|----------------|
| `server.js` | Front Desk Manager | Sets up the hotel, assigns departments |
| `logger.js` | Concierge Desk | Logs every guest who walks in |
| `auth.js` | Security Guard | Checks keycards at restricted floors |
| `routes/catalog.js` | Gift Shop Attendant | Handles catalog requests |
| `routes/accounts.js` | Private Floor Concierge | Handles account requests |
| `catalogController.js` | Stock Room Supervisor | Executes catalog business logic |
| `accountController.js` | Private Floor Supervisor | Executes account business logic |

---

## 📦 Tech Stack

| Technology | Purpose |
|------------|---------|
| [Node.js](https://nodejs.org) | JavaScript runtime |
| [Express.js](https://expressjs.com) `^4.18` | Web framework |
| [Nodemon](https://nodemon.io) `^3.0` | Auto-restart in development |

---

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm start` | Run server with Node.js |
| `npm run dev` | Run server with Nodemon (auto-restart) |

---

## 📄 License

MIT © ShopEase Lab
