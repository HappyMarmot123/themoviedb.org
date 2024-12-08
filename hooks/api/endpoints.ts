import { searchType } from "./movie";

export const ENDPOINTS = {
  SEARCH: (obj: searchType) =>
    `/search/movie?query=${obj.query}&page=${obj.page}`,
};
