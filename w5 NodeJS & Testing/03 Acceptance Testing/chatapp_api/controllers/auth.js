const btoa = require('btoa');
const users = require('../db/users');

exports.signin = async function (req, res, next) {
  users.findOne({ username: req.body.username }, (err, data) => {
    if (err) {
      return next({
        status: 400,
        message: err.message
      });
    }
    if (data.password !== req.body.password) {
      return next({
        status: 400,
        message: 'Incorrect password!'
      });
    }
    const { id, username, password, messages } = data;
    const token = btoa(`${username}:${password}`);
    res.status(200).json({ id, username, messages, token });
  });
};

exports.signup = async function (req, res, next) {
  users.create(req.body, (err, data) => {
    if (err) {
      return next({
        status: 400,
        message: err.message
      });
    }
    res.status(200).json({
      message: 'Register successfully!'
    });
  });
};
