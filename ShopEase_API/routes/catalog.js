// ================================================================
//  routes/catalog.js — Catalog Route Definitions
//
//  🏨  HOTEL ANALOGY:
//     The GIFT SHOP ATTENDANT. This attendant only handles
//     requests for catalog items. When a guest asks about a
//     product, the attendant knows exactly which stock room
//     supervisor (controller) to contact.
//
//  WHY express.Router() INSTEAD OF DEFINING ROUTES IN server.js?
//
//     PROBLEM with putting everything in server.js:
//       - As the app grows, server.js becomes an unreadable mess
//       - Multiple developers editing the same file causes conflicts
//       - Testing individual resources becomes harder
//       - One tiny mistake can break the entire routing layer
//
//     SOLUTION — express.Router():
//       - Creates a self-contained "mini-app" for one resource
//       - This file owns ALL /catalog routes exclusively
//       - server.js stays clean; it just mounts these routers
//       - You can add 20 more catalog routes here without touching
//         server.js at all
//       - Scalable: separate team members can own separate routers
// ================================================================

const express = require("express");
const router  = express.Router(); // Instantiate a modular router

// Pull in only the controller functions this router needs
const { fetchAllItems } = require("../controllers/catalogController");

// ================================================================
//  CATALOG ROUTE DEFINITIONS
//  The base path "/catalog" is already registered in server.js.
//  Routes here are RELATIVE to that base — so "/" means "/catalog"
// ================================================================

// GET /catalog
// 🏨  Analogy: Guest asks "what's in the gift shop?" →
//    Attendant contacts stock room → stock room sends full list
router.get("/", fetchAllItems);

// ── Future Expansion Points ─────────────────────────────────────
//
//  GET    /catalog/:id        → fetchItemById
//  POST   /catalog            → addNewItem        (admin only)
//  PATCH  /catalog/:id        → updateItemDetails (admin only)
//  DELETE /catalog/:id        → removeItem        (admin only)
//  GET    /catalog/search     → searchItems
//
// ────────────────────────────────────────────────────────────────

module.exports = router;
