// API utility for Xpense Backend
const BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://xpense-backend-production.up.railway.app";

// Helper function to get auth token from localStorage
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem("authToken");
  }
  return null;
};

// Helper function to set auth token in localStorage
const setAuthToken = (token) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("authToken", token);
  }
};

// Helper function to remove auth token from localStorage
const removeAuthToken = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("authToken");
  }
};

// Generic API request function
const apiRequest = async (endpoint, options = {}) => {
  const url = `${BASE_URL}${endpoint}`;
  const token = getAuthToken();

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Bearer ${token}` }),
      ...options.headers,
    },
    ...options,
  };

  try {
    const response = await fetch(url, config);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error || `HTTP error! status: ${response.status}`);
    }

    return data;
  } catch (error) {
    console.error("API request failed:", error);
    throw error;
  }
};

// Authentication API calls
export const authAPI = {
  register: async (email, password, fullName) => {
    const data = await apiRequest("/api/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password, fullName }),
    });

    if (data.session?.access_token) {
      setAuthToken(data.session.access_token);
    }

    return data;
  },

  login: async (email, password) => {
    const data = await apiRequest("/api/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    });

    if (data.session?.access_token) {
      setAuthToken(data.session.access_token);
    }

    return data;
  },

  logout: async () => {
    await apiRequest("/api/auth/logout", {
      method: "POST",
    });
    removeAuthToken();
  },

  refreshToken: async (refreshToken) => {
    const data = await apiRequest("/api/auth/refresh", {
      method: "POST",
      body: JSON.stringify({ refresh_token: refreshToken }),
    });

    if (data.session?.access_token) {
      setAuthToken(data.session.access_token);
    }

    return data;
  },

  resetPassword: async (email) => {
    return await apiRequest("/api/auth/reset-password", {
      method: "POST",
      body: JSON.stringify({ email }),
    });
  },
};

// Profile API calls
export const profileAPI = {
  getProfile: async () => {
    return await apiRequest("/api/protected/profile");
  },

  updateProfile: async (fullName) => {
    return await apiRequest("/api/protected/profile", {
      method: "PUT",
      body: JSON.stringify({ fullName }),
    });
  },
};

// Transaction API calls
export const transactionAPI = {
  getTransactions: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/transactions${queryString ? `?${queryString}` : ""}`;
    return await apiRequest(endpoint);
  },

  getTransaction: async (id) => {
    return await apiRequest(`/api/transactions/${id}`);
  },

  createTransaction: async (transaction) => {
    return await apiRequest("/api/transactions", {
      method: "POST",
      body: JSON.stringify(transaction),
    });
  },

  updateTransaction: async (id, transaction) => {
    return await apiRequest(`/api/transactions/${id}`, {
      method: "PUT",
      body: JSON.stringify(transaction),
    });
  },

  deleteTransaction: async (id) => {
    return await apiRequest(`/api/transactions/${id}`, {
      method: "DELETE",
    });
  },

  getStatsSummary: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/transactions/stats/summary${
      queryString ? `?${queryString}` : ""
    }`;
    return await apiRequest(endpoint);
  },

  getStatsCategories: async (params = {}) => {
    const queryString = new URLSearchParams(params).toString();
    const endpoint = `/api/transactions/stats/categories${
      queryString ? `?${queryString}` : ""
    }`;
    return await apiRequest(endpoint);
  },
};

// Category API calls
export const categoryAPI = {
  getCategories: async () => {
    return await apiRequest("/api/categories");
  },

  getDefaultCategories: async () => {
    return await apiRequest("/api/categories/default");
  },

  getCustomCategories: async () => {
    return await apiRequest("/api/categories/custom");
  },

  createCustomCategory: async (category) => {
    return await apiRequest("/api/categories/custom", {
      method: "POST",
      body: JSON.stringify(category),
    });
  },

  updateCustomCategory: async (id, category) => {
    return await apiRequest(`/api/categories/custom/${id}`, {
      method: "PUT",
      body: JSON.stringify(category),
    });
  },

  deleteCustomCategory: async (id) => {
    return await apiRequest(`/api/categories/custom/${id}`, {
      method: "DELETE",
    });
  },
};

// Export utility functions
export { getAuthToken, setAuthToken, removeAuthToken };
