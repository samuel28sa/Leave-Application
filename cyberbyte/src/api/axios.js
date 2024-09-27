import axios from "axios";
export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const httpClient = createClient();
export const APP_NAME = import.meta.env.VITE_APP_NAME;
export const VERSION = import.meta.env.VITE_APP_VERSION;

function createClient() {
  const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
  });
  client.interceptors.request.use(handleBearerTokenInterceptor);
  return client;
}

function handleBearerTokenInterceptor(config) {
  const token = localStorage.getItem("token");
  if (token?.length) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
}
export default httpClient;
