import { searchType } from "./movie";
import { mainType } from "./movie";

export const ENDPOINTS = {
  SEARCH: (obj: searchType) =>
    `/search/movie?query=${obj.query}&page=${obj.page}`,
  MAIN: (obj: mainType) => `/tv/${obj.keyword}?page=${obj.page}`,
};
