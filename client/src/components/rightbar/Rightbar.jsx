import "./rightbar.css";
import Online from "../online/Online";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import { io } from "socket.io-client";

export default function Rightbar({ user }) {
  const AR = process.env.REACT_APP_API_REF;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));
  const [onlineUsers, setOnlineUsers] = useState([]);
  const socket = useRef();
  let navigate = useNavigate();

  useEffect(() => {
    socket.current = io("ws://localhost:8900");
  }, []);

  useEffect(() => {
    socket.current.emit("addUser", user?._id);
    socket.current.on("getUsers", (users) => {
      setOnlineUsers(
        user.followings.filter((f) => users.some((u) => u.userId === f))
      );
    });
  }, [user]);
  
  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?._id));
  }, [currentUser, user._id]);

  const handlefollow = async () => {
    try {
      if (followed) {
        await axios.put(`${AR}/users/` + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({type: "UNFOLLOW", payload: user._id})
      } else {
        await axios.put(`${AR}/users/` + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({type: "FOLLOW", payload: user._id})
        
      }
      setFollowed(!followed);
    } catch (err) {
      console.log(err);
    }
  };

  const iniateConversation = async () => {

    try {
      const conversationData = {
        senderId: currentUser._id,
        receiverId: user._id
      }
      await axios.post(`${AR}/conversations/`, conversationData);
      navigate("/messenger")
    } catch (error) {
      navigate("/messenger")
      console.log(error);
    }
  }

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`${AR}/users/friends/${user._id}`);
        setFriends(friendList.data);
      } catch (error) {
        console.log(error);
      }
    };
    getFriends();
  }, [user]);

  const HomeRightBar = () => {
    return (
      <>
        <img className="rightbarAd" src={`${PF}ad.png`} alt="" />
        <Online onlineUsers={onlineUsers} currentId={currentUser._id}/>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
      {console.log(user)}
        { user.username !== currentUser.username && (
          <div className="follow-wrapper">
            <button className="rightbarFollowButton" onClick={handlefollow}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <Add />}
            </button>
            <button className="rightbarMsgButton" onClick={iniateConversation}>
              Sent Message +
            </button>
          </div>
        )}
        <h4 className="rightbarTitle">User Information</h4>
        <div className="rightbarInfo">
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">City:</span>
            <span className="rightbarInfoValues">{user.city}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">From:</span>
            <span className="rightbarInfoValues">{user.from}</span>
          </div>
          <div className="rightbarInfoItem">
            <span className="rightbarInfoKey">Relationship:</span>
            <span className="rightbarInfoValues">
              {user.relationship === 1
                ? "Single"
                : user.relationship === 1
                ? "Married"
                : ""}
            </span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          {friends.map((friend) => (
            <Link to={"/profile/" + friend.username} key={friend._id}>
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? PF+friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg"
                />
                <span className="rightbarFollowingName">{friend.username}</span>
              </div>
            </Link>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {window.location.pathname === "/" || window.location.pathname === "/search"? (
          <HomeRightBar />
        ) : (
          <ProfileRightBar />
        )}
      </div>
    </div>
  );
}
