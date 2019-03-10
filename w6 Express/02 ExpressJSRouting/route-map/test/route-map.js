const app = require('../index')
const request = require('supertest')
 
describe('route-map', function(){
    describe('GET /users',function(){
        it('should respond with user list', function(done){
            request(app)
            .get('/users')
            .expect(200, 'user list', done)
        })
    })
    
    describe('DELETE /users',function(){
        it('should respond with delete users', function(done){
            request(app)
            .delete('/users')
            .expect(200, 'delete users', done)
        })
    })
    
    describe('GET /users/:uid',function(){
        it('should respond with user id uid', function(done){
            request(app)
            .get('/users/:uid')
            .expect(200, 'user :uid', done)
        })
    })
    
    describe('GET /users/:uid/pets',function(){
        it('should respond with all pets of user uid', function(done){
            request(app)
            .get('/users/:uid/pets')
            .expect(200, 'user :uid\'s pets', done)
        })
    })
    
    describe('GET /users/:uid/pets/:pid',function(){
        it('should respond with deleting pet PID of user UID', function(done){
            request(app)
            .delete('/users/:uid/pets/:pid')
            .expect(200, 'delete :uid\'s pet :pid', done)
        })
    })
})
