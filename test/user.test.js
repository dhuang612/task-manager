const request = require('supertest');
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
//express setup for test suite
const app = require('../src/app');
//require in the user db
const User = require('../src/models/user');
//generates auth token
const userOneId = new mongoose.Types.ObjectId()

const userOne = {
    _id: userOneId,
    name: "test user",
    email: "testemail@email.com",
    password: "Gr3enP@ss",
    tokens: [{
        token: jwt.sign({_id: userOneId}, process.env.JWT_SECRET)
    }]
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

test('Should get profile for user', async () => {
    await request(app)
    .get('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not get profile for unathenticated user', async () =>{
    await request(app)
    .get('/users/me')
    .send()
    .expect(401)
})

test('Should delete account for user', async ()=> {
    await request(app)
    .delete('/users/me')
    .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
    .send()
    .expect(200)
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
    .delete('/users/me')
    .send()
    .expect(401)
})
