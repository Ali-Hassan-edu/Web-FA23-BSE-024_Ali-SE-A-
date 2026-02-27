// ================================================================
//  routes/accounts.js — Account Route Definitions (Protected)
//
//  🏨  HOTEL ANALOGY:
//     The PRIVATE FLOOR CONCIERGE. This concierge only exists
//     on the restricted upper floors. By the time a guest reaches
//     this concierge, they have ALREADY shown their keycard to
//     the security guard (verifyAccess middleware in server.js).
//
//     This router doesn't need to re-check authentication —
//     the guard already handled that. Clean separation of concerns.
//
//  KEY CONCEPTS DEMONSTRATED:
//     1. req.params  — Dynamic URL segments like /accounts/:id
//     2. req.body    — JSON data in the request body (POST)
//     3. Router-level protection via selective middleware mounting
// ================================================================

const express = require("express");
const router  = express.Router();

// Import only what this router needs from the controller
const { fetchAccountById, registerAccount } = require("../controllers/accountController");

// ================================================================
//  ACCOUNT ROUTE DEFINITIONS
//  Base path "/accounts" mounted in server.js.
//  All routes below are relative to /accounts.
// ================================================================

// GET /accounts/:id
// Uses Route Parameters (req.params) to identify which account
// Example: GET /accounts/3  →  req.params = { id: "3" }
// 🏨  Analogy: "I'd like information for Guest Room 203"
router.get("/:id", fetchAccountById);

// POST /accounts
// Uses Request Body (req.body) to receive account creation data
// Example body: { "fullName": "Ali Hassan", "email": "ali@example.com" }
// 🏨  Analogy: "I'd like to register as a new hotel guest"
router.post("/", registerAccount);

// ── Future Expansion Points ─────────────────────────────────────
//
//  GET    /accounts           → getAllAccounts  (admin only)
//  PUT    /accounts/:id       → updateAccount
//  DELETE /accounts/:id       → closeAccount
//  POST   /accounts/login     → authenticateAccount
//
// ────────────────────────────────────────────────────────────────

module.exports = router;
