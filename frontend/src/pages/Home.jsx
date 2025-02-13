import React from 'react';
import { useSelector } from 'react-redux';
import {
  Search,
  Bell,
  FileText,
  Briefcase,
  Users,
  Zap,
  CheckCircle,
  BarChart3,
  Award,
  Paperclip,
  Building2,
  GraduationCap,
  Trophy,
  Target,
} from 'lucide-react';

const Home = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  console.log(user);
  

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      {/* Hero Section with 3D effect */}
      <div className="bg-blue-600 text-white py-24 relative overflow-hidden transform-gpu">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-blue-600 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center transform transition-transform hover:scale-105 duration-500">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              {isAuthenticated ? `Welcome Back, ${user?.name}!` : 'Find Your Dream Job Today'}
            </h1>
            <p className="text-xl md:text-2xl mb-8 drop-shadow">
              {isAuthenticated
                ? 'Continue your journey with personalized job recommendations and tools.'
                : 'Smart job matching powered by AI to accelerate your career growth.'}
            </p>
            <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
              {isAuthenticated ? (
                <>
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                    View Dashboard
                  </button>
                  <button className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                    Explore Jobs
                  </button>
                </>
              ) : (
                <>
                  <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                    Find Jobs
                  </button>
                  <button className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
                    Post a Job
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section with 3D cards */}
      <div className="max-w-7xl mx-auto px-4 -mt-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: Briefcase, number: "10,000+", text: "Active Job Listings" },
            { icon: Users, number: "500,000+", text: "Registered Users" },
            { icon: Award, number: "50,000+", text: "Successful Placements" },
          ].map((stat, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-lg transform transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl"
            >
              <stat.icon className="w-12 h-12 text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold mb-2">{stat.number}</h3>
              <p className="text-gray-600">{stat.text}</p>
            </div>
          ))}
        </div>
      </div>

      {/* New Section: Job Categories */}
      {!isAuthenticated && (
        <div className="max-w-7xl mx-auto px-4 py-20">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            Popular Job Categories
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: Building2, title: "Technology", count: "1,200+" },
              { icon: GraduationCap, title: "Education", count: "800+" },
              { icon: Trophy, title: "Marketing", count: "600+" },
              { icon: Target, title: "Finance", count: "900+" },
            ].map((category, index) => (
              <div
                key={index}
                className="bg-white p-6 rounded-xl shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl cursor-pointer"
              >
                <category.icon className="w-8 h-8 text-blue-600 mb-4" />
                <h3 className="text-lg font-semibold mb-2">{category.title}</h3>
                <p className="text-gray-600">{category.count} jobs</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Features Section with 3D cards */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {isAuthenticated ? 'Your Career Tools' : 'Smart Features for Smart Job Hunting'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            {
              icon: BarChart3,
              title: "AI Resume Analysis",
              description: "Get instant resume scoring and recommendations based on job requirements using our ML-powered analysis system.",
            },
            {
              icon: Bell,
              title: "Instant Notifications",
              description: "Receive real-time alerts for new job matches, application status updates, and interview invitations.",
            },
            {
              icon: FileText,
              title: "Smart Job Matching",
              description: "Our AI matches your skills and experience with job requirements to find the perfect opportunities.",
            },
            {
              icon: Zap,
              title: "One-Click Apply",
              description: "Apply to multiple jobs instantly with your saved profile and customized resume.",
            },
            {
              icon: CheckCircle,
              title: "Application Tracking",
              description: "Track all your job applications, interviews, and follow-ups in one organized dashboard.",
            },
            {
              icon: Search,
              title: "Advanced Search",
              description: "Find the perfect job with powerful filters for location, salary, experience level, and more.",
            },
          ].map((feature, index) => (
            <div
              key={index}
              className="bg-white p-8 rounded-xl shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
            >
              <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-xl font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* New Section: Success Stories */}
      {!isAuthenticated && (
        <div className="bg-gray-50 py-20">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Success Stories
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Johnson",
                  role: "Software Engineer",
                  company: "Tech Corp",
                  story: "Found my dream job within 2 weeks of using JobHunt. The AI matching was spot-on!",
                },
                {
                  name: "Michael Chen",
                  role: "Marketing Manager",
                  company: "Brand Co",
                  story: "The resume analysis feature helped me improve my profile and land interviews faster.",
                },
                {
                  name: "Emily Brown",
                  role: "Data Scientist",
                  company: "Data Analytics Inc",
                  story: "JobHunt's personalized job recommendations led me to the perfect opportunity.",
                },
              ].map((story, index) => (
                <div
                  key={index}
                  className="bg-white p-8 rounded-xl shadow-md transform transition-all duration-300 hover:-translate-y-2 hover:shadow-xl"
                >
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold text-xl">
                      {story.name[0]}
                    </div>
                    <div className="ml-4">
                      <h3 className="font-semibold">{story.name}</h3>
                      <p className="text-gray-600 text-sm">
                        {story.role} at {story.company}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-600 italic">"{story.story}"</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* CTA Section with 3D effect */}
      <div className="bg-blue-600 text-white py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/api/placeholder/1920/1080')] opacity-10 bg-cover bg-center"></div>
        <div className="absolute inset-0 bg-blue-600 opacity-90"></div>
        <div className="max-w-7xl mx-auto px-4 relative">
          <div className="text-center transform transition-transform hover:scale-105 duration-500">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 drop-shadow-lg">
              {isAuthenticated ? 'Ready to Take the Next Step?' : 'Start Your Journey Today'}
            </h2>
            <p className="text-xl mb-8">
              {isAuthenticated
                ? 'Explore new opportunities and tools to grow your career.'
                : 'Join thousands of professionals who\'ve found their dream jobs through our platform.'}
            </p>
            <button className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl">
              {isAuthenticated ? 'Explore Jobs' : 'Get Started Now'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;