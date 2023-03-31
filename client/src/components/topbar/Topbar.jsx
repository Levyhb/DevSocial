import React, { useContext, useState } from "react";
import "./topbar.css";
import { Search } from "@mui/icons-material";
import { Link, useMatch, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import QuestionAnswerIcon from "@mui/icons-material/QuestionAnswer";
import FeedIcon from "@mui/icons-material/Feed";
import LogoutIcon from "@mui/icons-material/Logout";
import PersonSearchIcon from "@mui/icons-material/PersonSearch";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [search, setSearch] = useState();
  const [isSearch, setIsSearch] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  };

  const searchForAFriend = (e) => {
    e.preventDefault();

    if (!search) return;

    navigate(`/search?q=${search}`);
  };

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

          <button className="bg-white rounded-full border-none cursor-pointer w-8 h-8 md:hidden" onClick={() => setIsSearch(!isSearch)}>
            <PersonSearchIcon />
          </button>

          <div>
            <Link to={"/messenger"} className="topbarLink hover:bg-transparent md:hidden">
                <span>
                  <QuestionAnswerIcon />
                </span>
            </Link>
          </div>

          <Link to={`/profile/${user.username}`}>
            <img
              src={
                user.profilePicture
                  ? PF + user.profilePicture
                  : PF + "person/noAvatar.png"
              }
              alt="person"
              className="topbarImg"
            />
          </Link>

          <Link to={"/login"} className="logout" onClick={handleLogout}>
            <LogoutIcon />
          </Link>
        </div>
      </div>
      { isSearch && (
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
