import React from 'react';
import MinimalNetworkBackground from './MinimalNetworkBackground';

const Education = () => {
  const certifications = [
    {
      title: "React Basics",
      provider: "Coursera",
      date: "June 2025",
      description: "Comprehensive introduction to React fundamentals, components, and modern development practices.",
      icon: "⚛️",
      color: "from-emerald-600 to-emerald-700"
    },
    {
      title: "Introduction to Front-End Development",
      provider: "Coursera",
      date: "July 2025",
      description: "Foundation course covering HTML, CSS, JavaScript, and modern frontend development principles.",
      icon: "🌐",
      color: "from-slate-600 to-slate-700"
    },
    {
      title: "Introduction to Android Development",
      provider: "Coursera",
      date: "July 2025",
      description: "Mobile development fundamentals using Android Studio and Java programming language.",
      icon: "📱",
      color: "from-teal-600 to-teal-700"
    },
    {
      title: "Introduction to Back-End Development",
      provider: "Coursera",
      date: "July 2025",
      description: "Server-side development concepts, databases, and API design principles.",
      icon: "⚙️",
      color: "from-emerald-700 to-slate-700"
    }
  ];

  const experience = [
    {
      title: "Retail Store Manager",
      company: "T-Mobile Torrance",
      period: "July 2018 – Present",
      responsibilities: [
        "Drive store success by empowering and developing team members",
        "Oversee store operations including sales performance and inventory management",
        "Foster positive environment while consistently exceeding sales targets",
        "Implement training programs that enhance team skills and operational excellence"
      ]
    },
    {
      title: "ASES Afterschool Enrichment Leader",
      company: "CUSD",
      period: "September 2016 – June 2018",
      responsibilities: [
        "Guided middle school students through academic challenges",
        "Taught app development and video game creation using Unity",
        "Developed mobile applications with focus on Android using Android Studio",
        "Collaborated on group projects to enhance teamwork and communication skills"
      ]
    }
  ];

  return (
    <section id="education" className="py-20 bg-gray-50 relative overflow-hidden">
      <MinimalNetworkBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Education & Experience</h2>
          <div className="w-20 h-1 bg-slate-700 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Continuous learning and professional growth through formal education 
            and hands-on experience in both technology and leadership roles.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Certifications Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center lg:text-left">
              Recent Certifications
            </h3>
            <div className="space-y-6">
              {certifications.map((cert, index) => (
                <div key={index} className="bg-gray-800 bg-opacity-80 border border-gray-600 rounded-lg shadow-lg p-6 transform transition-all duration-300 hover:scale-105">
                  <div className="flex items-start space-x-4">
                    <div className={`bg-gradient-to-r ${cert.color} text-white p-3 rounded-full text-2xl flex-shrink-0`}>
                      {cert.icon}
                    </div>
                    <div className="flex-1">
                      <h4 className="text-lg font-bold text-white mb-2">{cert.title}</h4>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-emerald-300 font-medium">{cert.provider}</span>
                        <span className="text-gray-400 text-sm">{cert.date}</span>
                      </div>
                      <p className="text-gray-200 text-sm leading-relaxed">{cert.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Experience Section */}
          <div>
            <h3 className="text-2xl font-bold text-white mb-8 text-center lg:text-left">
              Professional Experience
            </h3>
            <div className="space-y-8">
              {experience.map((job, index) => (
                <div key={index} className="bg-gray-800 bg-opacity-80 border border-gray-600 rounded-lg shadow-lg p-6">
                  <div className="mb-4">
                    <h4 className="text-xl font-bold text-white">{job.title}</h4>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-emerald-300 font-medium">{job.company}</span>
                      <span className="text-gray-400 text-sm">{job.period}</span>
                    </div>
                  </div>
                  <ul className="space-y-2">
                    {job.responsibilities.map((responsibility, idx) => (
                      <li key={idx} className="flex items-start">
                        <svg className="w-5 h-5 text-emerald-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                        </svg>
                        <span className="text-gray-200 text-sm">{responsibility}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Learning Philosophy */}
        <div className="mt-16">
          <div className="bg-gradient-to-r from-slate-700 to-emerald-800 rounded-lg p-8 text-white text-center">
            <h3 className="text-2xl font-bold mb-4">Commitment to Growth</h3>
            <p className="text-lg mb-6 max-w-3xl mx-auto">
              My journey from teaching technology to students, to leading retail teams, and now pursuing 
              software engineering demonstrates my commitment to continuous learning and adapting to new challenges. 
              Each role has strengthened my ability to communicate complex concepts and work effectively with diverse teams.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center">
                <div className="text-3xl mb-2">9+</div>
                <div className="text-sm opacity-90">Years of Leadership Experience</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">4</div>
                <div className="text-sm opacity-90">Recent Certifications</div>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">∞</div>
                <div className="text-sm opacity-90">Passion for Learning</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
