import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";
import LoadingPost from "../loading/LoadingPost";

export default function Feed({ username }) {
  const [posts, setPost] = useState();
  const { user } = useContext(AuthContext);
  const AR = process.env.REACT_APP_API_REF;

  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get(`${AR}/posts/profile/${username}`)
        : await axios.get(`${AR}/posts/timeline/${user._id}`);
      setPost(
        res.data.sort((p1, p2) => {
          return new Date(p2.createdAt) - new Date(p1.createdAt);
        })
      );
    };
    fetchPost();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        {(!username || username === user.username) && <Share />}
        {!posts && <LoadingPost />}
        {posts && posts.length > 0 ? (
          posts.map((p) => <Post key={p._id} post={p} />)
        ) : (
          <div className="noPostFound">
            <h2>No post was found</h2>
            <h3>Follow a friend to see what they've been posting</h3>
          </div>
        )}
      </div>
    </div>
  );
}
