import axios from "axios";
// import { API_KEY, BASE_URL } from "react-native-dotenv";

export const tmdbApi = axios.create({
  baseURL: process.env.BASE_URL,
  params: {
    api_key: process.env.API_KEY,
  },
});
