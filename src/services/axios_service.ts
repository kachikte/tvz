import axios from 'axios';
import authService from './auth-service';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:4000', // Update with your actual API URL
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const user = authService.getCurrentUser();
    if (user && user.token) {
      config.headers['Authorization'] = 'Bearer ' + user.token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      authService.logout();
      window.location.reload();
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
