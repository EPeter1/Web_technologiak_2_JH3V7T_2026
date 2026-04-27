const fs = require('fs');
const path = require('path');

const Achievement = require('../models/Achievement');
const User = require('../models/User');
const UserAchievement = require('../models/UserAchievement');

async function seedData() {
    const filePath = path.resolve(__dirname, 'data.json');
    const file = fs.readFileSync(filePath, 'utf-8');
    const json = JSON.parse(file);

    await Achievement.deleteMany();
    const achievements = await Achievement.insertMany(json.achievements);

    await User.deleteMany();
    const users = await User.insertMany(json.users);

    await UserAchievement.deleteMany();

    const mapped = json.userAchievements.map(ua => {
        const user = users.find(u => u.userName === ua.userName);
        const achievement = achievements.find(a =>
            a.name === ua.achievementName &&
            a.game === ua.game
        );

        if (!user || !achievement) {
            throw new Error('Invalid reference in seed data');
        }

        return {
            userId: user._id,
            achievementId: achievement._id,
            platform: ua.platform,
            unlockedAt: ua.unlockedAt || Date.now()
        };
    });
    await UserAchievement.insertMany(mapped);

    console.log('Demo data inserted into MongoDB');
}

module.exports = seedData;
