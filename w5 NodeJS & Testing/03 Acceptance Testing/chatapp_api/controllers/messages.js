const messages = require('../db/messages');
const users = require('../db/users');

// POST /api/users/:id/messages/
exports.createMessage = async function(req, res, next) {
  messages.create(
    { text: req.body.text, user: req.params.id },
    (err, message) => {
      if (err) return next(err);
      users.findById(req.params.id, async (err, user) => {
        if (err) return next(err);
        user.messages.push(message.id);
        await users.save(user);
        res.status(200).json(message);
      });
    }
  );  
};

// GET /api/users/:id/messages/:message_id
exports.getMessage = async function(req, res, next) {
  messages.findById(req.params.message_id, (err, message) => {
    if (err) return next(err);
    res.status(200).json(message);
  });
};

// DELETE /api/users/:id/messages/:message_id
exports.deleteMessage = async function(req, res, next) {
  messages.remove(req.params.message_id, (err, message) => {
    if (err) return next(err);
    res.status(200).json(message);
  });
};


// GET /api/messages
exports.getAllMessages = async function(req, res, next) {
  messages.find((err, data) => {
    if (err) return next(err);
    res.status(200).json(data);
  });
};