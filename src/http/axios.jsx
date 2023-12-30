import axios from "axios";

const env = import.meta.env;
const instance = axios.create({
  baseURL: env.VITE_SERVER_URL,
});

export default instance;
