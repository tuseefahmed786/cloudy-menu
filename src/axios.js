import axios from 'axios';

const instance = axios.create({
  // https://menuserver-eight.vercel.app
  // http://localhost:3002
  baseURL: 'https://menuserver-eight.vercel.app', // Set your base URL here
});

export default instance;
