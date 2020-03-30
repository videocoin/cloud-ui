import axios, { AxiosError, AxiosTransformer } from 'axios';
import { toast, ToastId } from 'react-toastify';
import humps from 'humps';
import { getOr } from 'lodash/fp';
import { BASE_URL, defaultServerError, STORAGE_KEY } from 'const';

const defaultTransformers = (transformRequest: any): AxiosTransformer[] => {
  if (!transformRequest) {
    return [];
  }
  if (transformRequest instanceof Array) {
    return transformRequest;
  }

  return [transformRequest];
};
const AUTH_TOKEN = localStorage.getItem(STORAGE_KEY.AUTH_KEY);

const api = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${AUTH_TOKEN}`,
  },
  transformRequest: [
    (data: any) => {
      if (data instanceof FormData) {
        return data;
      }

      return humps.decamelizeKeys(data);
    },
    ...defaultTransformers(axios.defaults.transformRequest),
  ],
  transformResponse: [
    ...defaultTransformers(axios.defaults.transformResponse),
    (data: any) => humps.camelizeKeys(data),
  ],
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
  if (status === 403) {
    if (!toast.isActive(toastId)) {
      toastId = toast.error(
        getOr(defaultServerError, 'response.data.message', error),
      );
    }
  }
  if (status >= 500) {
    if (!toast.isActive(toastId)) {
      toastId = toast.error(defaultServerError);
    }
  }

  return Promise.reject(error);
}

api.interceptors.response.use(
  (response) => response,
  (error) => errorHandler(error),
);

export function setTokenHeader(token: string) {
  const storedToken = localStorage.getItem(STORAGE_KEY.AUTH_KEY);

  if (!token && !storedToken) {
    return;
  }

  api.defaults.headers.common.Authorization = `Bearer ${token || storedToken}`;
  api.defaults.headers.Authorization = `Bearer ${token || storedToken}`;
}

export function removeTokenHeader() {
  delete api.defaults.headers.common.Authorization;
}

export default api;
