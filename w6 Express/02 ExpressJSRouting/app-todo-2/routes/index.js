const express = require('express');
const { getItems, createItem, deleteItem } = require('../controllers');
const router = express.Router();

router.route('/items')
  .get(getItems)
  .post(createItem);

router.delete('/items/:name', deleteItem);

module.exports = router;