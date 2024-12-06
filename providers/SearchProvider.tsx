import React, { createContext, useState, useContext, ReactNode } from "react";

interface SearchContextType {
  search: string;
  addToSearch: (item: string) => void;
}

// Context 생성
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// SearchProvider 정의 및 Provider 제공
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [search, setSearch] = useState("");

  const addToSearch = (item: string) => {
    setSearch(item);
  };

  return (
    <SearchContext.Provider value={{ search, addToSearch }}>
      {children}
    </SearchContext.Provider>
  );
};

// SearchContext 커스텀 훅 (예외 처리 포함)
// 만약 Context 값이 없다면 에러를 던집니다.
export const useSearchContext = (): SearchContextType => {
  const context = useContext(SearchContext);

  if (context === undefined) {
    throw new Error("useSearchContext must be used within a SearchProvider");
  } else {
    return context;
  }
};
