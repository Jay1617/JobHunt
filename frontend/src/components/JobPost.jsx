import React, { useEffect, useState, useMemo, useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  clearAllJobErrors,
  postJob,
  resetJobSlice,
} from "../store/slices/jobSlice";
import { InfoIcon } from "lucide-react";

const InputWrapper = React.memo(({ label, optional, children }) => (
  <div className="form-group">
    <div className="label-wrapper">
      <label>{label}</label>
      {optional && (
        <span className="optional-tag">
          <InfoIcon className="info-icon" />
          Optional
        </span>
      )}
    </div>
    {children}
  </div>
));

const JobPost = () => {
  const [formData, setFormData] = useState({
    title: "",
    jobType: "",
    location: "",
    companyName: "",
    introduction: "",
    responsibilities: "",
    qualifications: "",
    offers: "",
    jobNiche: "",
    salary: "",
    hiringMultipleCandidates: "",
    personalWebsiteTitle: "",
    personalWebsiteUrl: "",
  });

  const nichesArray = useMemo(
    () => [
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
    ],
    []
  );

  const cities = useMemo(
    () => [
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
    ],
    []
  );

  const { isAuthenticated, user } = useSelector((state) => state.user);
  const { loading, error, message } = useSelector((state) => state.jobs);
  const dispatch = useDispatch();

  const handleInputChange = useCallback(
    (field) => (e) => {
      setFormData((prev) => ({
        ...prev,
        [field]: e.target.value,
      }));
    },
    []
  );

  const handleSubmit = useCallback(
    (e) => {
      e.preventDefault();
      const form = new FormData();

      Object.entries(formData).forEach(([key, value]) => {
        if (value) form.append(key, value);
      });

      dispatch(postJob(form));
    },
    [formData, dispatch]
  );

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearAllJobErrors());
    }
    if (message) {
      toast.success(message);
      dispatch(resetJobSlice());
    }
  }, [dispatch, error, message]);

  return (
    <div className="job-post-container">
      <div className="job-post-card">
        <h1 className="form-title">Post A New Job</h1>

        <form onSubmit={handleSubmit} className="form-content">
          <InputWrapper label="Job Title">
            <input
              type="text"
              value={formData.title}
              onChange={handleInputChange("title")}
              placeholder="Enter job title"
              className="form-input"
            />
          </InputWrapper>

          <div className="form-grid">
            <InputWrapper label="Job Type">
              <select
                value={formData.jobType}
                onChange={handleInputChange("jobType")}
                className="form-select"
              >
                <option value="">Select Job Type</option>
                <option value="Full-time">Full-time</option>
                <option value="Part-time">Part-time</option>
              </select>
            </InputWrapper>

            <InputWrapper label="Location">
              <select
                value={formData.location}
                onChange={handleInputChange("location")}
                className="form-select"
              >
                <option value="">Select City</option>
                {cities.map((city) => (
                  <option key={city} value={city}>
                    {city}
                  </option>
                ))}
              </select>
            </InputWrapper>
          </div>

          <InputWrapper label="Company Name">
            <input
              type="text"
              value={formData.companyName}
              onChange={handleInputChange("companyName")}
              placeholder="Enter company name"
              className="form-input"
            />
          </InputWrapper>

          <InputWrapper label="Company/Job Introduction">
            <textarea
              value={formData.introduction}
              onChange={handleInputChange("introduction")}
              placeholder="Describe the company and job role"
              rows={5}
              className="form-textarea"
            />
          </InputWrapper>

          <InputWrapper label="Responsibilities">
            <textarea
              value={formData.responsibilities}
              onChange={handleInputChange("responsibilities")}
              placeholder="List the key responsibilities"
              rows={5}
              className="form-textarea"
            />
          </InputWrapper>

          <InputWrapper label="Qualifications">
            <textarea
              value={formData.qualifications}
              onChange={handleInputChange("qualifications")}
              placeholder="List required qualifications"
              rows={5}
              className="form-textarea"
            />
          </InputWrapper>

          <InputWrapper label="What We Offer" optional>
            <textarea
              value={formData.offers}
              onChange={handleInputChange("offers")}
              placeholder="Describe the benefits and perks"
              rows={5}
              className="form-textarea"
            />
          </InputWrapper>

          <div className="form-grid">
            <InputWrapper label="Job Niche">
              <select
                value={formData.jobNiche}
                onChange={handleInputChange("jobNiche")}
                className="form-select"
              >
                <option value="">Select Job Niche</option>
                {nichesArray.map((niche) => (
                  <option key={niche} value={niche}>
                    {niche}
                  </option>
                ))}
              </select>
            </InputWrapper>

            <InputWrapper label="Salary Range">
              <input
                type="text"
                value={formData.salary}
                onChange={handleInputChange("salary")}
                placeholder="e.g. 50,000 - 80,000"
                className="form-input"
              />
            </InputWrapper>
          </div>

          <InputWrapper label="Hiring Multiple Candidates?" optional>
            <select
              value={formData.hiringMultipleCandidates}
              onChange={handleInputChange("hiringMultipleCandidates")}
              className="form-select"
            >
              <option value="">Select Option</option>
              <option value="Yes">Yes</option>
              <option value="No">No</option>
            </select>
          </InputWrapper>

          <div className="form-grid">
            <InputWrapper label="Personal Website Name" optional>
              <input
                type="text"
                value={formData.personalWebsiteTitle}
                onChange={handleInputChange("personalWebsiteTitle")}
                placeholder="Enter website name"
                className="form-input"
              />
            </InputWrapper>

            <InputWrapper label="Personal Website URL" optional>
              <input
                type="text"
                value={formData.personalWebsiteUrl}
                onChange={handleInputChange("personalWebsiteUrl")}
                placeholder="Enter website URL"
                className="form-input"
              />
            </InputWrapper>
          </div>

          <div className="button-container">
            <button type="submit" disabled={loading} className="submit-button">
              {loading ? "Posting..." : "Post Job"}
            </button>
          </div>
        </form>
      </div>

      <style jsx>{`
        .job-post-container {
          min-height: 100vh;
          padding: 2rem;
          background-color: #f5f7fa;
        }

        .job-post-card {
          max-width: 800px;
          margin: 0 auto;
          background: white;
          border-radius: 16px;
          box-shadow: 0 4px 24px rgba(0, 0, 0, 0.08);
          padding: 2rem;
        }

        .form-title {
          font-size: 2rem;
          color: #1a1a1a;
          text-align: center;
          margin-bottom: 2rem;
          font-weight: 600;
        }

        .form-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }

        .form-group {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .label-wrapper {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .label-wrapper label {
          font-size: 0.95rem;
          font-weight: 500;
          color: #2d3748;
        }

        .optional-tag {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          font-size: 0.8rem;
          color: #718096;
        }

        .info-icon {
          width: 1rem;
          height: 1rem;
        }

        .form-input,
        .form-select,
        .form-textarea {
          width: 100%;
          padding: 0.75rem 1rem;
          border: 1.5px solid #e2e8f0;
          border-radius: 8px;
          font-size: 0.95rem;
          transition: all 0.2s ease;
          background-color: white;
        }

        .form-input:focus,
        .form-select:focus,
        .form-textarea:focus {
          outline: none;
          border-color: #4299e1;
          box-shadow: 0 0 0 3px rgba(66, 153, 225, 0.15);
        }

        .form-textarea {
          resize: vertical;
          min-height: 120px;
        }

        .form-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        @media (max-width: 768px) {
          .form-grid {
            grid-template-columns: 1fr;
          }
        }

        .button-container {
          display: flex;
          justify-content: center;
          margin-top: 1.5rem;
        }

        .submit-button {
          background: linear-gradient(135deg, #4299e1, #3182ce);
          color: white;
          padding: 0.75rem 2.5rem;
          border-radius: 8px;
          font-weight: 500;
          border: none;
          cursor: pointer;
          transition: all 0.2s ease;
          font-size: 1rem;
        }

        .submit-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(66, 153, 225, 0.25);
        }

        .submit-button:disabled {
          opacity: 0.7;
          cursor: not-allowed;
          transform: none;
        }

        ::placeholder {
          color: #a0aec0;
        }
      `}</style>
    </div>
  );
};

export default JobPost;
