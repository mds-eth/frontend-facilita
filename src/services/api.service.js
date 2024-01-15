import axios from "axios";
import { hostAPI } from "./configHost";

class ApiService {

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: hostAPI.host,
    });

    this.setupInterceptors();
  }

  async setupInterceptors() {
    const token = localStorage.getItem('[@auth-session]');

    this.axiosInstance.interceptors.request.use((config) => {
      if (token) {
        config.headers.Authorization = `${token}`;
      }

      return config;
    });

    this.axiosInstance.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response && error.response.status === 401) {
          window.location.href = "/";
        }
        return Promise.reject(error);
      }
    );
  }

  async get(url, params, headers) {
    return await this.axiosInstance.get(url, { params, headers });
  }

  async post(url, data, headers) {
    return await this.axiosInstance.post(url, data, { headers });
  }

  async put(url, data, headers) {
    return await this.axiosInstance.put(url, data, { headers });
  }
}

export default new ApiService();
