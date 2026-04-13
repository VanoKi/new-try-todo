import axios from "axios";

export const instance =axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
  withCredentials: true,
  headers: {
    'API-KEY': import.meta.env.VITE_API_KEY,
  },
})