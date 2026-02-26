// =============================================================
//  controllers/userController.js — User Business Logic
//
//  🍽️  RESTAURANT ANALOGY:
//     The CHEF handling VIP orders. Since this section is
//     behind the bouncer (auth middleware), only verified
//     guests reach these recipes.
//
//  CONCEPTS DEMONSTRATED:
//     - req.params  → Dynamic URL segments like /users/:id
//     - req.body    → JSON data sent in the POST request body
//     - Input validation (basic)
//     - Error forwarding with next(err)
// =============================================================

// --- Dummy In-Memory Users Store ---
const users = [
  { id: 1, name: "Alice Johnson", email: "alice@store.com",  role: "admin"    },
  { id: 2, name: "Bob Smith",     email: "bob@store.com",    role: "customer" },
  { id: 3, name: "Carol White",   email: "carol@store.com",  role: "customer" },
];

// =============================================================
//  GET /users/:id
//  Demonstrates req.params — extracts the dynamic :id segment
//  Example URL: GET /users/2
// =============================================================
const getUserById = (req, res, next) => {
  // req.params contains all named URL segments
  // For the route /users/:id, req.params = { id: "2" }
  const userId = parseInt(req.params.id, 10); // Convert string → number

  // Validate that :id is actually a number
  if (isNaN(userId)) {
    return res.status(400).json({
      success : false,
      error   : "Bad Request",
      message : "User ID must be a valid number.",
    });
  }

  // Find the user in our dummy store
  const user = users.find((u) => u.id === userId);

  // If no user found, return 404
  if (!user) {
    return res.status(404).json({
      success : false,
      error   : "Not Found",
      message : `No user found with id: ${userId}`,
    });
  }

  // ✅ User found — send it back
  res.status(200).json({
    success : true,
    data    : user,
  });
};

// =============================================================
//  POST /users
//  Demonstrates req.body — reads JSON data from the request body
//  Example body: { "name": "Dan Brown", "email": "dan@store.com" }
// =============================================================
const createUser = (req, res, next) => {
  // req.body is populated by express.json() middleware in app.js
  // Without express.json(), req.body would be undefined
  const { name, email, role } = req.body;

  // --- Basic Input Validation ---
  if (!name || !email) {
    return res.status(400).json({
      success : false,
      error   : "Bad Request",
      message : "Both 'name' and 'email' fields are required in the request body.",
      example : { name: "Dan Brown", email: "dan@store.com", role: "customer" },
    });
  }

  // Check for duplicate email
  const existing = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (existing) {
    return res.status(409).json({
      success : false,
      error   : "Conflict",
      message : `A user with email '${email}' already exists.`,
    });
  }

  // Create new user object
  const newUser = {
    id    : users.length + 1,       // Simple auto-increment (use UUID in production)
    name  : name.trim(),
    email : email.trim().toLowerCase(),
    role  : role || "customer",      // Default role
  };

  // "Save" to our in-memory array (would be db.save() in production)
  users.push(newUser);

  // 201 Created — standard response for successful resource creation
  res.status(201).json({
    success : true,
    message : "User created successfully.",
    data    : newUser,
  });
};

module.exports = { getUserById, createUser };
