import React, { useState, useEffect } from 'react';
import { projectsService } from '../lib/supabase';

const ProjectAdmin = () => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingProject, setEditingProject] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    title: '',
    category: 'React',
    description: '',
    technologies: '',
    image: '',
    github: '',
    live: '',
    featured: false
  });

  useEffect(() => {
    loadProjects();
  }, []);

  const loadProjects = async () => {
    try {
      setLoading(true);
      const data = await projectsService.getAllProjects();
      setProjects(data || []);
    } catch (error) {
      console.error('Error loading projects:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log('ProjectAdmin: Starting form submission...');
      console.log('ProjectAdmin: Form data:', formData);
      console.log('ProjectAdmin: Editing project:', editingProject);
      
      const projectData = {
        ...formData,
        technologies: formData.technologies.split(',').map(tech => tech.trim())
      };

      console.log('ProjectAdmin: Prepared project data:', projectData);

      if (editingProject) {
        console.log('ProjectAdmin: Updating project with ID:', editingProject.id);
        const result = await projectsService.updateProject(editingProject.id, projectData);
        console.log('ProjectAdmin: Update result:', result);
      } else {
        console.log('ProjectAdmin: Adding new project');
        const result = await projectsService.addProject(projectData);
        console.log('ProjectAdmin: Add result:', result);
      }

      // Reset form and reload projects
      setFormData({
        title: '',
        category: 'React',
        description: '',
        technologies: '',
        image: '',
        github: '',
        live: '',
        featured: false
      });
      setEditingProject(null);
      setShowAddForm(false);
      console.log('ProjectAdmin: Reloading projects...');
      loadProjects();
    } catch (error) {
      console.error('ProjectAdmin: Error saving project:', error);
      alert(`Error saving project: ${error.message}`);
    }
  };

  const handleEdit = (project) => {
    setEditingProject(project);
    setFormData({
      title: project.title,
      category: project.category,
      description: project.description,
      technologies: Array.isArray(project.technologies) 
        ? project.technologies.join(', ') 
        : project.technologies,
      image: project.image,
      github: project.github,
      live: project.live,
      featured: project.featured
    });
    setShowAddForm(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this project?')) {
      try {
        await projectsService.deleteProject(id);
        loadProjects();
      } catch (error) {
        console.error('Error deleting project:', error);
        alert('Error deleting project. Please try again.');
      }
    }
  };

  const resetForm = () => {
    setFormData({
      title: '',
      category: 'React',
      description: '',
      technologies: '',
      image: '',
      github: '',
      live: '',
      featured: false
    });
    setEditingProject(null);
    setShowAddForm(false);
  };

  const testProjectsDB = async () => {
    try {
      console.log('Testing projects database connection...');
      // Try to get just one project to test connection
      const testResult = await projectsService.getAllProjects();
      console.log('Projects DB test result:', testResult);
      
      // Test update operation with a dummy update
      if (testResult.length > 0) {
        const firstProject = testResult[0];
        console.log('Testing update operation on project:', firstProject.id);
        
        try {
          // Try a minimal update that shouldn't change anything meaningful
          const updateResult = await projectsService.updateProject(firstProject.id, {
            title: firstProject.title // Update with same value
          });
          console.log('Update test successful:', updateResult);
          alert(`✅ Projects database test successful! Found ${testResult.length} projects. Update test: PASSED`);
        } catch (updateError) {
          console.error('Update test failed:', updateError);
          alert(`⚠️ Projects database read: OK (${testResult.length} projects)\n❌ Update test: FAILED\nError: ${updateError.message}`);
        }
      } else {
        alert(`✅ Projects database test successful! Found ${testResult.length} projects.`);
      }
    } catch (error) {
      console.error('Projects DB test failed:', error);
      alert(`❌ Projects database test failed: ${error.message}`);
    }
  };

  if (loading) {
    return <div className="p-8 text-center">Loading projects...</div>;
  }

  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Project Admin</h1>
        <div className="flex space-x-4">
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800"
          >
            Add New Project
          </button>
          <button
            onClick={testProjectsDB}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
          >
            Test Projects DB
          </button>
        </div>
      </div>

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="bg-white p-6 rounded-lg shadow-lg mb-8">
          <h2 className="text-xl font-bold mb-4">
            {editingProject ? 'Edit Project' : 'Add New Project'}
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                  className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                >
                  <option value="React">React</option>
                  <option value="Mobile">Mobile</option>
                  <option value="Game Development">Game Development</option>
                </select>
              </div>
            </div>
            
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={3}
                className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Technologies (comma-separated)
              </label>
              <input
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleInputChange}
                placeholder="React JS, Tailwind CSS, etc."
                className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GitHub URL</label>
                <input
                  type="url"
                  name="github"
                  value={formData.github}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Live Demo URL</label>
                <input
                  type="url"
                  name="live"
                  value={formData.live}
                  onChange={handleInputChange}
                  className="w-full p-2 border border-gray-300 rounded focus:ring-emerald-500 focus:border-emerald-500"
                />
              </div>
              <div className="flex items-center mt-6">
                <input
                  type="checkbox"
                  name="featured"
                  checked={formData.featured}
                  onChange={handleInputChange}
                  className="h-4 w-4 text-emerald-600 focus:ring-emerald-500 border-gray-300 rounded"
                />
                <label className="ml-2 block text-sm text-gray-900">Featured Project</label>
              </div>
            </div>

            <div className="flex space-x-4 mt-6">
              <button
                type="submit"
                className="bg-emerald-700 text-white px-4 py-2 rounded hover:bg-emerald-800"
              >
                {editingProject ? 'Update Project' : 'Add Project'}
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Projects List */}
      <div className="space-y-4">
        <h2 className="text-xl font-bold text-gray-900">Existing Projects</h2>
        {projects.map(project => (
          <div key={project.id} className="bg-white p-6 rounded-lg shadow border">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <div className="flex items-center space-x-4 mb-2">
                  <h3 className="text-lg font-semibold">{project.title}</h3>
                  <span className="bg-emerald-100 text-emerald-800 px-2 py-1 rounded text-sm">
                    {project.category}
                  </span>
                  {project.featured && (
                    <span className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded text-sm">
                      Featured
                    </span>
                  )}
                </div>
                <p className="text-gray-600 mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(Array.isArray(project.technologies) ? project.technologies : []).map((tech, index) => (
                    <span key={index} className="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">
                      {tech}
                    </span>
                  ))}
                </div>
                <div className="flex space-x-4 text-sm">
                  <a href={project.github} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                    GitHub
                  </a>
                  <a href={project.live} target="_blank" rel="noopener noreferrer" className="text-emerald-600 hover:underline">
                    Live Demo
                  </a>
                </div>
              </div>
              <div className="flex space-x-2 ml-4">
                <button
                  onClick={() => handleEdit(project)}
                  className="bg-slate-600 text-white px-3 py-1 rounded text-sm hover:bg-slate-700"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(project.id)}
                  className="bg-red-600 text-white px-3 py-1 rounded text-sm hover:bg-red-700"
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProjectAdmin;
