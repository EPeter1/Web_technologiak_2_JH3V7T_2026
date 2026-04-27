const express = require('express');
const cors = require('cors');

const connectToDb = require('./database/database');
const seedData = require('./database/seedData');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const achievementRoutes = require('./routes/achievement.route');
const authRoutes = require('./routes/auth.route');
const userRoutes = require('./routes/user.route');
const userAchievementRoutes = require('./routes/userAchievement.route');

app.use('/api/achievements', achievementRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/user-achievements', userAchievementRoutes);

async function startServer() {
    await connectToDb();
    await seedData();

    app.listen(3000, () => {
        console.log("Server running on port 3000");
    });
}

startServer();
