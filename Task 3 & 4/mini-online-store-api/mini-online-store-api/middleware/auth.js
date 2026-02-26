// =============================================================
//  middleware/auth.js — Authentication Guard (Simulated)
//
//  🍽️  RESTAURANT ANALOGY:
//     The BOUNCER at the VIP lounge entrance.
//     He checks if you have a valid wristband (token) before
//     letting you in. No wristband? You're turned away at the
//     door — you never reach the VIP section (the /users routes).
//
//  REAL-WORLD NOTE:
//     In production, you would verify a JWT (JSON Web Token)
//     using a library like `jsonwebtoken`. Here we simulate
//     the pattern by checking for a hardcoded token value
//     in the request headers.
//
//  HOW TO TEST:
//     Add the header to your request:
//       Key:   x-auth-token
//       Value: mysecrettoken
// =============================================================

const VALID_TOKEN = "mysecrettoken"; // 🔑 Simulated valid token

const auth = (req, res, next) => {
  // Read the token from the request headers
  // 🍽️  Analogy: The bouncer checks your wristband
  const token = req.headers["x-auth-token"];

  // --- Case 1: No token provided ---
  if (!token) {
    return res.status(401).json({
      success : false,
      error   : "401 Unauthorized",
      message : "Access denied. No token provided. Add header: x-auth-token: mysecrettoken",
    });
  }

  // --- Case 2: Token is invalid ---
  if (token !== VALID_TOKEN) {
    return res.status(403).json({
      success : false,
      error   : "403 Forbidden",
      message : "Access denied. Invalid token.",
    });
  }

  // --- Case 3: Token is valid — grant access ---
  // 🍽️  Analogy: Wristband checks out — the bouncer waves you in
  console.log("🔓 Auth passed — access granted to /users route");
  next(); // Pass control to the next handler (the user router)
};

module.exports = auth;
