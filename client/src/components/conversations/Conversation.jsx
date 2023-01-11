import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      const res = await axios.get(`/users?userId=${friendId}`);
      setUser(res.data);
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation">
      <img
        src={user && user.profilePicture ? PF+user.profilePicture : PF+"/person/noAvatar.png" }
        alt="profile img"
        className="conversationImg"
      />
      <span className="conversationName">{user && user.username}</span>
    </div>
  );
}
