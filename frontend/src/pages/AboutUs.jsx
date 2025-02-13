import React from "react";
import { ArrowRight } from "lucide-react";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Jay Thummar",
      role: "CEO & Founder",
      image: "https://i.pravatar.cc/150?img=1",
      bio: "Visionary tech leader driving the future solutions.",
    },
    {
      name: "Vasu Tilva",
      role: "CTO",
      image: "https://i.pravatar.cc/150?img=1",
      bio: "Tech innovator with a passion for AI",
    },
    {
      name: "Meet Vekariya",
      role: "Head of Operations",
      image: "https://i.pravatar.cc/150?img=1",
      bio: "Operations expert focused on client success",
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              Connecting <span className="text-blue-600">Talent</span> with{" "}
              <span className="text-blue-600">Opportunity</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're on a mission to revolutionize the way people find their
              dream jobs and companies discover exceptional talent.
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-blue-50 to-transparent"></div>
      </div>

      {/* Mission Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold text-gray-900">Our Mission</h2>
            <p className="text-lg text-gray-600">
              At JobHunt, we believe everyone deserves to find work that brings
              out their best. Our platform combines cutting-edge technology with
              human insight to create meaningful connections between employers
              and job seekers.
            </p>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  Industry-leading job matching
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  Personalized career guidance
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  Transparent hiring process
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="/api/placeholder/600/400"
              alt="Team collaboration"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Meet Our Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our diverse team brings together expertise from HR, technology, and
            recruitment to deliver the best possible experience.
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-1 transition-all duration-300"
            >
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-64 object-cover"
              />
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 mb-3">{member.role}</p>
                <p className="text-gray-600">{member.bio}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
