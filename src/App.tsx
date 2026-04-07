import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useState } from "react";
import KorvexAuth from "./Auth";
import KorvexDashboard from "./Dashbooard"; // Fixed spelling from "Dashbooard"
import KorvexExplore from "./Search";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <BrowserRouter>
      <Routes>
        {/* Auth Logic */}
        <Route
          path="/"
          element={
            isAuthenticated ? (
              <Navigate to="/dashboard" />
            ) : (
              <KorvexAuth onLoginSuccess={() => setIsAuthenticated(true)} />
            )
          }
        />

        {/* Protected Dashboard Route */}
        <Route
          path="/dashboard"
          element={
            isAuthenticated ? (
              <KorvexDashboard onLogout={() => setIsAuthenticated(false)} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Protected Explore Route - ADDED THIS */}
        <Route
          path="/explore"
          element={
            isAuthenticated ? (
              <KorvexExplore onLogout={() => setIsAuthenticated(false)} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </BrowserRouter>
  );
}
