import React, { useState, useRef, useEffect, useCallback } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from "../store/slices/userSlice";
import { UserCircle, ChevronDown, LogOut, User, Menu, X } from 'lucide-react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Navbar = () => {
  const [showMobile, setShowMobile] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Handle clicking outside dropdown
  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setShowDropdown(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);

  const handleLogout = () => {
    dispatch(logout());
    setShowDropdown(false);
    toast.success("Logged out successfully!");
    navigate('/');
  };

  const NavLink = ({ to, children }) => (
    <Link
      to={to}
      className="relative group px-3 py-2 text-gray-600 hover:text-blue-600 transition-colors duration-300"
    >
      <span>{children}</span>
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></span>
    </Link>
  );

  return (
    <nav className="bg-white border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              to="/" 
              className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent hover:from-blue-700 hover:to-blue-900 transition-all duration-300"
            >
              JobHunt
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {/* Common Links for All Users */}
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About Us</NavLink>
            <NavLink to="/contact">Contact Us</NavLink>

            {/* Role-Based Links */}
            {isAuthenticated && user?.role === "Job Seeker" && (
              <NavLink to="/jobs">Jobs</NavLink>
            )}

            {/* Profile Dropdown for Authenticated Users */}
            {isAuthenticated ? (
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown(!showDropdown)}
                  className="flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
                >
                  <UserCircle className="h-6 w-6" />
                  <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${showDropdown ? 'rotate-180' : ''}`} />
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg py-1 border border-gray-100 transform origin-top-right transition-all duration-200 z-50">
                    {user?.role === "Job Seeker" && (
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        onClick={() => setShowDropdown(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    )}
                    {user?.role === "Employer" && (
                      <Link
                        to="/dashboard"
                        className="flex items-center px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors duration-200"
                        onClick={() => setShowDropdown(false)}
                      >
                        <User className="h-4 w-4 mr-2" />
                        Dashboard
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="flex items-center w-full px-4 py-2 text-gray-600 hover:text-red-600 hover:bg-red-50 transition-colors duration-200 cursor-pointer"
                    >
                      <LogOut className="h-4 w-4 mr-2" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setShowMobile(!showMobile)}
            className="md:hidden p-2 rounded-md text-gray-600 hover:text-blue-600 transition-colors duration-300 cursor-pointer"
          >
            {showMobile ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {showMobile && (
          <div className="md:hidden pb-6 pt-2">
            <div className="flex flex-col space-y-3">
              {/* Common Links for All Users */}
              <Link
                to="/"
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200"
                onClick={() => setShowMobile(false)}
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200"
                onClick={() => setShowMobile(false)}
              >
                About Us
              </Link>
              <Link
                to="/contact"
                className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200"
                onClick={() => setShowMobile(false)}
              >
                Contact Us
              </Link>

              {/* Role-Based Links */}
              {isAuthenticated && user?.role === "Job Seeker" && (
                <Link
                  to="/jobs"
                  className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200"
                  onClick={() => setShowMobile(false)}
                >
                  Jobs
                </Link>
              )}

              {/* Profile/Dashboard Links for Authenticated Users */}
              {isAuthenticated && (
                <>
                  {user?.role === "Job Seeker" && (
                    <Link
                      to="/profile"
                      className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200"
                      onClick={() => setShowMobile(false)}
                    >
                      Profile
                    </Link>
                  )}
                  {user?.role === "Employer" && (
                    <Link
                      to="/dashboard"
                      className="text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200"
                      onClick={() => setShowMobile(false)}
                    >
                      Dashboard
                    </Link>
                  )}
                  <button
                    onClick={() => {
                      handleLogout();
                      setShowMobile(false);
                    }}
                    className="text-left text-gray-600 hover:text-blue-600 hover:bg-blue-50 px-3 py-2 rounded-md transition-colors duration-200 cursor-pointer"
                  >
                    Logout
                  </button>
                </>
              )}

              {/* Login Button for Non-Authenticated Users */}
              {!isAuthenticated && (
                <Link
                  to="/login"
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-full hover:bg-blue-700 transition-colors duration-300 shadow-md hover:shadow-lg mx-3"
                  onClick={() => setShowMobile(false)}
                >
                  Login
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;