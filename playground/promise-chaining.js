require('../src/db/mongoose');
const User = require('../src/models/user');

// User.findByIdAndUpdate('5dab3e89271f4d1fc524003a', {age: 1}).then((user)=>{
//     return User.countDocuments({age:1})
// }).then((result)=> {
//     console.log(result);
// }).catch((e) => {
//     console.log(e);
// })

const updateAgeAndCount = async (id, age) => {
    const user = await User.findByIdAndUpdate(id, {age})
    const count = await User.countDocuments({age})
    return count;
}

updateAgeAndCount('5dab3e89271f4d1fc524003a', 1).then((count)=> {
    console.log(count)
}).catch((e)=> {
    console.log(e)
})