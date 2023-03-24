import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./chatOnline.css";

export default function ChatOnline({onlineUsers, currentId, setCurrentChat }) {
  const AR = process.env.REACT_APP_API_REF;
  const [friends, setFriends] = useState([]);
  const [onlineFriends, setOnlineFriends] = useState([]);

  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`${AR}/users/friends/${currentId}`);
      setFriends(res.data);
    };

    getFriends();
  },[currentId]);

  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers])

  const handleClick = async (u) => {
    try {
      const res = await axios.get(`${AR}/conversations/find/${currentId}/${u._id}`);
      setCurrentChat(res.data);
    } catch (err) {
      console.log(err);
    }
  }

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="chatOnline">
      {onlineFriends.map((o) => (
      <div className="chatOnlineFriend" onClick={() => handleClick(o)}>
        <div className="chatOnlineImgContainer">
          <img
            className="chatOnlineImg"
            src={o.profilePicture ? PF+o.profilePicture : PF+"person/noAvatar.png" }
            alt=""
          />
          <div className="chatOnlineBadge"></div>
        </div>
        <span className="chatOnlineName">{o?.username}</span>
      </div>
      )
      )}
    </div>
  );
}
