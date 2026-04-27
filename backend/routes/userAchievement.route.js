const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const UserAchievement = require('../models/UserAchievement');

// CREATE
router.post('/', auth, async (req, res) => {
    try {
        const userAchievement = new UserAchievement(req.body);
        const saved = await userAchievement.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET ALL
router.get('/', auth, async (req, res) => {
    try {
        const data = await UserAchievement.find()
            .populate('userId')
            .populate('achievementId');

        res.json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET BY ID
router.get('/:id', auth, async (req, res) => {
    try {
        const item = await UserAchievement.findById(req.params.id)
            .populate('userId')
            .populate('achievementId');

        if (!item) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json(item);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE
router.put('/:id', auth, async (req, res) => {
    try {
        const updated = await UserAchievement.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (!updated) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json(updated);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE
router.delete('/:id', auth, async (req, res) => {
    try {
        const deleted = await UserAchievement.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
