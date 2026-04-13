import axios from "axios";

axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
  headers: {
    API_KEY: import.meta.env.VITE_API_KEY,
    AUTH_TOKEN: import.meta.env.VITE_AUTH_TOKEN,
  },
})