import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true, // To include cookies with requests
});

axiosInstance.interceptors.response.use(
  (response) => response, // Directly return the response if it's successful
  async (error) => {
    const originalRequest = error.config;

    // Handle unauthorized errors (401)
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Prevent infinite retry loops

      try {
        // Attempt to refresh the token
        const refreshResponse = await axiosInstance.get('/auth/refresh-token');
        if (refreshResponse.status === 200) {
          // Retry the original request with the new token
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        // If refresh fails, log out the user
        console.error('Refresh token failed:', refreshError.message);
        localStorage.removeItem('token'); // Remove any invalid tokens
        localStorage.removeItem('loginData'); // Clear user data
        window.location.href = '/login'; // Redirect to login page
        return Promise.reject(refreshError); // Propagate the error
      }
    }

    // Return any other error
    return Promise.reject(error);
  }
);

export default axiosInstance;
