import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/admin/Dashboard"; // Make sure to import AdminDashboard
import Features from "./pages/Features";
import Pricing from "./pages/Pricing";
import Register from "./pages/Register";
import VerifyEmail from "./pages/VerifyEmail";
import ProfilePage from "./pages/Profile";
import MeetingDetail from "./pages/user/MeetingDetail";

function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors duration-300">
            <Header />
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/features" element={<Features />} />
              <Route path="/pricing" element={<Pricing />} />

              {/* Halaman Login dan Register dengan proteksi */}
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />


              <Route path="/verify/:token" element={<VerifyEmail />} />

              {/* Protected routes untuk dashboard */}
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Allow access to profile page for both admin and user */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowProfile={true}>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
  path="/dashboard/meeting/:id"
  element={
    <ProtectedRoute redirectTo="/login"> {/* Redirect to login if the user isn't authenticated */}
      <MeetingDetail /> {/* The component to show the meeting details */}
    </ProtectedRoute>
  }
/>
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
