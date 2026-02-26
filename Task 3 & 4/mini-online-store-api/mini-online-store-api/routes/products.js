// =============================================================
//  routes/products.js — Product Routes
//
//  🍽️  RESTAURANT ANALOGY:
//     The WAITER assigned to the dining section.
//     This waiter ONLY handles product-related orders and
//     knows exactly which chef (controller) to pass each order to.
//
//  WHY express.Router()?
//     Instead of cluttering app.js with every single route,
//     express.Router() lets us create a "mini app" for each
//     resource. This file owns ALL /products routes.
//     Scalability win: Add 10 more product routes here without
//     touching app.js at all.
// =============================================================

const express = require("express");
const router  = express.Router(); // Create a modular, mountable route handler

// Import only the controllers this router needs
const { getAllProducts } = require("../controllers/productController");

// =============================================================
//  PRODUCT ROUTES
//  Base path "/products" is already mounted in app.js
//  So here we define paths RELATIVE to /products
// =============================================================

// GET /products
// 🍽️  Waiter receives order → passes to chef (getAllProducts)
router.get("/", getAllProducts);

// ---
//  📌 EXPANSION POINT — easily add more routes here later:
//
//  GET    /products/:id      → getProductById
//  POST   /products          → createProduct
//  PUT    /products/:id      → updateProduct
//  DELETE /products/:id      → deleteProduct
// ---

module.exports = router;
