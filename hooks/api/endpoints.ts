import {
  searchType,
  mainType,
  sessionAndAccountType,
} from "@/assets/type/type";
import qs from "qs";

export const ENDPOINTS = {
  SEARCH: (obj: searchType) =>
    `/search/movie?${qs.stringify({ query: obj.query, page: obj.page, adult: false })}`,
  MAIN: (obj: mainType) =>
    `/movie/${obj.keyword}?${qs.stringify({ page: obj.page, adult: false })}`,
  DETAIL: (id: string) => `/movie/${id}?language=ko-KR`,
  VIDEO: (id: string) => `/movie/${id}/videos`,
  FAVORITE_ADD: ({ sessionId, accountId }: sessionAndAccountType) =>
    `/account/${accountId}/favorite?session_id=${sessionId}`,
  FAVORITE_LIST: ({ sessionId, accountId }: sessionAndAccountType) =>
    `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?${qs.stringify(
      {
        page: 1,
        session_id: sessionId,
        sort_by: "created_at.asc",
      }
    )}`,
};

// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
