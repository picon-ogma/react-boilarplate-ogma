import axios from "axios";
import { env } from "../utilities/env";

/**
 *
 * @param {import ('axios').InternalAxiosRequestConfig} config
 * @returns {import ('axios').InternalAxiosRequestConfig}
 */
function authRequestInterceptor(config) {
  return config;
}

const http = axios.create({
  baseURL: env.API_URL,
});

http.interceptors.request.use(authRequestInterceptor);
http.interceptors.response.use(
  (response) => {
    return response.data;
  },
  (error) => Promise.reject(error)
);

export { http };
