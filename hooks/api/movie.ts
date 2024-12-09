import { tmdbApi } from "./index";
import { ENDPOINTS } from "./endpoints";
import { AxiosResponse } from "axios";
import { searchType, mainType } from "@/assets/type/type";
import { IMAGE_URL } from "@/constants/Moviedb";

export const movieService = {
  search: (obj: searchType): Promise<AxiosResponse> =>
    tmdbApi.get(ENDPOINTS.SEARCH(obj), {
      params: { obj },
    }),
  main: (obj: mainType): Promise<AxiosResponse> =>
    tmdbApi.get(ENDPOINTS.MAIN(obj), {
      params: { obj },
    }),
  detail: (id: string): Promise<AxiosResponse> =>
    tmdbApi.get(ENDPOINTS.DETAIL(id), {
      params: { id },
    }),
  video: (id: string): Promise<AxiosResponse> =>
    tmdbApi.get(ENDPOINTS.VIDEO(id), {
      params: { id },
    }),
};
