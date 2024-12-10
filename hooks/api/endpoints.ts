import {
  searchType,
  mainType,
  sessionAndAccountType,
} from "@/assets/type/type";

export const ENDPOINTS = {
  SEARCH: (obj: searchType) =>
    `/search/movie?query=${obj.query}&page=${obj.page}&adult=false`,
  MAIN: (obj: mainType) => `/movie/${obj.keyword}?page=${obj.page}&adult=false`,
  DETAIL: (id: string) => `/movie/${id}?language=ko-KR`,
  VIDEO: (id: string) => `/movie/${id}/videos`,
  FAVORITE_ADD: ({ sessionId, accountId }: sessionAndAccountType) =>
    `/account/${accountId}/favorite?session_id=${sessionId}`,
  FAVORITE_LIST: ({ sessionId, accountId }: sessionAndAccountType) =>
    `https://api.themoviedb.org/3/account/${accountId}/favorite/movies?page=1&session_id=${sessionId}&sort_by=created_at.asc`,
};

// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
