const storage = require('node-persist');
const rand = require('csprng');

exports.create = async function(data, callback) {
  if (!data.username || !data.password) {
    callback(new Error('Missing username or password!'));
    return;
  }
  let users = await storage.getItem('users');
  if (!users) {
    users = [];
  }
  const exist = users.some(user => user.username === data.username);
  if (exist) {
    callback(new Error('Username is not available!'));
    return;
  }
  const id = rand(160, 36);
  const newUser = { id, messages: [], ...data };
  users.push(newUser);
  await storage.setItem('users', users);
  callback(null, newUser);
};

exports.findOne = async function(data, callback) {
  if (!data.username) {
    callback(new Error('Missing username!'));
    return;
  }
  const users = await storage.getItem('users');
  if (!users) {
    callback(new Error('Not found user!'));
    return;
  }
  const user = users.find(user => user.username == data.username);
  if (!user) {
    callback(new Error('Invalid username!'));
    return;
  }
  callback(null, user);
};

exports.findById = async function(id, callback) {
  if (!id || typeof id !== 'string') {
    callback(new Error('Missing id!'));
    return;
  }
  const users = await storage.getItem('users');
  if (!users) {
    callback(new Error('Not found user!'));
    return;
  }
  const user = users.find(user => user.id == id);
  if (!user) {
    callback(new Error('Invalid id!'));
    return;
  }
  callback(null, user);
};

exports.save = async function(data) {
  storage.getItem('users')
    .then(users => storage.setItem('users', [...users, data]))
    .catch(err => {
      throw new Error(err);
    });
};