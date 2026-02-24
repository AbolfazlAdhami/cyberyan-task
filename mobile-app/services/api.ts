import axios from "axios";

export const api = axios.create({
  baseURL: "http://192.168.1.3:8000/api",
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    return Promise.reject(error.response?.data?.message || "Something went wrong");
  },
);
