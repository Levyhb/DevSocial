import React, { useContext, useEffect, useState } from "react";
import "./topbar.css";
import { Search } from "@mui/icons-material";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FeedIcon from "@mui/icons-material/Feed";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import PersonIcon from "@mui/icons-material/Person";
import { handleColorMode } from "../../utils/darkMode";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [search, setSearch] = useState();
  const [darkMode, setDarkMode] = useState(false);
  const [config, setConfig] = useState(false);
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  useEffect(() => {
    setDarkMode(document.body.classList.contains("darkMode"));
  }, []);

  const searchForAFriend = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`);
  };

  const changeDarkMode =  () => {
    handleColorMode();
    setDarkMode(!darkMode)
  }

  return (
    <>
      <div className="topbarContainer">
        <div className="topbarLeft">
          <Link to="/">
            <span className="logo">&lt; DevSocial /&gt;</span>
          </Link>
        </div>
        <form
          className="topbarCenter hidden md:flex"
          onSubmit={searchForAFriend}
        >
          <Search className="searchIcon" />
          <input
            placeholder="Search for friend"
            className="searchInput"
            onChange={(e) => setSearch(e.target.value)}
          />
        </form>
        <div className="topbarRight  md:flex-4">
          <div className="topbarLinks">
            <Link to="/" className="topbarLink hidden md:block">
              <span>
                Timeline <FeedIcon />
              </span>
            </Link>
            <Link to={"/messenger"} className="topbarLink hidden md:block">
              <span>
                Messenger <QuestionAnswerIcon />
              </span>
            </Link>
          </div>

          <button
            className="bg-white rounded-full border-none cursor-pointer w-8 h-8 md:hidden"
            onClick={() => setIsSearch(!isSearch)}
          >
            <PersonSearchIcon />
          </button>

          <div>
            <Link
              to={"/messenger"}
              className="topbarLink hover:bg-transparent md:hidden"
            >
              <span>
                <QuestionAnswerIcon />
              </span>
            </Link>
          </div>

          <div onClick={() => setConfig(!config)}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt="person"
              className="topbarImg"
            />
          </div>

          {config && (
            <div className="configBox">
              <Link to={`/profile/${user.username}`} className="configBoxItem">
                <PersonIcon /> {user.username}
              </Link>
              { !darkMode ? (
                <span className="configBoxItem" onClick={changeDarkMode}>
                  {" "}
                  <DarkModeIcon /> Dark Mode
                </span>
              ) : (
                <span className="configBoxItem" onClick={changeDarkMode}>
                  {" "}
                  <LightModeIcon /> Light Mode
                </span>
              )}
              <Link
                to={"/login"}
                onClick={handleLogout}
                className="configBoxItem"
              >
                <LogoutIcon /> Log Out
              </Link>
            </div>
          )}

        </div>
      </div>
      {isSearch && (
        <div className="fadeInDown">
          <form
            className="topbarCenter p-1 rounded-md w-11/12 shadow-default flex md:hidden my-2 mx-auto"
            onSubmit={searchForAFriend}
          >
            <Search className="searchIcon w-full" />
            <input
              placeholder="Search for friend"
              className="searchInput"
              onChange={(e) => setSearch(e.target.value)}
            />
          </form>
        </div>
      )}
    </>
  );
}
