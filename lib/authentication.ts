import axios, { authenticatedRequest } from './axios';
import userStorage from './userStorage';
import jwt_decode from "jwt-decode";

const LOCALSTORAGE_TOKEN = 'authentication.token';
const LOCALSTORAGE_REFRESH_TOKEN = 'authentication.refreshToken';
const LOCALSTORAGE_USER = 'authentication.user';

function executeLoginRequest(username: string, password: string) {
  return axios({
    method: 'POST',
    url: '/auth/token/login/',
    data: {
      username,
      password
    }
  }) as AxiosResponse;
}

function updateTokensFromLoginResponse(response: AxiosResponse) {
  const { access, refresh } = response.data;
  if (!access) {
    throw new Error('No token from login route');
  }
  userStorage.setItem(LOCALSTORAGE_TOKEN, access);
  userStorage.setItem(LOCALSTORAGE_REFRESH_TOKEN, refresh);
  userStorage.setItem(LOCALSTORAGE_USER, jwt_decode(access));
}

function executeRefreshRequest(refreshToken: string) {
  return axios({
    method: 'POST',
    url: '/auth/token/refresh/',
    data: {
      refresh: refreshToken
    }
  })
}

export async function loginWithTOTP(bearer: string, token: string) {
  const response = await axios({
    method: 'POST',
    url: `/auth/totp/login/${token}/`,
    headers: {
      'Authorization': `Bearer ${bearer}`
    }
  }) as AxiosResponse;
  updateTokensFromLoginResponse(response);
  return true;
}

export async function createTOTPToken() {
  const response = await authenticatedRequest({
    method: 'GET',
    url: '/auth/totp/create'
  });
  return response.data;
}

export async function login(username: string, password: string) {
  const response = await executeLoginRequest(username, password);
  updateTokensFromLoginResponse(response);
  return true;
}

export async function refreshUser() {
  const refreshToken = userStorage.getItem(LOCALSTORAGE_REFRESH_TOKEN);
  if (refreshToken) {
    const response = await executeRefreshRequest(refreshToken);
    userStorage.setItem(LOCALSTORAGE_REFRESH_TOKEN, response.data.refresh);
    return true;
  }
  return false;
}

export function getUserToken() {
  return userStorage.getItem(LOCALSTORAGE_TOKEN)
}