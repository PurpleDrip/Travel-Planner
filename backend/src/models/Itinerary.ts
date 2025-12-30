import mongoose, { Schema } from 'mongoose';
import { IItinerary } from '../types';

const locationSchema = new Schema({
  lat: { type: Number, required: true },
  lng: { type: Number, required: true },
  name: { type: String, required: true }
}, { _id: false });

const activitySchema = new Schema({
  time: { type: String, required: true },
  activity: { type: String, required: true },
  description: { type: String, required: true },
  location: { type: locationSchema, required: true }
}, { _id: false });

const daySchema = new Schema({
  day: { type: Number, required: true },
  date: { type: String, required: true },
  activities: [activitySchema]
}, { _id: false });

const generatedPlanSchema = new Schema({
  title: { type: String, required: true },
  days: [daySchema]
}, { _id: false });

const itinerarySchema = new Schema<IItinerary>({
  userId: { 
    type: String, 
    required: true,
    index: true
  },
  destination: { 
    type: String, 
    required: true,
    trim: true
  },
  startDate: { 
    type: Date, 
    required: true 
  },
  endDate: { 
    type: Date, 
    required: true
  },
  preferences: { 
    type: String,
    trim: true
  },
  generatedPlan: { 
    type: generatedPlanSchema,
    required: false
  }
}, { 
  timestamps: true 
});

// Index for faster queries
itinerarySchema.index({ userId: 1, createdAt: -1 });

export default mongoose.model<IItinerary>('Itinerary', itinerarySchema);
