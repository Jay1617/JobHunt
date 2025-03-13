import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  resetApplicationSlice,
  deleteApplication,
  fetchJobSeekerApplications,
} from "../store/slices/applicationSlice";
import LoadingSpinner from "../utils/LoadingSpinner";

const MyApplications = () => {
  const { user, isAuthenticated } = useSelector((state) => state.user);
  const { loading, error, applications, message } = useSelector(
    (state) => state.applications
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobSeekerApplications());
  }, []);

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
      dispatch(fetchJobSeekerApplications());
    }
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  return (
    <>
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <LoadingSpinner />
        </div>
      ) : applications && applications.length <= 0 ? (
        <div className="text-center bg-blue-50 rounded-xl shadow-md p-10 animate-fadeIn">
          <div className="w-20 h-20 mx-auto mb-6 bg-blue-100 rounded-full flex items-center justify-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-10 w-10 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-3">
            No Applications Found
          </h1>
          <p className="text-gray-600 mb-6">
            You haven't applied for any jobs yet. Start exploring opportunities!
          </p>
          <Link
            to="/jobs"
            className="inline-block bg-gradient-to-r from-blue-600 to-blue-800 text-white font-medium py-3 px-6 rounded-lg hover:shadow-lg transform hover:-translate-y-1 transition-all duration-300"
          >
            Browse Available Jobs
          </Link>
        </div>
      ) : (
        <div>
          <div className="mb-6 flex items-center justify-between">
            <div>
              <h3 className="text-xl font-bold text-blue-800">
                My Applications{" "}
                <span className="ml-2 bg-blue-100 text-blue-800 text-sm py-1 px-3 rounded-full">
                  {applications.length}
                </span>
              </h3>
              <p className="text-sm text-gray-500">
                Track the status of your job applications
              </p>
            </div>
            <Link
              to="/jobs"
              className="text-sm bg-blue-50 hover:bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg transition-colors duration-200"
            >
              Find More Jobs
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-6">
            {applications.map((element) => (
              <div
                key={element._id}
                className="bg-white rounded-xl border border-gray-100 shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-blue-600 to-blue-800 py-3 px-6">
                  <h4 className="text-white font-semibold">
                    {element.jobInfo.jobTitle}
                  </h4>
                  <p className="text-blue-100 text-sm">
                    Applied on {new Date().toLocaleDateString()}
                  </p>
                </div>
                <div className="p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Left column: Applicant Info */}
                    <div>
                      <h5 className="font-medium text-blue-800 mb-3 pb-2 border-b border-gray-100">
                        Applicant Information
                      </h5>
                      <div className="space-y-3">
                        <p className="text-gray-700 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                            />
                          </svg>
                          <span className="font-medium text-gray-900">
                            Name:
                          </span>
                          <span className="ml-2">
                            {element.jobSeekerInfo.name}
                          </span>
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          <span className="font-medium text-gray-900">
                            Email:
                          </span>
                          <span className="ml-2">
                            {element.jobSeekerInfo.email}
                          </span>
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          <span className="font-medium text-gray-900">
                            Phone:
                          </span>
                          <span className="ml-2">
                            {element.jobSeekerInfo.phone}
                          </span>
                        </p>
                        <p className="text-gray-700 flex items-center">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 mr-2 text-blue-500"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                          </svg>
                          <span className="font-medium text-gray-900">
                            Address:
                          </span>
                          <span className="ml-2">
                            {element.jobSeekerInfo.address}
                          </span>
                        </p>
                      </div>
                    </div>

                    {/* Right column: Cover Letter */}
                    <div>
                      <h5 className="font-medium text-blue-800 mb-3 pb-2 border-b border-gray-100">
                        Cover Letter
                      </h5>
                      <div className="bg-blue-50 rounded-lg p-4 border border-blue-100 max-h-48 overflow-y-auto">
                        <p className="text-gray-700 whitespace-pre-line text-sm leading-relaxed">
                          {element.jobSeekerInfo.coverLetter}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 mt-6 pt-4 border-t border-gray-100">
                    <button
                      onClick={() => handleDeleteApplication(element._id)}
                      className="bg-gradient-to-r from-red-500 to-red-600 text-white px-4 py-2 rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-300 flex-1 text-center flex items-center justify-center font-medium cursor-pointer"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                        />
                      </svg>
                      Delete Application
                    </button>
                    <Link
                      to={element.jobSeekerInfo.resume.url}
                      target="_blank"
                      className="bg-gradient-to-r from-blue-600 to-blue-800 text-white px-4 py-2 rounded-lg hover:from-blue-700 hover:to-blue-900 shadow-md hover:shadow-lg transition-all duration-300 flex-1 text-center flex items-center justify-center font-medium"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 mr-2"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                      View Resume
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MyApplications;
