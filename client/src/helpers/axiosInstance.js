import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshResponse = await axiosInstance.get('/auth/refresh-token');
        if (refreshResponse.status === 200) {
          return axiosInstance(originalRequest);
        }
      } catch (refreshError) {
        localStorage.removeItem('token');
        localStorage.removeItem('loginData');
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;