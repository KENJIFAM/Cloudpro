const storage = require('node-persist');
const rand = require('csprng');

exports.create = async function(data, callback) {
  if (!data.text || !data.user) {
    callback(new Error('Missing data!'));
    return;
  }
  let messages = await storage.getItem('messages');
  if (!messages) {
    messages = [];
  }
  const id = rand(160, 36);
  const newMessage = { id, ...data };
  messages.push(newMessage);
  await storage.setItem('messages', messages);
  callback(null, newMessage);
};

exports.findById = async function(id, callback) {
  if (!id || typeof id !== 'string') {
    callback(new Error('Missing id!'));
    return;
  }
  const messages = await storage.getItem('messages');
  if (!messages) {
    callback(new Error('Not found message!'));
    return;
  }
  const message = messages.find(message => message.id == id);
  if (!message) {
    callback(new Error('Invalid id!'));
    return;
  }
  callback(null, message);
};

exports.remove = async function(id, callback) {
  if (!id || typeof id !== 'string') {
    callback(new Error('Missing id!'));
    return;
  }
  let messages = await storage.getItem('messages');
  if (!messages) {
    callback(new Error('Not found message!'));
    return;
  }
  const message = messages.find(message => message.id == id);
  if (!message) {
    callback(new Error('Invalid id!'));
    return;
  }
  messages = messages.filter(m => m.id !== id);
  await storage.setItem('messages', messages);
  callback(null, message);
};

exports.find = async function(callback) {
  let messages = await storage.getItem('messages');
  if (!messages) {
    callback(new Error('Not found messages!'));
    return;
  }
  callback(null, messages);
};