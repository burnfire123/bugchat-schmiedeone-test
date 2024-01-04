const simple = require('./handlers/simple');
const configured = require('./handlers/configured');
const ask = require('./handlers/ask');

module.exports = function (app, opts) {
  // Setup routes, middleware, and handlers
  app.get('/', simple);
  app.get('/configured', configured(opts));
  app.get("/ask", ask)
};
