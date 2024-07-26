import axios from 'axios';

const instance = axios.create({
  baseURL: process.env.REACT_APP_MONDODB_DEV_SERVER,
});

export default instance;
