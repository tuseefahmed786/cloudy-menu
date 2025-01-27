import axios from 'axios';

const axiosApi = axios.create({
    //  baseURL: 'https://menuserver-eight.vercel.app', // Set your base URL here
    baseURL: 'http://localhost:3002',
});


export default axiosApi