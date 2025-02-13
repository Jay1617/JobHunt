import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  deleteJob,
  getMyJobs,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { Trash2 } from "lucide-react";
import LoadingSpinner from "../utils/LoadingSpinner";

const MyJobs = () => {
  const { loading, error, myJobs, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

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

  if (loading) return <LoadingSpinner />;

  if (myJobs && myJobs.length <= 0) {
    return (
      <div className="empty-state">
        <h1>You haven't posted any jobs yet!</h1>
        <p>Start posting jobs to see them listed here.</p>
      </div>
    );
  }

  return (
    <div className="my-jobs-container">
      <h1 className="page-title">My Posted Jobs</h1>
      <div className="jobs-grid">
        {myJobs.map((job) => (
          <div className="job-card" key={job._id}>
            <div className="job-header">
              <h2>{job.title}</h2>
              <button
                className="delete-button"
                onClick={() => handleDeleteJob(job._id)}
                aria-label="Delete job"
              >
                <Trash2 size={20} />
              </button>
            </div>

            <div className="job-meta">
              <span className="badge job-type">{job.jobType}</span>
              <span className="badge location">{job.location}</span>
              <span className="badge salary">{job.salary}</span>
            </div>

            <div className="company-info">
              <h3>{job.companyName}</h3>
              <span className="niche">{job.jobNiche}</span>
            </div>

            <div className="job-details">
              <div className="detail-section">
                <h4>Introduction</h4>
                <p>{job.introduction}</p>
              </div>

              <div className="detail-section">
                <h4>Qualifications</h4>
                <p>{job.qualifications}</p>
              </div>

              <div className="detail-section">
                <h4>Responsibilities</h4>
                <p>{job.responsibilities}</p>
              </div>

              {job.offers && (
                <div className="detail-section">
                  <h4>What We Offer</h4>
                  <p>{job.offers}</p>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        .my-jobs-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .page-title {
          font-size: 2rem;
          color: #1a1a1a;
          margin-bottom: 2rem;
          text-align: center;
          font-weight: 600;
        }

        .empty-state {
          text-align: center;
          padding: 4rem 2rem;
          background: white;
          border-radius: 12px;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
        }

        .empty-state h1 {
          font-size: 1.5rem;
          color: #2d3748;
          margin-bottom: 1rem;
        }

        .empty-state p {
          color: #718096;
        }

        .jobs-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 2rem;
        }

        .job-card {
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.06);
          padding: 1.5rem;
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }

        .job-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
        }

        .job-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 1rem;
        }

        .job-header h2 {
          font-size: 1.25rem;
          font-weight: 600;
          color: #2d3748;
          margin: 0;
        }

        .delete-button {
          background: none;
          border: none;
          color: #e53e3e;
          cursor: pointer;
          padding: 0.5rem;
          border-radius: 8px;
          transition: all 0.2s ease;
        }

        .delete-button:hover {
          background: #fff5f5;
          transform: scale(1.1);
        }

        .job-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 0.5rem;
          margin-bottom: 1rem;
        }

        .badge {
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.875rem;
          font-weight: 500;
        }

        .job-type {
          background: #ebf8ff;
          color: #3182ce;
        }

        .location {
          background: #f0fff4;
          color: #38a169;
        }

        .salary {
          background: #faf5ff;
          color: #805ad5;
        }

        .company-info {
          margin-bottom: 1.5rem;
          padding-bottom: 1rem;
          border-bottom: 1px solid #e2e8f0;
        }

        .company-info h3 {
          font-size: 1.1rem;
          color: #4a5568;
          margin: 0 0 0.25rem 0;
        }

        .niche {
          font-size: 0.875rem;
          color: #718096;
        }

        .job-details {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
        }

        .detail-section h4 {
          font-size: 0.95rem;
          color: #4a5568;
          margin: 0 0 0.5rem 0;
          font-weight: 600;
        }

        .detail-section p {
          font-size: 0.9rem;
          color: #718096;
          line-height: 1.5;
          margin: 0;
        }

        @media (max-width: 768px) {
          .my-jobs-container {
            padding: 1rem;
          }

          .jobs-grid {
            grid-template-columns: 1fr;
          }

          .job-card {
            padding: 1.25rem;
          }
        }
      `}</style>
    </div>
  );
};

export default MyJobs;