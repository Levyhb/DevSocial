import React from "react";
import "./sidebar.css";
import { users } from "../../reactSocialData";
import FriendList from "../friendList/FriendList";

import { RssFeed } from "@mui/icons-material";
import ChatIcon from "@mui/icons-material/Chat";
import PlayCircleIcon from "@mui/icons-material/PlayCircle";
import PeopleIcon from "@mui/icons-material/People";
import TurnedInIcon from "@mui/icons-material/TurnedIn";
import WorkIcon from "@mui/icons-material/Work";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import EventIcon from "@mui/icons-material/Event";
import SchoolIcon from "@mui/icons-material/School";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebarWrapper">
        <ul className="sidebarList">
          <li className="sidebarListItem">
            <RssFeed className="sidebarIcon" />
            <span className="sidebarListItemTest">Feed</span>
          </li>
          <li className="sidebarListItem">
            <ChatIcon className="sidebarIcon" />
            <span className="sidebarListItemTest">Chats</span>
          </li>
          <li className="sidebarListItem">
            <PlayCircleIcon className="sidebarIcon" />
            <span className="sidebarListItemTest">Videos</span>
          </li>
          <li className="sidebarListItem">
            <PeopleIcon className="sidebarIcon" />
            <span className="sidebarListItemTest">Groups</span>
          </li>
          <li className="sidebarListItem">
            <TurnedInIcon className="sidebarIcon" />
            <span className="sidebarListItemTest">Bookmarks</span>
          </li>
          <li className="sidebarListItem">
            <HelpOutlineIcon className="sidebarIcon" />
            <span className="sidebarListItemTest">Questions</span>
          </li>
          <li className="sidebarListItem">
            <WorkIcon className="sidebarIcon" />
            <span className="sidebarListItemTest">Jobs</span>
          </li>
          <li className="sidebarListItem">
            <EventIcon className="sidebarIcon" />
            <span className="sidebarListItemTest">Events</span>
          </li>
          <li className="sidebarListItem">
            <SchoolIcon className="sidebarIcon" />
            <span className="sidebarListItemTest">Courses</span>
          </li>
        </ul>
        <button className="sidebarButton">Show More</button>
        <hr className="sidebarHr" />
        {/* to do: following user recommendation */}
        {/* <ul className="sidebarFriendList">
          {users.map((u) => (
            <FriendList key={u.id} user={u} />
          ))}
        </ul> */}
      </div>
    </div>
  );
}
