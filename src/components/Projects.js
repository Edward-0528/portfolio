import React, { useState, useEffect } from 'react';
import MinimalNetworkBackground from './MinimalNetworkBackground';
import { projectsService } from '../lib/supabase';

const Projects = () => {
  const [filter, setFilter] = useState('All');
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fallback projects data (in case Supabase is not configured)
  const fallbackProjects = [
    {
      id: 1,
      title: "Budget App",
      category: "React",
      description: "A comprehensive budget management application featuring intuitive UI/UX design and interactive MUI graphs for visualizing incoming and outgoing transactions. Perfect for personal financial tracking.",
      technologies: ["React JS", "Tailwind CSS", "MUI", "Local Storage"],
      image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      github: "https://github.com/Edward-0528/budget-app",
      live: "https://budgetappedward.netlify.app",
      featured: true
    },
    {
      id: 2,
      title: "Weather App",
      category: "React",
      description: "A modern weather application that provides real-time weather data using Open Mateo API with automatic location detection. Features clean UI design and responsive mobile-first approach.",
      technologies: ["React JS", "Tailwind CSS", "Open Mateo API", "Geolocation API"],
      image: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      github: "https://github.com/Edward-0528/weather-app",
      live: "https://weatherappedward.netlify.app",
      featured: true
    },
    {
      id: 3,
      title: "E-Commerce Platform",
      category: "React",
      description: "A full-featured e-commerce application built with AI assistance for UI/UX design. Includes shopping cart functionality, user authentication, and persistent cart data using Supabase database.",
      technologies: ["React JS", "Tailwind CSS", "Supabase", "Gemini AI"],
      image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      github: "https://github.com/Edward-0528/ecommerce-app",
      live: "https://ecomedward.netlify.app",
      featured: true
    },
    {
      id: 4,
      title: "Portfolio Website",
      category: "React",
      description: "This very portfolio website showcasing my projects and skills, built with React and Tailwind CSS. Features responsive design, smooth animations, and modern UI components.",
      technologies: ["React", "Tailwind CSS", "Responsive Design", "React Icons"],
      image: "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      github: "https://github.com/Edward-0528/portfolio",
      live: "https://edwardgranados.netlify.app",
      featured: false
    },
    {
      id: 5,
      title: "Android Mobile Apps",
      category: "Mobile",
      description: "Collection of Android applications developed using Android Studio, showcasing mobile development skills and understanding of Android ecosystem.",
      technologies: ["Android Studio", "Java", "XML", "Material Design"],
      image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      github: "https://github.com/Edward-0528/android-projects",
      live: "#",
      featured: false
    },
    {
      id: 6,
      title: "Unity Game Projects",
      category: "Game Development",
      description: "Educational game development projects created while teaching middle school students app development and video game creation using Unity.",
      technologies: ["Unity", "C#", "Game Development", "Educational Tools"],
      image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=60",
      github: "https://github.com/Edward-0528/unity-games",
      live: "#",
      featured: false
    }
  ];

  // Load projects from Supabase on component mount
  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsService.getAllProjects();
      
      // If no data from Supabase, use fallback data
      if (data && data.length > 0) {
        setProjects(data);
      } else {
        setProjects(fallbackProjects);
      }
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Failed to load projects');
      setProjects(fallbackProjects); // Use fallback on error
    } finally {
      setLoading(false);
    }
  };

  const categories = ['All', 'React', 'Mobile', 'Game Development'];

  const filteredProjects = filter === 'All' 
    ? projects 
    : projects.filter(project => project.category === filter);

  const featuredProjects = projects.filter(project => project.featured);

  // Loading state
  if (loading) {
    return (
      <section id="projects" className="py-20 bg-gray-50 relative overflow-hidden">
        <MinimalNetworkBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-slate-700 bg-white">
              <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-slate-700" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading projects...
            </div>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section id="projects" className="py-20 bg-gray-50 relative overflow-hidden">
        <MinimalNetworkBackground />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
              {error}. Showing fallback projects.
            </div>
          </div>
        </div>
      </section>
    );
  }

  const ProjectCard = ({ project, isFeatured = false }) => (
    <div className={`bg-white rounded-lg shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 ${
      isFeatured ? 'lg:col-span-2' : ''
    }`}>
      <div className="relative">
        <img 
          src={project.image} 
          alt={project.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-4 right-4">
          <span className="bg-emerald-700 text-white px-3 py-1 rounded-full text-sm font-medium">
            {project.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="text-xl font-bold text-gray-900 mb-4 leading-tight">{project.title}</h3>
        <p className="text-gray-700 mb-6 text-base leading-relaxed">{project.description}</p>
        
        <div className="flex flex-wrap gap-2 mb-6">
          {project.technologies.map((tech, index) => (
            <span 
              key={index}
              className="bg-green-100 text-green-800 px-3 py-1.5 rounded-md text-sm font-medium border border-green-200"
            >
              {tech}
            </span>
          ))}
        </div>
        
        <div className="flex space-x-6">
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-teal-700 hover:text-teal-900 transition duration-300 font-semibold text-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
            Code
          </a>
          <a
            href={project.live}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-teal-700 hover:text-teal-900 transition duration-300 font-semibold text-sm"
          >
            <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M10 6L8.59 7.41 13.17 12l-4.58 4.59L10 18l6-6z"/>
            </svg>
            Live Demo
          </a>
        </div>
      </div>
    </div>
  );

  return (
    <section id="projects" className="py-20 bg-gray-50 relative overflow-hidden">
      <MinimalNetworkBackground />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">My Projects</h2>
          <div className="w-20 h-1 bg-slate-700 mx-auto mb-6"></div>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Here's a showcase of some projects I've worked on. Each project represents 
            a step in my learning journey and demonstrates different aspects of modern web development.
          </p>
        </div>

        {/* Featured Projects */}
        <div className="mb-20">
          <h3 className="text-3xl font-bold text-gray-900 mb-10 text-center">Featured Projects</h3>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {featuredProjects.map(project => (
              <ProjectCard key={project.id} project={project} isFeatured={true} />
            ))}
          </div>
        </div>

        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map(category => (
            <button
              key={category}
              onClick={() => setFilter(category)}
              className={`px-8 py-3 rounded-full font-semibold text-base transition duration-300 border ${
                filter === category
                  ? 'bg-teal-700 text-white border-teal-700 shadow-lg'
                  : 'bg-white text-teal-700 border-teal-300 hover:bg-green-50 hover:border-teal-400'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* All Projects */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {filteredProjects.map(project => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-20 text-center">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 rounded-xl p-10 text-white shadow-xl">
            <h3 className="text-3xl font-bold mb-4">Want to see more?</h3>
            <p className="text-xl mb-8 text-gray-300 leading-relaxed max-w-2xl mx-auto">
              Check out my GitHub profile for more projects and contributions to open source.
            </p>
            <a
              href="https://github.com/Edward-0528/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-slate-700 text-white font-bold py-4 px-10 rounded-full hover:bg-slate-800 hover:shadow-lg transition duration-300 inline-flex items-center text-lg"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
              Visit My GitHub
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Projects;
