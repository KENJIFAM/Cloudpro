

var request = require('request')

var bookList = []

const validateBookId = (bookId, callback) => {
  const url = `https://www.googleapis.com/books/v1/volumes?q=${bookId}`
  request.get(url, (err, res, body) => {
    if (err) {
      callback(new Error('error making google books request'))
      return
    }
    const json = JSON.parse(body)
    const items = json.items
    if (items === undefined) {
      callback(new Error('bookId is invalid, book does not exist'))
      return
    }
    callback(null, 'bookId is valid')
  })
}

/* The standard pattern for asynchronous callbacks is for the first parameter to be the error, this should be null if no error is thrown with the second parameter being the data. */
exports.search = (query, callback) => {
  if (typeof query !== 'string' || query.length === 0) {
    callback(new Error('missing query parameter'))
  }
  const url = 'https://www.googleapis.com/books/v1/volumes'
  const query_string = {q: query, maxResults: 3, fields: 'items(id,volumeInfo(title,authors))'}
  request.get({url: url, qs: query_string}, (err, res, body) => {
    if (err) {
      callback(new Error('error making google books request'))
    }
    const json = JSON.parse(body)
    const items = json.items
    if (items === undefined) {
      //console.log('found undefined property')
      callback(new Error('no books found matching search'))
      return
    }
    const books = items.map( element => {
      return {id:element.id, title:element.volumeInfo.title, authors:element.volumeInfo.authors}
    })
    /* the first callback parameter is the error, which in this case will be null, the second parameter is the data returned. */
    callback(null, books)
  })
}

/* a synchronous function will either return data or throw an error */
exports.add = (bookId, callback) => {
  if (bookId.length != 12) {
    /* this throws a user-defined exception. */
    callback(new Error('bookId should be 12 character long'))
    return
  }
  if (bookList.indexOf(bookId) != -1) {
    callback(new Error('book has already been added to the list'))
    return
  }
  validateBookId(bookId, (err, data) => {
    if (err) {
      callback(new Error(err.message))
      return
    }
    console.log(data)    
    bookList.push(bookId)
    //console.log(bookList.length)
    callback(null, 'book '+bookId+' added')
  })
}

exports.delete = bookId => {
  if (bookList.indexOf(bookId) == -1) {
    throw('book is not in the list')
  }
  bookList = bookList.filter(book => book !== bookId)
  //console.log(bookList.length)
  return 'book '+bookId+' deleted'
}

exports.bookCount = () => {
  return bookList.length
}

exports.describe = (query, callback) => {
  if (typeof query !== 'string' || query.length === 0) {
    callback(new Error('missing query parameter'))
    return
  }
  if (query.length != 12) {
    callback(new Error('bookId should be 12 character long'))
    return
  }
  const url = `https://www.googleapis.com/books/v1/volumes?q=${query}`
  request.get(url, (err, res, body) => {
    if (err) {
      callback(new Error('error making google books request'))
      return
    }
    const json = JSON.parse(body)
    const items = json.items
    if (items === undefined) {
      //console.log('found undefined property')
      callback(new Error('no books found matching search'))
      return
    }
    const book = {
      id: items[0].id, 
      title: items[0].volumeInfo.title, 
      authors: items[0].volumeInfo.authors, 
      publisher: items[0].volumeInfo.publisher,
      publishedDate: items[0].volumeInfo.publishedDate,
      description: items[0].volumeInfo.description
    }
    /* the first callback parameter is the error, which in this case will be null, the second parameter is the data returned. */
    callback(null, book)
  })
}