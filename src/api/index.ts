import axios, { AxiosError } from 'axios';
import { toast, ToastId } from 'react-toastify';
import { BASE_URL, defaultServerError } from '../constants';

const AUTH_TOKEN = localStorage.getItem('token');

const api = axios.create({
  baseURL: BASE_URL,
});

let toastId: ToastId = '';

function errorHandler(error: AxiosError) {
  if (!error.response) {
    return Promise.reject(error);
  }
  const {
    response: { status },
  } = error;
  // if (status === 401) {
  //   if (!toast.isActive(toastId)) {
  //     toastId = toast.error(
  //       getOr(defaultServerError, 'response.data.error', error),
  //     );
  //   }
  // }
  if (status >= 500) {
    if (!toast.isActive(toastId)) {
      toastId = toast.error(defaultServerError);
    }
  }

  return Promise.reject(error);
}

api.interceptors.response.use(
  response => response,
  error => errorHandler(error),
);

export function setTokenHeader(token: string) {
  api.defaults.headers.common.Authorization = `Bearer ${token}`;
}

export function removeTokenHeader() {
  delete api.defaults.headers.common.Authorization;
}

if (AUTH_TOKEN) {
  setTokenHeader(AUTH_TOKEN);
}

export default api;
