import { API_BASE_URL } from "../../config";

/**
 * A wrapper for the fetch API that automatically includes the JWT token
 * in the Authorization header for authenticated requests.
 * @param {string} endpoint - The API endpoint to call (e.g., '/api/profile').
 * @param {object} options - Optional fetch options (method, body, etc.).
 * @returns {Promise<any>} - The JSON response from the server.
 * @throws {Error} - Throws an error with status and message on API failure.
 */
const api = async (endpoint, options = {}) => {
  // 1. Get the token from localStorage
  const token = localStorage.getItem('token');

  // 2. Prepare the headers
  const headers = {
    ...options.headers, // Allow overriding headers if needed
  };
  
  // --- FIX: Conditionally set Content-Type ---
  // If the body is FormData, do NOT set Content-Type. The browser will do it.
  if (!(options.body instanceof FormData)) {
    headers['Content-Type'] = 'application/json';
  }

  // 3. If a token exists, add the Authorization header
  if (token) {
    headers['Authorization'] = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    // Handle cases where the response might not have a JSON body (e.g., 204 No Content)
    if (response.status === 204) {
      return null;
    }
    
    const data = await response.json();

    if (!response.ok) {
      // Create an error object that includes the status code
      const error = new Error(data.message || 'An API error occurred');
      error.status = response.status;
      throw error;
    }

    return data;
  } catch (err) {
    // Re-throw the error so it can be caught by the component
    throw err;
  }
};

export default api;

