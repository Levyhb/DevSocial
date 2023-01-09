import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./online.css";

export default function Online({ onlineUsers, currentId }) {  
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [onlineFriends, setOnlineFriends] = useState([]);
  const [friends, setFriends] = useState([]);
  
  useEffect(() => {
    const getFriends = async () => {
      const res = await axios.get(`/users/friends/${currentId}`);
      setFriends(res.data);
    };
    
    getFriends();
  },[currentId]);
  
  useEffect(() => {
    setOnlineFriends(friends.filter((f) => onlineUsers.includes(f._id)));
  }, [friends, onlineUsers])
  
  return (
    <div className="rightbarOnlineWrapper">
      { onlineFriends.length > 0 && (
        <h4 className="rightbarTitle">Online Friends</h4>
      )}
      <ul className="rightbarFriendList">
        {
          onlineFriends.length > 0 ? onlineFriends.map((friend) => (
            <Link to={`/profile/${friend.username}`}>
              <li className="rightbarFriend">
                <div className="rightbarProfileImgContainer">
                  <img src={friend.profilePicture ? PF+friend.profilePicture : PF+"person/noAvatar.png"} alt="" className="rightbarProfileImg" />
                  <span className="rightbarOnline"></span>
                </div>
                <span className="rightbarUsername">{friend.username}</span>
              </li>
            </Link>
          ) )
          : (
            <h2 className="noFriendsOnline">No friends online
            </h2>
          )
        }
      </ul>
    </div>
    
  );
}
