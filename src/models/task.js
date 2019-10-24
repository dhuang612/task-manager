const mongoose = require('mongoose');

const taskSchema =new mongoose.Schema({
    description : {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false,
        required: false
    }
})

taskSchema.pre('save', async function (next) {
    const task = this;
    
    if(task.isModified('description')){
       console.log('task has been updated')
    }

    next();
})

const Tasks = mongoose.model('Tasks',taskSchema)

module.exports = Tasks;