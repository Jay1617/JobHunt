import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { clearAllJobErrors, fetchJobs } from "../store/slices/jobSlice";
import { FaSearch } from "react-icons/fa";
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
        <section className="min-h-screen bg-gray-50 py-8">
          {/* Search Bar */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
            <div className="flex items-center bg-white rounded-lg shadow-md p-4">
              <input
                type="text"
                value={searchKeyword}
                onChange={(e) => setSearchKeyword(e.target.value)}
                placeholder="Search jobs by keyword..."
                className="flex-1 p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                onClick={handleSearch}
                className="ml-4 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 flex items-center"
              >
                <FaSearch className="mr-2" />
                Find Job
              </button>
            </div>
          </div>

          {/* Filters and Job Listings */}
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {/* Filter Sidebar */}
              <div className="bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-semibold mb-4">Filter By City</h2>
                <div className="space-y-2">
                  {cities.map((city, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={city}
                        name="city"
                        value={city}
                        checked={selectedCity === city}
                        onChange={() => handleCityChange(city)}
                        className="mr-2"
                      />
                      <label htmlFor={city} className="text-gray-700">
                        {city}
                      </label>
                    </div>
                  ))}
                </div>

                <h2 className="text-xl font-semibold mt-6 mb-4">Filter By Niche</h2>
                <div className="space-y-2">
                  {nichesArray.map((niche, index) => (
                    <div key={index} className="flex items-center">
                      <input
                        type="radio"
                        id={niche}
                        name="niche"
                        value={niche}
                        checked={selectedNiche === niche}
                        onChange={() => handleNicheChange(niche)}
                        className="mr-2"
                      />
                      <label htmlFor={niche} className="text-gray-700">
                        {niche}
                      </label>
                    </div>
                  ))}
                </div>
              </div>

              {/* Job Listings */}
              <div className="md:col-span-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {jobs && jobs.length > 0 ? (
                    jobs.map((element) => (
                      <div
                        key={element._id}
                        className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300"
                      >
                        {element.hiringMultipleCandidates === "Yes" ? (
                          <p className="text-sm text-green-600 font-semibold mb-2">
                            Hiring Multiple Candidates
                          </p>
                        ) : (
                          <p className="text-sm text-blue-600 font-semibold mb-2">
                            Hiring
                          </p>
                        )}
                        <h3 className="text-xl font-bold mb-2">{element.title}</h3>
                        <p className="text-gray-600 mb-2">{element.companyName}</p>
                        <p className="text-gray-600 mb-2">{element.location}</p>
                        <p className="text-gray-600 mb-2">
                          <span className="font-semibold">Salary:</span> Rs. {element.salary}
                        </p>
                        <p className="text-gray-600 mb-4">
                          <span className="font-semibold">Posted On:</span>{" "}
                          {element.jobPostedOn.substring(0, 10)}
                        </p>
                        <Link
                          to={`/post/application/${element._id}`}
                          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-all duration-300 block text-center"
                        >
                          Apply Now
                        </Link>
                      </div>
                    ))
                  ) : (
                    <div className="col-span-full flex justify-center items-center">
                      <img
                        src="./notfound.png"
                        alt="No jobs found"
                        className="w-full max-w-md"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  );
};

export default Jobs;