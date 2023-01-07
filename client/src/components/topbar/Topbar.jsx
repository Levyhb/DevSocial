import React, { useContext } from "react";
import "./topbar.css";
import { Search, Person, Chat, Notifications } from "@mui/icons-material";
import { Link, redirect } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import QuestionAnswerIcon from '@mui/icons-material/QuestionAnswer';
import FeedIcon from '@mui/icons-material/Feed';
import LogoutIcon from '@mui/icons-material/Logout';

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const handleLogout = () => {
    localStorage.removeItem("user");
    window.location.reload();
  }

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/">
          <span className="logo">React_Social</span>
        </Link>
      </div>
      <div className="topbarCenter">
        <Search className="searchIcon" />
        <input
          placeholder="Search for friend, post or video"
          className="searchInput"
        />
      </div>
      <div className="topbarRight">
        <div className="topbarLinks">
          <Link to="/" className="topbarLink">
            <span>Timeline <FeedIcon /></span>
          </Link>
          <Link to={"/messenger"} className="topbarLink">
            <span>Messenger < QuestionAnswerIcon /></span>
          </Link>
        </div>

        {/* <div>
          <div className="topbarIcons">
            <div className="topbarIconItem">
              <Person />
              <div className="topbarIconItemBadge">1</div>
            </div>

            <div className="topbarIconItem">
              <Chat />
              <div className="topbarIconItemBadge">3</div>
            </div>

            <div className="topbarIconItem">
              <Notifications />
              <div className="topbarIconItemBadge">1</div>
            </div>
          </div>
        </div> */}
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture
                ? user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt="person"
            className="topbarImg"
          />
        </Link>

        <Link to={"/login"} className="logout" onClick={handleLogout}>
          <LogoutIcon/>
        </Link >
      </div>
    </div>
  );
}
