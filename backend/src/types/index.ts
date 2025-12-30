import { Document } from 'mongoose';

// User Types
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
  createdAt: Date;
  updatedAt: Date;
}

// Location Type
export interface ILocation {
  lat: number;
  lng: number;
  name: string;
}

// Activity Type
export interface IActivity {
  time: string;
  activity: string;
  description: string;
  location: ILocation;
}

// Day Type
export interface IDay {
  day: number;
  date: string;
  activities: IActivity[];
}

// Generated Plan Type
export interface IGeneratedPlan {
  title: string;
  days: IDay[];
}

// Itinerary Types
export interface IItinerary extends Document {
  userId: string;
  destination: string;
  startDate: Date;
  endDate: Date;
  preferences?: string;
  generatedPlan?: IGeneratedPlan;
  createdAt: Date;
  updatedAt: Date;
}

// JWT Payload
export interface IJwtPayload {
  userId: string;
}

// API Request Types
export interface IRegisterRequest {
  username: string;
  email: string;
  password: string;
}

export interface ILoginRequest {
  email: string;
  password: string;
}

export interface ICreateItineraryRequest {
  destination: string;
  startDate: string;
  endDate: string;
  preferences?: string;
}

// API Response Types
export interface IAuthResponse {
  token: string;
  user: {
    id: string;
    username: string;
    email: string;
  };
}

export interface IErrorResponse {
  error: string;
}

// Express Request Extensions
declare global {
  namespace Express {
    interface Request {
      user?: IJwtPayload;
    }
  }
}
