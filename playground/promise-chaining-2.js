require('../src/db/mongoose');
const Task = require('../src/models/task')

// Task.findByIdAndDelete('5dab412084377c20709aea32').then((task)=> {
//     return Task.countDocuments({completed: false})
// }).then((result) => {
//     console.log(result)
// }).catch((e) => {
//     console.log(e);
// })
const SearchByIdAndRemove = async (id) => {
   const task = await Task.findByIdAndDelete(id)
   const count = await Task.countDocuments({completed: false})
   return count;
}

SearchByIdAndRemove('5da9ffaeab6ebb12066cccc1', false).then((count) => {
    console.log(count)
}).catch((e) => {
    console.log(e);
})
/*
Goal use async/await

1. create deleteTaskAndCount as an async function
    - Accept id of task to remove
2. Use await to delete task and count up incomplete tasks
3. Return the count
4. Call the function and attach then/catch to log results
5. test work 
*/