import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import axios from "axios";
import "./EditBackgroundProfile.css";
import { useParams } from "react-router-dom";

export default function EditBackgroundProfile({ user }) {
  const { user: currentUser } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const AR = process.env.REACT_APP_API_REF;
  const [coverBackground, setCoverBackground] = useState(null);
  const [searchedUser, setSearchedUser] = useState(null);
  const params = useParams();

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await axios.get(`${AR}/users/${params.username}`);
        setSearchedUser(res.data[0]);
      } catch (err) {
        console.log(err);
      }
    };
    getUser();
  }, [params.username, AR]);

  const updateBackground = async (e) => {
    e.preventDefault();
    const user = {
      userId: currentUser._id,
    };

    if (coverBackground) {
      const data = new FormData();
      const fileName = Date.now() + coverBackground.name;
      data.append("name", fileName);
      data.append("file", coverBackground);
      user.colorPicture = fileName;
      try {
        await axios.post(`${AR}/api/upload`, data);
      } catch (error) {
        console.log(error);
      }
    }

    try {
      await axios.put(`/users/${currentUser._id}`, user);
      localStorage.removeItem("user");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="coverBackground">
      {coverBackground ? (
        <img
          src={URL.createObjectURL(coverBackground)}
          className="profileCoverImg"
          alt="share img"
        />
      ) : (
        <img
          className="profileCoverImg"
          src={
            user.colorPicture
              ? PF + user.colorPicture
              : `${PF}person/noCover.jpg`
          }
          alt=""
        />
      )}

      {searchedUser && currentUser && searchedUser.id === currentUser._id && (
        <>
          <EditIcon className="editIcon" />
          <label htmlFor="profileBackgroundImg" className="editIcon">
            <EditIcon className="editIcon" />
            <input
              style={{ display: "none" }}
              type="file"
              id="profileBackgroundImg"
              accept=".png, .jpeg, .jpg"
              onChange={(e) => setCoverBackground(e.target.files[0])}
            />
          </label>
          {coverBackground && (
            <div className="confirmButton">
              <span>Confirm? </span>
              <button className="confirm" onClick={updateBackground}>
                <CheckIcon />
              </button>
              <span>Cancel</span>
              <button
                className="cancel"
                onClick={() => setCoverBackground(null)}
              >
                <ClearIcon />
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
