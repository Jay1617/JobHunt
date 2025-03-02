import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllApplicationErrors,
  deleteApplication,
  fetchEmployerApplications,
  resetApplicationSlice,
} from "../store/slices/applicationSlice";
import { Link } from "react-router-dom";
import {
  FileText,
  Mail,
  Phone,
  MapPin,
  Calendar,
  Briefcase,
  User,
  ChevronDown,
  Filter,
  Search,
} from "lucide-react";
import LoadingSpinner from "../utils/LoadingSpinner";

const Applications = () => {
  const { applications, loading, error, message } = useSelector(
    (state) => state.applications
  );
  const [filter, setFilter] = useState("all");
  const [searchTerm, setSearchTerm] = useState("");

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

  // Group applications by job title
  const groupedApplications = applications?.reduce((acc, app) => {
    const jobTitle = app.jobInfo.jobTitle;
    if (!acc[jobTitle]) {
      acc[jobTitle] = [];
    }
    acc[jobTitle].push(app);
    return acc;
  }, {});

  // Filter applications based on search term
  const filteredApplications = applications?.filter(
    (app) =>
      app.jobSeekerInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.jobInfo.jobTitle.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="loading-container">
        <LoadingSpinner />
      </div>
    );
  }

  if (!applications || applications.length <= 0) {
    return (
      <div className="empty-state">
        <div className="empty-state-content">
          <div className="empty-icon">📋</div>
          <h1>No Applications Yet</h1>
          <p>
            When job seekers apply to your postings, their applications will
            appear here.
          </p>
          <Link to="/dashboard" className="dashboard-link">
            Return to Dashboard
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="applications-container">
      <div className="page-header">
        <h1 className="page-title">Applications Dashboard</h1>
        <p className="subtitle">
          Manage applications from job seekers for your posted positions
        </p>
      </div>

      <div className="stats-bar">
        <div className="stat-item">
          <span className="stat-number">{applications.length}</span>
          <span className="stat-label">Total Applications</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {Object.keys(groupedApplications || {}).length}
          </span>
          <span className="stat-label">Jobs with Applicants</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {
              applications.filter(
                (app) =>
                  new Date(app.createdAt) >
                  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              ).length
            }
          </span>
          <span className="stat-label">New This Week</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">
            {Math.round(
              applications.length /
                Object.keys(groupedApplications || {}).length
            ) || 0}
          </span>
          <span className="stat-label">Avg. per Job</span>
        </div>
      </div>

      <div className="controls">
        <div className="search-container">
          <Search size={18} />
          <input
            type="text"
            placeholder="Search applications..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>

        <div className="filter-container">
          <Filter size={18} />
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="filter-select"
          >
            <option value="all">All Applications</option>
            <option value="new">Newest First</option>
            <option value="old">Oldest First</option>
            {Object.keys(groupedApplications || {}).map((jobTitle) => (
              <option key={jobTitle} value={jobTitle}>
                {jobTitle}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="applications-grid">
        {(searchTerm ? filteredApplications : applications).map(
          (application) => (
            <div className="application-card" key={application._id}>
              <div className="app-header">
                <div className="job-title-container">
                  <div className="job-icon">
                    <Briefcase size={20} />
                  </div>
                  <h3 className="job-title">{application.jobInfo.jobTitle}</h3>
                </div>
                <div className="application-date">
                  <Calendar size={14} />
                  <span>
                    {new Date(application.createdAt).toLocaleDateString()}
                  </span>
                </div>
              </div>

              <div className="applicant-info">
                <div className="applicant-avatar">
                  {application.jobSeekerInfo.name.charAt(0)}
                </div>
                <div className="applicant-details">
                  <h4 className="applicant-name">
                    {application.jobSeekerInfo.name}
                  </h4>
                  <div className="contact-info">
                    <div className="contact-item">
                      <Mail size={14} />
                      <span>{application.jobSeekerInfo.email}</span>
                    </div>
                    <div className="contact-item">
                      <Phone size={14} />
                      <span>{application.jobSeekerInfo.phone}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="location-info">
                <MapPin size={14} />
                <span>{application.jobSeekerInfo.address}</span>
              </div>

              <div className="cover-letter-section">
                <h5>Cover Letter</h5>
                <div className="cover-letter">
                  {application.jobSeekerInfo.coverLetter.length > 150
                    ? `${application.jobSeekerInfo.coverLetter.substring(
                        0,
                        150
                      )}...`
                    : application.jobSeekerInfo.coverLetter}
                </div>
                <div className="expand-button">
                  <span>See full cover letter</span>
                  <ChevronDown size={14} />
                </div>
              </div>

              <div className="action-buttons">
                <Link
                  to={application.jobSeekerInfo.resume.url}
                  target="_blank"
                  className="action-btn view"
                >
                  <FileText size={18} />
                  View Resume
                </Link>
                <button
                  onClick={() => handleDeleteApplication(application._id)}
                  className="action-btn delete"
                >
                  Delete Application
                </button>
              </div>
            </div>
          )
        )}
      </div>

      <style jsx>{`
        .applications-container {
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
          font-family: "Inter", sans-serif;
          background-color: #f9fafb;
          min-height: 100vh;
        }

        .loading-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: linear-gradient(135deg, #f0f5ff, #f5f3ff);
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

        .controls {
          display: flex;
          gap: 1rem;
          margin-bottom: 2rem;
        }

        .search-container {
          flex: 1;
          display: flex;
          align-items: center;
          background: white;
          border-radius: 8px;
          padding: 0 1rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }

        .search-container svg {
          color: #6b7280;
          margin-right: 0.5rem;
        }

        .search-input {
          flex: 1;
          border: none;
          outline: none;
          padding: 0.8rem 0;
          background: transparent;
          font-size: 0.95rem;
          color: #374151;
        }

        .filter-container {
          display: flex;
          align-items: center;
          background: white;
          border-radius: 8px;
          padding: 0 1rem;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
          border: 1px solid #e5e7eb;
        }

        .filter-container svg {
          color: #6b7280;
          margin-right: 0.5rem;
        }

        .filter-select {
          border: none;
          outline: none;
          padding: 0.8rem 0.5rem 0.8rem 0;
          background: transparent;
          font-size: 0.95rem;
          color: #374151;
          min-width: 180px;
        }

        .empty-state {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 85vh;
          background: linear-gradient(135deg, #f0f5ff, #f5f3ff);
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

        .dashboard-link {
          background: #2563eb; /* Updated to Tailwind blue-600 */
          color: white;
          border: none;
          padding: 0.8rem 1.5rem;
          font-size: 1rem;
          font-weight: 600;
          border-radius: 8px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          display: inline-block;
        }

        .dashboard-link:hover {
          background: #1d4ed8; /* Tailwind blue-700 */
          transform: translateY(-2px);
          box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3); /* Updated shadow */
        }

        .applications-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(350px, 1fr));
          gap: 1.5rem;
        }

        .application-card {
          background: white;
          border-radius: 16px;
          overflow: hidden;
          box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          border: 1px solid rgba(0, 0, 0, 0.03);
          display: flex;
          flex-direction: column;
        }

        .application-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 20px rgba(0, 0, 0, 0.1);
        }

        .app-header {
          padding: 1.25rem;
          border-bottom: 1px solid #f3f4f6;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .job-title-container {
          display: flex;
          align-items: center;
        }

        .job-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          background: #f0f5ff;
          color: #2563eb; /* Updated to Tailwind blue-600 */
          border-radius: 8px;
          margin-right: 0.75rem;
        }

        .job-title {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111827;
          margin: 0;
        }

        .application-date {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          color: #6b7280;
        }

        .application-date svg {
          margin-right: 0.25rem;
        }

        .applicant-info {
          padding: 1.25rem;
          display: flex;
          align-items: center;
        }

        .applicant-avatar {
          width: 48px;
          height: 48px;
          background: linear-gradient(135deg, #2563eb, #1d4ed8); /* Updated gradient */
          color: white;
          font-size: 1.4rem;
          font-weight: 600;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 24px;
          margin-right: 1rem;
        }

        .applicant-name {
          font-size: 1.1rem;
          font-weight: 600;
          color: #111827;
          margin: 0 0 0.5rem 0;
        }

        .contact-info {
          display: flex;
          flex-direction: column;
          gap: 0.35rem;
        }

        .contact-item {
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          color: #6b7280;
        }

        .contact-item svg {
          margin-right: 0.5rem;
          color: #2563eb; /* Updated to Tailwind blue-600 */
        }

        .location-info {
          padding: 0 1.25rem 1.25rem;
          display: flex;
          align-items: center;
          font-size: 0.85rem;
          color: #6b7280;
        }

        .location-info svg {
          margin-right: 0.5rem;
          color: #2563eb; /* Updated to Tailwind blue-600 */
        }

        .cover-letter-section {
          padding: 1.25rem;
          border-top: 1px solid #f3f4f6;
          border-bottom: 1px solid #f3f4f6;
        }

        .cover-letter-section h5 {
          font-size: 0.9rem;
          font-weight: 600;
          color: #374151;
          margin: 0 0 0.75rem 0;
        }

        .cover-letter {
          font-size: 0.9rem;
          color: #4b5563;
          line-height: 1.5;
          background: #f9fafb;
          padding: 1rem;
          border-radius: 8px;
          max-height: 120px;
          overflow: hidden;
        }

        .expand-button {
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.85rem;
          color: #2563eb; /* Updated to Tailwind blue-600 */
          margin-top: 0.75rem;
          cursor: pointer;
          font-weight: 500;
        }

        .expand-button svg {
          margin-left: 0.25rem;
        }

        .action-buttons {
          padding: 1.25rem;
          display: flex;
          gap: 1rem;
        }

        .action-btn {
          flex: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0.5rem;
          padding: 0.75rem 0;
          border-radius: 8px;
          font-weight: 600;
          font-size: 0.9rem;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
          border: none;
        }

        .action-btn.view {
          background-color: #2563eb; /* Updated to Tailwind blue-600 */
          color: white;
        }

        .action-btn.view:hover {
          background-color: #1d4ed8; /* Tailwind blue-700 */
          box-shadow: 0 2px 8px rgba(37, 99, 235, 0.3); /* Updated shadow */
        }

        .action-btn.delete {
          background-color: white;
          color: #ef4444;
          border: 1px solid #ef4444;
        }

        .action-btn.delete:hover {
          background-color: #fef2f2;
        }

        @media (max-width: 768px) {
          .applications-container {
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

          .controls {
            flex-direction: column;
          }

          .applications-grid {
            grid-template-columns: 1fr;
          }

          .action-buttons {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
};

export default Applications;