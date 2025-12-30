# 🌍 Travel Itinerary Planner

> **AI-Powered Trip Planning with TypeScript, React, Node.js, and Google Gemini**

A full-stack web application that generates personalized travel itineraries using AI. Built with modern technologies and featuring a premium, responsive UI.

![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Node.js](https://img.shields.io/badge/Node.js-43853D?style=for-the-badge&logo=node.js&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)

## ✨ Features

### 🤖 AI-Powered Itineraries
- Generate detailed day-by-day travel plans using **Google Gemini AI**
- Personalized recommendations based on your preferences
- Realistic activity timing and location suggestions
- Multiple activities per day with descriptions

### 🎨 Premium UI/UX
- **Modern Design**: Gradient backgrounds, glassmorphism effects
- **Smooth Animations**: Powered by Framer Motion
- **Responsive**: Works perfectly on desktop, tablet, and mobile
- **Interactive Maps**: Route visualization with Leaflet.js
- **Timeline View**: Beautiful day-by-day activity timeline

### 📄 PDF Export
- Professional PDF generation with jsPDF
- Formatted tables with activity details
- Location information included
- Ready to print or share

### 🔐 Secure Authentication
- JWT-based authentication
- Password hashing with bcrypt
- Protected routes
- Auto-redirect on token expiration

### 🗺️ Interactive Maps
- **Leaflet.js** integration
- Route polylines connecting locations
- Custom markers for each activity
- Interactive popups with details
- Auto-fit bounds

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- React 18.3 with TypeScript
- Vite for blazing-fast builds
- TailwindCSS for styling
- Framer Motion for animations
- React Router for navigation
- Axios for API calls
- Leaflet.js for maps
- jsPDF for PDF export

**Backend:**
- Node.js with Express
- TypeScript for type safety
- MongoDB with Mongoose
- JWT for authentication
- Google Gemini AI API
- Bcrypt for password hashing

**Testing:**
- Postman collection included
- Automated test scripts
- Environment configuration

### Project Structure

```
Travel-Itinerary-Planner/
├── backend/                 # Node.js/Express backend
│   ├── src/
│   │   ├── models/         # Mongoose models
│   │   ├── routes/         # API routes
│   │   ├── services/       # Business logic (Gemini AI)
│   │   ├── middleware/     # Auth & error handling
│   │   ├── types/          # TypeScript interfaces
│   │   └── server.ts       # Main server file
│   ├── tsconfig.json
│   └── package.json
│
├── frontend/               # React frontend
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── services/      # API client
│   │   ├── types/         # TypeScript interfaces
│   │   ├── App.tsx
│   │   └── main.tsx
│   ├── tsconfig.json
│   └── package.json
│
├── postman/               # API testing
│   ├── Travel-Itinerary-Planner.postman_collection.json
│   └── Travel-Itinerary-Planner.postman_environment.json
│
├── POSTMAN_GUIDE.md      # API testing guide
└── README.md             # This file
```

## 🚀 Quick Start

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas)
- **Google Gemini API Key** ([Get one here](https://makersuite.google.com/app/apikey))

### 1. Clone the Repository

```bash
git clone https://github.com/PurpleDrip/Travel-Planner.git
cd Travel-Planner
```

### 2. Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/travel_planner
JWT_SECRET=your_super_secret_jwt_key_change_this_in_production
GOOGLE_GEMINI_API_KEY=YOUR_ACTUAL_GEMINI_API_KEY_HERE
NODE_ENV=development
```

> ⚠️ **IMPORTANT**: Replace `YOUR_ACTUAL_GEMINI_API_KEY_HERE` with your real API key!

Start the backend:

```bash
npm run dev
```

Backend will run on `http://localhost:5000`

### 3. Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Frontend will run on `http://localhost:3000`

### 4. Test with Postman

1. Import `postman/Travel-Itinerary-Planner.postman_collection.json`
2. Import `postman/Travel-Itinerary-Planner.postman_environment.json`
3. Follow the [Postman Guide](POSTMAN_GUIDE.md)

## 📖 Usage

### Creating Your First Trip

1. **Register/Login**: Create an account or sign in
2. **Plan Trip**: Click "Plan New Trip"
3. **Enter Details**:
   - Destination (e.g., "Paris, France")
   - Start and end dates
   - Preferences (e.g., "Historic sites, French cuisine, Art museums")
4. **Generate**: Click "Generate AI Itinerary"
5. **View**: See your personalized day-by-day itinerary
6. **Export**: Download as PDF

### Viewing Itineraries

- **Dashboard**: See all your trips
- **Details**: Click any trip to view full itinerary
- **Map**: Interactive map shows all locations
- **Timeline**: Day-by-day activity breakdown

## 🎯 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user

### Itineraries
- `POST /api/itineraries/generate` - Generate AI itinerary
- `GET /api/itineraries/list` - Get all user itineraries
- `GET /api/itineraries/:id` - Get specific itinerary
- `PUT /api/itineraries/:id` - Update itinerary
- `DELETE /api/itineraries/:id` - Delete itinerary

### Health
- `GET /health` - Server health check

See [Postman Guide](POSTMAN_GUIDE.md) for detailed API documentation.

## 🎨 UI Showcase

### Design Highlights

- **Login/Register**: Animated gradient backgrounds with glassmorphism
- **Dashboard**: Card-based layout with smooth hover effects
- **Create Trip**: Multi-step form with real-time validation
- **Itinerary View**: Timeline design with route visualization
- **Maps**: Interactive with route polylines

### Color Palette

- Primary: Indigo (600-700)
- Secondary: Purple (600-700)
- Accent: Pink (600-700)
- Background: Gradient from slate to indigo

## 🔧 Development

### Backend Development

```bash
cd backend
npm run dev      # Development with hot reload
npm run build    # Build TypeScript
npm start        # Production mode
```

### Frontend Development

```bash
cd frontend
npm run dev      # Development server
npm run build    # Production build
npm run preview  # Preview production build
```

### TypeScript

Both frontend and backend use **strict TypeScript** with:
- No implicit any
- Strict null checks
- Proper interface definitions
- Type-safe API calls

## 📦 Production Build

### Backend

```bash
cd backend
npm run build
npm start
```

### Frontend

```bash
cd frontend
npm run build
```

Deploy the `dist` folder to your hosting service.

## 🐛 Troubleshooting

### Backend won't start
- Check if MongoDB is running
- Verify `.env` file exists with all variables
- Ensure Gemini API key is valid

### Frontend build errors
- Delete `node_modules` and reinstall
- Clear Vite cache: `rm -rf node_modules/.vite`
- Check TypeScript errors: `npm run build`

### API errors
- Check backend is running on port 5000
- Verify CORS is enabled
- Check network tab in browser DevTools

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**PurpleDrip**
- GitHub: [@PurpleDrip](https://github.com/PurpleDrip)

## 🙏 Acknowledgments

- **Google Gemini AI** for intelligent itinerary generation
- **OpenStreetMap** for map tiles
- **Lucide** for beautiful icons
- **Framer Motion** for smooth animations

## 📞 Support

For issues or questions:
1. Check the [Postman Guide](POSTMAN_GUIDE.md)
2. Review backend/frontend READMEs
3. Open an issue on GitHub

---

**Made with ❤️ and TypeScript**
