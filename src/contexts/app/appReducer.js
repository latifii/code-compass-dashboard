export default function appReducer(state, action) {
  switch (action.type) {
    case "SELLECT_LAN":
      return { ...state, language: action.payload };

    case "CHANGE_THEME":
      return { ...state, theme: action.payload };
    case "TOGGLE_SIDEBAR":
      return { ...state, toggleSidebar: action.payload };
    default:
      break;
  }
}
