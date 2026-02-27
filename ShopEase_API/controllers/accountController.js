// ================================================================
//  controllers/accountController.js — Account Business Logic
//
//  🏨  HOTEL ANALOGY:
//     The PRIVATE FLOOR SUPERVISOR. Since only authorised guests
//     reach this floor (auth middleware already ran), this
//     supervisor handles their account requests directly.
//
//  KEY CONCEPTS DEMONSTRATED:
//
//     req.params
//       - Contains dynamic URL segments defined with : in the route
//       - Route: /accounts/:id
//       - Request URL: /accounts/2
//       - Result: req.params = { id: "2" }  (always a string!)
//
//     req.body
//       - Contains JSON data sent in the request body
//       - Only populated because express.json() runs globally
//       - Without it, req.body would be undefined
//       - Used for POST, PUT, PATCH requests
//
//     next(error)
//       - Passes errors to the global error handler in server.js
//       - Use this instead of try/catch in every controller
// ================================================================

// ── In-Memory Accounts Store ─────────────────────────────────────
// In a real app: fetched from a database with hashed passwords
const accounts = [
  { id: 1, fullName: "Hamza Khalid",  email: "hamza@shopease.pk",  role: "admin",    joinedAt: "2024-01-10" },
  { id: 2, fullName: "Zainab Tariq",  email: "zainab@shopease.pk", role: "customer", joinedAt: "2024-03-22" },
  { id: 3, fullName: "Umar Farooq",   email: "umar@shopease.pk",   role: "customer", joinedAt: "2025-06-05" },
];

// ================================================================
//  fetchAccountById — GET /accounts/:id
//
//  Reads req.params.id from the URL to find a specific account.
//  Example request:  GET /accounts/2
//  Expected result:  Returns Zainab Tariq's account object
// ================================================================
const fetchAccountById = (req, res, next) => {
  // req.params.id is always a STRING — convert it to a number
  const targetId = parseInt(req.params.id, 10);

  // Guard: reject non-numeric IDs immediately
  if (isNaN(targetId) || targetId < 1) {
    return res.status(400).json({
      success : false,
      code    : 400,
      error   : "Bad Request",
      message : "Account ID must be a positive integer.",
      received: req.params.id,
    });
  }

  // Search the accounts store
  const found = accounts.find((acc) => acc.id === targetId);

  // Not found → 404
  if (!found) {
    return res.status(404).json({
      success : false,
      code    : 404,
      error   : "Account Not Found",
      message : `No account exists with ID ${targetId}.`,
    });
  }

  // Found → 200 OK
  res.status(200).json({
    success: true,
    data   : found,
  });
};

// ================================================================
//  registerAccount — POST /accounts
//
//  Reads req.body to create a new account.
//  Example request body:
//  {
//    "fullName": "Sara Ahmed",
//    "email": "sara@example.com",
//    "role": "customer"
//  }
// ================================================================
const registerAccount = (req, res, next) => {
  // Destructure expected fields from the request body
  // express.json() in server.js populates req.body from JSON input
  const { fullName, email, role } = req.body;

  // ── Validation: Required Fields ──────────────────────────────
  if (!fullName || !email) {
    return res.status(400).json({
      success  : false,
      code     : 400,
      error    : "Validation Failed",
      message  : "Both 'fullName' and 'email' are required in the request body.",
      example  : {
        fullName : "Sara Ahmed",
        email    : "sara@example.com",
        role     : "customer",
      },
    });
  }

  // ── Validation: Email Format (basic check) ────────────────────
  if (!email.includes("@")) {
    return res.status(422).json({
      success : false,
      code    : 422,
      error   : "Invalid Email",
      message : "The 'email' field must be a valid email address.",
    });
  }

  // ── Validation: No Duplicate Emails ──────────────────────────
  const alreadyExists = accounts.some(
    (acc) => acc.email.toLowerCase() === email.trim().toLowerCase()
  );

  if (alreadyExists) {
    return res.status(409).json({
      success : false,
      code    : 409,
      error   : "Conflict",
      message : `An account with the email '${email}' is already registered.`,
    });
  }

  // ── Create & Store the New Account ───────────────────────────
  const newAccount = {
    id       : accounts.length + 1,            // Simple increment; use UUIDs in production
    fullName : fullName.trim(),
    email    : email.trim().toLowerCase(),
    role     : role || "customer",              // Default role if not specified
    joinedAt : new Date().toISOString().split("T")[0], // e.g., "2026-02-26"
  };

  accounts.push(newAccount); // Persists in memory for this session

  // 201 Created — correct status code for a successful POST
  res.status(201).json({
    success : true,
    message : "Account registered successfully.",
    data    : newAccount,
  });
};

module.exports = { fetchAccountById, registerAccount };
