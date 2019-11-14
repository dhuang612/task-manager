const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('../../src/models/user');
const Task = require('../../src/models/task');

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

const userTwoId = new mongoose.Types.ObjectId()

const userTwo = {
    _id: userTwoId,
    name: "A second user",
    email: "myEmail@email.com",
    password: "NewP@s$NYC!!",
    tokens: [{
        token: jwt.sign({_id: userTwoId}, process.env.JWT_SECRET)
    }]
}

const invalidUser = {
    "name": "This should not work",
	"email": "auser@email.edu",
	"password": "P@SS"
}

const taskOne = {
    _id: new mongoose.Types.ObjectId(),
    description: 'A new task',
    completed: false,
    owner: userOneId
}

const taskTwo = {
    _id: new mongoose.Types.ObjectId(),
    description: 'A second task',
    completed: true,
    owner: userOneId
}

const taskThree = {
    _id: new mongoose.Types.ObjectId(),
    description: 'A third task',
    completed: false,
    owner: userTwoId
}

const setupDatabase = async() => {
     //clear the db
     await User.deleteMany();
     await Task.deleteMany();
     //create new users
     await new User(userOne).save();
     await new User(userTwo).save();
     await new Task(taskOne).save();
     await new Task(taskTwo).save();
     await new Task(taskThree).save();
}

module.exports = {
    userOneId,
    userOne,
    userTwo,
    userTwoId,
    invalidUser,
    taskOne,
    taskTwo,
    taskThree,
    setupDatabase
}