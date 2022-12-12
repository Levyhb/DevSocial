import React from "react";
import "./friendList.css";

export default function FriendList({ user }) {
  return (
    <li className="sidebarFriend">
      <img src={user.profilePicture} alt="" className="sidebarFriendImg" />
      <span className="sidebarFriendName">{ user.username }</span>
    </li>
  );
}
