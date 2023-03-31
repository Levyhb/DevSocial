import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import "./conversation.css";

export default function Conversation({ conversation, currentUser }) {
  const [user, setUser] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const AR = process.env.REACT_APP_API_REF;

  useEffect(() => {
    const friendId = conversation.members.find((m) => m !== currentUser._id);

    const getUser = async () => {
      const res = await axios.get(`${AR}/users?userId=${friendId}`);
      setUser(res.data);
    };
    getUser();
  }, [currentUser, conversation]);

  return (
    <div className="conversation px-1 md:px-3">
      <img
        src={user && user.profilePicture ? PF+user.profilePicture : PF+"/person/noAvatar.png" }
        alt="profile img"
        className="conversationImg mr-1 md:mr-4 md:w-10 md:h-10"
      />
      <span className="conversationName text-sm md:text-[18px]">{user && user.username}</span>
    </div>
  );
}
