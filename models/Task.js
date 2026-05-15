const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({

    title: {
        type: String,
        required: true
    },

    status: {
        type: String,
        default: 'Pending'
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },

    email: {
        type: String
    }

});

module.exports = mongoose.model(
    'Task',
    taskSchema
);