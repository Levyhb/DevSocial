import axios from "axios";
import React, { useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import { useParams } from "react-router-dom";
import ProfileEdit from "../../components/profileEdit/ProfileEdit";
import * as Dialog from "@radix-ui/react-dialog";

export default function Profile() {
  const [dialog, setDialog] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [user, setUser] = useState({});
  const { username } = useParams();
  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <img
                className="profileCoverImg"
                src={user.colorPicture || `${PF}person/noCover.jpg`}
                alt=""
              />
              <img
                className="profileUserImg"
                src={user.profilePicture || `${PF}person/noAvatar.png`}
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <h4 className="profileInfoDesc">{user.desc}</h4>
            </div>

            <Dialog.Root>
              <ProfileEdit />

              <Dialog.Portal>
                <Dialog.Overlay className="modalOverlay" />

                <Dialog.Content className="modalContent">
                  <Dialog.Title className="profileEditTitle">Profile Edit</Dialog.Title>
                  <form>
                    <div className="profileEditPicture">
                      <h3 className="editProfileItem">Profile Picture</h3>
                      <label htmlFor="file" className="profilePictureFile">
                        <span>Change profile picture</span>
                        <input
                          style={{ display: "none" }}
                          type="file"
                          id="file"
                          accept=".png, .jpeg, .jpg"
                        />
                      </label>
                    </div>
                    <div className="editProfilePicturePreview">
                      <img src={user.profilePicture ? user.profilePicture : PF+"person/noAvatar.png"} alt="" />
                    </div>
                    <div className="profileEditInfo">
                      <h3>Username:</h3>
                      <input type="text" value={user.username}/>
                    </div>
                    <div className="profileEditInfo">
                      <h3>Description:</h3>
                      <textarea value={user.desc}/>
                    </div>
                    <div className="profileEditInfo">
                      <h3>City:</h3>
                      <input type="text" value={user.city}/>
                    </div>
                    <div className="profileEditInfo">
                      <h3>From:</h3>
                      <input type="text" value={user.from}/>
                    </div>
                    <div className="profileEditSaveBtn">
                      <button className="profileEditSaveBtn">save changes</button>
                    </div>
                  </form>
                </Dialog.Content>
              </Dialog.Portal>
            </Dialog.Root>
          </div>
          <div className="profileRightBottom">
            <Feed username={username} />
            <Rightbar user={user} />
          </div>
        </div>
      </div>
    </>
  );
}
