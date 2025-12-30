// User Types
export interface User {
  id: string;
  username: string;
  email: string;
}

// Location Type
export interface Location {
  lat: number;
  lng: number;
  name: string;
}

// Activity Type
export interface Activity {
  time: string;
  activity: string;
  description: string;
  location: Location;
}

// Day Type
export interface Day {
  day: number;
  date: string;
  activities: Activity[];
}

// Generated Plan Type
export interface GeneratedPlan {
  title: string;
  days: Day[];
}

// Itinerary Type
export interface Itinerary {
  _id: string;
  userId: string;
  destination: string;
  startDate: string;
  endDate: string;
  preferences?: string;
  generatedPlan?: GeneratedPlan;
  createdAt: string;
  updatedAt: string;
}

// Auth Types
export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  user: User;
}

// API Request Types
export interface CreateItineraryRequest {
  destination: string;
  startDate: string;
  endDate: string;
  preferences?: string;
}

// Component Props Types
export interface PrivateRouteProps {
  children: React.ReactNode;
}

export interface MapComponentProps {
  activities?: Activity[];
  center?: [number, number];
  zoom?: number;
}

export interface ItineraryCardProps {
  itinerary: Itinerary;
}

// Error Response Type
export interface ErrorResponse {
  error: string;
  details?: string;
}
