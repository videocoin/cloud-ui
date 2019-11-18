import axios, { AxiosError, AxiosTransformer } from 'axios';
import { toast, ToastId } from 'react-toastify';
import humps from 'humps';
import { BASE_URL, defaultServerError } from 'const';

const defaultTransformers = (transformRequest: any): AxiosTransformer[] => {
  if (!transformRequest) {
    return [];
  }
  if (transformRequest instanceof Array) {
    return transformRequest;
  }

  return [transformRequest];
};

const api = axios.create({
  baseURL: BASE_URL,
  transformRequest: [
    (data: any) => humps.decamelizeKeys(data),
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

export default api;
