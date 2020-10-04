import { client } from '../core/services/api-client.service';

import { LoginDetails } from './types/login-details.interface';
import { RegisterDetails } from './types/register-details.interface';
import { UserDetails } from './types/user-details.interface';

const localStorageKey = '__auth__';

function getToken(): string {
  return window.localStorage.getItem(localStorageKey);
}

function handleUserResponse(userDetails: UserDetails) {
  window.localStorage.setItem(localStorageKey, userDetails.access_token);
  return userDetails;
}

async function login(data: LoginDetails): Promise<UserDetails> {
  return client('auth/login', { data }).then(handleUserResponse);
}

async function register(data: RegisterDetails): Promise<UserDetails> {
  return client('auth/register', { data }).then(handleUserResponse);
}

async function logout(): Promise<void> {
  window.localStorage.removeItem(localStorageKey);
}

export { login, register, logout, getToken };
