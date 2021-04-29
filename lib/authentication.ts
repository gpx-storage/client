import axios from './axios';
import userStorage from './userStorage';

const LOCALSTORAGE_TOKEN = 'authentication.token';
const LOCALSTORAGE_REFRESH_TOKEN = 'authentication.refreshToken';

export async function login(username: string, password: string) {
  const response = await axios({
    method: 'POST',
    url: '/auth/get-token/',
    data: {
      username,
      password
    }
  })

  const { access, refresh } = response.data;
  if (!access) {
    throw new Error('No token from login route');
  }
  userStorage.setItem(LOCALSTORAGE_TOKEN, access);
  userStorage.setItem(LOCALSTORAGE_REFRESH_TOKEN, refresh);
  return true;
}

export function getUserToken() {
  return userStorage.getItem(LOCALSTORAGE_TOKEN)
}