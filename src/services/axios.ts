import axios from 'axios';
import { message } from 'antd';

export const api = axios.create({
  baseURL: 'https://dummyjson.com',
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {

      localStorage.removeItem('token');

      message.error('Session expired, please login again');

      window.location.href = '/login';
    }

    return Promise.reject(error);
  }
);
