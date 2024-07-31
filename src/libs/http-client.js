import axios from "axios";
import { env } from "../utilities/env";

/**
 * @type {import('axios').AxiosRequestConfig} httpClientConfig
 */
const httpClientConfig = {
  baseURL: env.API_URL,
};

export const httpClient = axios.create(httpClientConfig);
