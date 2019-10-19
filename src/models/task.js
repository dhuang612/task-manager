const mongoose = require('mongoose');

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

module.exports = Tasks;