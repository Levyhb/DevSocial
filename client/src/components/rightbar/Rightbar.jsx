import "./rightbar.css";
import { users } from "../../reactSocialData";
import Online from "../online/Online";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { Add, Remove } from "@mui/icons-material";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [friends, setFriends] = useState([]);
  const { user: currentUser, dispatch } = useContext(AuthContext);
  const [followed, setFollowed] = useState(currentUser.followings.includes(user?.id));

  useEffect(() => {
    setFollowed(currentUser.followings.includes(user?.id));
  }, [currentUser, user.id]);

  const handleClick = async () => {
    try {
      if (followed) {
        await axios.put("/users/" + user._id + "/unfollow", {
          userId: currentUser._id,
        });
        dispatch({type: "UNFOLLOW", payload: user._id})
      } else {
        await axios.put("/users/" + user._id + "/follow", {
          userId: currentUser._id,
        });
        dispatch({type: "FOLLOW", payload: user._id})

      }
    } catch (err) {
      console.log(err);
    }
    setFollowed(!followed);
  };

  useEffect(() => {
    const getFriends = async () => {
      try {
        const friendList = await axios.get(`/users/friends/${user._id}`);
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
        <div className="birthdayContainer">
          <img className="birthdayImg" src={`${PF}gift.png`} alt="" />
          <span className="birthdayText">
            <b>Pola Fooster</b> and <b>3 other friends</b> have a birthday today
          </span>
        </div>
        <img className="rightbarAd" src={`${PF}ad.png`} alt="" />
        <h4 className="rightbarTitle">Online Friends</h4>
        <ul className="rightbarFriendList">
          {users.map((u) => (
            <Online key={u.id} user={u} />
          ))}
        </ul>
      </>
    );
  };

  const ProfileRightBar = () => {
    return (
      <>
        {user.username !== currentUser.username && (
          <button className="rightbarFollowButton" onClick={handleClick}>
            {followed ? "Unfollow" : "Follow"}
            {followed ? <Remove /> : <Add />}
          </button>
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
            <Link to={"/profile/" + friend.username}>
              <div className="rightbarFollowing">
                <img
                  src={
                    friend.profilePicture
                      ? friend.profilePicture
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
        {window.location.pathname === "/" ? (
          <HomeRightBar />
        ) : (
          <ProfileRightBar />
        )}
      </div>
    </div>
  );
}
