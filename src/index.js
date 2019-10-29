const express = require('express');
// Connection to db
require('./db/mongoose');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

// app.use((req, res, next)=> {
//     if(req.method === "GET"){
//          res.send('Get requests are disabled');
//     }
//     next();
// })

// app.use((req, res, next)=> {
//     res.status(503).send('Currently in maintenance please check back later')
  
// })


app.use(express.json());
// Loads in the routes for the user db
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});

const Task = require('./models/task');
const User = require('./models/user');
// const main = async () => {
//     // const task = await Task.findById('5db7192771d87e15d901df57');
//     // await task.populate('owner').execPopulate();
//     // console.log(task.owner)
//     const user = await User.findById('5db7181f41290715900b379a');
//     await user.populate('tasks').execPopulate();
//     console.log(user.tasks);
// }

// main()
