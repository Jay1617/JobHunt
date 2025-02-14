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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      {loading ? (
        <LoadingSpinner />
      ) : applications && applications.length <= 0 ? (
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-gray-800">
            You have not applied for any job.
          </h1>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg p-8">
            <h3 className="text-2xl font-bold text-gray-800 mb-6">
              My Applications for Jobs
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {applications.map((element) => (
                <div
                  key={element._id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 p-6"
                >
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Job Title:</span>{" "}
                    {element.jobInfo.jobTitle}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Name:</span>{" "}
                    {element.jobSeekerInfo.name}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Email:</span>{" "}
                    {element.jobSeekerInfo.email}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Phone:</span>{" "}
                    {element.jobSeekerInfo.phone}
                  </p>
                  <p className="text-gray-700 mb-2">
                    <span className="font-semibold">Address:</span>{" "}
                    {element.jobSeekerInfo.address}
                  </p>
                  <p className="text-gray-700 mb-4">
                    <span className="font-semibold">Cover Letter:</span>
                    <textarea
                      value={element.jobSeekerInfo.coverLetter}
                      rows={5}
                      disabled
                      className="w-full mt-2 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() => handleDeleteApplication(element._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-all duration-300 flex-1 text-center"
                    >
                      Delete Application
                    </button>
                    <Link
                      to={element.jobSeekerInfo.resume.url}
                      target="_blank"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex-1 text-center"
                    >
                      View Resume
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyApplications;
