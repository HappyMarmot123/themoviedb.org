import axios from "axios";
import { API_KEY, BASE_URL } from "@/constants/Moviedb";

export const tmdbApi = axios.create({
  baseURL: BASE_URL,
  params: {
    api_key: API_KEY,
  },
});
