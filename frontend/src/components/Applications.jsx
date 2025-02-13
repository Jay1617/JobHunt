import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { Link } from "react-router-dom";
import LoadingSpinner from "../utils/LoadingSpinner";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchEmployerApplications());
  }, [dispatch, error, message]);

  const handleDeleteApplication = (id) => {
    dispatch(deleteApplication(id));
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <LoadingSpinner />
      </div>
    );
  }

  if (applications && applications.length <= 0) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        <div className="text-center p-8 bg-white rounded-2xl shadow-xl max-w-2xl mx-4">
          <h1 className="text-3xl font-bold text-gray-800 mb-4">No Applications Yet</h1>
          <p className="text-gray-600">You currently have no applications from job seekers.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="p-6 sm:p-8 border-b border-gray-100">
            <h3 className="text-3xl font-bold text-gray-800">
              Applications For Your Posted Jobs
            </h3>
          </div>
          <div className="p-6 sm:p-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
              {applications.map((element) => (
                <div
                  key={element._id}
                  className="bg-gray-50 rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
                >
                  <div className="p-6">
                    <div className="mb-6">
                      <h4 className="text-xl font-semibold text-gray-800 mb-4">
                        {element.jobInfo.jobTitle}
                      </h4>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Applicant's Name</p>
                          <p className="text-gray-800">{element.jobSeekerInfo.name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Email</p>
                          <p className="text-gray-800">{element.jobSeekerInfo.email}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Phone</p>
                          <p className="text-gray-800">{element.jobSeekerInfo.phone}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Address</p>
                          <p className="text-gray-800">{element.jobSeekerInfo.address}</p>
                        </div>
                      </div>
                    </div>
                    <div className="mb-6">
                      <p className="text-sm font-medium text-gray-500 mb-2">Cover Letter</p>
                      <textarea
                        value={element.jobSeekerInfo.coverLetter}
                        rows={4}
                        disabled
                        className="w-full bg-white rounded-lg border border-gray-200 p-3 text-gray-700 text-sm resize-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      ></textarea>
                    </div>
                    <div className="flex flex-col sm:flex-row gap-3">
                      <Link
                        to={element.jobSeekerInfo.resume.url}
                        target="_blank"
                        className="flex-1 bg-blue-600 text-white px-4 py-2.5 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-center font-medium"
                      >
                        View Resume
                      </Link>
                      <button
                        onClick={() => handleDeleteApplication(element._id)}
                        className="flex-1 bg-white text-red-600 border-2 border-red-600 px-4 py-2.5 rounded-lg hover:bg-red-50 transition-colors duration-200 font-medium"
                      >
                        Delete Application
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Applications;