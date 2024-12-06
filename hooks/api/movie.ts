import { tmdbApi } from "./index";
import { ENDPOINTS } from "./endpoints";
import { AxiosResponse } from "axios";

export const movieService = {
  search: (query: string): Promise<AxiosResponse> =>
    tmdbApi.get(ENDPOINTS.SEARCH(query), {
      params: { query },
    }),
};
