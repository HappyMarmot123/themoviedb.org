import { tmdbApi } from "./index";
import { ENDPOINTS } from "./endpoints";
import { AxiosResponse } from "axios";

export interface searchType {
  query: string;
  page: string;
}

export interface mainType {
  keyword: string;
  page: string;
}

export const movieService = {
  search: (obj: searchType): Promise<AxiosResponse> =>
    tmdbApi.get(ENDPOINTS.SEARCH(obj), {
      params: { obj },
    }),
  main: (obj: mainType): Promise<AxiosResponse> =>
    tmdbApi.get(ENDPOINTS.MAIN(obj), {
      params: { obj },
    }),
};
