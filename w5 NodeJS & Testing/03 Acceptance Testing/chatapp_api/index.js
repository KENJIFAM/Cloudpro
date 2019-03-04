const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const storage = require('node-persist');
const authRoutes = require('./routes/auth');
const messagesRoutes = require('./routes/messages');
const errorHandler = require('./controllers/error');
const { getAllMessages } = require('./controllers/messages');
const PORT = process.env.PORT || 8080;

(async () => {
  // Init storage, auto cleanup in 24h
  await storage.init({ ttl: 1000 * 60 * 60 * 24 });

  const app = express();
  app.use(cors());
  app.use(bodyParser.json());

  app.use('/api/auth', authRoutes);
  app.use('/api/users/:id/messages', messagesRoutes);
  app.get('/api/messages', getAllMessages);

  app.use(function(req, res, next) {
    let err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  app.use(errorHandler);

  app.listen(PORT, function() {
    console.log(`Server is starting on port ${PORT}`);
  });
})();