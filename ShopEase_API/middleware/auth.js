// ================================================================
//  middleware/auth.js — API Access Guard (Simulated)
//
//  🏨  HOTEL ANALOGY:
//     The SECURITY GUARD posted at the elevator to private guest
//     floors. Every person wanting to go upstairs must show a
//     valid keycard. No keycard = stay in the lobby.
//     Wrong keycard = still denied.
//
//  HOW THIS MIDDLEWARE WORKS:
//     It is mounted SELECTIVELY in server.js — only on the
//     /accounts routes. The /catalog routes are open to anyone,
//     just like the hotel lobby. Only the private floors (accounts)
//     require keycard verification.
//
//  REAL-WORLD USAGE:
//     In production you would validate a JWT (JSON Web Token)
//     using a library like `jsonwebtoken`. This file simulates
//     that pattern with a static API key to teach the concept.
//
//  HOW TO TEST (add this header in Postman / curl):
//     Header Key  : x-api-key
//     Header Value: shopease-secret-2026
// ================================================================

// The expected API key — in production, load from environment variables:
// const VALID_KEY = process.env.API_KEY;
const VALID_KEY = "shopease-secret-2026";

/**
 * verifyAccess — Checks for a valid x-api-key header.
 * Allows the request to continue only if the key matches.
 */
const verifyAccess = (req, res, next) => {
  // Extract the API key from the request headers
  // 🏨  Analogy: The guard looks at the keycard you're holding
  const submittedKey = req.headers["x-api-key"];

  // ── Case 1: No key provided at all ──────────────────────────
  if (!submittedKey) {
    return res.status(401).json({
      success : false,
      code    : 401,
      error   : "Unauthorised",
      message : "No API key found. Include the header: x-api-key: shopease-secret-2026",
    });
    // ⛔ We use `return` here so nothing else in this function runs.
    // Without return, Node.js would call next() AND send a response — crash!
  }

  // ── Case 2: Key provided but doesn't match ──────────────────
  if (submittedKey !== VALID_KEY) {
    return res.status(403).json({
      success : false,
      code    : 403,
      error   : "Forbidden",
      message : "Invalid API key. Access to /accounts is denied.",
    });
  }

  // ── Case 3: Key is valid — allow through ────────────────────
  // 🏨  Analogy: The guard waves you toward the elevator
  console.log("🔓 Access granted → passing to /accounts handler");

  // Optionally attach verified info to the request for downstream use
  req.authenticatedAs = "api-client";

  next(); // Hand off to the accounts router
};

module.exports = verifyAccess;
