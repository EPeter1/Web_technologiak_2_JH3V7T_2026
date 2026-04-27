const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth.middleware');
const Achievement = require('../models/Achievement');

// CREATE
router.post('/', auth, async (req, res) => {
    try {
        const exists = await Achievement.findOne({
            game: req.body.game,
            name: req.body.name
        });

        if (exists) {
            return res.status(409).json({ error: 'Achievement already exists' });
        }

        const achievement = new Achievement(req.body);
        const saved = await achievement.save();
        res.status(201).json(saved);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// GET ALL
router.get('/', auth, async (req, res) => {
    try {
        const achievements = await Achievement.find();
        res.json(achievements);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// GET BY ID
router.get('/:id', auth, async (req, res) => {
    try {
        const achievement = await Achievement.findById(req.params.id);

        if (!achievement) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json(achievement);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// UPDATE
router.put('/:id', auth, async (req, res) => {
    try {
        const updated = await Achievement.findByIdAndUpdate(
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
        const deleted = await Achievement.findByIdAndDelete(req.params.id);

        if (!deleted) {
            return res.status(404).json({ error: 'Not found' });
        }

        res.json({ message: 'Deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
