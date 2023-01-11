import React, { useContext, useEffect, useState } from "react";
import "./message.css";
import { format } from "timeago.js";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

export default function Message({ message, own, currentChatUsers }) {
  const { user } = useContext(AuthContext);
  const [chatUser, setChatUser] = useState(null);

  useEffect(() => {
    const user = async () => {
      try {
        const userInfo = await axios.get(`users/${currentChatUsers[1]}`);
        setChatUser(userInfo.data);
      } catch (err) {
        console.log(err);
      }
    };
    user();
  }, [currentChatUsers]);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  return (
    <div className={own ? "message own" : "message"}>
      <div className="messageTop">
        <img
          src={
            own
              ? user && user.profilePicture
                ? PF + user.profilePicture
                : PF + "/person/noAvatar.png"
              : chatUser && chatUser.profilePicture
              ? PF + chatUser.profilePicture
              : PF + "/person/noAvatar.png"
          }
          alt=""
          className="messageImg"
        />
        <p className="messageText">{message.text}</p>
      </div>
      <div className="messageBottom">{format(message.createdAt)}</div>
    </div>
  );
}
