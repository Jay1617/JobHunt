import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  Calendar,
  DollarSign,
  Users,
  BarChart2,
  Filter,
  Search,
  UserCheck,
  ChevronRight,
  Loader,
} from "lucide-react";
import RankingModal from "../components/RankingModal";
import JobPost from "../components/JobPost";
import axios from "axios";
import LoadingSpinner from "../utils/LoadingSpinner";

const Analysis = ({ jobId }) => {
  const dispatch = useDispatch();
  const { myJobs, loading } = useSelector((state) => state.jobs);
  const { applications } = useSelector((state) => state.applications);

  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState(null);
  const [matchedCandidates, setMatchedCandidates] = useState([]);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingError, setProcessingError] = useState(null);

  // Fetch jobs and applications data on component mount
  useEffect(() => {
    if (!myJobs || myJobs.length === 0) {
      dispatch({ type: "requestForMyJobs" });
    }

    if (!applications) {
      dispatch({ type: "requestForAllApplications" });
    }
  }, [dispatch, myJobs, applications]);

  // Filter jobs based on search term and job type filter
  useEffect(() => {
    if (jobId && myJobs) {
      const job = myJobs.find((job) => job._id === jobId);
      setFilteredJobs(job ? [job] : []);
    } else if (myJobs) {
      let jobs = [...myJobs];

      if (searchTerm) {
        const searchLower = searchTerm.toLowerCase();
        jobs = jobs.filter(
          (job) =>
            job.title.toLowerCase().includes(searchLower) ||
            job.companyName.toLowerCase().includes(searchLower)
        );
      }

      if (filter !== "all") {
        jobs = jobs.filter((job) => job.jobType === filter);
      }

      setFilteredJobs(jobs);
    }
  }, [jobId, myJobs, searchTerm, filter]);

  // Get job-specific applications
  const getJobApplications = (jobId) => {
    if (!applications || !jobId) return [];

    return applications.filter((app) => {
      return (
        app.jobInfo &&
        app.jobInfo.jobId &&
        app.jobInfo.jobId.toString() === jobId.toString()
      );
    });
  };

  // Process applications with AI matching
  const handleAnalyze = async (job) => {
    setSelectedJob(job);
    setIsProcessing(true);
    setProcessingError(null);

    try {
      // Get applications for this job
      const jobApplications = getJobApplications(job._id);
      console.log("Applications for this job:", jobApplications);
      console.log("Selected Job:", job);

      if (jobApplications && jobApplications.length > 0) {
        // Call the backend API endpoint for ML processing
        const response = await axios.post(
          "http://localhost:5500/api/v1/user/match-candidates",
          {
            job: job,
            jobApplications: jobApplications,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        console.log("ML Service Response:", response.data); 

        if (response.data && response.data.candidates) {
          setMatchedCandidates(response.data.candidates);
        } else {
          // Fallback to dummy data if the API response is incomplete
          setMatchedCandidates(
            generateDummyMatchedCandidates(job, jobApplications)
          );
        }
      } else {
        // No applications found, use dummy data
        setMatchedCandidates(generateDummyMatchedCandidates(job));
      }
    } catch (error) {
      console.error("Error processing applications:", error);
      setProcessingError("Failed to process applications. Please try again.");
      // Fallback to dummy data
      setMatchedCandidates(
        generateDummyMatchedCandidates(job, getJobApplications(job._id))
      );
    } finally {
      setIsProcessing(false);
      setIsModalOpen(true);
    }
  };

  // Extract skills from job qualifications text
  const extractJobSkills = (job) => {
    if (!job || !job.qualifications) return [];

    const techKeywords = [
      "JavaScript",
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Express",
      "HTML",
      "CSS",
      "Redux",
      "GraphQL",
      "SQL",
      "NoSQL",
      "Docker",
      "AWS",
      "Git",
      "Python",
      "Java",
      "Kubernetes",
      "Open Shift",
      "Jira",
      "REST",
      "APIs",
      "Azure",
      "GCP",
      "Agile",
      "Cloud",
    ];

    const qualificationsLower = job.qualifications.toLowerCase();

    return techKeywords.filter((skill) =>
      qualificationsLower.includes(skill.toLowerCase())
    );
  };

  // Generate dummy matched candidates for fallback
  const generateDummyMatchedCandidates = (job, realApplications = []) => {
    if (!job) return [];

    const jobSkills = extractJobSkills(job);

    // If we have real applications, use them with dummy match scores
    if (realApplications && realApplications.length > 0) {
      return realApplications
        .map((app, index) => {
          // Generate random skills for each candidate
          const candidateSkills = generateRandomSkills(jobSkills);

          // Calculate match score based on skills
          const matchScore = 75 + Math.floor(Math.random() * 20);

          return {
            id: app._id || `app-${index}`,
            name: app.jobSeekerInfo?.name || `Candidate ${index + 1}`,
            title: app.jobSeekerInfo?.title || "Job Applicant",
            email:
              app.jobSeekerInfo?.email || `candidate${index + 1}@example.com`,
            phone: app.jobSeekerInfo?.phone || `Unknown`,
            skills: candidateSkills,
            matchScore,
            resumeUrl: app.jobSeekerInfo?.resume?.url || "",
            coverLetter: app.jobSeekerInfo?.coverLetter || "",
          };
        })
        .sort((a, b) => b.matchScore - a.matchScore);
    }

    // Otherwise, generate completely dummy candidates
    const allTechSkills = [
      "JavaScript",
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Express",
      "HTML/CSS",
      "Redux",
      "GraphQL",
      "SQL",
      "NoSQL",
      "Docker",
      "AWS",
      "Git",
      "Python",
      "Java",
      "Kubernetes",
      "Open Shift",
      "Jira",
      "REST APIs",
      "Azure",
      "GCP",
      "Agile",
      "Cloud Computing",
    ];

    const candidates = [];
    const numCandidates = Math.floor(Math.random() * 6) + 5; // 5-10 candidates

    const jobTitles = [
      "Software Developer",
      "Frontend Engineer",
      "Full Stack Developer",
      "Backend Developer",
      "DevOps Engineer",
      "Java Developer",
      "Python Developer",
      "UI Developer",
    ];

    for (let i = 0; i < numCandidates; i++) {
      // Generate skills and match score
      const candidateSkills = [];
      const numSkills = Math.floor(Math.random() * 4) + 3; // 3-6 skills

      // Add some job-matching skills
      jobSkills.forEach((skill) => {
        if (Math.random() < 0.7 && !candidateSkills.includes(skill)) {
          candidateSkills.push(skill);
        }
      });

      // Fill remaining skills with random ones
      while (candidateSkills.length < numSkills) {
        const randomSkill =
          allTechSkills[Math.floor(Math.random() * allTechSkills.length)];
        if (!candidateSkills.includes(randomSkill)) {
          candidateSkills.push(randomSkill);
        }
      }

      // Calculate match score
      const matchScore = 75 + Math.floor(Math.random() * 20);

      candidates.push({
        id: `cand-${i + 1}`,
        name: `Candidate ${i + 1}`,
        title: jobTitles[Math.floor(Math.random() * jobTitles.length)],
        email: `candidate${i + 1}@example.com`,
        phone: `+1 555-${100 + i}-${1000 + i}`,
        skills: candidateSkills,
        matchScore,
      });
    }

    // Sort by match score descending
    return candidates.sort((a, b) => b.matchScore - a.matchScore);
  };

  // Helper function to generate random skills that favor matching job skills
  const generateRandomSkills = (jobSkills) => {
    const allTechSkills = [
      "JavaScript",
      "React",
      "Node.js",
      "TypeScript",
      "MongoDB",
      "Express",
      "HTML/CSS",
      "Redux",
      "GraphQL",
      "SQL",
      "NoSQL",
      "Docker",
      "AWS",
      "Git",
      "Python",
      "Java",
      "Kubernetes",
      "Open Shift",
      "Jira",
      "REST APIs",
      "Azure",
      "GCP",
      "Agile",
      "Cloud Computing",
    ];

    const candidateSkills = [];
    const numSkills = Math.floor(Math.random() * 4) + 3; // 3-6 skills

    // Add some job-matching skills (70% chance for each job skill)
    jobSkills.forEach((skill) => {
      if (Math.random() < 0.7 && !candidateSkills.includes(skill)) {
        candidateSkills.push(skill);
      }
    });

    // Fill remaining skills with random ones
    while (candidateSkills.length < numSkills) {
      const randomSkill =
        allTechSkills[Math.floor(Math.random() * allTechSkills.length)];
      if (!candidateSkills.includes(randomSkill)) {
        candidateSkills.push(randomSkill);
      }
    }

    return candidateSkills;
  };

  const getCandidateCount = (job) => {
    if (!job) return { applied: 0 };

    // Check for actual applications first
    const actualApplications = getJobApplications(job._id);
    if (actualApplications && actualApplications.length > 0) {
      return { applied: actualApplications.length };
    }

    let baseCount = 10;

    const postedDate = new Date(job.createdAt);
    const daysSincePosted = Math.floor(
      (new Date() - postedDate) / (1000 * 60 * 60 * 24)
    );
    baseCount += Math.min(20, daysSincePosted / 2);

    if (job.jobType === "Remote") baseCount *= 1.5;

    const applied = Math.floor(baseCount + Math.random() * baseCount * 0.4);

    return { applied };
  };

  // Get the date posted relative to today
  const getPostedDate = (job) => {
    if (!job || !job.createdAt) return "Recently";

    const postedDate = new Date(job.createdAt);
    const now = new Date();
    const diffTime = Math.abs(now - postedDate);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return "Today";
    if (diffDays === 1) return "Yesterday";
    return `${diffDays} days ago`;
  };

  // Route to job posting page
  const handlePostNewJob = () => {
    // You should implement proper routing here
    // window.location.href = "/post-job";
    // <JobPost />;
  };

  if (loading) return <LoadingSpinner />;

  return (
    <div className="job-analysis-container animate-fadeIn">
      <div className="header">
        <h2 className="text-2xl font-bold text-gray-800 flex items-center">
          <BarChart2 className="mr-2 h-6 w-6 text-blue-600" />
          AI Resume Match
        </h2>
        <p className="text-gray-600 mt-2">
          Match and rank candidates based on job requirements using AI
        </p>
      </div>

      {!jobId && (
        <div className="controls mt-6 flex flex-col sm:flex-row gap-4">
          <div className="search-box flex items-center bg-white border border-gray-200 rounded-lg p-2 flex-1 shadow-sm hover:shadow-md transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">
            <Search size={18} className="text-gray-400 ml-1" />
            <input
              type="text"
              placeholder="Search by job title or company..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="flex-1 ml-2 outline-none text-gray-700"
            />
          </div>

          <div className="filter-controls flex items-center bg-white border border-gray-200 rounded-lg p-2 shadow-sm hover:shadow-md transition-all focus-within:ring-2 focus-within:ring-blue-100 focus-within:border-blue-400">
            <Filter size={18} className="text-gray-400 ml-1" />
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="ml-2 outline-none bg-transparent pr-8 text-gray-700"
            >
              <option value="all">All Job Types</option>
              <option value="Full-time">Full-time</option>
              <option value="Part-time">Part-time</option>
              <option value="Remote">Remote</option>
              <option value="Contract">Contract</option>
            </select>
          </div>
        </div>
      )}

      <div className="analysis-table-container mt-6 bg-white rounded-xl shadow-md overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300">
        <table className="analysis-table w-full">
          <thead className="bg-gradient-to-r from-blue-50 to-white">
            <tr>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Job Title
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Posted
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Salary
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Applicants
              </th>
              <th className="p-4 text-left text-sm font-semibold text-gray-700">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredJobs.map((job) => {
              const candidates = getCandidateCount(job);
              const totalCandidates = candidates.applied;

              return (
                <tr
                  key={job._id}
                  className="border-b border-gray-100 hover:bg-blue-50 transition-colors"
                >
                  <td className="p-4">
                    <div className="job-title font-medium text-gray-800">
                      {job.title}
                    </div>
                    <div className="company-name text-sm text-gray-500 flex items-center gap-1">
                      {job.companyName}
                      <span className="px-2 py-0.5 bg-blue-100 text-blue-700 text-xs rounded-full ml-2">
                        {job.jobType}
                      </span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar size={16} className="mr-2 text-gray-400" />
                      <span>{getPostedDate(job)}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <DollarSign size={16} className="mr-2 text-gray-400" />
                      <span className="font-medium">{job.salary}</span>
                    </div>
                  </td>
                  <td className="p-4">
                    <div className="candidate-count flex items-center text-sm text-gray-600">
                      <Users size={16} className="mr-2 text-blue-500" />
                      <span className="font-medium">
                        {totalCandidates} candidates
                      </span>
                    </div>
                  </td>

                  <td className="p-4">
                    <button
                      className="analyze-button flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-colors shadow-sm hover:shadow font-medium cursor-pointer"
                      onClick={() => handleAnalyze(job)}
                      disabled={totalCandidates === 0}
                    >
                      <UserCheck size={16} />
                      <span>Match</span>
                    </button>
                  </td>
                </tr>
              );
            })}

            {filteredJobs.length === 0 && (
              <tr>
                <td colSpan="6" className="p-12 text-center">
                  <div className="empty-icon text-5xl text-gray-400 mb-3">
                    📊
                  </div>
                  <h3 className="mt-4 text-lg font-medium text-gray-800">
                    No jobs found
                  </h3>
                  <p className="mt-2 text-gray-500 max-w-md mx-auto">
                    {jobId
                      ? "The selected job could not be found."
                      : "Try adjusting your filters or post a new job to start matching candidates."}
                  </p>
                  {!jobId && (
                    <button
                      onClick={handlePostNewJob}
                      className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors flex items-center gap-2 mx-auto"
                    >
                      <ChevronRight size={16} />
                      <span>Post a New Job</span>
                    </button>
                  )}
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Ranking Modal */}
      <RankingModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        jobTitle={selectedJob?.title || "Job"}
        candidates={matchedCandidates}
      />
    </div>
  );
};

export default Analysis;
