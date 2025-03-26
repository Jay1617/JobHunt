import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import {
  Trash2,
  Briefcase,
  MapPin,
  DollarSign,
  Calendar,
  ChevronDown,
} from "lucide-react";
import LoadingSpinner from "../utils/LoadingSpinner";

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector(
    (state) => state.jobs
  );
  const dispatch = useDispatch();
  const [expandedJobId, setExpandedJobId] = useState(null); // Track which job's details are expanded

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
    dispatch(getMyJobs());
  }, [dispatch, error, message]);

  const handleDeleteJob = (id) => {
    dispatch(deleteJob(id));
  };

  const toggleDetails = (id) => {
    setExpandedJobId((prevId) => (prevId === id ? null : id)); // Toggle details visibility
  };

  if (loading) return <LoadingSpinner />;

  if (myJobs && myJobs.length <= 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <div className="empty-icon">📋</div>
          <h1>No Jobs Posted Yet</h1>
          <p>When you post jobs, they'll appear here for easy management.</p>
          <button className="create-job-btn">Create Your First Job</button>
        </div>
      </div>
    );
  }

  return (
    <div className="my-jobs-container">
      <div className="page-header">
        <h1 className="page-title">My Posted Jobs</h1>
        <p className="subtitle">
          Manage and track all your job postings in one place
        </p>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{myJobs.length}</span>
          <span className="stat-label">Total Jobs</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {myJobs.filter((job) => job.jobType === "Full-time").length}
          </span>
          <span className="stat-label">Full-time</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {myJobs.filter((job) => job.jobType === "Part-time").length}
          </span>
          <span className="stat-label">Part-time</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {myJobs.filter((job) => job.jobType === "Remote").length}
          </span>
          <span className="stat-label">Remote</span>
        </div>
      </div>

      <div className="jobs-grid">
        {myJobs.map((job) => (
          <div className="job-card" key={job._id}>
            <div className="job-card-inner">
              <div className="job-header">
                <h2>{job.title}</h2>
                <button
                  className="delete-button"
                  onClick={() => handleDeleteJob(job._id)}
                  aria-label="Delete job"
                >
                  <Trash2 size={18} />
                </button>
              </div>

              <div className="company-info">
                <div className="company-logo">{job.companyName.charAt(0)}</div>
                <div className="company-details">
                  <h3>{job.companyName}</h3>
                  <span className="niche">{job.jobNiche}</span>
                </div>
              </div>

              <div className="job-meta">
                <div className="meta-item">
                  <Briefcase size={16} />
                  <span>{job.jobType}</span>
                </div>
                <div className="meta-item">
                  <MapPin size={16} />
                  <span>{job.location}</span>
                </div>
                <div className="meta-item">
                  <DollarSign size={16} />
                  <span>{job.salary}</span>
                </div>
                <div className="meta-item">
                  <Calendar size={16} />
                  <span>Posted 2 weeks ago</span>
                </div>
              </div>

              <div className="job-details">
                <div className="detail-section">
                  <h4>Introduction</h4>
                  <p>
                    {job.introduction.length > 150
                      ? `${job.introduction.substring(0, 150)}...`
                      : job.introduction}
                  </p>
                </div>

                <div className="detail-tabs">
                  <button
                    className="tab active"
                    onClick={() => toggleDetails(job._id)} // Toggle details on click
                  >
                    Details
                    <ChevronDown
                      size={16}
                      className={`chevron ${
                        expandedJobId === job._id ? "rotate" : ""
                      }`}
                    />
                  </button>
                </div>

                {/* Expanded Details Section */}
                {expandedJobId === job._id && (
                  <div className="expanded-details">
                    <div className="detail-section">
                      <h4>Full Description</h4>
                      <p>{job.introduction}</p>
                    </div>
                    <div className="detail-section">
                      <h4>Requirements</h4>
                      <p>{job.requirements}</p>
                    </div>
                    <div className="detail-section">
                      <h4>Responsibilities</h4>
                      <p>{job.responsibilities}</p>
                    </div>
                  </div>
                )}

                {/* <div className="action-buttons">
                  <button className="action-btn edit">Edit Job</button>
                  <button className="action-btn view">View Job</button>
                </div> */}
              </div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .my-jobs-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          font-family: "Inter", sans-serif;
          background-color: #f9fafb;
          min-height: 100vh;
        }

        .page-header {
          margin-bottom: 2rem;
          text-align: center;
        }

        .page-title {
          font-size: 2.5rem;
          color: #111827;
          margin-bottom: 0.5rem;
          font-weight: 700;
          letter-spacing: -0.5px;
        }

        .subtitle {
          color: #6b7280;
          font-size: 1.1rem;
        }

        .stats-bar {
          display: flex;
          justify-content: space-between;
          background: white;
          padding: 1.5rem;
          border-radius: 12px;
          box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
          margin-bottom: 2rem;
        }

        .stat-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 0 1rem;
        }

        .stat-number {
          font-size: 1.8rem;
          font-weight: 700;
          color: #2563eb; /* Updated to Tailwind blue-600 */
        }

        .stat-label {
          font-size: 0.9rem;
          color: #6b7280;
          margin-top: 0.25rem;
        }

        .empty-state {
          display: flex;
          justify-content: center;
          align-items: center;
          height: 70vh;
        }

        .empty-state-content {
          text-align: center;
          padding: 3rem;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
          max-width: 500px;
          width: 100%;
        }

        .empty-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .empty-state h1 {
          font-size: 1.8rem;
          color: #111827;
          margin-bottom: 1rem;
          font-weight: 600;
        }

        .empty-state p {
          color: #6b7280;
          margin-bottom: 2rem;
          font-size: 1.1rem;
          line-height: 1.5;
        }

        .create-job-btn {
          background: #2563eb; /* Updated to Tailwind blue-600 */
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .create-job-btn:hover {
          background: #1d4ed8; /* Tailwind blue-700 */
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); /* Updated shadow */
        }

        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
          gap: 1.5rem;
        }

        .job-card {
          height: 100%;
          border-radius: 16px;
          overflow: hidden;
          transition: transform 0.3s ease;
        }

        .job-card:hover {
          transform: translateY(-5px);
        }

        .job-card-inner {
          background: white;
          height: 100%;
          border-radius: 16px;
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.06);
          padding: 1.5rem;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(0, 0, 0, 0.05);
        }

        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1.2rem;
        }

        .job-header h2 {
          font-size: 1.4rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
          line-height: 1.3;
        }

        .delete-button {
          background: none;
          border: none;
          color: #ef4444;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .delete-button:hover {
          background: #fef2f2;
          transform: scale(1.1);
        }

        .company-info {
          display: flex;
          align-items: center;
          margin-bottom: 1.5rem;
        }

        .company-logo {
          width: 48px;
          height: 48px;
          background: linear-gradient(
            135deg,
            #2563eb,
            #1d4ed8
          ); /* Updated gradient */
          color: white;
          font-size: 1.4rem;
          font-weight: bold;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 12px;
          margin-right: 1rem;
        }

        .company-details h3 {
          font-size: 1.1rem;
          color: #4b5563;
          margin: 0 0 0.25rem 0;
          font-weight: 600;
        }

        .niche {
          font-size: 0.9rem;
          color: #6b7280;
          display: inline-block;
          background: #f3f4f6;
          padding: 0.2rem 0.6rem;
          border-radius: 4px;
        }

        .job-meta {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1rem;
          margin-bottom: 1.5rem;
        }

        .meta-item {
          display: flex;
          align-items: center;
          color: #6b7280;
          font-size: 0.9rem;
        }

        .meta-item svg {
          margin-right: 0.5rem;
          color: #2563eb; /* Updated to Tailwind blue-600 */
        }

        .job-details {
          flex: 1;
          display: flex;
          flex-direction: column;
        }

        .detail-section {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e5e7eb;
        }

        .detail-section h4 {
          font-size: 1rem;
          color: #374151;
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }

        .detail-section p {
          font-size: 0.95rem;
          color: #6b7280;
          line-height: 1.6;
          margin: 0;
        }

        .detail-tabs {
          display: flex;
          margin-bottom: 1.5rem;
        }

        .tab {
          background: none;
          border: none;
          padding: 0.6rem 1rem;
          font-size: 0.9rem;
          color: #6b7280;
          cursor: pointer;
          border-bottom: 2px solid transparent;
          font-weight: 500;
          transition: all 0.2s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .tab.active {
          color: #2563eb; /* Updated to Tailwind blue-600 */
          border-bottom-color: #2563eb;
        }

        .tab:hover:not(.active) {
          color: #4b5563;
          border-bottom-color: #e5e7eb;
        }

        .chevron {
          transition: transform 0.2s ease;
        }

        .chevron.rotate {
          transform: rotate(180deg);
        }

        .expanded-details {
          margin-top: 1rem;
          padding: 1rem;
          background: #f9fafb;
          border-radius: 8px;
          border: 1px solid #e5e7eb;
        }

        .action-buttons {
          display: flex;
          gap: 1rem;
          margin-top: auto;
        }

        .action-btn {
          flex: 1;
          padding: 0.75rem 0;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          border: none;
        }

        .action-btn.edit {
          background-color: white;
          color: #2563eb; /* Updated to Tailwind blue-600 */
          border: 1px solid #2563eb;
        }

        .action-btn.edit:hover {
          background-color: #dbeafe; /* Tailwind blue-100 */
        }

        .action-btn.view {
          background-color: #2563eb; /* Updated to Tailwind blue-600 */
          color: white;
        }

        .action-btn.view:hover {
          background-color: #1d4ed8; /* Tailwind blue-700 */
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3); /* Updated shadow */
        }

        @media (max-width: 768px) {
          .my-jobs-container {
            padding: 1rem;
          }

          .page-title {
            font-size: 2rem;
          }

          .stats-bar {
            flex-wrap: wrap;
            gap: 1rem;
          }

          .stat-item {
            width: 45%;
          }

          .jobs-grid {
            grid-template-columns: 1fr;
          }

          .job-meta {
            grid-template-columns: 1fr;
          }

          .job-card-inner {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MyJobs;
