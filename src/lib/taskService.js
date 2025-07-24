// Task Management Service using Supabase
import { supabase } from './supabase';

class TaskService {
  constructor() {
    this.tableName = 'tasks';
    this.projectsTableName = 'projects';
  }

  // Get all tasks for the current user
  async getAllTasks(filters = {}) {
    try {
      let query = supabase
        .from(this.tableName)
        .select('*')
        .order('created_at', { ascending: false });

      // Apply filters
      if (filters.project_name) {
        query = query.eq('project_name', filters.project_name);
      }
      if (filters.status) {
        query = query.eq('status', filters.status);
      }
      if (filters.priority) {
        query = query.eq('priority', filters.priority);
      }

      const { data, error } = await query;

      if (error) {
        throw new Error(`Failed to fetch tasks: ${error.message}`);
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Error fetching tasks:', error);
      return { success: false, error: error.message };
    }
  }

  // Get tasks grouped by project
  async getTasksByProject() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .order('project_name', { ascending: true })
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to fetch tasks by project: ${error.message}`);
      }

      // Group tasks by project
      const tasksByProject = {};
      data.forEach(task => {
        if (!tasksByProject[task.project_name]) {
          tasksByProject[task.project_name] = [];
        }
        tasksByProject[task.project_name].push(task);
      });

      return { success: true, data: tasksByProject };
    } catch (error) {
      console.error('Error fetching tasks by project:', error);
      return { success: false, error: error.message };
    }
  }

  // Create a new task
  async createTask(taskData) {
    try {
      // Get current user
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const newTask = {
        title: taskData.title,
        description: taskData.description || null,
        project_name: taskData.project_name,
        status: taskData.status || 'pending',
        priority: taskData.priority || 'medium',
        due_date: taskData.due_date || null,
        user_id: user.id
      };

      const { data, error } = await supabase
        .from(this.tableName)
        .insert([newTask])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create task: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error creating task:', error);
      return { success: false, error: error.message };
    }
  }

  // Update an existing task
  async updateTask(taskId, updates) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(updates)
        .eq('id', taskId)
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to update task: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error updating task:', error);
      return { success: false, error: error.message };
    }
  }

  // Delete a task
  async deleteTask(taskId) {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .eq('id', taskId);

      if (error) {
        throw new Error(`Failed to delete task: ${error.message}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting task:', error);
      return { success: false, error: error.message };
    }
  }

  // Mark task as completed
  async completeTask(taskId) {
    return this.updateTask(taskId, { 
      status: 'completed',
      updated_at: new Date().toISOString()
    });
  }

  // Get task statistics
  async getTaskStats() {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('status, priority, project_name');

      if (error) {
        throw new Error(`Failed to fetch task stats: ${error.message}`);
      }

      const stats = {
        total: data.length,
        pending: data.filter(task => task.status === 'pending').length,
        in_progress: data.filter(task => task.status === 'in_progress').length,
        completed: data.filter(task => task.status === 'completed').length,
        high_priority: data.filter(task => task.priority === 'high' || task.priority === 'urgent').length,
        projects: [...new Set(data.map(task => task.project_name))].length
      };

      return { success: true, data: stats };
    } catch (error) {
      console.error('Error fetching task stats:', error);
      return { success: false, error: error.message };
    }
  }

  // Project management methods
  async getAllProjects() {
    try {
      const { data, error } = await supabase
        .from(this.projectsTableName)
        .select('*')
        .order('name', { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch projects: ${error.message}`);
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Error fetching projects:', error);
      return { success: false, error: error.message };
    }
  }

  async createProject(projectData) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        throw new Error('User not authenticated');
      }

      const newProject = {
        name: projectData.name,
        description: projectData.description || null,
        color: projectData.color || '#3B82F6',
        user_id: user.id
      };

      const { data, error } = await supabase
        .from(this.projectsTableName)
        .insert([newProject])
        .select()
        .single();

      if (error) {
        throw new Error(`Failed to create project: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error creating project:', error);
      return { success: false, error: error.message };
    }
  }

  async deleteProject(projectId) {
    try {
      const { error } = await supabase
        .from(this.projectsTableName)
        .delete()
        .eq('id', projectId);

      if (error) {
        throw new Error(`Failed to delete project: ${error.message}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Error deleting project:', error);
      return { success: false, error: error.message };
    }
  }

  // Search tasks
  async searchTasks(searchTerm) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .or(`title.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%,project_name.ilike.%${searchTerm}%`)
        .order('created_at', { ascending: false });

      if (error) {
        throw new Error(`Failed to search tasks: ${error.message}`);
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Error searching tasks:', error);
      return { success: false, error: error.message };
    }
  }

  // Get overdue tasks
  async getOverdueTasks() {
    try {
      const today = new Date().toISOString().split('T')[0];
      
      const { data, error } = await supabase
        .from(this.tableName)
        .select('*')
        .lt('due_date', today)
        .neq('status', 'completed')
        .order('due_date', { ascending: true });

      if (error) {
        throw new Error(`Failed to fetch overdue tasks: ${error.message}`);
      }

      return { success: true, data: data || [] };
    } catch (error) {
      console.error('Error fetching overdue tasks:', error);
      return { success: false, error: error.message };
    }
  }

  // Bulk operations
  async bulkUpdateTasks(taskIds, updates) {
    try {
      const { data, error } = await supabase
        .from(this.tableName)
        .update(updates)
        .in('id', taskIds)
        .select();

      if (error) {
        throw new Error(`Failed to bulk update tasks: ${error.message}`);
      }

      return { success: true, data };
    } catch (error) {
      console.error('Error bulk updating tasks:', error);
      return { success: false, error: error.message };
    }
  }

  async bulkDeleteTasks(taskIds) {
    try {
      const { error } = await supabase
        .from(this.tableName)
        .delete()
        .in('id', taskIds);

      if (error) {
        throw new Error(`Failed to bulk delete tasks: ${error.message}`);
      }

      return { success: true };
    } catch (error) {
      console.error('Error bulk deleting tasks:', error);
      return { success: false, error: error.message };
    }
  }
}

// Export singleton instance
export const taskService = new TaskService();
export default taskService;
