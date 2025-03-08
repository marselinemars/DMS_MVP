import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import DashboardPage from "./pages/DashboardPage";
import LoginPage from "./pages/LoginPage";
import UserPage from "./pages/UserPage";
import DocumentPage from "./pages/DocumentsPage";
import "./styles/App.css";

// Helper function to check if the user is logged in
const isAuthenticated = () => {
  return localStorage.getItem("authUser") !== null;
};

// Protected Layout Wrapper (Only for Authenticated Users)
const AuthenticatedLayout = ({ children }) => {
  return (
    <div className="app-container">
      <Sidebar />
      <div className="main-content">
        <Navbar />
        <div className="page-content">{children}</div>
      </div>
    </div>
  );
};

// Protected Route Component
const ProtectedRoute = ({ element }) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Routes>
      {/* Login Page (Fully Separate, No Sidebar or Navbar) */}
      <Route path="/login" element={<LoginPage />} />

      {/* Authenticated Routes Wrapped in Layout */}
      <Route
        path="/"
        element={
          <ProtectedRoute
            element={
              <AuthenticatedLayout>
                <DashboardPage />
              </AuthenticatedLayout>
            }
          />
        }
      />
      <Route
        path="/users"
        element={
          <ProtectedRoute
            element={
              <AuthenticatedLayout>
                <UserPage />
              </AuthenticatedLayout>
            }
          />
        }
      />
      <Route
        path="/documents"
        element={
          <ProtectedRoute
            element={
              <AuthenticatedLayout>
                <DocumentPage />
              </AuthenticatedLayout>
            }
          />
        }
      />

      {/* Redirect unknown routes */}
      <Route
        path="*"
        element={<Navigate to={isAuthenticated() ? "/" : "/login"} />}
      />
    </Routes>
  );
};

export default App;
