// =============================================================
//  routes/users.js — User Routes (Protected)
//
//  🍽️  RESTAURANT ANALOGY:
//     The WAITER assigned to the VIP section.
//     Guests only reach this waiter AFTER passing the bouncer
//     (auth middleware) mounted in app.js.
//     This waiter focuses solely on user-related requests.
//
//  IMPORTANT:
//     The auth middleware is applied at the APP level in app.js:
//       app.use("/users", auth, userRoutes);
//     This means EVERY route in this file is already protected.
//     We don't need to add auth here again — clean separation!
// =============================================================

const express = require("express");
const router  = express.Router();

const { getUserById, createUser } = require("../controllers/userController");

// =============================================================
//  USER ROUTES
//  Base path "/users" is already mounted in app.js
// =============================================================

// GET /users/:id
// Demonstrates Route Parameters — req.params.id
// Example: GET /users/1  →  req.params = { id: "1" }
router.get("/:id", getUserById);

// POST /users
// Demonstrates Request Body — req.body
// Example body: { "name": "Alice", "email": "alice@example.com" }
router.post("/", createUser);

// ---
//  📌 EXPANSION POINT:
//
//  PUT    /users/:id   → updateUser
//  DELETE /users/:id   → deleteUser
//  GET    /users       → getAllUsers (admin only)
// ---

module.exports = router;
