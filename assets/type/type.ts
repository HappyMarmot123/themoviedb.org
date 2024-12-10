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

export interface sessionAndAccountType {
  sessionId: string;
  accountId: string;
}

export interface favoriteType {
  media_id: number;
  media_type: string;
  favorite: boolean;
}

export interface objType {
  [key: string]: any;
}
