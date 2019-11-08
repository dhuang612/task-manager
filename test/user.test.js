const request = require('supertest');
//express setup for test suite
const app = require('../src/app');
//require in the user db
const User = require('../src/models/user');

const userOne = {
    name: "test user",
    email: "testemail@email.com",
    password: "Gr3enP@ss"
}

beforeEach(async () =>{
    //clear the db
    await User.deleteMany();
    //create a user
    await new User(userOne).save();
})

test('Should signup a new user', async ()=>{
    //.post = the express route
    await request(app).post('/users').send({
        name: 'Another user',
        email: "dhuang@email.com",
        password: "R3dP@ss77!"
    }).expect(201)
})

test('Should login user', async () =>{
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
})

test('should not login nonexistent user', async () =>{
    await request(app).post('/users/login').send({
        email: userOne.email,
        password: ''
    }).expect(400)
})
