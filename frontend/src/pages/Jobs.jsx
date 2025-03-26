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
  FaBookmark,
  FaRegBookmark,
  FaTimes,
} from "react-icons/fa";
import { Link } from "react-router-dom";
import LoadingSpinner from "../utils/LoadingSpinner";

const Jobs = () => {
  const [searchParams, setSearchParams] = useState({
    city: "",
    niche: "",
    searchKeyword: "",
  });
  const [debouncedSearchParams, setDebouncedSearchParams] = useState({
    city: "",
    niche: "",
    searchKeyword: "",
  });

  const { jobs, loading, error } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  // Debounce search to prevent excessive API calls
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearchParams(searchParams);
    }, 500);

    return () => {
      clearTimeout(handler);
    };
  }, [searchParams]);

  // Fetch jobs when debounced parameters change
  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    dispatch(
      fetchJobs(
        debouncedSearchParams.city,
        debouncedSearchParams.niche,
        debouncedSearchParams.searchKeyword
      )
    );
  }, [dispatch, error, debouncedSearchParams]);

  const handleFilterChange = (filterType, value) => {
    setSearchParams((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearAllFilters = () => {
    setSearchParams({
      city: "",
      niche: "",
      searchKeyword: "",
    });
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
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-blue-500 text-white py-16 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Find Your Dream Tech Job
            </h1>
            <p className="text-xl mb-6 max-w-3xl mx-auto opacity-90">
              Discover opportunities across India's top tech hubs and
              specializations
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 -mt-10">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
              <div className="bg-blue-600 text-white p-4">
                <div className="flex justify-between items-center">
                  <h2 className="text-xl font-bold">Filter Jobs</h2>
                  {(searchParams.city ||
                    searchParams.niche ||
                    searchParams.searchKeyword) && (
                    <button
                      onClick={clearAllFilters}
                      className="text-white hover:text-gray-200 transition-colors cursor-pointer"
                      aria-label="Clear all filters"
                    >
                      <FaTimes className="text-lg" />
                    </button>
                  )}
                </div>
              </div>

              <div className="p-4 space-y-6">
                {/* Location Filter */}
                <div>
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                    <FaMapMarkerAlt className="mr-2 text-blue-500" />
                    Location
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
                    {cities.map((cityOption) => (
                      <label
                        key={cityOption}
                        className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                          searchParams.city === cityOption
                            ? "bg-blue-100 text-blue-700"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name="city"
                          value={cityOption}
                          checked={searchParams.city === cityOption}
                          onChange={() =>
                            handleFilterChange("city", cityOption)
                          }
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-gray-700">{cityOption}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Niche Filter */}
                <div className="pt-4 border-t border-gray-100">
                  <h3 className="text-lg font-semibold mb-3 text-gray-800 flex items-center">
                    <FaBriefcase className="mr-2 text-blue-500" />
                    Specialization
                  </h3>
                  <div className="space-y-2 max-h-60 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-blue-200 scrollbar-track-blue-50">
                    {nichesArray.map((nicheOption) => (
                      <label
                        key={nicheOption}
                        className={`flex items-center px-3 py-2 rounded-lg cursor-pointer transition-colors ${
                          searchParams.niche === nicheOption
                            ? "bg-blue-100 text-blue-700"
                            : "hover:bg-gray-100"
                        }`}
                      >
                        <input
                          type="radio"
                          name="niche"
                          value={nicheOption}
                          checked={searchParams.niche === nicheOption}
                          onChange={() =>
                            handleFilterChange("niche", nicheOption)
                          }
                          className="mr-3 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300"
                        />
                        <span className="text-gray-700">{nicheOption}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Job Listings */}
          <div className="lg:col-span-3">
            {/* Search Bar */}
            <div className="mb-8">
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <FaSearch className="h-5 w-5 text-blue-400 group-focus-within:text-blue-600 transition-colors duration-200" />
                </div>
                <input
                  type="text"
                  placeholder="Search jobs by keyword, title, or company..."
                  value={searchParams.searchKeyword}
                  onChange={(e) =>
                    handleFilterChange("searchKeyword", e.target.value)
                  }
                  className="w-full px-5 py-4 pl-12 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all duration-300 shadow-md hover:shadow-lg bg-white text-gray-700 placeholder-gray-400 text-lg"
                />
                {searchParams.searchKeyword && (
                  <button
                    onClick={() => handleFilterChange("searchKeyword", "")}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors cursor-pointer"
                  >
                    <FaTimes className="h-5 w-5" />
                  </button>
                )}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 to-blue-600 opacity-0 group-focus-within:opacity-100 transition-opacity duration-300 rounded-b-xl"></div>
              </div>
            </div>

            {loading ? (
              <div className="flex justify-center items-center h-64">
                <LoadingSpinner />
              </div>
            ) : jobs && jobs.length > 0 ? (
              <>
                <div className="bg-white rounded-lg shadow-sm p-4 mb-6 flex justify-between items-center border border-gray-200">
                  <h2 className="text-lg font-semibold text-gray-800">
                    {jobs.length} {jobs.length === 1 ? "Job" : "Jobs"} Found
                  </h2>
                  <span className="text-sm text-gray-500">
                    Showing {jobs.length} results
                  </span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {jobs.map((job) => (
                    <div
                      key={job._id}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 overflow-hidden"
                    >
                      <div className="p-6">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {job.title}
                            </h3>
                            <p className="text-gray-600 font-medium">
                              {job.companyName}
                            </p>
                          </div>
                          <button className="text-gray-400 hover:text-blue-500 transition-colors cursor-pointer">
                            <FaRegBookmark className="text-xl" />
                          </button>
                        </div>

                        <div className="space-y-3 mb-5">
                          <div className="flex items-center text-gray-600">
                            <FaMapMarkerAlt className="mr-2 text-blue-500 min-w-[16px]" />
                            {job.location}
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FaRupeeSign className="mr-2 text-blue-500 min-w-[16px]" />
                            <span className="font-medium">₹{job.salary}</span>
                          </div>
                          <div className="flex items-center text-gray-600">
                            <FaCalendarAlt className="mr-2 text-blue-500 min-w-[16px]" />
                            Posted: {job.jobPostedOn.substring(0, 10)}
                          </div>
                        </div>

                        <div className="flex justify-between items-center">
                          <div className="flex space-x-2">
                            <span className="bg-gray-100 text-gray-700 text-xs px-3 py-1 rounded-full">
                              Full-time
                            </span>
                            {job.hiringMultipleCandidates === "Yes" && (
                              <span className="bg-green-100 text-green-700 text-xs px-3 py-1 rounded-full">
                                Multiple Openings
                              </span>
                            )}
                          </div>
                          <Link
                            to={`/post/application/${job._id}`}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                          >
                            Apply Now
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div className="bg-white rounded-xl shadow-sm p-8 text-center border border-gray-200">
                <div className="max-w-md mx-auto">
                  <div className="w-40 h-40 bg-blue-50 rounded-full mx-auto mb-6 flex items-center justify-center">
                    <FaSearch className="text-blue-400 text-4xl" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-2">
                    No jobs found
                  </h3>
                  <p className="text-gray-600 mb-6">
                    Try adjusting your search filters or keywords
                  </p>
                  <button
                    onClick={clearAllFilters}
                    className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium cursor-pointer"
                  >
                    Clear Filters
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Jobs;
