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

const ROUTE_CONFIG = {
  PUBLIC: [
    { path: "/", element: Home },
    { path: "/login", element: Login },
    { path: "/register", element: Register },
    { path: "/otp-verification", element: OtpVerification },
    { path: "/password/forgot", element: ForgotPassword },
    { path: "/password/reset/:token", element: ForgotPassword },
    { path: "/about", element: AboutUs },
    { path: "/contact", element: ContactUs },
  ],
  EMPLOYER: [
    { path: "/", element: Home },
    { path: "/dashboard", element: Dashboard },
    { path: "/post/application/:jobId", element: PostApplication },
    { path: "/about", element: AboutUs },
    { path: "/contact", element: ContactUs },
  ],
  JOB_SEEKER: [{ path: "/jobs", element: Jobs }],
};

const ProtectedRoute = ({ children, role }) => {
  const { isAuthenticated, user, loading } = useSelector((state) => state.user);

  if (loading) return <LoadingSpinner />;
  if (!isAuthenticated) return <Navigate to="/login" replace />;

  // Allow Employer to access specified routes
  if (role === "Employer" && user?.role === "Employer") {
    return children;
  }

  // For Job Seeker, maintain original restriction
  if (role === "Job Seeker" && user?.role !== "Job Seeker") {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
};

const App = () => {
  const dispatch = useDispatch();
  const { user, isAuthenticated } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <ErrorBoundary>
      <Router>
        <div className="min-h-screen flex flex-col">
          <Navbar />
          <main className="flex-grow">
            <Suspense
              fallback={
                <div className="flex items-center justify-center min-h-[60vh]">
                  <LoadingSpinner />
                </div>
              }
            >
              <Routes>
                {/* Render routes based on user authentication and role */}
                {!isAuthenticated &&
                  ROUTE_CONFIG.PUBLIC.map(({ path, element: Element }) => (
                    <Route key={path} path={path} element={<Element />} />
                  ))}

                {isAuthenticated &&
                  user?.role === "Employer" &&
                  ROUTE_CONFIG.EMPLOYER.map(({ path, element: Element }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <ProtectedRoute role="Employer">
                          <Element />
                        </ProtectedRoute>
                      }
                    />
                  ))}

                {isAuthenticated &&
                  user?.role === "Job Seeker" &&
                  ROUTE_CONFIG.JOB_SEEKER.map(({ path, element: Element }) => (
                    <Route
                      key={path}
                      path={path}
                      element={
                        <ProtectedRoute role="Job Seeker">
                          <Element />
                        </ProtectedRoute>
                      }
                    />
                  ))}

                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
          </main>
          <Footer />
          <ToastContainer
            position="top-right"
            theme="dark"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop
            closeOnClick
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
