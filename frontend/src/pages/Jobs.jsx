import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaCalendarAlt,
  FaRupeeSign,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingSpinner from "../utils/LoadingSpinner";

const Jobs = () => {
  const [city, setCity] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [niche, setNiche] = useState("");
  const [selectedNiche, setSelectedNiche] = useState("");
  const [searchKeyword, setSearchKeyword] = useState("");

  const { jobs, loading, error } = useSelector((state) => state.jobs);

  const handleCityChange = (city) => {
    setCity(city);
    setSelectedCity(city);
  };

  const handleNicheChange = (niche) => {
    setNiche(niche);
    setSelectedNiche(niche);
  };

  const dispatch = useDispatch();

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(fetchJobs(city, niche, searchKeyword));
  }, [dispatch, error, city, niche, searchKeyword]);

  const handleSearch = () => {
    dispatch(fetchJobs(city, niche, searchKeyword));
  };

  const cities = [
    "All",
    "Bangalore",
    "Hyderabad",
    "Pune",
    "Chennai",
    "Mumbai",
    "Delhi",
    "Noida",
    "Gurgaon",
    "Kolkata",
    "Ahmedabad",
    "Jaipur",
    "Indore",
    "Chandigarh",
    "Kochi",
    "Bhubaneswar",
    "Visakhapatnam",
    "Nagpur",
    "Coimbatore",
    "Lucknow",
    "Mysore",
  ];

  const nichesArray = [
    "All",
    "Software Development",
    "Web Development",
    "Cybersecurity",
    "Data Science",
    "Artificial Intelligence",
    "Cloud Computing",
    "DevOps",
    "Mobile App Development",
    "Blockchain",
    "Database Administration",
    "Network Administration",
    "UI/UX Design",
    "Game Development",
    "IoT (Internet of Things)",
    "Big Data",
    "Machine Learning",
    "IT Project Management",
    "IT Support and Helpdesk",
    "Systems Administration",
    "IT Consulting",
    "Embedded Systems",
    "Robotic Process Automation (RPA)",
    "Augmented Reality (AR) & Virtual Reality (VR)",
    "Business Intelligence & Analytics",
    "IT Governance & Compliance",
  ];

  return (
    <>
      {loading ? (
        <LoadingSpinner />
      ) : (
        <section className="min-h-screen bg-gray-50 py-12">
          {/* Hero Banner */}
          <div className="bg-blue-600 text-white mb-8 py-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center">
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  Find Your Dream Tech Job
                </h1>
                <p className="text-lg mb-6 max-w-3xl mx-auto">
                  Discover opportunities across India's top tech cities and
                  specializations
                </p>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-12 -mt-12 relative z-10">
            <div className="flex flex-col md:flex-row items-center bg-white rounded-lg shadow-lg p-6 border-t-4 border-blue-600">
              <div className="flex-1 w-full mb-4 md:mb-0 md:mr-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FaSearch className="text-gray-400" />
                  </div>
                  <input
                    type="text"
                    value={searchKeyword}
                    onChange={(e) => setSearchKeyword(e.target.value)}
                    placeholder="Search jobs by keyword, title, or company..."
                    className="w-full p-4 pl-10 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
              </div>
              <button
                onClick={handleSearch}
                className="w-full md:w-auto bg-blue-600 text-white px-8 py-4 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center justify-center font-medium"
              >
                <FaSearch className="mr-2" />
                Find Jobs
              </button>
            </div>
          </div>

          {/* Filters and Job Listings */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Filter Sidebar */}
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="bg-blue-50 p-4 border-l-4 border-blue-600">
                  <h2 className="text-xl font-bold text-gray-800">
                    Filter Results
                  </h2>
                </div>

                <div className="p-6">
                  <h3 className="text-lg font-semibold mb-4 text-gray-800">
                    Location
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2 mb-6">
                    {cities.map((cityOption, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={cityOption}
                          name="city"
                          value={cityOption}
                          checked={selectedCity === cityOption}
                          onChange={() => handleCityChange(cityOption)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={cityOption}
                          className="ml-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                        >
                          {cityOption}
                        </label>
                      </div>
                    ))}
                  </div>

                  <h3 className="text-lg font-semibold mb-4 text-gray-800 border-t border-gray-100 pt-6">
                    Specialization
                  </h3>
                  <div className="space-y-2 max-h-72 overflow-y-auto pr-2">
                    {nichesArray.map((nicheOption, index) => (
                      <div key={index} className="flex items-center">
                        <input
                          type="radio"
                          id={nicheOption}
                          name="niche"
                          value={nicheOption}
                          checked={selectedNiche === nicheOption}
                          onChange={() => handleNicheChange(nicheOption)}
                          className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                        />
                        <label
                          htmlFor={nicheOption}
                          className="ml-2 text-gray-700 hover:text-blue-600 cursor-pointer"
                        >
                          {nicheOption}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Clear Filters Button */}
                <div className="px-6 pb-6">
                  <button
                    onClick={() => {
                      setSelectedCity("");
                      setCity("");
                      setSelectedNiche("");
                      setNiche("");
                      setSearchKeyword("");
                    }}
                    className="w-full py-2 text-blue-600 border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors duration-300 font-medium"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>

              {/* Job Listings */}
              <div className="md:col-span-3">
                {jobs && jobs.length > 0 ? (
                  <>
                    <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center">
                      <h2 className="text-xl font-bold text-gray-800">
                        {jobs.length} Jobs Found
                      </h2>
                      <div className="text-sm text-gray-500">
                        Showing {jobs.length} results
                      </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                      {jobs.map((element) => (
                        <div
                          key={element._id}
                          className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                        >
                          <div className="p-6">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-xl font-bold text-gray-900 mb-2">
                                  {element.title}
                                </h3>
                                <p className="text-gray-700 font-medium mb-4">
                                  {element.companyName}
                                </p>
                              </div>
                              {element.hiringMultipleCandidates === "Yes" ? (
                                <span className="bg-green-50 text-green-600 text-xs font-bold px-3 py-1 rounded-full h-fit">
                                  Multiple Openings
                                </span>
                              ) : (
                                <span className="bg-blue-50 text-blue-600 text-xs font-bold px-3 py-1 rounded-full h-fit">
                                  Hiring
                                </span>
                              )}
                            </div>

                            <div className="space-y-2 mb-4">
                              <div className="flex items-center text-gray-600">
                                <FaMapMarkerAlt className="mr-2 text-blue-500" />
                                {element.location}
                              </div>
                              <div className="flex items-center text-gray-600">
                                <FaRupeeSign className="mr-2 text-blue-500" />
                                <span className="font-medium">
                                  ₹{element.salary}
                                </span>
                              </div>
                              <div className="flex items-center text-gray-600">
                                <FaCalendarAlt className="mr-2 text-blue-500" />
                                Posted: {element.jobPostedOn.substring(0, 10)}
                              </div>
                            </div>

                            <Link
                              to={`/post/application/${element._id}`}
                              className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 block text-center font-medium"
                            >
                              Apply Now
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                ) : (
                  <div className="bg-white rounded-lg shadow-md p-12 text-center">
                    <img
                      src="./notfound.png"
                      alt="No jobs found"
                      className="w-full max-w-sm mx-auto mb-6"
                    />
                    <h3 className="text-xl font-bold text-gray-800 mb-2">
                      No jobs found
                    </h3>
                    <p className="text-gray-600 mb-6">
                      Try adjusting your search filters or keywords
                    </p>
                    <button
                      onClick={() => {
                        setSelectedCity("");
                        setCity("");
                        setSelectedNiche("");
                        setNiche("");
                        setSearchKeyword("");
                      }}
                      className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 inline-block font-medium"
                    >
                      Clear Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;
