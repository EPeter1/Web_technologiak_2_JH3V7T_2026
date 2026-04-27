const mongoose = require('mongoose');

const achievementSchema = new mongoose.Schema({
    game: {
        type: String,
        required: true
    },

    name: {
        type: String,
        required: true
    },

    condition: {
        type: String,
        required: true
    },

    difficulty: {
        type: Number,
        enum: [1, 2, 3, 4],
        required: true
    }
});

module.exports = mongoose.model('Achievement', achievementSchema);
