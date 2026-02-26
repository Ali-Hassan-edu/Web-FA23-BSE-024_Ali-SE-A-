// =============================================================
//  middleware/logger.js — Request Logger
//
//  🍽️  RESTAURANT ANALOGY:
//     The HOST at the front door who writes down in a logbook:
//     "Table 5 ordered at 7:32 PM" — keeping a record of
//     every guest request that enters the restaurant.
//
//  MIDDLEWARE CONCEPT:
//     Middleware sits BETWEEN the request and the final route
//     handler. It can inspect, modify, or reject a request.
//     Calling next() hands the request to the NEXT middleware
//     or route in line — like passing the order slip to the waiter.
// =============================================================

const logger = (req, res, next) => {
  const timestamp = new Date().toISOString();
  const method    = req.method;
  const url       = req.originalUrl;

  // Log the incoming request details to the console
  console.log(`[${timestamp}] 📋 ${method} ${url}`);

  // ✅ IMPORTANT: Always call next() to pass control forward.
  //    Without next(), the request gets stuck here — like a
  //    host who greets you but never shows you to your table.
  next();
};

module.exports = logger;
