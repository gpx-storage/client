import { getUserToken } from './authentication';
import axios from 'axios';

const options = {
  baseURL: process.env.NEXT_PUBLIC_API_HOST || 'http://localhost',
};
const axiosInstance = axios.create(options);
export default axiosInstance;