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
