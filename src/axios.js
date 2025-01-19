import axios from 'axios';

const instance = axios.create({
  //  baseURL: 'https://menuserver-eight.vercel.app', // Set your base URL here
  baseURL: 'https://menuserver-eight.vercel.app', // Set your base URL here
});

export default instance;
