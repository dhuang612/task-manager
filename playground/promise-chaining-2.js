require('../src/db/mongoose');
const Task = require('../src/models/task')
/*
Goal mess around with promise chaining.
mongoosejs.com/docs/queries.html
use
findByIdAndDelete()
create promise-chaining-2.js
load in mongoose and task model
remove a given task by id
get and print the total number of incomplete tasks

*/

Task.findByIdAndDelete('5dab412084377c20709aea32').then((task)=> {
    return Task.countDocuments({completed: false})
}).then((result) => {
    console.log(result)
}).catch((e) => {
    console.log(e);
})