// =============================================================
//  app.js — Main Entry Point | Mini Online Store API
//  🍽️  RESTAURANT ANALOGY:
//     Think of this file as the RESTAURANT MANAGER.
//     It sets up the whole restaurant, assigns sections to
//     different waiters (routers), and decides which rules
//     apply to every table vs. private rooms.
// =============================================================

const express = require("express");

// --- Import Custom Middleware ---
const logger = require("./middleware/logger"); // 🧾 The host who greets everyone at the door
const auth   = require("./middleware/auth");   // 🔐 The bouncer for the VIP section

// --- Import Routers ---
// 📋 WHY express.Router() instead of putting all routes in app.js?
//    Scalability & Clean Code: Imagine a restaurant menu printed on ONE giant page
//    vs. separate booklets (Drinks, Food, Desserts). Routers let each "department"
//    manage its own endpoints. When the team grows, each developer owns their module —
//    no merge conflicts, no 1000-line app.js nightmares.
const productRoutes = require("./routes/products");
const userRoutes    = require("./routes/users");

const app  = express();
const PORT = process.env.PORT || 3000;

// =============================================================
//  GLOBAL MIDDLEWARE
//  Applied to EVERY incoming request — like a rule for
//  all staff: "Always greet the customer before anything."
// =============================================================

// Built-in middleware: parses incoming JSON request bodies
// 🍽️  Analogy: The kitchen can now READ orders that are written in "JSON language"
app.use(express.json());

// Custom logger middleware — runs on every single request
// 🧾 Analogy: The host logs every guest who walks through the front door
app.use(logger);

// =============================================================
//  ROUTE MOUNTING
//  Each Router is like a section manager handling their area.
// =============================================================

// Public route — no auth needed (like the open dining area)
app.use("/products", productRoutes);

// Protected route — auth middleware applied ONLY HERE
// 🔐 Analogy: The bouncer ONLY checks IDs at the VIP lounge entrance,
//    not at every table in the restaurant
app.use("/users", auth, userRoutes);

// =============================================================
//  ROOT ROUTE — Quick health check / welcome message
// =============================================================
app.get("/", (req, res) => {
  res.json({
    message: "🛒 Welcome to the Mini Online Store API!",
    endpoints: {
      products : "GET  /products",
      getUser  : "GET  /users/:id",
      createUser: "POST /users",
    },
  });
});

// =============================================================
//  404 ERROR HANDLING MIDDLEWARE
//  Must be placed LAST — it's the catch-all safety net.
//  🍽️  Analogy: The waiter who tells you "Sorry, that dish
//     is not on our menu" after no other waiter claimed the order.
// =============================================================
app.use((req, res, next) => {
  res.status(404).json({
    success : false,
    error   : "404 — Route Not Found",
    message : `The endpoint [${req.method}] ${req.originalUrl} does not exist on this server.`,
  });
});

// =============================================================
//  GLOBAL ERROR HANDLER
//  Catches any errors passed via next(err) from controllers.
//  🍽️  Analogy: The restaurant manager who steps in when
//     something goes seriously wrong in the kitchen.
// =============================================================
app.use((err, req, res, next) => {
  console.error("🔥 Server Error:", err.message);
  res.status(err.status || 500).json({
    success : false,
    error   : err.message || "Internal Server Error",
  });
});

// =============================================================
//  START SERVER
// =============================================================
app.listen(PORT, () => {
  console.log(`\n🚀 Mini Online Store API is running!`);
  console.log(`   ➜  http://localhost:${PORT}\n`);
});

module.exports = app; // exported for testing purposes
