const Post = require("../models/Post");
const User = require("../models/User");

const newPost = async (body) => {
  const newPost = new Post(body);
  try {
    const savedPost = await newPost.save();
    return { type: 201, response: savedPost };
  } catch (err) {
    return { type: 400, response: err };
  }
};

const updatePost = async (body, id) => {
  try {
    const post = await Post.findById(id);
    if (post.userId === body.userId) {
      await post.updateOne({ $set: body });
      return { type: 200, response: "Post has been updated" };
    } else {
      return { type: 403, response: "you can update only your posts" };
    }
  } catch (err) {
    return { type: 500, response: err };
  }
};

const deletePost = async (id) => {
  try {
    const post = await Post.findById(id);
    await post.deleteOne();
    return { type: 200, response: "Post has been deleted" };
  } catch (err) {
    return { type: 500, response: err };
  }
};

const likeDislikePost = async (body, id) => {
  try {
    const post = await Post.findById(id);
    if (!post.likes.includes(body.userId)) {
      await post.updateOne({ $push: { likes: body.userId } });
      return { type: 200, response: "The post has been liked" };
    } else {
      await post.updateOne({ $pull: { likes: body.userId } });
      return { type: 200, response: "the post has been disliked" };
    }
  } catch (err) {
    return { type: 500, response: err };
  }
};

const getPost = async (id) => {
  try {
    const post = await Post.findById(id);
    return { type: 200, response: post };
  } catch (err) {
    return { type: 400, response: err };
  }
};

const getTimelinePost = async (userId) => {
  try {
    const currentUser = await User.findById(userId);
    const userPosts = await Post.find({ userId: currentUser._id });
    const friendPosts = await Promise.all(
      currentUser.followings.map((friendId) => {
        return Post.find({ userId: friendId });
      })
    );
    return { type: 200, response: userPosts.concat(...friendPosts) };
  } catch (err) {
    return { type: 500, response: err };
  }
};

const getUsersAllPosts = async (username) => {
  try {
    const user = await User.findOne({ username: username });
    const posts = await Post.find({ userId: user._id });
    return { type: 200, response: posts };
  } catch (err) {
    return { type: 500, response: err };
  }
};

const newComment = async (body, id) => {
  try {
    const { userId, comment } = body;
    const newComment = { userId, comment };
    const post = await Post.findById(id);
    await post.updateOne({ $push: { comments: newComment } });
    return { type: 201, response: "The post has been commented" };
  } catch (err) {
    return { type: 500, response: err };
  }
};

const getAllCommentsOfPost = async (id) => {
  try {
    const post = await Post.findById(id);
    const comments = post.comments;
    return { type: 200, response: comments };
  } catch (err) {
    console.log(err);
    return { type: 500, response: err };
  }
};

module.exports = {
  newPost,
  updatePost,
  deletePost,
  likeDislikePost,
  getPost,
  getTimelinePost,
  getUsersAllPosts,
  newComment,
  getAllCommentsOfPost,
};
