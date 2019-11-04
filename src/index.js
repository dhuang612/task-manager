const express = require('express');

// Connection to db
require('./db/mongoose');
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// Loads in the routes for the user db
app.use(userRouter);
app.use(taskRouter);


app.listen(port, () => {
    console.log(`Server is up on port: ${port}`);
});
