// src/axiosConfig.js
import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.NODE_ENV === 'production' ? process.env.MONDODB_SERVER : 'http://127.0.0.1:5000',
});

export default instance;
