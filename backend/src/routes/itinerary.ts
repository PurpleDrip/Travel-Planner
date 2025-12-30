import express, { Request, Response, NextFunction } from 'express';
import Itinerary from '../models/Itinerary';
import { generateItinerary } from '../services/gemini';
import { authenticateToken } from '../middleware/auth';
import { ICreateItineraryRequest } from '../types';
import { AppError } from '../middleware/errorHandler';

const router = express.Router();

// Apply authentication to all routes
router.use(authenticateToken);

// Generate new itinerary
router.post('/generate', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { destination, startDate, endDate, preferences } = req.body as ICreateItineraryRequest;

    // Validation
    if (!destination || !startDate || !endDate) {
      throw new AppError('Destination, start date, and end date are required', 400);
    }

    // Validate dates
    const start = new Date(startDate);
    const end = new Date(endDate);
    
    if (isNaN(start.getTime()) || isNaN(end.getTime())) {
      throw new AppError('Invalid date format', 400);
    }

    if (end < start) {
      throw new AppError('End date must be after start date', 400);
    }

    // Generate itinerary using AI
    const generatedPlan = await generateItinerary(destination, startDate, endDate, preferences);

    // Save to database
    const itinerary = new Itinerary({
      userId: req.user!.userId,
      destination,
      startDate: start,
      endDate: end,
      preferences,
      generatedPlan
    });

    await itinerary.save();

    res.status(201).json(itinerary);
  } catch (error) {
    next(error);
  }
});

// Get all itineraries for user
router.get('/list', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const itineraries = await Itinerary.find({ userId: req.user!.userId })
      .sort({ createdAt: -1 })
      .select('-__v');

    res.json(itineraries);
  } catch (error) {
    next(error);
  }
});

// Get single itinerary by ID
router.get('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      userId: req.user!.userId
    }).select('-__v');

    if (!itinerary) {
      throw new AppError('Itinerary not found', 404);
    }

    res.json(itinerary);
  } catch (error) {
    next(error);
  }
});

// Update itinerary
router.put('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { destination, startDate, endDate, preferences } = req.body;

    const itinerary = await Itinerary.findOne({
      _id: req.params.id,
      userId: req.user!.userId
    });

    if (!itinerary) {
      throw new AppError('Itinerary not found', 404);
    }

    // Update fields if provided
    if (destination) itinerary.destination = destination;
    if (startDate) itinerary.startDate = new Date(startDate);
    if (endDate) itinerary.endDate = new Date(endDate);
    if (preferences !== undefined) itinerary.preferences = preferences;

    await itinerary.save();

    res.json(itinerary);
  } catch (error) {
    next(error);
  }
});

// Delete itinerary
router.delete('/:id', async (req: Request, res: Response, next: NextFunction): Promise<void> => {
  try {
    const itinerary = await Itinerary.findOneAndDelete({
      _id: req.params.id,
      userId: req.user!.userId
    });

    if (!itinerary) {
      throw new AppError('Itinerary not found', 404);
    }

    res.json({ message: 'Itinerary deleted successfully' });
  } catch (error) {
    next(error);
  }
});

export default router;
