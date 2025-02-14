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
import { IoMdCash } from "react-icons/io";
import { FaToolbox } from "react-icons/fa";
import { FaLocationDot } from "react-icons/fa6";

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
    setResume(file);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 py-8 px-4">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Application Form */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-800 mb-6">
            Application Form
          </h3>
          <form className="space-y-6">
            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Job Title
              </label>
              <input
                type="text"
                placeholder={singleJob.title}
                disabled
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-gray-100"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Your Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Your Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Phone Number
              </label>
              <input
                type="number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div className="form-group">
              <label className="block text-gray-700 font-medium mb-2">
                Address
              </label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {user && user.role === "Job Seeker" && (
              <>
                <div className="form-group">
                  <label className="block text-gray-700 font-medium mb-2">
                    Cover Letter
                  </label>
                  <textarea
                    value={coverLetter}
                    onChange={(e) => setCoverLetter(e.target.value)}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="form-group">
                  <label className="block text-gray-700 font-medium mb-2">
                    Resume
                  </label>
                  <input
                    type="file"
                    onChange={resumeHandler}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </>
            )}

            {isAuthenticated && user.role === "Job Seeker" && (
              <div className="flex justify-end">
                <button
                  onClick={handlePostApplication}
                  disabled={loading}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-lg hover:bg-blue-700 transition-all duration-300"
                >
                  {loading ? "Applying..." : "Apply"}
                </button>
              </div>
            )}
          </form>
        </div>

        {/* Job Details */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <header className="mb-6">
            <h3 className="text-2xl font-bold text-gray-800 mb-2">
              {singleJob.title}
            </h3>
            {singleJob.personalWebsite && (
              <Link
                target="_blank"
                to={singleJob.personalWebsite.url}
                className="text-blue-600 hover:text-blue-700"
              >
                {singleJob.personalWebsite.title}
              </Link>
            )}
            <p className="text-gray-600 mt-2">
              <FaLocationDot className="inline-block mr-2" />
              {singleJob.location}
            </p>
            <p className="text-gray-600 mt-1">
              <IoMdCash className="inline-block mr-2" />
              Rs. {singleJob.salary} a month
            </p>
          </header>
          <hr className="my-6" />

          <section>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Job Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center">
                  <IoMdCash className="w-6 h-6 text-blue-600 mr-4" />
                  <div>
                    <span className="block text-gray-700 font-medium">Pay</span>
                    <span className="text-gray-600">
                      Rs. {singleJob.salary} a month
                    </span>
                  </div>
                </div>
                <div className="flex items-center">
                  <FaToolbox className="w-6 h-6 text-blue-600 mr-4" />
                  <div>
                    <span className="block text-gray-700 font-medium">
                      Job Type
                    </span>
                    <span className="text-gray-600">{singleJob.jobType}</span>
                  </div>
                </div>
              </div>
            </div>
            <hr className="my-6" />

            <div className="mb-6">
              <h3 className="text-xl font-bold text-gray-800 mb-4">Location</h3>
              <div className="flex items-center">
                <FaLocationDot className="w-6 h-6 text-blue-600 mr-4" />
                <span className="text-gray-600">{singleJob.location}</span>
              </div>
            </div>
            <hr className="my-6" />

            <div>
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Full Job Description
              </h3>
              <p className="text-gray-600 mb-6">{singleJob.introduction}</p>

              {singleJob.qualifications && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    Qualifications
                  </h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {qualifications.map((element) => (
                      <li key={element}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}

              {singleJob.responsibilities && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    Responsibilities
                  </h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {responsibilities.map((element) => (
                      <li key={element}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}

              {singleJob.offers && (
                <div className="mb-6">
                  <h4 className="text-lg font-bold text-gray-800 mb-2">
                    Offering
                  </h4>
                  <ul className="list-disc list-inside text-gray-600">
                    {offering.map((element) => (
                      <li key={element}>{element}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          </section>
          <hr className="my-6" />

          <footer>
            <h3 className="text-xl font-bold text-gray-800 mb-2">Job Niche</h3>
            <p className="text-gray-600">{singleJob.jobNiche}</p>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default PostApplication;