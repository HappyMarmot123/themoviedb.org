import { tmdbApi } from "./index";
import { ENDPOINTS } from "./endpoints";
import { AxiosResponse } from "axios";
import {
  searchType,
  mainType,
  sessionAndAccountType,
  favoriteType,
} from "@/assets/type/type";

export const movieService = {
  search: (obj: searchType): Promise<AxiosResponse> =>
    tmdbApi.get(ENDPOINTS.SEARCH(obj)),
  main: (obj: mainType): Promise<AxiosResponse> =>
    tmdbApi.get(ENDPOINTS.MAIN(obj)),
  detail: (id: string): Promise<AxiosResponse> =>
    tmdbApi.get(ENDPOINTS.DETAIL(id)),
  video: (id: string): Promise<AxiosResponse> =>
    tmdbApi.get(ENDPOINTS.VIDEO(id)),
  favorite_add: (
    { sessionId, accountId }: sessionAndAccountType,
    obj: favoriteType
  ): Promise<AxiosResponse> =>
    tmdbApi.post(
      ENDPOINTS.FAVORITE_ADD({ sessionId, accountId }),
      JSON.stringify(obj),
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    ),
  favorite_list: ({
    sessionId,
    accountId,
  }: sessionAndAccountType): Promise<AxiosResponse> =>
    tmdbApi.get(ENDPOINTS.FAVORITE_LIST({ sessionId, accountId })),
};
