// ================================================================
//  server.js — Application Entry Point | ShopEase Catalog API
//
//  🏨  HOTEL ANALOGY:
//     Picture this file as the HOTEL FRONT DESK MANAGER.
//     The manager:
//       - Sets up the entire hotel (initializes Express)
//       - Assigns every guest to the correct department
//         (mounts routers for /catalog and /accounts)
//       - Decides which rules apply everywhere vs. only in
//         restricted areas (global vs. selective middleware)
//
//  WHY express.Router() instead of writing all routes here?
//     Imagine a hotel where every single service — room service,
//     spa, concierge, laundry — was handled by ONE front-desk
//     clerk. Chaos. Instead, each department has its own staff.
//     express.Router() creates self-contained "departments", each
//     owning its routes. Result: modular, scalable, and each
//     developer can work on their own file without stepping on
//     each other's code.
// ================================================================

const express = require("express");

// ── Custom Middleware ──────────────────────────────────────────
const requestLogger = require("./middleware/logger"); // 📋 The concierge logging every arrival
const verifyAccess  = require("./middleware/auth");   // 🔒 Security guard for restricted floors

// ── Modular Routers ────────────────────────────────────────────
const catalogRouter  = require("./routes/catalog");   // Handles all /catalog endpoints
const accountsRouter = require("./routes/accounts");  // Handles all /accounts endpoints

const app  = express();
const PORT = process.env.PORT || 4000;

// ================================================================
//  GLOBAL MIDDLEWARE STACK
//  These run on EVERY incoming request — hotel-wide policies.
//  Think of them as rules posted at the main entrance:
//  "All guests must sign in at the front desk."
// ================================================================

// express.json() — parses incoming request bodies as JSON
// 🏨  Analogy: The hotel can now read reservation forms written in
//     any standard format — it converts them to something usable
app.use(express.json());

// requestLogger — records every HTTP request hitting the server
// 📋 Analogy: The concierge desk stamps every visitor's arrival card
app.use(requestLogger);

// ================================================================
//  ROUTER MOUNTING
//  Each router is a department; the manager directs traffic to it.
// ================================================================

// Open to all — like the hotel lobby and gift shop
app.use("/catalog", catalogRouter);

// Restricted — verifyAccess runs BEFORE passing to accountsRouter
// 🔒 Analogy: The security guard checks your keycard before you
//    reach the private guest floors. Public areas don't need this.
app.use("/accounts", verifyAccess, accountsRouter);

// ================================================================
//  HOME ROUTE — Server health check & API index
// ================================================================
app.get("/", (req, res) => {
  res.status(200).json({
    message  : "🛍️  ShopEase Catalog API — Running Successfully",
    version  : "1.0.0",
    endpoints: {
      getAllItems : "GET  /catalog",
      getAccount  : "GET  /accounts/:id  [requires x-api-key header]",
      addAccount  : "POST /accounts      [requires x-api-key header]",
    },
  });
});

// ================================================================
//  404 CATCH-ALL MIDDLEWARE
//  Placed LAST so it only triggers when NO other route matched.
//  🏨  Analogy: The front desk clerk who politely tells a guest,
//     "I'm sorry, that room/service doesn't exist in our hotel."
//     This runs only after every other department said "not mine".
// ================================================================
app.use((req, res, next) => {
  res.status(404).json({
    success : false,
    code    : 404,
    error   : "Endpoint Not Found",
    detail  : `No route registered for [${req.method}] ${req.originalUrl}`,
    tip     : "Check the API index at GET /",
  });
});

// ================================================================
//  GLOBAL ERROR-HANDLING MIDDLEWARE
//  Catches errors forwarded via next(error) from any route/controller.
//  🏨  Analogy: The hotel's emergency manager who handles any
//     major incident that a department can't resolve on its own.
//  NOTE: Must have exactly 4 parameters (err, req, res, next)
//        so Express recognises it as an error handler.
// ================================================================
app.use((err, req, res, next) => {
  console.error("💥 Unhandled Error:", err.message);
  res.status(err.status || 500).json({
    success : false,
    code    : err.status || 500,
    error   : err.message || "Internal Server Error",
  });
});

// ================================================================
//  START THE SERVER
// ================================================================
app.listen(PORT, () => {
  console.log("\n✅  ShopEase Catalog API started");
  console.log(`   🌐  http://localhost:${PORT}`);
  console.log("   Press Ctrl+C to stop\n");
});

module.exports = app;
