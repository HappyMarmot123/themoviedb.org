import { searchType, mainType } from "@/assets/type/type";
export const ENDPOINTS = {
  SEARCH: (obj: searchType) =>
    `/search/movie?query=${obj.query}&page=${obj.page}`,
  MAIN: (obj: mainType) => `/movie/${obj.keyword}?page=${obj.page}`,
};

// https://api.themoviedb.org/3/movie/popular?language=en-US&page=1
