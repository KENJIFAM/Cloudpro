const frisby = require('frisby');

frisby.globalSetup({
  request: {
    headers: {'Content-Type': 'application/json'}
  }
});

frisby.create('should get all list')
  .get('http://localhost:3000/items')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON([
    { name: 'potato' },
    { name: 'carrot' },
    { name: 'tomato' }
  ])
  .toss();

frisby.create('should be a filtered values')
  .get('http://localhost:3000/items?q=to')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON([
    { name: 'potato' },
    { name: 'tomato' }
  ])
  .toss();

frisby.create('should add an item')
  .post('http://localhost:3000/items', { name: 'onion' })
  .expectStatus(201)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON({ message: `created item onion`, status: 'success' })
  .toss();;

frisby.create('should delete an item')
  .delete('http://localhost:3000/items/onion')
  .expectStatus(200)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON({ message: `deleted item onion`, status: 'success' })
  .toss();;


frisby.create('should return 404')
  .delete('http://localhost:3000/items/error')
  .expectStatus(404)
  .expectHeaderContains('Content-Type', 'application/json')
  .expectJSON({ message: `item error not found`, status: 'error' })
  .toss();
