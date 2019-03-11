const items = [
  { name: 'potato' },
  { name: 'carrot' },
  { name: 'tomato' }
];

exports.getItems = (req, res) => {
  if (req.query.q) {
    // filtering a list of items by some criteria
    const newItems = items.filter(item =>
      item.name.toLowerCase().indexOf(req.query.q.toLowerCase()) >= 0);
    res.status(200).json(newItems);
  } else {
    // list of items
    res.status(200).json(items);
  }
};

exports.createItem = (req, res) => {
  if (req.body.name) {
    // inserting an item
    const { name } = req.body;
    if (items.find(item => item.name === name)) {
      res.status(400).json({ message: `item ${name} existed`, status: 'error' });
    } else {
      items.push({ name });
      res.status(201).json({ message: `created item ${name}`, status: 'success' });
    }
  } else {
    res.status(400).json({ message: `item name required`, status: 'error' });
  }
}

exports.deleteItem = (req, res) => {
  if (req.params.name) {
    // deleting an item
    const { name } = req.params;
    const delIndex = items.findIndex(item => item.name === name);
    if (delIndex >= 0) {
      items.splice(delIndex, 1);
      res.status(200).json({ message: `deleted item ${name}`, status: 'success' });
    } else {
      res.status(404).json({ message: `item ${name} not found`, status: 'error' });
    }
  } else {
    res.status(400).json({ message: `item name required`, status: 'error' });
  }
}