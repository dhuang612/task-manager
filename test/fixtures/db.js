const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user')

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


const setupDatabase = async() => {
     //clear the db
     await User.deleteMany();
     //create a user
     await new User(userOne).save();
}

module.exports = {
    userOneId,
    userOne,
    setupDatabase
}