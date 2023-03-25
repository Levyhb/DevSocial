import React from "react";
import { Link } from "react-router-dom";
import "./comments.css"

export default function Comments({ comment, userToComment }) {
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;

  return (
    <div className="comments-container">
      {
        userToComment && (
        <div className="userComments">
          <Link to={`/profile/${userToComment.username}`}  className="linkCommentProfilePicture">
            <img
              src={userToComment.profilePicture ? PF + userToComment.profilePicture : PF+"/person/noAvatar.png"}
              alt=""
              className="commentUserProfilePicture"
            />
          </Link>
          <div className="commentBox">
            <Link to={`/profile/${userToComment.username}`} className="commentUsername">{userToComment.username && userToComment.username}</Link>
            <span className="commentText">
              {comment}
            </span>
          </div>
        </div>
        )
      }
    </div>
  );
}
