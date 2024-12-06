import React, { createContext, useState, useContext, ReactNode } from "react";

interface SearchContextType {
  cart: number;
  addToCart: (item: number) => void;
}

// Context 생성
const SearchContext = createContext<SearchContextType | undefined>(undefined);

// SearchProvider 정의 및 Provider 제공
export const SearchProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<any>(0);

  const addToCart = (item: number) => {
    setCart((prev: any) => prev + item);
  };

  return (
    <SearchContext.Provider value={{ cart, addToCart }}>
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
