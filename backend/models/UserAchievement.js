const mongoose = require('mongoose');

const userAchievementSchema = new mongoose.Schema({
    achievementId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Achievement',
        required: true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    
    platform: {
        type: String,
        enum: ['PC', 'Playstation', 'Xbox', 'Switch'],
        required: true
    },

    unlockedAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('UserAchievement', userAchievementSchema);
