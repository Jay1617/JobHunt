import React from "react";
import { X, Award, Star, Mail, Phone, FileText } from "lucide-react";

const CandidateCard = ({ candidate, rank }) => {
  return (
    <div className="candidate-card bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-200 border border-gray-100 overflow-hidden">
      <div className="candidate-header bg-gradient-to-r from-blue-50 to-blue-100 p-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center shadow-md">
            <span className="text-white text-lg font-bold">
              {candidate.name.charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            <h3 className="font-bold text-gray-800">{candidate.name}</h3>
            <p className="text-sm text-gray-600">{candidate.title}</p>
          </div>
        </div>
        <div className="match-score flex items-center">
          <div className="bg-blue-600 text-white px-3 py-1 rounded-full text-sm font-bold flex items-center gap-1 shadow-sm">
            <Star size={14} className="fill-white" />
            {candidate.matchScore}%
          </div>
        </div>
      </div>
      <div className="candidate-body p-4">
        <div className="grid grid-cols-2 gap-3 mb-3">
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Mail size={14} className="text-gray-500" />
            {candidate.email}
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-700">
            <Phone size={14} className="text-gray-500" />
            {candidate.phone}
          </div>
        </div>
        <div className="skills flex flex-wrap gap-2 mb-3">
          {candidate.skills.map((skill, index) => (
            <span
              key={index}
              className="bg-blue-50 text-blue-700 text-xs px-2 py-1 rounded-full"
            >
              {skill}
            </span>
          ))}
        </div>
        <div className="flex justify-between mt-3 pt-3 border-t border-gray-100">
          <button className="flex items-center gap-1 px-3 py-1.5 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium cursor-pointer">
            <FileText size={14} />
            View Resume
          </button>
        </div>
      </div>
    </div>
  );
};

const RankingModal = ({ isOpen, onClose, jobTitle, candidates }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black bg-opacity-60 backdrop-blur-sm"
        onClick={onClose}
      ></div>
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-5xl max-h-[85vh] overflow-hidden z-10 relative">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">
              Candidate Ranking
            </h2>
            <p className="text-gray-600">For: {jobTitle}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
          >
            <X size={20} className="text-gray-500" />
          </button>
        </div>

        <div className="p-6 overflow-y-auto max-h-[calc(85vh-80px)]">
          <div className="flex items-center gap-2 mb-6 bg-blue-50 p-3 rounded-lg">
            <Award size={20} className="text-blue-600" />
            <p className="text-blue-800 font-medium">
              Candidates are ranked based on skills match, experience, and job
              requirements
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {candidates.map((candidate, index) => (
              <CandidateCard
                key={index}
                candidate={candidate}
                rank={index + 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RankingModal;
