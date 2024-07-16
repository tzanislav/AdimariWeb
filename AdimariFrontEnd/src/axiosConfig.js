// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? 'https://your-production-url.com' : 'http://192.168.100.73:5000',
});

export default instance;
