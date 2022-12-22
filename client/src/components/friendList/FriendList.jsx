import React from "react";
import "./friendList.css";

export default function FriendList({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <li className="sidebarFriend">
      <img src={PF+user.profilePicture} alt="" className="sidebarFriendImg" />
      <span className="sidebarFriendName">{ user.username }</span>
    </li>
  );
}
