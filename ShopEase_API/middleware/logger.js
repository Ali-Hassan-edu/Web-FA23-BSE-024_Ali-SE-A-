// ================================================================
//  middleware/logger.js — Incoming Request Logger
//
//  🏨  HOTEL ANALOGY:
//     The CONCIERGE DESK at the hotel entrance. Every single
//     person who walks through the front door gets logged in the
//     daily visitor register — name (IP), time, and purpose (URL).
//     No one skips the check-in counter.
//
//  WHAT IS MIDDLEWARE?
//     Middleware is a function that sits in the pipeline between
//     an incoming request and the final route handler that
//     produces the response. It can:
//       ✅ Inspect or modify req and res
//       ✅ Log data, verify tokens, parse bodies
//       ✅ End the cycle early (e.g., reject unauthorised users)
//       ✅ Pass control forward by calling next()
//
//     Think of it as a conveyor belt — the request moves from
//     one station to the next. If a station doesn't call next(),
//     the belt stops there.
// ================================================================

/**
 * requestLogger — Logs the HTTP method, path, and timestamp
 * of every request that reaches the server.
 *
 * @param {Object} req  - The incoming request object
 * @param {Object} res  - The outgoing response object
 * @param {Function} next - Passes control to the next handler
 */
const requestLogger = (req, res, next) => {
  // Capture the exact date/time this request arrived
  const arrivedAt = new Date().toLocaleString("en-PK", {
    timeZone     : "Asia/Karachi",
    hour12       : true,
    year         : "numeric",
    month        : "2-digit",
    day          : "2-digit",
    hour         : "2-digit",
    minute       : "2-digit",
    second       : "2-digit",
  });

  const httpMethod  = req.method;        // e.g., GET, POST, DELETE
  const requestPath = req.originalUrl;   // e.g., /catalog?inStock=true

  // Format and print to the console
  console.log(`📋 [${arrivedAt}]  ${httpMethod.padEnd(6)} ${requestPath}`);

  // ⚠️  CRITICAL: Always call next() to pass the request forward.
  //     If you forget next(), the request hangs here and the
  //     client never receives a response — like a concierge who
  //     logs you in but never tells you which room to go to.
  next();
};

module.exports = requestLogger;
