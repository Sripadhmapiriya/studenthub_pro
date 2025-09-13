// API Configuration
const API_BASE_URL = 'http://localhost:8080/api';

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  return localStorage.getItem('authToken');
};

// Helper function to set auth headers
const getAuthHeaders = () => {
  const token = getAuthToken();
  return {
    'Content-Type': 'application/json',
    ...(token && { Authorization: `Bearer ${token}` })
  };
};

// Generic API call function
const apiCall = async (endpoint, options = {}) => {
  const url = `${API_BASE_URL}${endpoint}`;
  const config = {
    headers: getAuthHeaders(),
    ...options
  };

  try {
    const response = await fetch(url, config);
    
    // Handle unauthorized requests
    if (response.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('userInfo');
      window.location.href = '/login';
      throw new Error('Unauthorized access');
    }

    // Handle other error responses
    if (!response.ok) {
      let errorMessage = `HTTP error! status: ${response.status}`;
      try {
        const errorData = await response.json();
        if (errorData.error) {
          errorMessage = errorData.error;
        } else if (errorData.message) {
          errorMessage = errorData.message;
        } else if (errorData.errors) {
          // Handle validation errors
          const validationErrors = Object.values(errorData.errors).join(', ');
          errorMessage = validationErrors;
        }
      } catch (parseError) {
        // If JSON parsing fails, try to get text
        try {
          const textData = await response.text();
          if (textData) errorMessage = textData;
        } catch (textError) {
          // Use default error message
        }
      }
      throw new Error(errorMessage);
    }

    // Handle empty responses
    const contentType = response.headers.get('content-type');
    if (contentType && contentType.includes('application/json')) {
      return await response.json();
    }
    
    return null;
  } catch (error) {
    console.error('API call failed:', error);
    throw error;
  }
};

// Authentication API
export const authAPI = {
  login: async (credentials) => {
    const response = await apiCall('/auth/login', {
      method: 'POST',
      body: JSON.stringify(credentials)
    });
    
    if (response?.token) {
      localStorage.setItem('authToken', response.token);
      localStorage.setItem('userInfo', JSON.stringify({
        username: response.username,
        email: response.email,
        role: response.role
      }));
    }
    
    return response;
  },

  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('userInfo');
  },

  validateToken: async () => {
    try {
      return await apiCall('/auth/validate', {
        method: 'POST'
      });
    } catch (error) {
      return false;
    }
  },

  isAuthenticated: () => {
    return !!getAuthToken();
  },

  getUserInfo: () => {
    const userInfo = localStorage.getItem('userInfo');
    return userInfo ? JSON.parse(userInfo) : null;
  }
};

// Students API
export const studentsAPI = {
  // Get all students with pagination
  getAll: async (page = 0, size = 10, sortBy = 'createdAt', sortDir = 'desc') => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      sortBy,
      sortDir
    });
    return await apiCall(`/students?${params}`);
  },

  // Get student by ID
  getById: async (id) => {
    return await apiCall(`/students/${id}`);
  },

  // Get student by student ID
  getByStudentId: async (studentId) => {
    return await apiCall(`/students/student-id/${studentId}`);
  },

  // Create new student
  create: async (studentData) => {
    return await apiCall('/students', {
      method: 'POST',
      body: JSON.stringify(studentData)
    });
  },

  // Update student
  update: async (id, studentData) => {
    return await apiCall(`/students/${id}`, {
      method: 'PUT',
      body: JSON.stringify(studentData)
    });
  },

  // Delete student
  delete: async (id) => {
    return await apiCall(`/students/${id}`, {
      method: 'DELETE'
    });
  },

  // Search students
  search: async (searchTerm, page = 0, size = 10) => {
    const params = new URLSearchParams({
      searchTerm,
      page: page.toString(),
      size: size.toString()
    });
    return await apiCall(`/students/search?${params}`);
  },

  // Filter students
  filter: async (filters, page = 0, size = 10) => {
    const params = new URLSearchParams({
      page: page.toString(),
      size: size.toString(),
      ...Object.fromEntries(Object.entries(filters).filter(([_, v]) => v != null && v !== ''))
    });
    return await apiCall(`/students/filter?${params}`);
  },

  // Update enrollment status
  updateStatus: async (id, status) => {
    const params = new URLSearchParams({ status });
    return await apiCall(`/students/${id}/status?${params}`, {
      method: 'PATCH'
    });
  },

  // Get student statistics
  getStats: async () => {
    return await apiCall('/students/stats');
  },

  // Get course statistics
  getCourseStats: async () => {
    return await apiCall('/students/stats/courses');
  },

  // Get year statistics
  getYearStats: async () => {
    return await apiCall('/students/stats/years');
  }
};

// Export API base URL for other components if needed
export { API_BASE_URL };