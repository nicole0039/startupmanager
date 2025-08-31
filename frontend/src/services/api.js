import axiosInstance from '../axiosConfig';

// Helper function to get auth headers
const getAuthHeaders = () => {
  const user = JSON.parse(localStorage.getItem('user') || '{}');
  return user.token ? { Authorization: `Bearer ${user.token}` } : {};
};

// Mentor API functions
export const mentorAPI = {
  // Get all mentors
  getMentors: async () => {
    const response = await axiosInstance.get('/api/mentors', {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Get single mentor
  getMentor: async (id) => {
    const response = await axiosInstance.get(`/api/mentors/${id}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Create mentor (coordinator only)
  createMentor: async (mentorData) => {
    const response = await axiosInstance.post('/api/mentors', mentorData, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Update mentor (coordinator only)
  updateMentor: async (id, mentorData) => {
    const response = await axiosInstance.put(`/api/mentors/${id}`, mentorData, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Delete mentor (coordinator only)
  deleteMentor: async (id) => {
    const response = await axiosInstance.delete(`/api/mentors/${id}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Assign mentor to startup (coordinator only)
  assignMentor: async (mentorId, applicationId) => {
    const response = await axiosInstance.put(`/api/mentors/${mentorId}/assign/${applicationId}`, {}, {
      headers: getAuthHeaders()
    });
    return response.data;
  }
};

// Application API functions
export const applicationAPI = {
  // Get all applications
  getApplications: async () => {
    const response = await axiosInstance.get('/api/applications', {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Get single application
  getApplication: async (id) => {
    const response = await axiosInstance.get(`/api/applications/${id}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Create application
  createApplication: async (applicationData) => {
    const response = await axiosInstance.post('/api/applications', applicationData, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Update application
  updateApplication: async (id, applicationData) => {
    const response = await axiosInstance.put(`/api/applications/${id}`, applicationData, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Delete application
  deleteApplication: async (id) => {
    const response = await axiosInstance.delete(`/api/applications/${id}`, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Review application (coordinator only)
  reviewApplication: async (id, status) => {
    const response = await axiosInstance.put(`/api/applications/${id}/review`, { status }, {
      headers: getAuthHeaders()
    });
    return response.data;
  },

  // Get dashboard stats (coordinator only)
  getDashboardStats: async () => {
    const response = await axiosInstance.get('/api/applications/dashboard/stats', {
      headers: getAuthHeaders()
    });
    return response.data;
  }
};