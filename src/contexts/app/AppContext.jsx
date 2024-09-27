import { createContext, useContext, useEffect, useReducer } from "react";
import appReducer from "./appReducer";
import { useTranslation } from "react-i18next";

const AppConetxt = createContext();
const initState = {
  language: localStorage.getItem("language") || "fa",
  theme: localStorage.getItem("theme") || "light",
  toggleSidebar: true,
};
function AppProvider({ children }) {
  const { i18n } = useTranslation();

  const [state, dispatch] = useReducer(appReducer, initState);
  function selectLang(lang) {
    dispatch({ type: "SELLECT_LAN", payload: lang });
  }

  function changeTheme(theme) {
    dispatch({ type: "CHANGE_THEME", payload: theme });
  }

  function changeToggleSidebar(toggleSidebar) {
    dispatch({ type: "TOGGLE_SIDEBAR", payload: toggleSidebar });
  }

  useEffect(
    function () {
      i18n.changeLanguage(state.language);
      localStorage.setItem("language", state.language);
      document.body.dataset.direction = state.language === "fa" ? "rtl" : "ltr";
      document.body.dataset.sidebarPosition =
        state.language === "fa" ? "right" : "left";
    },
    [state.language]
  );

  useEffect(
    function () {
      localStorage.setItem("theme", state.theme);
    },
    [state.theme]
  );
  return (
    <AppConetxt.Provider
      value={{ ...state, selectLang, changeTheme, changeToggleSidebar }}
    >
      {children}
    </AppConetxt.Provider>
  );
}

function useAppContext() {
  return useContext(AppConetxt);
}

export { AppProvider, useAppContext };
