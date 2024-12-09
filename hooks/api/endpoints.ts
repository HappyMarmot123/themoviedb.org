import { searchType, mainType } from "@/assets/type/type";

export const ENDPOINTS = {
  SEARCH: (obj: searchType) =>
    `/search/movie?query=${obj.query}&page=${obj.page}&adult=false`,
  MAIN: (obj: mainType) => `/movie/${obj.keyword}?page=${obj.page}&adult=false`,
  DETAIL: (id: string) => `/movie/${id}?language=ko-KR`,
  VIDEO: (id: string) => `/movie/${id}/videos`,
};

// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
