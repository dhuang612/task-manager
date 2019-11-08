const express = require('express');

// Connection to db
require('./db/mongoose');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task');

const app = express();

app.use(express.json());
// Loads in the routes for the user db
app.use(userRouter);
app.use(taskRouter);

module.exports = app