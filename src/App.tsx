import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { ThemeProvider } from "./contexts/ThemeContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";
import Landing from "./pages/landing/Landing";
import Login from "./pages/auth/Login";
import Dashboard from "./pages/user/Dashboard";
import AdminDashboard from "./pages/admin/UserManagement";
import Features from "./pages/landing/Features";
import Pricing from "./pages/landing/Pricing";
import Register from "./pages/auth/Register";
import VerifyEmail from "./pages/auth/VerifyEmail";
import ProfilePage from "./pages/user/Profile";
import TranscriptionDetail from "./pages/user/TranscriptionsDetail";
import TranscriptionList from "./pages/user/TranscriptionList";
import ErrorPage from "./pages/error/error";
import GoogleCallback from "./components/GoogleCallback";

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

              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />

              <Route path="/verify/:token" element={<VerifyEmail />} />
               <Route path="/oauth/callback" element={<GoogleCallback />} />

              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <Dashboard />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/transcription"
                element={
                  <ProtectedRoute>
                    <TranscriptionList />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/dashboard/management"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              <Route
                path="/profile"
                element={
                  <ProtectedRoute allowProfile={true}>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard/transcription/:id"
                element={
                  <ProtectedRoute redirectTo="/login">
                    <TranscriptionDetail />
                  </ProtectedRoute>
                }
              />
                <Route path="/404" element={<ErrorPage />} />
                  <Route path="/error" element={<ErrorPage />} />
                  
                  <Route path="*" element={<ErrorPage />} />
            </Routes>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
