import React from "react";
import { ArrowRight } from "lucide-react";

const AboutUs = () => {
  const teamMembers = [
    {
      name: "Jay Thummar",
      role: "CEO & Founder",
      image: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1739549631~exp=1739553231~hmac=d8d11d6a4a140275932b57774e7b68eb6ecad73afc5a0ac2b48b71cbd2c8bf86&w=740",
      bio: "Visionary tech leader driving the future solutions with 10+ years of industry experience.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
    },
    {
      name: "Vasu Tilva",
      role: "CTO",
      image: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1739549631~exp=1739553231~hmac=d8d11d6a4a140275932b57774e7b68eb6ecad73afc5a0ac2b48b71cbd2c8bf86&w=740",
      bio: "Tech innovator with a passion for AI and machine learning applications.",
      social: {
        linkedin: "#",
        github: "#"
      }
    },
    {
      name: "Meet Vekariya",
      role: "Head of Operations",
      image: "https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg?t=st=1739549631~exp=1739553231~hmac=d8d11d6a4a140275932b57774e7b68eb6ecad73afc5a0ac2b48b71cbd2c8bf86&w=740",
      bio: "Operations expert focused on scaling our client success initiatives.",
      social: {
        linkedin: "#",
        twitter: "#"
      }
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
                  Industry-leading job matching algorithms
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  Personalized career guidance and coaching
                </span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <ArrowRight className="w-5 h-5 text-blue-600" />
                </div>
                <span className="text-gray-700">
                  Transparent and bias-free hiring process
                </span>
              </div>
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8dGVhbSUyMG1lZXRpbmd8ZW58MHx8MHx8fDA%3D"
              alt="Team collaboration"
              className="rounded-xl shadow-xl w-full h-auto object-cover"
            />
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Meet Our Leadership Team
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
              className="bg-white rounded-xl shadow-lg overflow-hidden transform hover:-translate-y-2 transition-all duration-300 hover:shadow-xl"
            >
              <div className="relative h-64 overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-900 mb-1">
                  {member.name}
                </h3>
                <p className="text-blue-600 font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 mb-4">{member.bio}</p>
                <div className="flex space-x-3">
                  {member.social.linkedin && (
                    <a href={member.social.linkedin} className="text-gray-500 hover:text-blue-600 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                      </svg>
                    </a>
                  )}
                  {member.social.twitter && (
                    <a href={member.social.twitter} className="text-gray-500 hover:text-blue-400 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                      </svg>
                    </a>
                  )}
                  {member.social.github && (
                    <a href={member.social.github} className="text-gray-500 hover:text-gray-700 transition-colors">
                      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Values Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 bg-blue-600 rounded-3xl text-white">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">Our Core Values</h2>
          <p className="text-lg text-blue-100 max-w-2xl mx-auto">
            These principles guide everything we do at JobHunt
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "Integrity",
              description: "We believe in transparency and honesty in all our interactions."
            },
            {
              title: "Innovation",
              description: "Continuously improving our platform to serve you better."
            },
            {
              title: "Impact",
              description: "Creating meaningful change in people's careers and lives."
            }
          ].map((value, index) => (
            <div key={index} className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
              <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
              <p className="text-blue-100">{value.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutUs;