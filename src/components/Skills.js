import React from 'react';
import MinimalNetworkBackground from './MinimalNetworkBackground';

const Skills = () => {
  const skillCategories = [
    {
      title: "Frontend Technologies",
      skills: [
        { name: "React JS", level: 90, icon: "⚛️" },
        { name: "JavaScript (ES6+)", level: 85, icon: "🟨" },
        { name: "HTML", level: 95, icon: "🌐" },
        { name: "CSS", level: 90, icon: "🎨" },
        { name: "Tailwind CSS", level: 90, icon: "🎭" }
      ]
    },
    {
      title: "Mobile & Tools",
      skills: [
        { name: "React Native", level: 80, icon: "�" },
        { name: "Android Studio", level: 85, icon: "🤖" },
        { name: "VS Code", level: 95, icon: "�" },
        { name: "Git & GitHub", level: 80, icon: "�" },
        { name: "Mobile-First Design", level: 90, icon: "�" }
      ]
    },
    {
      title: "Additional Skills",
      skills: [
        { name: "Supabase", level: 70, icon: "�️" },
        { name: "API Integration", level: 85, icon: "🔌" },
        { name: "MUI Components", level: 75, icon: "🧩" },
        { name: "Unity (Game Dev)", level: 70, icon: "🎮" },
        { name: "Team Leadership", level: 95, icon: "👥" }
      ]
    }
  ];

  const SkillBar = ({ skill }) => (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-2">
        <span className="text-sm font-medium text-gray-700 flex items-center">
          <span className="mr-2">{skill.icon}</span>
          {skill.name}
        </span>
        <span className="text-sm text-gray-500">{skill.level}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-2">
        <div
          className="bg-gradient-to-r from-blue-600 to-purple-600 h-2 rounded-full transition-all duration-1000 ease-out"
          style={{ width: `${skill.level}%` }}
        ></div>
      </div>
    </div>
  );

  return (
    <section id="skills" className="py-20 bg-white relative overflow-hidden">
      <MinimalNetworkBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Skills & Technologies</h2>
          <div className="w-20 h-1 bg-blue-600 mx-auto mb-4"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Here are the technologies I work with and the skills I'm continuously developing 
            as I grow in my React development journey.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {skillCategories.map((category, index) => (
            <div key={index} className="bg-gray-50 rounded-lg p-6 shadow-lg">
              <h3 className="text-xl font-bold text-gray-900 mb-6 text-center">
                {category.title}
              </h3>
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <SkillBar key={skillIndex} skill={skill} />
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-blue-600 to-purple-700 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-bold mb-4">Always Learning</h3>
            <p className="text-lg mb-6">
              As a passionate developer, I'm constantly expanding my skill set and staying up-to-date 
              with the latest trends and best practices in React development.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                📚 Reading Documentation
              </span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                🎥 Online Courses
              </span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                💡 Personal Projects
              </span>
              <span className="bg-white bg-opacity-20 px-4 py-2 rounded-full text-sm">
                🤝 Community Participation
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
