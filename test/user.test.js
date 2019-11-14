const request = require('supertest');
//express setup for test suite
const app = require('../src/app');
//require in the user db
const User = require('../src/models/user');
const {userOneId, userOne, setupDatabase, invalidUser} = require('./fixtures/db')

beforeEach(setupDatabase)

test('Should signup a new user', async ()=>{
    //.post = the express route
   const response = await request(app).post('/users').send({
        name: 'Another user',
        email: "dhuang@email.com",
        password: "R3dP@ss77!"
    }).expect(201)
    // Assert that the database was changed correctly
    const user = await User.findById(response.body.user._id)
    expect(user).not.toBeNull()

    // Assertions about the response
    expect(response.body).toMatchObject({
        user: {
            name: "Another user",
            email: "dhuang@email.com"
        },
        token: user.tokens[0].token
    })
    expect(user.password).not.toBe('R3dP@ss77!')
})


test('Should login existing user', async () =>{
   const response = await request(app).post('/users/login').send({
        email: userOne.email,
        password: userOne.password
    }).expect(200)
    const user = await User.findById(userOneId)
    expect(user).not.toBeNull()

    expect(response.body.token).toBe(user.tokens[1].token)
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

    const user = await User.findById(userOneId);
        expect(user).toBeNull();
})

test('Should not delete account for unauthenticated user', async () => {
    await request(app)
        .delete('/users/me')
        .send()
        .expect(401)
})

test('Should upload avatar image' , async () => {
    await request(app)
        .post('/users/me/avatar')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .attach('avatar', 'test/fixtures/profile-pic.jpg')
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.avatar).toEqual(expect.any(Buffer))
})

test('Should update valid user fields', async () =>{
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({name: 'Dan'})
        .expect(200)
    const user = await User.findById(userOneId)
    expect(user.name).toEqual('Dan')    
})

test('Should not update invalid user fields', async () =>{
    await request(app)
        .patch('/users/me')
        .set('Authorization', `Bearer ${userOne.tokens[0].token}`)
        .send({location: 'A location'})
        .expect(400)
})

test('Should not signup user with invalid name/email/password', async () => {
    await request(app)
        .post('/users')
        .send({
            name: invalidUser.name,
            email: invalidUser.email,
            password: invalidUser.password
            })
        .expect(400)
    })

test('Should not update user if unauthenticated', async () => {
    await request(app)
        .patch('/users/me')
        .expect(401)
})

test('Should not delete user if unauthenticated', async () => {
    await request(app)
    .delete('/users/me')
    .expect(401)
})
