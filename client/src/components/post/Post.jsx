import React, { useEffect, useState } from "react";
import "./post.css";
import { MoreVert, Comment } from "@mui/icons-material";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import Comments from "../comments/Comments";

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [infoPost, setInfoPost] = useState(false);
  const [isComment, setIsComment] = useState(false);
  const [comments, setComments] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [newComment, setNewComment] = useState('');

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

  useEffect(() => {
    const fetchComments = async () => {
      const res = await axios.get(`/posts/${post._id}/comments`)
      setComments(res.data);
      const usersPromises = res.data.map(async (u) => {
        const userResponse = await axios.get(`/users?userId=${u.userId}`)
        return userResponse.data
      })
      const users = await Promise.all(usersPromises);
      setUserComments(users);
    };
    fetchComments();
  }, [post._id, comments])


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

  const submitComment = async (e) => {
    e.preventDefault();
    const comment = {
      userId: currentUser._id,
      comment: newComment
    }
    try {
      await axios.put(`posts/${post._id}/comments`, comment);
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
          <div className="postBottomRight" onClick={() => setIsComment(!isComment)}>
            Comment <Comment />
            </div>
        </div>
          {isComment && (
            <div>
              <div className="commentsWrapper">
                { comments.length === 0 && userComments.length === 0 ? (
                  <div className="noCommentariesText">
                    <h3>Be the first to comment!</h3>
                  </div>
                ) : comments.map((e) => {
                  const findUser = userComments.find((user) => user._id === e.userId )
                  return (
                      <Comments comment={e.comment} userToComment={findUser}/>
                    )
                  })}

              </div>
              <div className="writeCommentBox">
                <img src={
                  currentUser.profilePicture
                    ? PF+currentUser.profilePicture
                    : PF + "person/noAvatar.png"
                } alt="" className="commentUserProfilePicture"/>
                <form className="submitComment" onSubmit={submitComment}>
                  <input type="text" className="writeComment" placeholder="Write a reply" onChange={(c) => setNewComment(c.target.value)}/>
                  <button className="sendComment">send</button>
                </form>
              </div>
            </div>
          )}
      </div>
    </div>
  );
}
