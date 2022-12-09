import React from 'react'
import './post.css';
import { MoreVert } from '@mui/icons-material';

export default function Post() {
  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className='postProfileImg' src="/assets/person/1.jpeg" alt="" />
            <span className="postUsername">Aloha</span>
            <span className='postDate'>5 min ago</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Neque totam asperiores a, labore, facilis, incidunt nostrum culpa veniam quaerat est sit maxime laboriosam! In soluta delectus ab maxime nam? Fugiat.
          </span>
          <img className="postImg" src="assets/post/1.jpeg" alt="post" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" alt="like icon" />
            <img className="likeIcon" src="assets/heart.png" alt="heart icon" />
            <span className="postLikeCounter">32 people like it</span>
          </div>
        <div className="postBottomRight"></div>
          <span className="postCommentText"> 9 comments</span>
        </div>
      </div>
    </div>
  )
}
