import { Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import ReportIssue from "./pages/ReportIssue";
import ReportDetails from "./pages/ReportDetails";
import AdminDashboard from "./pages/AdminDashboard";
import MapPage from "./pages/MapPage";
import Notifications from "./pages/Notifications";

import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <Toaster
        position="top-right"
        reverseOrder={false}
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: "12px",
            background: "#111827",
            color: "#ffffff",
            border: "1px solid #374151",
          },
          success: {
            iconTheme: {
              primary: "#22c55e",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#ef4444",
              secondary: "#ffffff",
            },
          },
        }}
      />

      <Routes>

        {/* Authentication */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Report Issue */}

        <Route
          path="/report"
          element={
            <ProtectedRoute>
              <ReportIssue />
            </ProtectedRoute>
          }
        />

        {/* Report Details */}

        <Route
          path="/report/:id"
          element={
            <ProtectedRoute>
              <ReportDetails />
            </ProtectedRoute>
          }
        />

        {/* Interactive Map */}

        <Route
          path="/map"
          element={
            <ProtectedRoute>
              <MapPage />
            </ProtectedRoute>
          }
        />

        {/* Notifications */}

        <Route
          path="/notifications"
          element={
            <ProtectedRoute>
              <Notifications />
            </ProtectedRoute>
          }
        />

        {/* Admin Dashboard */}

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

      </Routes>
    </>
  );
}

export default App;