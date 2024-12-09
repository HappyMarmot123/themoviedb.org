export interface movieType {
  id: number;
  title: string;
  poster_path: string;
  popularity: string;
}

export interface searchType {
  query: string;
  page: string;
}

export interface mainType {
  keyword: string;
  page: string;
}

export interface objType {
  [key: string]: any;
}
