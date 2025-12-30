# Postman API Testing Guide

## 📮 Overview

This guide will help you test all the Travel Itinerary Planner API endpoints using Postman.

## 🚀 Quick Start

### 1. Import Collection

1. Open Postman
2. Click **Import** button
3. Select `postman/Travel-Itinerary-Planner.postman_collection.json`
4. Click **Import**

### 2. Import Environment

1. Click the **Environments** icon (gear icon)
2. Click **Import**
3. Select `postman/Travel-Itinerary-Planner.postman_environment.json`
4. Click **Import**
5. Select **Travel Itinerary Planner - Local** from the environment dropdown

### 3. Start Backend Server

Make sure your backend server is running:

```bash
cd backend
npm run dev
```

The server should be running on `http://localhost:5000`

## 📋 Testing Workflow

### Step 1: Register a New User

**Endpoint:** `POST /api/auth/register`

- This creates a new user account
- Default credentials are in the environment variables
- You can modify `test_username`, `test_email`, and `test_password` in the environment

**Expected Response:**
```json
{
  "message": "User created successfully",
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### Step 2: Login

**Endpoint:** `POST /api/auth/login`

- Logs in with the credentials from Step 1
- **Automatically saves the JWT token** to the environment variable `auth_token`
- This token is used for all subsequent authenticated requests

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "...",
    "username": "testuser",
    "email": "test@example.com"
  }
}
```

### Step 3: Generate an Itinerary

**Endpoint:** `POST /api/itineraries/generate`

- Creates a new AI-powered itinerary
- Requires authentication (uses `auth_token` from Step 2)
- **Automatically saves the itinerary ID** to `itinerary_id` environment variable
- You can modify the request body to test different destinations

**Sample Request:**
```json
{
  "destination": "Paris",
  "startDate": "2024-06-01",
  "endDate": "2024-06-05",
  "preferences": "Historic sites, French cuisine, Art museums, Photography"
}
```

**Expected Response:**
```json
{
  "_id": "...",
  "userId": "...",
  "destination": "Paris",
  "startDate": "2024-06-01T00:00:00.000Z",
  "endDate": "2024-06-05T00:00:00.000Z",
  "preferences": "Historic sites, French cuisine, Art museums, Photography",
  "generatedPlan": {
    "title": "5-Day Paris Adventure",
    "days": [
      {
        "day": 1,
        "date": "2024-06-01",
        "activities": [...]
      }
    ]
  },
  "createdAt": "...",
  "updatedAt": "..."
}
```

### Step 4: List All Itineraries

**Endpoint:** `GET /api/itineraries/list`

- Returns all itineraries for the authenticated user
- Sorted by creation date (newest first)

### Step 5: Get Specific Itinerary

**Endpoint:** `GET /api/itineraries/:id`

- Gets a single itinerary by ID
- Uses the `itinerary_id` saved from Step 3

### Step 6: Update Itinerary

**Endpoint:** `PUT /api/itineraries/:id`

- Updates an existing itinerary
- You can update `destination`, `startDate`, `endDate`, or `preferences`

**Sample Request:**
```json
{
  "preferences": "Updated preferences: More focus on local cuisine and hidden gems"
}
```

### Step 7: Delete Itinerary

**Endpoint:** `DELETE /api/itineraries/:id`

- Deletes an itinerary
- Uses the `itinerary_id` from the environment

## 🔍 Test Scripts

Each request includes automated test scripts that:

- ✅ Verify response status codes
- ✅ Check response structure
- ✅ Automatically save tokens and IDs to environment variables
- ✅ Validate data types

You can see test results in the **Test Results** tab after running a request.

## 🌍 Environment Variables

The collection uses these environment variables:

| Variable | Description | Auto-populated |
|----------|-------------|----------------|
| `base_url` | API base URL | No |
| `test_username` | Test user username | No |
| `test_email` | Test user email | No |
| `test_password` | Test user password | No |
| `auth_token` | JWT authentication token | Yes (from login) |
| `user_id` | Authenticated user ID | Yes (from login) |
| `itinerary_id` | Last created itinerary ID | Yes (from generate) |

## 🔐 Authentication

All itinerary endpoints require authentication. The collection automatically:

1. Saves the token when you login
2. Includes the token in the `Authorization` header for protected routes
3. Uses the format: `Bearer <token>`

## ⚠️ Important Notes

### First Time Setup

1. **Register** a new user first (or use existing credentials)
2. **Login** to get the auth token
3. The token is automatically saved and used for subsequent requests

### Token Expiration

- Tokens expire after 7 days
- If you get a `401 Unauthorized` error, login again to get a new token

### Gemini API Key

- Make sure your backend `.env` file has a valid `GOOGLE_GEMINI_API_KEY`
- Without it, the itinerary generation will fail

### MongoDB

- Ensure MongoDB is running locally or you have a valid MongoDB Atlas connection
- Check the `MONGODB_URI` in your backend `.env` file

## 🐛 Troubleshooting

### "Connection refused" error
- Make sure the backend server is running on port 5000
- Check if `base_url` in environment is correct

### "Invalid credentials" error
- Verify the email and password in the environment variables
- Make sure you registered the user first

### "Token expired" error
- Run the Login request again to get a new token

### "Itinerary not found" error
- Make sure you've generated an itinerary first
- Check if `itinerary_id` environment variable is set

## 📊 Running the Collection

You can run the entire collection in sequence:

1. Click the **...** menu on the collection
2. Select **Run collection**
3. Click **Run Travel Itinerary Planner API**
4. View the test results

**Recommended Order:**
1. Register User
2. Login User
3. Generate Itinerary
4. List User Itineraries
5. Get Itinerary by ID
6. Update Itinerary
7. Delete Itinerary (optional)

## 🎯 Testing Different Scenarios

### Test Different Destinations

Modify the request body in "Generate Itinerary":
- Tokyo, Japan
- New York, USA
- Bali, Indonesia
- Rome, Italy

### Test Different Date Ranges

Try different trip lengths:
- Weekend trip (2-3 days)
- Week-long vacation (7 days)
- Extended trip (10+ days)

### Test Different Preferences

Experiment with various interests:
- "Adventure sports, hiking, camping"
- "Luxury hotels, fine dining, shopping"
- "Budget travel, street food, public transport"
- "Family-friendly, theme parks, beaches"

## 📝 Response Examples

See the **Examples** tab in each request for sample responses.

## 🔗 Additional Resources

- [Postman Documentation](https://learning.postman.com/docs/getting-started/introduction/)
- [Backend API Documentation](../backend/README.md)
- [Frontend Documentation](../frontend/README.md)
