# Travel Itinerary Planner - Frontend

## 🎨 Premium UI Design

The frontend features a modern, premium design with:

- ✨ **Gradient Backgrounds** - Beautiful color transitions
- 🎭 **Glassmorphism Effects** - Frosted glass aesthetic
- 🎬 **Smooth Animations** - Powered by Framer Motion
- 🎨 **Modern Color Palette** - Indigo, purple, and blue gradients
- 📱 **Fully Responsive** - Works on all devices
- 🌈 **Interactive Elements** - Hover effects and micro-animations

## 🚀 Quick Start

### 1. Install Dependencies

```bash
cd frontend
npm install
```

### 2. Start Development Server

```bash
npm run dev
```

The app will be available at `http://localhost:3000`

### 3. Build for Production

```bash
npm run build
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── components/        # React components
│   │   ├── Login.tsx      # Login page with premium design
│   │   ├── Register.tsx   # Registration page
│   │   ├── Dashboard.tsx  # Trip dashboard with cards
│   │   ├── CreateTrip.tsx # AI trip creation form
│   │   ├── ItineraryView.tsx # Detailed itinerary view
│   │   ├── MapComponent.tsx  # Interactive map with routes
│   │   └── Navbar.tsx     # Navigation bar
│   ├── services/          # API client
│   │   └── api.ts         # Axios instance with interceptors
│   ├── types/             # TypeScript type definitions
│   │   └── index.ts       # All interfaces and types
│   ├── App.tsx            # Main app component
│   ├── main.tsx           # Entry point
│   └── index.css          # Global styles
├── tsconfig.json          # TypeScript configuration
├── vite.config.ts         # Vite configuration
└── package.json           # Dependencies
```

## 🎯 Features

### Authentication
- Beautiful login/register pages with animated gradients
- Form validation
- Auto-redirect on auth failure
- Secure token storage

### Dashboard
- Card-based trip display
- Animated loading states
- Empty state with call-to-action
- Trip statistics

### Trip Creation
- Multi-field form with date validation
- AI-powered itinerary generation
- Real-time feedback
- Loading states with messages

### Itinerary View
- Timeline-based day view
- Activity cards with location info
- Interactive map with route lines
- PDF export functionality
- Back navigation

### Map Features
- Route polylines connecting locations
- Custom markers
- Interactive popups
- Auto-fit bounds
- Responsive design

## 🎨 Design System

### Colors
- **Primary**: Indigo (600-700)
- **Secondary**: Purple (600-700)
- **Accent**: Pink (600-700)
- **Background**: Gradient from slate to indigo

### Typography
- **Headings**: Bold, gradient text
- **Body**: Medium weight, gray tones
- **Labels**: Semibold, smaller size

### Components
- **Cards**: Rounded-3xl with backdrop blur
- **Buttons**: Gradient backgrounds with hover effects
- **Inputs**: Rounded-xl with focus rings
- **Icons**: Lucide React icons

## 🔧 TypeScript

The frontend is fully TypeScript with:

- ✅ Strict type checking
- ✅ Interface definitions for all data
- ✅ Type-safe API calls
- ✅ Proper component props typing
- ✅ No `any` types (except for error handling)

## 📦 Dependencies

### Core
- **React** 18.3.1
- **React Router DOM** 7.11.0
- **TypeScript** 5.6.2
- **Vite** 5.4.10

### UI & Styling
- **TailwindCSS** 4.1.18
- **Framer Motion** 12.23.26
- **Lucide React** 0.562.0

### Map
- **Leaflet** 1.9.4
- **React Leaflet** 5.0.0

### PDF Export
- **jsPDF** 3.0.4
- **jsPDF-AutoTable** 5.0.2

### API
- **Axios** 1.13.2

## 🌐 API Integration

The frontend connects to the backend API at `http://localhost:5000/api`

All API calls include:
- Automatic token injection
- Error handling
- Auto-redirect on 401
- Type-safe responses

## 🎭 Animations

Using Framer Motion for:
- Page transitions
- Card entrance animations
- Loading states
- Hover effects
- Background elements

## 📱 Responsive Design

- Mobile-first approach
- Breakpoints: sm, md, lg, xl
- Flexible layouts
- Touch-friendly interactions
