import React from "react";
import "./share.css";
import {
  PermMedia,
  Label,
  Room,
  EmojiEmotions,
  Cancel,
} from "@mui/icons-material";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { useState } from "react";
import axios from "axios";

export default function Share() {
  const { user } = useContext(AuthContext);
  const AR = process.env.REACT_APP_API_REF;
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {
      userId: user._id,
      desc: desc,
    };

    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      try {
        await axios.post(`${AR}/api/upload`, data);
      } catch (err) {
        return console.log(err);
      }
    }

    try {
      await axios.post(`${AR}/posts`, newPost);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const verify = !file && !desc;

  return (
    <div className="share">
      <div className="shareWrapper">
        <div className="shareTop">
          <img
            src={
              user.profilePicture
                ? PF + user.profilePicture
                : PF + "person/noAvatar.png"
            }
            alt="person"
            className="shareProfileImg"
          />
          <textarea
            placeholder={`What´s in your mind ${user.username}?`}
            className="shareInput"
            cols="30"
            rows="3"
            onChange={(d) => setDesc(d.target.value)}
          >
            {desc}
          </textarea>
        </div>
        <hr className="shareHr" />
        {file && (
          <div className="shareImgContainer">
            <img
              src={URL.createObjectURL(file)}
              className="shareImg"
              alt="share img"
            />
            <Cancel className="shareCancelImg" onClick={() => setFile(null)} />
          </div>
        )}
        <form className="shareBottom" onSubmit={submitHandler}>
          <div className="shareOptions">
            <label htmlFor="file" className="shareOption">
              <PermMedia htmlColor="tomato" className="shareIcon" />
              <span className="shareOptionText">Photo or Video</span>
              <input
                style={{ display: "none" }}
                type="file"
                id="file"
                accept=".png, .jpeg, .jpg"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </label>
            <div className="shareOption hidden md:block">
              <Label htmlColor="blue" className="shareIcon" />
              <span className="shareOptionText">Tag</span>
            </div>
            <div className="shareOption hidden md:block">
              <Room htmlColor="green" className="shareIcon" />
              <span className="shareOptionText">Location</span>
            </div>

            <div className="shareOption hidden md:block">
              <EmojiEmotions htmlColor="goldenrod" className="shareIcon" />
              <span className="shareOptionText">Feelings</span>
            </div>
          </div>
          <button className="shareButton" type="submit" disabled={verify}>
            Share
          </button>
        </form>
      </div>
    </div>
  );
}
