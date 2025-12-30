const express = require('express');
const Itinerary = require('../models/Itinerary');
const { generateItinerary } = require('../services/gemini');
const jwt = require('jsonwebtoken');

const router = express.Router();

// Middleware to authenticate token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    });
};

router.use(authenticateToken);

router.post('/generate', async (req, res) => {
    try {
        const { destination, startDate, endDate, preferences } = req.body;
        // Basic validation
        if (!destination || !startDate || !endDate) return res.status(400).json({ error: 'Missing required fields' });

        const generatedPlan = await generateItinerary(destination, startDate, endDate, preferences);
        
        const itinerary = new Itinerary({
            userId: req.user.userId,
            destination,
            startDate,
            endDate,
            preferences,
            generatedPlan
        });
        
        await itinerary.save();
        res.status(201).json(itinerary);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: error.message });
    }
});

router.get('/list', async (req, res) => {
    try {
        const itineraries = await Itinerary.find({ userId: req.user.userId }).sort({ createdAt: -1 });
        res.json(itineraries);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const itinerary = await Itinerary.findOne({ _id: req.params.id, userId: req.user.userId });
        if (!itinerary) return res.status(404).json({ error: 'Itinerary not found' });
        res.json(itinerary);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
