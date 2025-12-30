import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import CreateTrip from './components/CreateTrip';
import ItineraryView from './components/ItineraryView';
import { PrivateRouteProps } from './types';

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? <>{children}</> : <Navigate to="/login" />;
};

const App: React.FC = () => {
    return (
        <Router>
            <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 font-sans text-gray-900">
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route
                        path="/"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/create"
                        element={
                            <PrivateRoute>
                                <CreateTrip />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/itinerary/:id"
                        element={
                            <PrivateRoute>
                                <ItineraryView />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </div>
        </Router>
    );
};

export default App;
