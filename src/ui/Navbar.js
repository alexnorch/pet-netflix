import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../store/profileSlice";

import Search from "./Search";
import logo from "../images/Logonetflix.png";
import profil from "../images/profil.jpg";
import "../ui/Navbar.scss";

import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import MenuIcon from "@mui/icons-material/Menu";
import Drawer from "@mui/material/Drawer";
import Box from "@mui/material/Box";

const apiKey = "b5734930c9753019953c02e83f2a0d0b";

let initialRequest = false;

const Navbar = () => {
  const [searchedMovies, setSearchedMovies] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSubmenuActive, setIsSubmenuActive] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const isLogged = useSelector((state) => state.profile.isLogged);
  const userEmail = useSelector((state) => state.profile.userEmail);
  const userLogin = userEmail && userEmail.slice(0, userEmail.indexOf("@"));
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    const getSearchedMovies = async () => {
      const response = await fetch(`
      https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&language=en-US&query=${inputValue}`);
      const result = await response.json();

      setSearchedMovies(result.results);
    };

    if (!initialRequest) return;
    getSearchedMovies();
  }, [inputValue]);

  window.onscroll = () => {
    setIsScrolled(window.pageYOffset === 0 ? false : true);
    return () => (window.onscroll = null);
  };

  const toggleMenu = (event) => {
    if (
      (event.type === "keydown" &&
        (event.key === "Tab" || event.key === "Shift")) ||
      event.target.className === "nav-search__input"
    ) {
      return;
    }

    setIsMenuOpen((prevState) => !prevState);
  };

  const searchHandler = (value) => {
    setInputValue(value);

    if (value.length > 0) {
      setIsTyping(true);
      initialRequest = true;
    } else {
      setIsTyping(false);
      initialRequest = false;
    }
  };

  return (
    <nav className={isScrolled ? "nav scrolled" : "nav"}>
      <div className="container">
        <div className={isScrolled ? "navbar scrolled" : "navbar"}>
          <div className="navbar__left">
            <img
              onClick={() => navigate("/")}
              className="logo"
              src={logo}
              alt="logo"
            />

            <ul className="nav-list">
              <li className="nav-list__item">
                <Link className="nav-list__link" to="/">
                  Home
                </Link>
              </li>
              {isLogged && (
                <li className="nav-list__item">
                  <Link className="nav-list__link" to="my-list">
                    My list
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="navbar__right">
            {isSearch && (
              <Search
                searchValue={inputValue}
                onSearch={searchHandler}
                isTyping={isTyping}
                movies={searchedMovies}
              />
            )}
            <SearchIcon
              onClick={() => setIsSearch((prevState) => !prevState)}
              className="navbar__icon"
            />
            {isLogged ? (
              <div className="profile">
                <div className="profile__picture">
                  <img src={profil} alt="profil-img" />
                </div>
                <div className="profile__info">
                  <h4>Welcome,</h4>
                  <span className="profile__login">{userLogin}</span>
                </div>
                <ArrowDropDownIcon
                  onClick={() => setIsSubmenuActive((prevState) => !prevState)}
                  className="navbar__icon"
                />
                {isSubmenuActive && (
                  <div className="profile__submenu">
                    <ul
                      onClick={() =>
                        setIsSubmenuActive((prevState) => !prevState)
                      }
                      className="profile__options"
                    >
                      <li>Settings</li>
                      <li onClick={() => dispatch(logout())}>Log out</li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <button
                onClick={() => navigate("/signin")}
                className="nav-btn"
              >
                Sign in
              </button>
            )}
          </div>
          <button onClick={toggleMenu} className="navbar__menu-btn">
            <MenuIcon />
          </button>
        </div>
      </div>
      <Drawer anchor="left" open={isMenuOpen} onClose={toggleMenu}>
        <Box
          onClick={toggleMenu}
          sx={{
            padding: "20px",
            minWidth: "200px",
            height: "100%",
            backgroundColor: "rgba(0,0,0,0.9)",
          }}
        >
          <img
            onClick={() => navigate("/")}
            className="logo"
            src={logo}
            alt="logo"
          />
          <Search
            searchValue={inputValue}
            onSearch={searchHandler}
            isTyping={isTyping}
            movies={searchedMovies}
          />
          {isLogged && (
            <div className="profile">
              <div className="profile__picture">
                <img src={profil} alt="profil-img" />
              </div>
              <div className="profile__info">
                <h4>Welcome,</h4>
                <span className="profile__login">{userLogin}</span>
              </div>
            </div>
          )}
          <ul className="nav-list">
            <li className="nav-list__item">
              <Link className="nav-list__link" to="/">
                Home
              </Link>
            </li>
            {isLogged && (
              <li className="navbar__list-item">
                <Link className="nav-list__link" to="my-list">
                  My list
                </Link>
              </li>
            )}
          </ul>
          {isLogged ? (
            <button onClick={() => dispatch(logout())} className="nav-btn">
              Log out
            </button>
          ) : (
            <button onClick={() => navigate("/signin")} className="nav-btn">
              Sign in
            </button>
          )}
        </Box>
      </Drawer>
    </nav>
  );
};

export default Navbar;
