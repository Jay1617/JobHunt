import React from "react";
import { useSelector } from "react-redux";
import { User, Mail, Phone, MapPin, Briefcase, Calendar, Target } from "lucide-react";

const InputField = ({ label, value, icon: Icon }) => (
  <div className="space-y-2">
    <label className="block text-sm font-medium text-gray-700">
      {label}
    </label>
    <div className="relative">
      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
        <Icon className="h-5 w-5 text-gray-400" />
      </div>
      <input
        type="text"
        value={value || ""}
        disabled
        className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 disabled:opacity-75 disabled:cursor-not-allowed"
        onChange={(e) => e.target.value}
      />
    </div>
  </div>
);

const MyProfile = () => {
  const { user } = useSelector((state) => state.user);

  // Format date to be more readable
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white rounded-lg">
        <div className="px-4 py-5 sm:p-6">
          <h3 className="text-2xl font-semibold text-gray-900 mb-8">My Profile</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <InputField 
              label="Full Name" 
              value={user?.name}
              icon={User}
            />
            
            <InputField 
              label="Email Address" 
              value={user?.email}
              icon={Mail}
            />

            <InputField 
              label="Phone Number" 
              value={user?.phone}
              icon={Phone}
            />

            <InputField 
              label="Address" 
              value={user?.address}
              icon={MapPin}
            />

            <InputField 
              label="Role" 
              value={user?.role}
              icon={Briefcase}
            />

            <InputField 
              label="Joined On" 
              value={formatDate(user?.createdAt)}
              icon={Calendar}
            />
          </div>

          {user?.role === "Job Seeker" && (
            <div className="mt-8">
              <h4 className="text-lg font-medium text-gray-900 mb-4">My Preferred Job Niches</h4>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <InputField 
                  label="Primary Niche"
                  value={user?.niches?.firstNiche}
                  icon={Target}
                />
                <InputField 
                  label="Secondary Niche"
                  value={user?.niches?.secondNiche}
                  icon={Target}
                />
                <InputField 
                  label="Tertiary Niche"
                  value={user?.niches?.thirdNiche}
                  icon={Target}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyProfile;