import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaEdit, FaLock, FaBriefcase, FaClipboard, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa';
import { RiFileEditLine, RiDashboardLine } from 'react-icons/ri';
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
  const baseClasses = "w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-left transition-all duration-200 cursor-pointer";
  const variants = {
    default: active
      ? "bg-blue-600 text-white hover:bg-blue-700"
      : "text-gray-600 hover:bg-blue-50 hover:text-blue-600",
    danger: "text-red-600 hover:bg-red-50"
  };

  return (
    <button 
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]}`}
    >
      <Icon className="w-5 h-5" />
      <span className="font-medium">{children}</span>
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
        return <Analysis  />;
      default:
        return <MyProfile />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="mt-2 text-blue-100">
                Welcome back, <span className="font-semibold text-white">{user?.name}</span>
              </p>
            </div>
            <button
              onClick={() => setShowSidebar(!showSidebar)}
              className="md:hidden inline-flex items-center justify-center p-2 rounded-lg bg-blue-700 hover:bg-blue-800 transition-colors"
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
              w-64 bg-white shadow-lg md:shadow-md rounded-r-lg md:rounded-lg
              ${showSidebar ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
            `}
          >
            <div className="h-full p-6 flex flex-col">
              <div className="space-y-1">
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
                      icon={FaClipboard}
                      onClick={() => setComponentName("Analysis")}
                    >
                      Analysis 
                    </NavButton>
                  </>
                )}

                {user?.role === "Job Seeker" && (
                  <>
                    <div className="my-4 border-t border-gray-200" />
                    <NavButton
                      active={componentName === "My Applications"}
                      icon={FaClipboard}
                      onClick={() => setComponentName("My Applications")}
                    >
                      My Applications
                    </NavButton>
                  </>
                )}

                <div className="my-4 border-t border-gray-200" />
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
          <div className="flex-1 bg-white shadow-md rounded-lg p-6">
            <div className="max-w-4xl mx-auto">
              {renderComponent()}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Overlay */}
      {showSidebar && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 md:hidden"
          onClick={() => setShowSidebar(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;