const mongoose = require('mongoose');

const itinerarySchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    destination: { type: String, required: true },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    preferences: { type: String }, 
    generatedPlan: { type: Object }, // Stores the JSON plan from Gemini
}, { timestamps: true });

module.exports = mongoose.model('Itinerary', itinerarySchema);
