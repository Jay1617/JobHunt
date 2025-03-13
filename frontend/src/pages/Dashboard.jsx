import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEdit, FaLock, FaBriefcase, FaClipboard, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { RiFileEditLine, RiDashboardLine, RiLineChartLine } from 'react-icons/ri';
import { logout, clearAllUserErrors } from '../store/slices/userSlice';
import { toast } from 'react-toastify';
import MyProfile from "../components/MyProfile";
import UpdateProfile from "../components/UpdateProfile";
import UpdatePassword from "../components/UpdatePassword";
import MyJobs from "../components/MyJobs";
import JobPost from "../components/JobPost";
import Applications from "../components/Applications";
import Analysis from './Analysis';
import MyApplications from "../components/MyApplications";

const NavButton = ({ active, icon: Icon, children, onClick, variant = "default" }) => {
  const baseClasses = "w-full flex items-center gap-3 px-4 py-3 rounded-lg text-left transition-all duration-200 cursor-pointer";
  const variants = {
    default: active
      ? "bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      : "text-gray-700 hover:bg-blue-50 hover:text-blue-600 hover:shadow",
    danger: "text-red-600 hover:bg-red-50 hover:shadow transform hover:scale-105 transition-transform"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      <Icon className={`w-5 h-5 ${active ? 'text-white' : ''}`} />
      <span className={`font-medium ${active ? 'text-white' : ''}`}>{children}</span>
    </button>
  );
};

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [componentName, setComponentName] = useState("My Profile");

  const { isAuthenticated, error, user } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logged out successfully.");
    navigate("/");
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllUserErrors());
    }
    if (!isAuthenticated) {
      navigate("/");
    }
  }, [dispatch, error, isAuthenticated, navigate]);

  const renderComponent = () => {
    switch (componentName) {
      case "My Profile":
        return <MyProfile />;
      case "Update Profile":
        return <UpdateProfile />;
      case "Update Password":
        return <UpdatePassword />;
      case "Job Post":
        return <JobPost />;
      case "My Jobs":
        return <MyJobs />;  
      case "Applications":
        return <Applications />;
      case "My Applications":
        return <MyApplications />;
      case "Analysis":
        return <Analysis />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="animate-fadeIn">
              <h1 className="text-3xl font-bold tracking-tight flex items-center">
                <RiDashboardLine className="mr-3 h-8 w-8 text-blue-200" />
                {user?.role === "Employer" ? "Employer Dashboard" : "Job Seeker Dashboard"}
              </h1>
              <p className="mt-2 text-blue-100 flex items-center">
                <FaUser className="mr-2 h-4 w-4" />
                Welcome back, <span className="font-semibold text-white ml-1 underline decoration-2 decoration-blue-300">{user?.name}</span>
              </p>
            </div>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors shadow-md focus:outline-none focus:ring-2 focus:ring-white focus:ring-opacity-50"
            >
              {showSidebar ? (
                <FaTimes className="w-6 h-6" />
              ) : (
                <FaBars className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div
            className={`
              fixed md:relative inset-y-0 left-0 z-30
              transform md:transform-none transition-transform duration-300 ease-in-out
              w-72 bg-white shadow-xl md:shadow-lg rounded-r-xl md:rounded-xl
              ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
              border-r md:border-r-0 border-gray-100
            `}
          >
            <div className="h-full p-6 flex flex-col">
              <div className="mb-6 pb-4 border-b border-gray-200">
                <div className="flex items-center justify-center mb-4">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center shadow-lg border-4 border-white">
                    <span className="text-white text-2xl font-bold">
                      {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
                    </span>
                  </div>
                </div>
                <h2 className="text-center text-lg font-semibold text-gray-800">
                  {user?.name}
                </h2>
                <p className="text-center text-sm text-blue-600 font-medium mt-1 bg-blue-50 rounded-full py-1">
                  {user?.role}
                </p>
              </div>
              
              <div className="space-y-2 mb-auto">
                <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2 pl-4">
                  Account
                </p>
                <NavButton
                  active={componentName === "My Profile"}
                  icon={FaUser}
                  onClick={() => setComponentName("My Profile")}
                >
                  My Profile
                </NavButton>
                <NavButton
                  active={componentName === "Update Profile"}
                  icon={FaEdit}
                  onClick={() => setComponentName("Update Profile")}
                >
                  Update Profile
                </NavButton>
                <NavButton
                  active={componentName === "Update Password"}
                  icon={FaLock}
                  onClick={() => setComponentName("Update Password")}
                >
                  Update Password
                </NavButton>

                {user?.role === "Employer" && (
                  <>
                    <div className="my-4 border-t border-gray-200" />
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2 pl-4">
                      Job Management
                    </p>
                    <NavButton
                      active={componentName === "Job Post"}
                      icon={FaBriefcase}
                      onClick={() => setComponentName("Job Post")}
                    >
                      Post New Job
                    </NavButton>
                    <NavButton
                      active={componentName === "My Jobs"}
                      icon={RiFileEditLine}
                      onClick={() => setComponentName("My Jobs")}
                    >
                      My Jobs
                    </NavButton>
                    <NavButton
                      active={componentName === "Applications"}
                      icon={FaClipboard}
                      onClick={() => setComponentName("Applications")}
                    >
                      Applications
                    </NavButton>
                    <NavButton
                      active={componentName === "Analysis"}
                      icon={RiLineChartLine}
                      onClick={() => setComponentName("Analysis")}
                    >
                      Match With AI
                    </NavButton>
                  </>
                )}

                {user?.role === "Job Seeker" && (
                  <>
                    <div className="my-4 border-t border-gray-200" />
                    <p className="text-xs font-semibold text-blue-600 uppercase tracking-wider mb-2 pl-4">
                      Applications
                    </p>
                    <NavButton
                      active={componentName === "My Applications"}
                      icon={FaClipboard}
                      onClick={() => setComponentName("My Applications")}
                    >
                      My Applications
                    </NavButton>
                  </>
                )}
              </div>

              <div className="mt-6 pt-4 border-t border-gray-200">
                <NavButton
                  icon={FaSignOutAlt}
                  onClick={handleLogout}
                  variant="danger"
                >
                  Logout
                </NavButton>
              </div>
            </div>
          </div>

          {/* Main Content Area */}
          <div className="flex-1">
            <div className="bg-white shadow-lg rounded-xl p-6 transition-all duration-300 hover:shadow-xl border border-gray-100">
              <div className="max-w-4xl mx-auto">
                {renderComponent()}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-60 z-20 md:hidden backdrop-blur-sm transition-all duration-300"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;