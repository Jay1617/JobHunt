import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  clearAllApplicationErrors,
  postApplication,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { toast } from "react-toastify";
import { fetchSingleJob } from "../store/slices/jobSlice";
import { IoMdCash, IoMdDocument } from "react-icons/io";
import { FaToolbox, FaRegClock, FaCheckCircle, FaUserTie } from "react-icons/fa";
import { FaLocationDot, FaCircleInfo } from "react-icons/fa6";
import { BsBuildingsFill } from "react-icons/bs";

const PostApplication = () => {
  const { singleJob } = useSelector((state) => state.jobs);
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector(
    (state) => state.applications
  );

  const { jobId } = useParams();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [coverLetter, setCoverLetter] = useState("");
  const [resume, setResume] = useState("");
  const [resumeFileName, setResumeFileName] = useState("");

  const navigateTo = useNavigate();
  const dispatch = useDispatch();

  const handlePostApplication = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", name);
    formData.append("email", email);
    formData.append("phone", phone);
    formData.append("address", address);
    formData.append("coverLetter", coverLetter);
    if (resume) {
      formData.append("resume", resume);
    }
    dispatch(postApplication(formData, jobId));
  };

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
      setPhone(user.phone || "");
      setAddress(user.address || "");
      setCoverLetter(user.coverLetter || "");
      setResume((user.resume && user.resume.url) || "");
      if (user.resume && user.resume.url) {
        const fileName = user.resume.url.split("/").pop();
        setResumeFileName(fileName || "Current Resume");
      }
    }
    if (error) {
      toast.error(error);
      dispatch(clearAllApplicationErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetApplicationSlice());
    }
    dispatch(fetchSingleJob(jobId));
  }, [dispatch, error, message, jobId, user]);

  let qualifications = [];
  let responsibilities = [];
  let offering = [];
  if (singleJob.qualifications) {
    qualifications = singleJob.qualifications.split(". ");
  }
  if (singleJob.responsibilities) {
    responsibilities = singleJob.responsibilities.split(". ");
  }
  if (singleJob.offers) {
    offering = singleJob.offers.split(". ");
  }

  const resumeHandler = (e) => {
    const file = e.target.files[0];
    if (file) {
      setResume(file);
      setResumeFileName(file.name);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-12 px-4">
      {/* Job Title Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-600">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{singleJob.title}</h1>
              <div className="flex flex-wrap items-center mt-2 text-gray-600">
                <div className="flex items-center mr-6 mb-2">
                  <BsBuildingsFill className="text-blue-600 mr-2" />
                  <span>{singleJob.companyName}</span>
                </div>
                <div className="flex items-center mr-6 mb-2">
                  <FaLocationDot className="text-blue-600 mr-2" />
                  <span>{singleJob.location}</span>
                </div>
                <div className="flex items-center mb-2">
                  <IoMdCash className="text-blue-600 mr-2" />
                  <span>₹{singleJob.salary}</span>
                </div>
              </div>
            </div>
            <div className="mt-4 md:mt-0">
              {singleJob.hiringMultipleCandidates === "Yes" ? (
                <span className="bg-green-50 text-green-600 text-sm font-semibold px-3 py-1 rounded-full">
                  Multiple Openings
                </span>
              ) : (
                <span className="bg-blue-50 text-blue-600 text-sm font-semibold px-3 py-1 rounded-full">
                  Active Hiring
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Job Details - Wider Column */}
        <div className="lg:col-span-7 lg:order-1 order-2">
          <div className="bg-white rounded-xl shadow-md overflow-hidden">
            {/* Job Overview */}
            <div className="p-6 border-b border-gray-100">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Job Overview</h2>
              <p className="text-gray-600 leading-relaxed">{singleJob.introduction}</p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6 bg-blue-50 border-b border-gray-100">
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <IoMdCash className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Salary</h3>
                  <p className="text-gray-600">₹{singleJob.salary} per month</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FaToolbox className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Job Type</h3>
                  <p className="text-gray-600">{singleJob.jobType || "Full-time"}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FaLocationDot className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Location</h3>
                  <p className="text-gray-600">{singleJob.location}</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="bg-blue-100 p-3 rounded-lg mr-4">
                  <FaUserTie className="text-blue-600 text-xl" />
                </div>
                <div>
                  <h3 className="font-semibold text-gray-800">Specialization</h3>
                  <p className="text-gray-600">{singleJob.jobNiche}</p>
                </div>
              </div>
            </div>

            {/* Qualifications */}
            {singleJob.qualifications && (
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaCheckCircle className="text-blue-600 mr-2" />
                  Qualifications
                </h2>
                <ul className="space-y-2">
                  {qualifications.map((element, index) => (
                    element.trim() && (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="text-gray-600">{element}</span>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            )}

            {/* Responsibilities */}
            {singleJob.responsibilities && (
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaRegClock className="text-blue-600 mr-2" />
                  Responsibilities
                </h2>
                <ul className="space-y-2">
                  {responsibilities.map((element, index) => (
                    element.trim() && (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="text-gray-600">{element}</span>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            )}

            {/* Benefits */}
            {singleJob.offers && (
              <div className="p-6 border-b border-gray-100">
                <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                  <FaCircleInfo className="text-blue-600 mr-2" />
                  Benefits & Perks
                </h2>
                <ul className="space-y-2">
                  {offering.map((element, index) => (
                    element.trim() && (
                      <li key={index} className="flex items-start">
                        <span className="text-blue-600 mr-2 mt-1">•</span>
                        <span className="text-gray-600">{element}</span>
                      </li>
                    )
                  ))}
                </ul>
              </div>
            )}

            {/* Company Website */}
            {singleJob.personalWebsite && (
              <div className="p-6">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Company Website</h2>
                <Link
                  target="_blank"
                  to={singleJob.personalWebsite.url}
                  className="inline-flex items-center text-blue-600 hover:text-blue-700 font-medium"
                >
                  <span>{singleJob.personalWebsite.title}</span>
                  <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Application Form - Narrower Column */}
        <div className="lg:col-span-5 lg:order-2 order-1">
          <div className="bg-white rounded-xl shadow-md overflow-hidden sticky top-4">
            <div className="bg-blue-600 p-6">
              <h2 className="text-2xl font-bold text-white">Apply for this position</h2>
              <p className="text-blue-100 mt-2">Fill out the form below to submit your application</p>
            </div>
            
            <form className="p-6 space-y-6">
              {/* Job Title (Disabled) */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Job Title</label>
                <div className="bg-gray-50 px-4 py-3 rounded-lg border border-gray-200 text-gray-500 font-medium">
                  {singleJob.title}
                </div>
              </div>

              {/* Name */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name*</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              {/* Email */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address*</label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your email address"
                  required
                />
              </div>

              {/* Phone */}
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">Phone Number*</label>
                <input
                  id="phone"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your phone number"
                  required
                />
              </div>

              {/* Address */}
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                <input
                  id="address"
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter your address"
                />
              </div>

              {/* Job Seeker Specific Fields */}
              {user && user.role === "Job Seeker" && (
                <>
                  {/* Cover Letter */}
                  <div>
                    <label htmlFor="coverLetter" className="block text-sm font-medium text-gray-700 mb-1">
                      Cover Letter
                      <span className="text-gray-500 font-normal ml-1">(Tell us why you're a good fit)</span>
                    </label>
                    <textarea
                      id="coverLetter"
                      value={coverLetter}
                      onChange={(e) => setCoverLetter(e.target.value)}
                      rows={5}
                      className="w-full px-4 py-3 rounded-lg border border-gray-300 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                      placeholder="Explain why you're interested in this position and what makes you a strong candidate..."
                    />
                  </div>

                  {/* Resume Upload */}
                  <div>
                    <label htmlFor="resume" className="block text-sm font-medium text-gray-700 mb-1">Resume / CV</label>
                    <div className="relative">
                      <input
                        id="resume"
                        type="file"
                        onChange={resumeHandler}
                        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      />
                      <div className="w-full px-4 py-3 rounded-lg border border-dashed border-gray-300 bg-gray-50 flex items-center justify-center text-gray-500 hover:bg-gray-100 transition-colors duration-300">
                        <IoMdDocument className="mr-2 text-blue-600" />
                        {resumeFileName ? (
                          <span className="truncate max-w-full">Upload here</span>
                        ) : (
                          <span>Upload your resume (PDF or Word)</span>
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              {/* Apply Button */}
              {isAuthenticated && user.role === "Job Seeker" ? (
                <button
                  onClick={handlePostApplication}
                  disabled={loading}
                  className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors duration-300 shadow-md disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer"
                >
                  {loading ? (
                    <span className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting Application...
                    </span>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              ) : (
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded-lg">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                        <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        You must be logged in as a Job Seeker to apply for this position.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostApplication;