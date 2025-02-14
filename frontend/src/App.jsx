import React, { useEffect, Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { getUser } from "./store/slices/userSlice";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import ErrorBoundary from "./utils/ErrorBoundary";
import LoadingSpinner from "./utils/LoadingSpinner";

const Home = lazy(() => import("./pages/Home"));
const Jobs = lazy(() => import("./pages/Jobs"));
const Dashboard = lazy(() => import("./pages/Dashboard"));
const PostApplication = lazy(() => import("./pages/PostApplication"));
const Login = lazy(() => import("./pages/Login"));
const Register = lazy(() => import("./pages/Register"));
const OtpVerification = lazy(() => import("./pages/OtpVerification"));
const ForgotPassword = lazy(() => import("./pages/ForgotPassword"));
const NotFound = lazy(() => import("./pages/NotFound"));
const AboutUs = lazy(() => import("./pages/AboutUs"));
const ContactUs = lazy(() => import("./pages/ContactUs"));

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to="/dashboard" replace />;

  return children;
};

const AuthRoute = ({ children }) => {
  const { isAuthenticated, loading } = useSelector((state) => state.user);

  if (loading) return <LoadingSpinner />;
  if (isAuthenticated) return <Navigate to="/dashboard" replace />;

  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated, loading } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Public Routes */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<AboutUs />} />
                <Route path="/contact" element={<ContactUs />} />

                <Route
                  path="/login"
                  element={
                    <AuthRoute>
                      <Login />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/register"
                  element={
                    <AuthRoute>
                      <Register />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/verify-otp/:email"
                  element={
                    <AuthRoute>
                      <OtpVerification />
                    </AuthRoute>
                  }
                />
                <Route
                  path="/password/forgot"
                  element={
                    <AuthRoute>
                      <ForgotPassword />
                    </AuthRoute>
                  }
                />

                {/* Protected Routes */}
                <Route
                  path="/dashboard"
                  element={
                    <ProtectedRoute>
                      <Dashboard />
                    </ProtectedRoute>
                  }
                />

                {/* Job Seeker-specific Routes */}
                <Route
                  path="/jobs"
                  element={
                    <ProtectedRoute role="Job Seeker">
                      <Jobs />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="/post/application/:jobId"
                  element={
                    <ProtectedRoute role="Job Seeker">
                      <PostApplication />
                    </ProtectedRoute>
                  }
                />

                {/* 404 Page */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <ToastContainer position="bottom-right" theme="light" autoClose={5000} />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;