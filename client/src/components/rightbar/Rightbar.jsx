import "./rightbar.css";
import { users } from "../../reactSocialData";
import Online from "../online/Online";

export default function Rightbar({ user }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

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
            <span className="rightbarInfoValues">{user.relationship === 1 ? "Single" : user.relationship === 1 ? "Married": ""}</span>
          </div>
        </div>
        <h4 className="rightbarTitle">User Friends</h4>
        <div className="rightbarFollowings">
          <div className="rightbarFollowing">
            <img src={`${PF}person/2.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">
              André Matos
            </span>
          </div>

          <div className="rightbarFollowing">
            <img src={`${PF}person/2.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">
              André Matos
            </span>
          </div>

          <div className="rightbarFollowing">
            <img src={`${PF}person/2.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">
              André Matos
            </span>
          </div>

          <div className="rightbarFollowing">
            <img src={`${PF}person/2.jpeg`} alt="" className="rightbarFollowingImg" />
            <span className="rightbarFollowingName">
              André Matos
            </span>
          </div>
        </div>
      </>
    )
  }

  return (
    <div className="rightbar">
      <div className="rightbarWrapper">
        {
          user ? <ProfileRightBar /> : <HomeRightBar />
        }
        
      </div>
    </div>
  );
}
