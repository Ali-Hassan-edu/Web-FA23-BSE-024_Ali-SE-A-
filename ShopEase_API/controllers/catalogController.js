// ================================================================
//  controllers/catalogController.js — Catalog Business Logic
//
//  🏨  HOTEL ANALOGY:
//     The STOCK ROOM SUPERVISOR. When the gift shop attendant
//     (router) receives a request, it calls the supervisor, who
//     actually knows where everything is stored, how to filter
//     it, and how to package it for the guest.
//
//  MVC — CONTROLLER LAYER:
//     In the MVC (Model-View-Controller) pattern, the Controller
//     is responsible for:
//       ✅ Receiving the request (req)
//       ✅ Applying business rules and data logic
//       ✅ Sending back the appropriate response (res)
//       ✅ Forwarding errors to the error handler via next(err)
//
//     Controllers do NOT handle routing decisions.
//     Routes do NOT handle business logic.
//     This separation keeps each layer focused and testable.
// ================================================================

// ── In-Memory Data Store ────────────────────────────────────────
// In a real application this data would come from a database
// (e.g., MongoDB, PostgreSQL, Firebase).
// For this lab we use a plain array to keep things runnable.

const storeInventory = [
  { id: 1, title: "Mechanical Keyboard",  brand: "TechEdge",  price: 3200,  category: "Computing",   available: true  },
  { id: 2, title: "Noise-Cancel Earbuds", brand: "SoundWave", price: 2800,  category: "Audio",       available: true  },
  { id: 3, title: "USB-C Hub 7-in-1",     brand: "ConnectPro",price: 1500,  category: "Computing",   available: false },
  { id: 4, title: "Desk Lamp LED",        brand: "LumiGlow",  price: 850,   category: "Accessories", available: true  },
  { id: 5, title: "Laptop Stand Aluminium",brand: "ErgaDesk", price: 1750,  category: "Accessories", available: true  },
  { id: 6, title: "Webcam 1080p",         brand: "VisionCam", price: 2200,  category: "Computing",   available: true  },
];

// ================================================================
//  fetchAllItems — GET /catalog
//
//  Supports optional query parameters for filtering:
//    ?available=true       → only available items
//    ?category=Computing   → items in a specific category
//    ?maxPrice=2000        → items at or below this price
//
//  Example: GET /catalog?category=Computing&available=true
// ================================================================
const fetchAllItems = (req, res) => {
  const { available, category, maxPrice } = req.query;

  // Start with a full copy so the original array stays intact
  let filteredItems = [...storeInventory];

  // Filter by availability if the query param was provided
  if (available !== undefined) {
    const wantsAvailable = available === "true";
    filteredItems = filteredItems.filter((item) => item.available === wantsAvailable);
  }

  // Filter by category (case-insensitive comparison)
  if (category) {
    filteredItems = filteredItems.filter(
      (item) => item.category.toLowerCase() === category.toLowerCase()
    );
  }

  // Filter by maximum price
  if (maxPrice) {
    const ceiling = parseFloat(maxPrice);
    if (!isNaN(ceiling)) {
      filteredItems = filteredItems.filter((item) => item.price <= ceiling);
    }
  }

  // Send the response
  res.status(200).json({
    success   : true,
    totalFound: filteredItems.length,
    filters   : { available, category, maxPrice },  // echo back what was applied
    data      : filteredItems,
  });
};

module.exports = { fetchAllItems };
