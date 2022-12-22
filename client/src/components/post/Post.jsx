import React, { useState } from 'react'
import './post.css';
import { MoreVert } from '@mui/icons-material';
import { users } from "../../reactSocialData";


export default function Post({post}) {
  const [like, setLike] = useState(post.like);
  const [isLiked, setIsLiked] = useState(false);

  const likeHandler = () => {
    setLike(isLiked ? like-1 : like+1 );
    setIsLiked(!isLiked);
  }

  const user = users.filter((u) => u.id === post.userId)
  return (
    <div className='post'>
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className='postProfileImg' src={user[0].profilePicture} alt="" />
            <span className="postUsername">{user[0].username}</span>
            <span className='postDate'>{post.date}</span>
          </div>
          <div className="postTopRight">
            <MoreVert />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">
            {post?.desc}
          </span>
          <img className="postImg" src={post.photo} alt="post" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src="assets/like.png" alt="like icon" onClick={likeHandler}/>
            <img className="likeIcon" src="assets/heart.png" alt="heart icon" onClick={likeHandler} />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
        <div className="postBottomRight"></div>
          <span className="postCommentText"> {post.comment} comments</span>
        </div>
      </div>
    </div>
  )
}
