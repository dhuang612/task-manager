const mongoose = require('mongoose');
const validator = require('validator');

mongoose.connect('mongodb://127.0.0.1:27018/task-manager-api', {
    useNewUrlParser: true,
    useCreateIndex: true
});

const Tasks = mongoose.model('Tasks', {
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

const task = new Tasks({
    description: 'learned Node js',
   
})

task.save().then(() => {
    console.log(task);
}).catch((error) => {
    console.log(error);
})

const User = mongoose.model('User', {
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value){
            if(!validator.isEmail(value)){
                throw new Error('email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        validate(value){
            if(value.toLowerCase().includes('password')){
                throw new Error('cannot use password as credentials!');
            }
        },
        validate(value){
            if(value.length < 6){
                throw new Error('password must be at least 6 characters!');
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value){
            if(value < 0){
                throw new Error('Age must be a positive number');
            } 
        }
    }
});

// const me = new User({
//     name: "Reggie   ",
//     email: "reg@gmail.cOm ",
//     password: "5"
// });

// me.save().then(() => {
//     console.log(me)
// }).catch((error) => {
//     console.log(error)
// })
