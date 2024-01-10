import axios from "axios";
const env = import.meta.env;

const instance = axios.create({
  baseURL: env.VITE_SERVER_URL,
  timeout: 30000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'x-api-key': env.VITE_API_KEY || 'Default Value',
  }
});

export default instance;