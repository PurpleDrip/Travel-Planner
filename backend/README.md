# Travel Itinerary Planner - Backend Setup

## 📋 Prerequisites

Before running the backend, ensure you have:

1. **Node.js** (v18 or higher)
2. **MongoDB** (running locally or MongoDB Atlas connection string)
3. **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

## 🚀 Setup Instructions

### 1. Install Dependencies

```bash
cd backend
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the `backend` directory:

```bash
cp .env.example .env
```

Then edit `.env` and fill in your actual values:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel_planner
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
GOOGLE_GEMINI_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY_HERE
NODE_ENV=development
```

> **⚠️ IMPORTANT**: Replace `YOUR_ACTUAL_GEMINI_API_KEY_HERE` with your actual Google Gemini API key!

### 3. Start MongoDB

If using local MongoDB:

```bash
mongod
```

Or use MongoDB Atlas and update the `MONGODB_URI` in your `.env` file.

### 4. Run the Backend

**Development mode** (with auto-reload):

```bash
npm run dev
```

**Production mode**:

```bash
npm run build
npm start
```

## 📡 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Itineraries

- `POST /api/itineraries/generate` - Generate new itinerary (requires auth)
- `GET /api/itineraries/list` - Get all user itineraries (requires auth)
- `GET /api/itineraries/:id` - Get specific itinerary (requires auth)
- `PUT /api/itineraries/:id` - Update itinerary (requires auth)
- `DELETE /api/itineraries/:id` - Delete itinerary (requires auth)

### Health Check

- `GET /health` - Server health check

## 🔧 TypeScript

The backend is now fully TypeScript! Benefits:

- ✅ Type safety across all routes and models
- ✅ Better IDE autocomplete
- ✅ Catch errors at compile time
- ✅ Improved code maintainability

## 📁 Project Structure

```
backend/
├── src/
│   ├── models/          # Mongoose models (User, Itinerary)
│   ├── routes/          # Express routes (auth, itinerary)
│   ├── services/        # Business logic (Gemini AI)
│   ├── middleware/      # Custom middleware (auth, errorHandler)
│   ├── types/           # TypeScript type definitions
│   └── server.ts        # Main server file
├── dist/                # Compiled JavaScript (generated)
├── tsconfig.json        # TypeScript configuration
└── package.json         # Dependencies and scripts
```

## 🧪 Testing

Use the Postman collection (coming soon) to test all endpoints.

## 🐛 Troubleshooting

### "GOOGLE_GEMINI_API_KEY is not defined"

Make sure you've created a `.env` file and added your Gemini API key.

### "MongoDB Connection Error"

- Ensure MongoDB is running
- Check your `MONGODB_URI` in `.env`
- For MongoDB Atlas, ensure your IP is whitelisted

### TypeScript Errors

Run the TypeScript compiler to check for errors:

```bash
npm run build
```
