import React, { useEffect, useState } from "react";
import "./post.css";
import { MoreVert } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [infoPost, setInfoPost] = useState(false);
  const { user: currentUser } = useContext(AuthContext);

  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  const likeHandler = () => {
    try {
      axios.put(`/posts/${post._id}/like`, { userId: currentUser._id });
    } catch (err) {
      console.log(err);
    }
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  const deletePost = async () => {
    const userId = currentUser._id
    try {
      const id = post._id;
      await axios.delete(`/posts/${id}`, userId)
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={"profile/" + user.username}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF+user.profilePicture
                    : PF + "person/noAvatar.png"
                }
                alt=""
              />
            </Link>
            <span className="postUsername">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight" >
            {post?.userId === currentUser?._id && (
              <MoreVert onClick={() => {setInfoPost(!infoPost)}}/>
            )}
            {infoPost && (
              <div className="deletePostWrapper" onClick={deletePost}>Delete Post</div>
            )}
          </div>
        </div>
        <div className="postCenter">
          <p className="postText">{post?.desc}</p>
          {post.img && <img className="postImg" src={PF + post.img} alt="post" />}
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img
              className="likeIcon"
              src={`${PF}like.png`}
              alt="like icon"
              onClick={likeHandler}
            />
            <img
              className="likeIcon"
              src={`${PF}heart.png`}
              alt="heart icon"
              onClick={likeHandler}
            />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight"></div>
        </div>
      </div>
    </div>
  );
}
