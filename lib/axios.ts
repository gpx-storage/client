import { getUserToken, refreshUser } from './authentication';
import axios from 'axios';
import { postMessage } from './window';

async function handle401Error() {
  console.log('Refresh user...');
  const resultRefreshUser = await refreshUser();

  if (!resultRefreshUser) {
    console.log('User not authenticated...');
    postMessage({ action: 'authentication.unauthorized' });
  }
}

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST || 'http://localhost',
});

axiosInstance.interceptors.response.use(function (response) {
  // Any status code that lie within the range of 2xx cause this function to trigger
  // Do something with response data
  return response;
}, function (error) {

  if (error.response.status === 401) {
    return handle401Error();
  }

  // Any status codes that falls outside the range of 2xx cause this function to trigger
  // Do something with response error
  return Promise.reject(error);
});

/**
 * Add a new method to axiosInstance
 */
export function authenticatedRequest(axiosOptions: any) {
  return axiosInstance({
    ...axiosOptions,
    headers: {
      ...axiosOptions.headers,
      'Authorization': `Bearer ${getUserToken()}`
    },
  })
}

export default axiosInstance;