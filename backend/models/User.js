const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
        select: false
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    role: {
        type: String,
        enum: ['admin', 'player', 'moderator'],
        default: 'player',
        required: true
    }
});

module.exports = mongoose.model('User', userSchema);
