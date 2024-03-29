import "./rightbar.css";
import Online from "../online/Online";
import { useEffect, useRef } from "react";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";
import { io } from "socket.io-client";

export default function Rightbar({ user }) {
  const AR = process.env.REACT_APP_API_REF;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(
    currentUser.followings.includes(user?.id)
  );
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
        dispatch({ type: "UNFOLLOW", payload: user._id });
      } else {
        await axios.put(`${AR}/users/` + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({ type: "FOLLOW", payload: user._id });
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
        receiverId: user._id,
      };
      await axios.post(`${AR}/conversations/`, conversationData);
      navigate("/messenger");
    } catch (error) {
      navigate("/messenger");
      console.log(error);
    }
  };

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
        <div className="hidden md:flex content-center flex-col">
          <div>
            <p className="rightbar-ad-title">
              Connect with your friends around the world
            </p>
            <img className="rightbarAd" src={`${PF}ad.png`} alt="" />
          </div>
          <Online onlineUsers={onlineUsers} currentId={currentUser._id} />
        </div>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <div className="follow-wrapper flex justify-center">
            <button className="rightbarFollowButton" onClick={handlefollow}>
              {followed ? "Unfollow" : "Follow"}
              {followed ? <Remove /> : <Add />}
            </button>
            <button className="rightbarMsgButton" onClick={iniateConversation}>
              Sent Message +
            </button>
          </div>
        )}
        <h4 className="rightbarTitle text-center lg:text-left">
          User Information
        </h4>
        <div className="rightbarInfo flex flex-col items-center  lg:block">
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
        <h4 className="rightbarTitle text-center md:text-left">User Friends</h4>
        <div className="rightbarFollowings grid grid-cols-3 overflow-y-scroll max-h-80">
          {friends.map((friend) => (
            <Link to={"/profile/" + friend.username} key={friend._id}>
              <div className="rightbarFollowing ">
                <img
                  src={
                    friend.profilePicture
                      ? PF + friend.profilePicture
                      : PF + "person/noAvatar.png"
                  }
                  alt=""
                  className="rightbarFollowingImg w-20 h-20 md:w-24 md:h-24"
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
    <>
      {window.location.pathname === "/" ||
      window.location.pathname === "/search" ? (
        <div className="rightbar hidden sm:flex">
          <div className="rightbarWrapper">
            <HomeRightBar />
          </div>
        </div>
      ) : (
        <div className="rightbar ">
          <div className="rightbarWrapper">
            <ProfileRightBar />
          </div>
        </div>
      )}
    </>
  );
}
