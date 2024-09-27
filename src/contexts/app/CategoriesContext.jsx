import { createContext, useContext, useState } from "react";

const CatergoryContext = createContext();

function CategoryProvider({ children }) {
  const [category, setCategory] = useState(null);
  return (
    <CatergoryContext.Provider value={{ category, setCategory }}>
      {children}
    </CatergoryContext.Provider>
  );
}

function useCategoryContext() {
  return useContext(CatergoryContext);
}

export { CategoryProvider, useCategoryContext };
