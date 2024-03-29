import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import Feed from "../../components/feed/Feed";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import Topbar from "../../components/topbar/Topbar";
import "./profile.css";
import { useParams } from "react-router-dom";
import * as Dialog from "@radix-ui/react-dialog";
import { AuthContext } from "../../context/AuthContext";
import EditBackgroundProfile from "../../components/editBackgroundProfile/EditBackgroundProfile";

export default function Profile() {
  const { user: currentUser } = useContext(AuthContext);

  const [file, setFile] = useState(null);
  const [desc, setDesc] = useState(currentUser?.desc);
  const [name, setUsername] = useState(currentUser?.name);
  const [city, setCity] = useState(currentUser?.city);
  const [from, setFrom] = useState(currentUser?.from);
  const [user, setUser] = useState({});

  const AR = process.env.REACT_APP_API_REF;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { username } = useParams();

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`${AR}/users?username=${username}`);
      setUser(res.data);
    };
    fetchUser();
  }, [username]);

  const updateUser = async (e) => {
    e.preventDefault();
    const user = {
      userId: currentUser._id,
      username: name,
      desc: desc,
      city: city,
      from: from,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      user.profilePicture = fileName;
      try {
        await axios.post(`${AR}/api/upload`, data);
      } catch (err) {
        return console.log(err);
      }
    }

    try {
      await axios.put(`${AR}/users/${currentUser._id}`, user);
      localStorage.removeItem("user");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <Topbar />
      <div className="profile">
        <Sidebar />
        <div className="profileRight">
          <div className="profileRightTop">
            <div className="profileCover">
              <EditBackgroundProfile user={user} />
              <img
                className="profileUserImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : `${PF}person/noAvatar.png`
                }
                alt=""
              />
            </div>
            <div className="profileInfo">
              <h4 className="profileInfoName">{user.username}</h4>
              <h4 className="profileInfoDesc">{user.desc}</h4>
            </div>
            {currentUser && currentUser._id === user._id && (
              <Dialog.Root>
                <div className="editProfile">
                  <Dialog.Trigger>Edit Profile</Dialog.Trigger>
                </div>

                <Dialog.Portal>
                  <Dialog.Overlay className="modalOverlay" />

                  <Dialog.Content className="modalContent">
                    <Dialog.Title className="profileEditTitle">
                      Profile Edit
                    </Dialog.Title>
                    <form onSubmit={updateUser}>
                      <div className="profileEditPicture">
                        <h3 className="editProfileItem">Profile Picture</h3>
                        <label
                          htmlFor="profileImg"
                          className="profilePictureFile"
                        >
                          <span>Change profile picture</span>
                          <input
                            style={{ display: "none" }}
                            type="file"
                            id="profileImg"
                            accept=".png, .jpeg, .jpg"
                            onChange={(e) => setFile(e.target.files[0])}
                          />
                        </label>
                      </div>
                      <div className="editProfilePicturePreview">
                        {file ? (
                          <img
                            src={URL.createObjectURL(file)}
                            className="shareImg"
                            alt="update profile img"
                          />
                        ) : (
                          <img
                            src={
                              user.profilePicture
                                ? PF + user.profilePicture
                                : PF + "person/noAvatar.png"
                            }
                            alt=""
                          />
                        )}
                      </div>
                      <div className="profileEditInfo">
                        <h3>Username:</h3>
                        <input
                          type="text"
                          placeholder={user.username}
                          onChange={(e) => setUsername(e.target.value)}
                        />
                      </div>
                      <div className="profileEditInfo">
                        <h3>Description:</h3>
                        <textarea
                          placeholder={user.desc}
                          onChange={(e) => setDesc(e.target.value)}
                        />
                      </div>
                      <div className="profileEditInfo">
                        <h3>City:</h3>
                        <input
                          type="text"
                          placeholder={user.city}
                          onChange={(e) => setCity(e.target.value)}
                        />
                      </div>
                      <div className="profileEditInfo">
                        <h3>From:</h3>
                        <input
                          type="text"
                          placeholder={user.from}
                          onChange={(e) => setFrom(e.target.value)}
                        />
                      </div>
                      <div className="profileEditSaveBtn">
                        <button
                          className="profileEditSaveBtn"
                          type="submit"
                          onClick={updateUser}
                        >
                          save changes and logout
                        </button>
                      </div>
                    </form>
                  </Dialog.Content>
                </Dialog.Portal>
              </Dialog.Root>
            )}
          </div>
          <div className="profileRightBottom flex-col-reverse md:flex-row">
            <Feed username={username}/>
            <Rightbar user={user}/>
          </div>
        </div>
      </div>
    </>
  );
}
