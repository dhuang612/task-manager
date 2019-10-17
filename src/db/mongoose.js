const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27018/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const Tasks = mongoose.model('Tasks', {
    description : {
        type: String
    },
    completed: {
        type: Boolean
    }
})

const task = new Tasks({
    description: 'Complete homework',
    completed: false
})

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log(error);
})

const User = mongoose.model('User', {
    name: {
        type: String
    },
    age: {
        type: Number
    }
});

const me = new User({
    name: 'Dan',
    age: 42
});

me.save().then(() => {
    console.log(me)
}).catch((error) => {
    console.log(error)
})
