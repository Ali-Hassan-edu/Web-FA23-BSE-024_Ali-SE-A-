// =============================================================
//  controllers/productController.js — Product Business Logic
//
//  🍽️  RESTAURANT ANALOGY:
//     The CHEF. The router (waiter) takes the order and passes
//     it to the chef, who actually PREPARES the response
//     (the dish). The chef knows the recipes — the business logic.
//
//  MVC CONCEPT — Controller Layer:
//     Controllers contain ONLY business logic.
//     They receive (req) and send (res).
//     They should NOT know about routing details.
//     Separating this from routes keeps code clean, testable,
//     and easy to maintain as the project scales.
// =============================================================

// --- Dummy In-Memory Data Store ---
// In a real app, this would be fetched from a database (e.g., MongoDB, PostgreSQL)
const products = [
  { id: 1, name: "Wireless Headphones", price: 79.99,  category: "Electronics", inStock: true  },
  { id: 2, name: "Running Shoes",        price: 49.99,  category: "Footwear",    inStock: true  },
  { id: 3, name: "Coffee Maker",         price: 34.99,  category: "Kitchen",     inStock: false },
  { id: 4, name: "JavaScript Book",      price: 29.99,  category: "Education",   inStock: true  },
  { id: 5, name: "Yoga Mat",             price: 19.99,  category: "Sports",      inStock: true  },
];

// =============================================================
//  GET /products
//  Returns all products from the dummy data store
// =============================================================
const getAllProducts = (req, res) => {
  // Optional: filter by query param e.g. GET /products?inStock=true
  const { inStock, category } = req.query;

  let result = [...products];

  if (inStock !== undefined) {
    // Convert query string "true"/"false" to boolean
    result = result.filter((p) => p.inStock === (inStock === "true"));
  }

  if (category) {
    result = result.filter(
      (p) => p.category.toLowerCase() === category.toLowerCase()
    );
  }

  res.status(200).json({
    success : true,
    count   : result.length,
    data    : result,
  });
};

module.exports = { getAllProducts };
