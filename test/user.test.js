const request = require('supertest');
//express setup for test suite
const app = require('../src/app');

test('Should signup a new user', async ()=>{
    //.post = the express route
    await request(app).post('/users').send({
        name: 'Another user',
        email: "dhuang@email.com",
        password: "R3dP@ss77!"
    }).expect(201)
})
