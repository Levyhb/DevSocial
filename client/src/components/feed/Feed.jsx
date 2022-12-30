import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
// import { post } from "../../reactSocialData";
import { useState, useEffect } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { useContext } from "react";

export default function Feed({ username }) {
  const [posts, setPost] = useState([]);
  const { user } = useContext(AuthContext)

  useEffect(() => {
    const fetchPost = async () => {
      const res = username
        ? await axios.get(`/posts/profile/${username}`)
        : await axios.get("/posts/timeline/"+ user._id);
      setPost(res.data.sort((p1, p2) => {
        return new Date(p2.createdAt) - new Date(p1.createdAt);
      }));
    };
    fetchPost();
  }, [username, user._id]);

  return (
    <div className="feed">
      <div className="feedWrapper">
        <Share />
        {posts.length > 0 && posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}
      </div>
    </div>
  );
}
