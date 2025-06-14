import axios from 'axios';
import { config } from '@/config/env';

export const axiosInstance = axios.create({
  baseURL: config.apiBaseUrl,
  timeout: 10000, // 10 seconds
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response) {
      switch (error.response.status) {
        case 400:
          error.message = 'Bad request';
          break;
        case 401:
          error.message = 'Unauthorized';
          break;
        case 403:
          error.message = 'Forbidden';
          break;
        case 404:
          error.message = 'Not found';
          break;
        case 500:
          error.message = 'Internal server error';
          break;
        default:
          error.message = 'Something went wrong';
      }
    } else if (error.request) {
      error.message = 'No response from server';
    } else {
      error.message = 'Request failed';
    }
    return Promise.reject(error);
  }
); 