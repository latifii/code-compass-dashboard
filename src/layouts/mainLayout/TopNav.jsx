import { useNavigate } from "react-router-dom";
import ChangeLanguage from "../../components/ChangeLanguage";
import ChangeTheme from "../../components/ChangeTheme";
import { useAppContext } from "../../contexts/app/AppContext";

function TopNav() {
  const { changeToggleSidebar, toggleSidebar, language } = useAppContext();
  const navigate = useNavigate();
  function handleExit() {
    localStorage.removeItem("token");
    navigate("/login");
  }
  return (
    <nav className="navbar navbar-expand navbar-light navbar-bg">
      <a
        className="sidebar-toggle"
        onClick={() => changeToggleSidebar(!toggleSidebar)}
      >
        <i className="hamburger align-self-center"></i>
      </a>
      <div className="d-flex align-items-center gap-3">
        <ChangeLanguage />
        <ChangeTheme />
      </div>
      <div className={`${language === "fa" ? "me-auto" : "ms-auto"}`}>
        <button
          className="btn ms-2 btn-outline-danger fw-bolder"
          onClick={handleExit}
        >
          خارج شوید
        </button>
      </div>
    </nav>
  );
}
export default TopNav;
