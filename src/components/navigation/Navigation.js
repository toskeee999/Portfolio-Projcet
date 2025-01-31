import { NavLink, useLocation, useNavigate } from "react-router-dom";
import "./Navigation.css";
import { signOut } from "firebase/auth";
import { auth } from "../../firebaseConfig";
import { useDispatch, useSelector } from "react-redux";
import { actionMovies } from "../../store/movies";
import { actionUserData } from "../../store/user-data";
import { useEffect, useRef, useState } from "react";

function Navigation({ handleSearch }) {
  const inputRef = useRef();
  const navRef = useRef();
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const userAuth = useSelector((state) => state.userData.userAuth);

  const userData = useSelector((state) => state.userData.userAuth);
  const inputSearch = useSelector((state) => state.movies.inputSearchMovies);

  const [activePage, setActivePage] = useState("Finder");
  const [activeClas, setActiveClas] = useState({
    input: false,
    ul: false,
  });
  const [path, setPath] = useState("");

  useEffect(() => {
    if (location.pathname !== "/search") {
      setPath(location.pathname);
    }
    if (location.pathname.includes("/movies")) {
      setActivePage("Movies");
    }
    if (location.pathname.includes("/shows")) {
      setActivePage("Tv-Shows");
    }
    if (location.pathname === "/favorites") {
      setActivePage("Favorites");
    }
    if (location.pathname === "/") {
      setActivePage("Finder");
    }
  }, [location]);

  function handleActiveClasinput() {
    setActiveClas((prevClas) => ({
      ...prevClas,
      input: true,
    }));
    setTimeout(() => {
      inputRef.current.focus();
    }, 1000);
  }

  function handleActiveClasUl() {
    setActiveClas((prevClas) => ({
      ...prevClas,
      ul: !prevClas.ul,
    }));
    dispatch(actionMovies.setInputSearchFalse());
  }

  function handleChange(value) {
    const inputValue = value;
    if (inputValue.trim() === "") {
      dispatch(actionMovies.setInputSearchMovies(""));
      return;
    }
    dispatch(actionMovies.setInputSearchMovies(inputValue));
    if (inputValue.length > 1) {
      navigate("/search");
      return;
    }
    navigate(path);
  }

  async function handleLogout() {
    const confirm = window.confirm("Are you sure you want to log out?");

    if (confirm) {
      await signOut(auth);
      dispatch(actionUserData.setUserAuth(null));
      localStorage.removeItem("user");
      localStorage.removeItem("logout-time");
      alert("You have successfully logged out.");
    }
  }

  return (
    <nav id="nav" ref={navRef}>
      <div className="left-nav">
        <button className="i-button" onClick={handleActiveClasUl}>
          <i className="fa-solid fa-bars"></i>
          <span className="path-name">{activePage}</span>
        </button>
        <ul className={activeClas.ul ? "ul-active ul-disabled" : "ul-disabled"}>
          <li>
            <NavLink
              onClick={handleActiveClasUl}
              to={"/"}
              className={({ isActive }) =>
                isActive ? "active navigacion-button" : "navigacion-button"
              }
            >
              Finder
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleActiveClasUl}
              to={"/movies"}
              className={({ isActive }) =>
                isActive ? "active navigacion-button" : "navigacion-button"
              }
            >
              Movies
            </NavLink>
          </li>
          <li>
            <NavLink
              onClick={handleActiveClasUl}
              to={"/shows"}
              className={({ isActive }) =>
                isActive ? "active navigacion-button" : "navigacion-button"
              }
            >
              TV-Shows
            </NavLink>
          </li>
          {userAuth && (
            <li>
              <NavLink
                onClick={handleActiveClasUl}
                to={"/favorites"}
                className={({ isActive }) =>
                  isActive ? "active navigacion-button" : "navigacion-button"
                }
              >
                Favorites
              </NavLink>
            </li>
          )}
        </ul>
      </div>
      <div className="right-nav">
        <div
          className={`right-input ${
            activeClas.input ? "right-input-active" : ""
          }`}
        >
          <button
            onClick={handleActiveClasinput}
            disabled={activeClas.input}
            className="i-button"
            style={{ cursor: activeClas.input ? "auto" : "pointer" }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>

          <input
            ref={inputRef}
            placeholder="Search by title"
            type="text"
            onBlur={() =>
              setActiveClas((prevClas) => ({ ...prevClas, input: false }))
            }
            onChange={(event) => handleChange(event.target.value)}
            value={inputSearch}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleSearch();
              }
            }}
          />
        </div>
        <div>
          {userData ? (
            <span onClick={handleLogout} className="navigacion-button">
              Log Out
            </span>
          ) : (
            <NavLink
              onClick={() => dispatch(actionMovies.setInputSearchFalse())}
              to={"auth"}
              className={({ isActive }) =>
                isActive ? "active navigacion-button" : "navigacion-button"
              }
            >
              Log In
            </NavLink>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
